var data = {};

data.module = 'account'
data.action = 'txlist'
// data.action = 'tokentx'
// data.action = 'txlistinternal'
data.startblock = 0
data.endblock = 99999999
data.page = 1
data.offset = 9999
data.sort = 'desc' //asc
// data.apikey = 'YourApiKeyToken'
data.contractaddress = '0x55d398326f99059ff775485246999027b3197955'



data.address = '0xFaEEc6f5fC4Cbf57f4eb36ace7D5cfc3C4a08C49'
data.address = '0xd30fa7f4f7748636a0434e73c00ff1fec64ec679'
data.address = '0xAe41E0584708e96c7fD4ACb2bEFBa0BAe2DC0348' //阿波罗
data.address = '0x895544b3c762ebff9a27a1277649e60d198cdb29'; //skycoin shoukuan
// data.address = '0xc55717208e4e931e8fad0996263b568d2fd79885'; 
// data.address = '0xA842e3eb717486d6CDA9341BeA97D244E863aeC4';//sct
// data.address = '0xFaEEc6f5fC4Cbf57f4eb36ace7D5cfc3C4a08C49';//EAF
// data.address = '0x1f954ae167f0b8ff96a83b3da6e286c4b27d0bdf' //ippswap 质押池

data.address = '0xe0c419c2b53f6c507bdf132e87bb400f3311d00a'
var getData;

//获取数据
function getJsonData(type='') {

    console.log('数据获取中。。。。')
    let url = 'https://api.bscscan.com/api?';
	let ret;
	$.ajax({
	    url: url,
	    data: data,
	    // data: JSON.stringify(data),
	    type: "GET",
	    dataType: "json",
		// headers:headers,
	    async: false,
	    contentType: "application/json",
        success:function (data,status) {

            ret = {data:data,status:status};
        },
        error:function (data,status) {
            ret = {data:data,status:status};


        }
	});

    if(ret.status == 'success' && ret.data.status == '1')

	    return ret.data.result;
	else 
		return 'error'

    
    return ret;
}


function ippswap(){

    data.action = 'txlist';
    data.address = '0x1f954ae167f0b8ff96a83b3da6e286c4b27d0bdf';
    getData = getJsonData();
    console.log(getData)
    
    let count = 0;
    let amount = 0;
    let users = Array();
    for(let i=0;i<getData.length;i++) {
    
       // methodId "0xa694fc3a",functionName: "stake(uint256 countryID)"
        if(getData[i].methodId == '0xa694fc3a') {
    
           amount +=  web3.eth.abi.decodeParameter('uint256',getData[i].input.substring(10,))/1e18;
           count++;
           if(!users.includes(getData[i].from))
               users.push(getData[i].from)
        }
            
        
    }
    
    console.log(count,amount,users.length)
    
}


function sctadmin() {

	

	data.action = 'txlist';
    data.address = '0xfae915e700847328e33af8f6921bec93ce06f995';
	data.address = '0x492733b1aace20be200aa9a15bcbe23b428585e4';
	
    getData = getJsonData();
    console.log(getData)

	for(let i=0;i<getData.length;i++) {
    
       // methodId "0xa694fc3a",functionName: "stake(uint256 countryID)"
		// 检查交易对是否是白名单
        if(getData[i].functionName.indexOf('addWhiteList')!= -1 ) {

			console.log(getData[i]);
          
        }
            
        
    }
}


function getsky() {

	data.action = 'tokentx';

	data.address = '0x895544b3c762ebff9a27a1277649e60d198cdb29';
    getData = getJsonData();
    
	let tem = 0;
	for(let i=0;i<getData.length;i++) {

		if(getData[i].to == data.address)
			tem += getData[i].value/1e18;

	}

	console.log(getData,tem,getData.length );
	
}

async function getBNBbalance() {

   var url =  'https://api.bscscan.com/api?module=account&action=balance&address='+ data.address;

   let balance =  await $.getJSON(url);
   console.log((balance.result/1e18).toFixed(2));
    
}
////////////////////  start /////////////////////

function ippswap() {

	data.action = 'tokentx';
	// data.action = 'txlist'
	data.address = '0xd52eee54248a0e3ab2416385d5fb112840c81826';
    getData = getJsonData();
    
	let tem = 0;
	for(let i=0;i<getData.length;i++) {

		if(getData[i].to == data.address)
			if(getData[i].value/1e18 >= 10)
				console.log(getData[i])

	}

	console.log(getData,tem,getData.length );
	
}

function zbc() {

	// data.action = 'tokentx';
	data.action = 'txlist'
	data.address = '0xe0c419c2b53f6c507bdf132e87bb400f3311d00a';
    getData = getJsonData();

	today = new Date(new Date().toLocaleDateString()).getTime()/1000;
	let todayAmount = 0;
	
	let tem = 0;
	let despoit = 0;
	for(let i=0;i<getData.length;i++) {

		if(getData[i].methodId == "0xe2bbb158")	{

			despoit = web3.eth.abi.decodeParameter('uint256',getData[i].input.substr(10,74))/1e18;
			if(despoit >=100){

				tem += despoit;
				//getData[i].timeStamp
				if(getData[i].timeStamp >= today)
					
					todayAmount += despoit;
			}
				
			
		}

			
	}
	console.log('入金总额：',tem, '今日入金金额：',todayAmount)
	// console.log(getData)
}

//zbc();

function zbcsendUsdt() {

	data.contractaddress = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56'
	data.action = 'tokentx';
	data.address = '0x390e7b5250ef60a7b94e048a470b24147f000c8a';
	getData = getJsonData();
	

	let out = 0;
	let in1 = 0;

	for(let i=0;i<getData.length;i++) {

		if(getData[i].from == data.address) {
			
			out += getData[i].value/1e18;
		}

		if(getData[i].to == data.address) {
			
			in1 += getData[i].value/1e18;
		}

	}

	console.log('out',out);
	console.log('in1',in1);
	console.log('余额',(in1 - out));
	
}

// zbcsendUsdt();
// zbc();

function newSCT() {

	data.contractaddress = '0x7a27f0419289d703896877594b93a023828585e4'
	data.action = 'tokentx';
	data.address = '0xa107abb13441fa3651b4a3a56f65b7337c970a76';
	getData = getJsonData();
	

	let out = 0;
	let in1 = 0;

	for(let i=0;i<getData.length;i++) {

		if(getData[i].from == data.address) {
			
			out += getData[i].value/1e18;
		}

		if(getData[i].to == data.address) {
			
			in1 += getData[i].value/1e18;
		}

	}

	console.log('out',out);
	console.log('in1',in1);
	console.log('余额',(in1 - out));
	
}
