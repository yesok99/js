var data = {};
var headers = {"authorization":"47c025a2c14a4000b2e72f110c0da4fd"}
var url = "https://pretxs.mytokenpocket.vip/v1/transaction_action/universal_list"
var retData;
var userData = Array();
var totalAmount = 0;
var outAmount = 0;
var _hasOutAmount = 0;
var outData;

data.address = '0xA842e3eb717486d6CDA9341BeA97D244E863aeC4'
data.blockchain_id = 12
data.contract_address = '0x55d398326f99059ff775485246999027b3197955'
data.count = 500
data.lang = 'zh-Hans'
data.new_way = 'tp'
data.page = 0
data.search	= ''
data.sort = 'desc'
data.type = 1
// data.sort = 'asc'

//type = 2 out, 1 in ,0 所有

function hasOutAmount(){
	
	data.type = 2;
	
	$.ajax({
	    url: url,
	    data: data,
	    // data: JSON.stringify(data),
	    type: "GET",
	    dataType: "json",
		// headers:headers,
	    async: true,
	    contentType: "application/json"
	}).then((res)=>{

		// console.log(res.data);
		
		outData = res.data;
		for(let i=0;i<outData.length;i++) {

			_hasOutAmount += outData[i].token_value/1e18 ;

			//打印大于1000的金额
			if(outData[i].token_value/1e18 > 1000) {

				let timestamp = new Date(outData[i].timestamp*1000).toLocaleString();

				console.log({hash:outData[i].hash, to:outData[i].to,
							 value:outData[i].token_value/1e18,
					timestamp: timestamp		});
				
			}
			
		}
		

		if(data.count == outData.length) {

			data.page += data.count;
			
			hasOutAmount();
			
		} else {
			
			console.log('已经取出金额：', (_hasOutAmount/10000).toFixed(4) + '万');
			console.log('剩余金额：', ((totalAmount - _hasOutAmount)/10000).toFixed(4) + '万');
			data.page = 0; //结束后重置
			_hasOutAmount = 0;
		}
	

	});
	
	
}

function getData(){
	
	data.type = 1;	
	
	$.ajax({
	    url: url,
	    data: data,
	    // data: JSON.stringify(data),
	    type: "GET",
	    dataType: "json",
		// headers:headers,
	    async: true,
	    contentType: "application/json"
	}).then((res)=>{

        retData = res.data;
        console.log(res);

		for(i=0; i<retData.length; i++) {

			// if(retData[i].token_value/1e18 < 1)
			// 	console.log(retData[i])
			// if(retData[i].token_value/1e18 > 1) {
			if(retData[i].token_value/1e18 < 200) {

				//console.log('小笔金额：',(retData[i].token_value/1e18).toFixed(8));
			}

			
			if(retData[i].token_value/1e18 == 200 || retData[i].token_value/1e18 == 1000 || retData[i].token_value/1e18 == 5000){
				
				userData.push({address: retData[i].from, amount: retData[i].token_value/1e18, timestamp: retData[i].timestamp});
				totalAmount = totalAmount + retData[i].token_value/1e18;
			
			} else{
				// console.log(i,retData[i].token_value/1e18)
			}
		
	        
		}

		
		
		if(retData.length == data.count) {
			data.page = data.page + data.count;
			getData();
			
		} else {

			data.page = 0; //结束后重置
			
			let timestamp = Date.parse(new Date()) / 1000;
			let days;
			let dayTime;
			
			for(i=0; i<userData.length; i++) {

				//凌晨结算奖金
				dayTime = userData[i].timestamp *1000;
				dayTime = new Date(new Date(dayTime).toLocaleDateString()).getTime()/1000 + 3600*0;
				days = parseInt((timestamp - dayTime)/(60*60*24));
				
				if(userData[i].amount == 200 || userData[i].amount == 1000 || userData[i].amount == 5000)
					outAmount = outAmount + userData[i].amount*10*0.002*days;
			}

			console.log({'inAmount':totalAmount,'outAmount':outAmount, 'letfAmount': totalAmount - outAmount});
			
			//今日新增业绩
			todayIncamount();
		}
		
		
		
	 });
}

getData();

function todayIncamount(){
	let totalAmount = 0;
	let lastdayAmount = 0;
	let onedaytime = 24 * 3600 *1000;
	let dayTime = new Date(new Date().toLocaleDateString()).getTime();
	let i=0;
	
	while(userData[i].timestamp*1000 >= dayTime) {
		totalAmount += userData[i].amount;
		i++;
	}

	while(userData[i].timestamp*1000 < dayTime && userData[i].timestamp*1000 >= dayTime - onedaytime) {
		lastdayAmount += userData[i].amount;
		i++;
	}

	console.log('今天新增业绩：',(totalAmount/10000).toFixed(2) + '万');
	console.log('昨天新增业绩：',(lastdayAmount/10000).toFixed(2) + '万');

	
}

//var vtime = day = new Date(new Date().toLocaleDateString()).getTime()/1000;

// 前N天的业绩

function stackAmount(days) {

	let totalAmount = 0;

	let dayTime = new Date(new Date().toLocaleDateString()).getTime();

	dayTime -= days * 24 * 3600 *1000;

	for(i=0;i<userData.length;i++) {

		if(userData[i].amount == 200 || userData[i].amount == 1000 || userData[i].amount == 5000)
			
			if(userData[i].timestamp*1000 >= dayTime)
				
				totalAmount += userData[i].amount;
			
	}
	console.log('前'+days+'天质押金额: ',(totalAmount/10000).toFixed(2) + '万');
	return (totalAmount/10000).toFixed(2);
}

//每天质押情况

function stacPerday() {

	let totalAmount = 0;

	let dayTime = new Date(new Date().toLocaleDateString()).getTime();

	let day = 0;
	let stamp;
	let total = 0;

	for(i=0;i<userData.length;i++) {

		dayTime0 = dayTime - day * 24 * 3600 *1000 ;
		dayTime1 = dayTime0 + 24 * 3600 *1000;

		if(userData[i].amount == 200 || userData[i].amount == 1000 || userData[i].amount == 5000) {

			stamp = userData[i].timestamp*1000;
			if( stamp>= dayTime0 && stamp < dayTime1) {
				
				totalAmount += userData[i].amount;
				total += userData[i].amount;
				
			}
				
				
		}

		let timestamp = new Date(dayTime0).toLocaleDateString();
		
		if(stamp < dayTime0) {
			let temday = day+1;
			
			
			if(day<10)
				console.log('前 0'+day+' 天 质押金额: ',(totalAmount/10000).toFixed(2) + '万  日期：', timestamp);
			else
				console.log('前 '+day+' 天 质押金额: ',(totalAmount/10000).toFixed(2) + '万  日期：', timestamp);
			
			// day++;
			if((dayTime0 - stamp)% (24 *3600 * 1000) != 0) //不是正点 +1
				day +=  parseInt((dayTime0 - stamp)/ (24 *3600 * 1000)) + 1;
			else
				day +=  parseInt((dayTime0 - stamp)/ (24 *3600 * 1000));
			
			totalAmount = userData[i].amount;
			total += userData[i].amount;

			// 打印没有业绩的天数
			for(let i=temday; i<day;i++) {

				if(i<10)
					console.log('前 0'+i+' 天 质押金额: ', '0.00万');
				else
					console.log('前 '+i+' 天 质押金额: ','0.00万');
				
			}
			
		}	
			
	}
		
	let firstDaytimestamp = new Date(dayTime - day * 24 * 3600 * 1000).toLocaleDateString();
	
	if(day<10)
			console.log('前 0'+day+' 天 质押金额: ',(totalAmount/10000).toFixed(2) + '万  日期：', firstDaytimestamp);
		else
			console.log('前 '+day+' 天 质押金额: ',(totalAmount/10000).toFixed(2) + '万  日期：', firstDaytimestamp);
			
		console.log('总质押金额:',(total/10000).toFixed(2) + '万')
}

function ok(){
	stacPerday();
}

function nDay(n){

	if(n!=0)

		console.log((stackAmount(n) - stackAmount(n-1)).toFixed(2));
	else 
		console.log(stackAmount(0));
}

//前N天的业绩
//stackAmount(days)

//每天质押情况
//stacPerday()
//ok()

//取现金额
//hasOutAmount();
