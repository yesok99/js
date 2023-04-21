

var data = function(){
    let data = {};
    let url = "https://pretxs.mytokenpocket.vip/v1/transaction_action/universal_list"
    data.address = '0xAe41E0584708e96c7fD4ACb2bEFBa0BAe2DC0348' ; //阿波罗合约地址 BNB
    // data.address = '0xd018ebf9ea9d98e6c10305e4ff7cccc4abb369ad';
    // data.address = '0xA842e3eb717486d6CDA9341BeA97D244E863aeC4';
	// data.address = '0xc55717208e4e931e8fad0996263b568d2fd79885';
	// data.address = '0xe830df477141d667a4471e15094ed69bf585de29'; //buy apo addr 

    data.blockchain_id = 12
    data.contract_address = ''
    // data.contract_address = '0x55d398326f99059ff775485246999027b3197955';
    data.count = 500
    data.lang = 'zh-Hans'
    data.new_way = 'tp'
    data.page = 0
    data.search	= ''
    data.sort = 'desc'
    data.type = 1
    
    //receive = 1, send = 2 ,other = 0;
    return data;
}();


async function sajax(type) {

    let url = "https://pretxs.mytokenpocket.vip/v1/transaction_action/universal_list"
    
    data.type = type;
	
	var ret = await $.ajax({
	    url: url,
	    data: data,
	    // data: JSON.stringify(data),
	    type: "GET",
	    dataType: "json",
		// headers:headers,
	    async: true,
	    contentType: "application/json"
	});

    return ret;
}

async function getData(type,day0='',day1='') {

    data.page = 0;
    let temData = Array();
    let totalAmount = 0;
    let todyay = new Date(new Date().toLocaleDateString()).getTime()/1000;
    
    
    let retdata =  await sajax(type);
    let flag = false;

    
    while(1) {
        
        

        for(let i=0;i<retdata.data.length;i++) {

            let timestamp = retdata.data[i].timestamp;
            if(filter(day0,day1,timestamp) == 2) {
                flag = true;
                break;
            }

			let val ;
                
			if(data.contract_address == '')
				val = retdata.data[i].value/(10 ** retdata.data[i].decimal) ;
			else
				val = retdata.data[i].token_value/(10 ** retdata.data[i].decimal) ;

            if(!retdata.data[i].error_message && retdata.data[i].from != retdata.data[i].to && val > 0 && filter(day0,day1,timestamp) == 1) {
            // if(retdata.data[i].value > 0 && filter(day0,day1,timestamp) == 1) {

                temData.push(retdata.data[i]);

                totalAmount += val;
            }
            

        }

        if(flag)
            break;
        
        
        
        // temData = [...temData, ...retdata.data];
        if(retdata.data.length < data.count) 
			break;
        
        data.page += data.count;
		retdata =  await sajax(type);
    }

    // temData = [...temData, ...retdata.data];
    console.log(temData);
    console.log(totalAmount);

    return {data:temData,totalAmount:totalAmount};
    
}

function filter(day0='',day1='',timestamp) {

    let todyay = new Date(new Date().toLocaleDateString()).getTime()/1000;
    let d0 = todyay - 24 * 3600 * (day0 - 1);
    let d1 = d0 - 24 * 3600 * day1;

    if(!day0 && !day1) {
        return 1;
    }

    //第N天数据
    if(timestamp >= d1 && timestamp < d0) {

        return 1;
    }

    if(timestamp < d1)
        return 2;

    return 0;
    
}


async function printData(type,day0,day1) {

    let d = await getData(type, day0, day1);

    let amount = 0;

	// 去重

	// for(let i=0;i<d.data.length-1;i++) {

	// 	for(let j=i + 1;j<d.data.length;j++) {

	// 		if(d.data[i].from == d.data[j].from ) {

	// 			console.log(i,j,d.data[i]);
	// 			d.data.splice(d.data[j], 1);
	// 			j--;
	// 		}
				
	// 	}
	// }
    
    for (let i=0;i<d.data.length;i++) {
    

        let t = new Date(d.data[i].timestamp*1000).toLocaleString();
        
        let val ;
                
		if(data.contract_address == '')
			val = d.data[i].value/(10 ** d.data[i].decimal) ;
		else
			val = d.data[i].token_value/(10 ** d.data[i].decimal) ;
		
		console.log(i, (val.toFixed(2)), d.data[i].block_number,t);//, d.data[i].hash );
        

			amount += val;
    
    }
    
    console.log(amount);

    
}

async function getUserAmount(day0,day1) {

    let d = await getData(1, day0, day1);

    let amount = 0;
    let count = 0;

	// 去重

	for(let i=0;i<d.data.length-1;i++) {

        count = i+1;

		for(let j=i + 1;j<d.data.length;j++) {

			if(d.data[i].from == d.data[j].from ) {

				// console.log(i,j,d.data[i]);
				d.data.splice(d.data[j], 1);
				j--;
			}
				
		}
	}

    console.log(count);
}

printData(1,0,1)
// getUserAmount(0,100)
