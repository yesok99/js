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

data.address = '0xAe41E0584708e96c7fD4ACb2bEFBa0BAe2DC0348' //阿波罗

var getData;

//获取数据
async function sajax(type='') {

    let url = 'https://api.bscscan.com/api?';
	
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

async function getJsonData() {

    let ret = await sajax();
    getData = ret.result;
    console.log(getData)
    return getData;
}

//过滤数据
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


async function inBNB(day0=0,day1=1) {

    data.action = 'txlist';
    let getData = await getJsonData();
    let address  = data.address.toLowerCase();
    let from = 0;
    let to = 0;
    let j = 0;
    for(let i=0;i<getData.length;i++) {

        let timestamp = getData[i].timeStamp;
        
        //时间过滤
        if(filter(day0,day1,timestamp) == 2) {
            flag = true;
            break;
        }

        if(getData[i].isError == '0' && getData[i].value > 0 && filter(day0,day1,timestamp) == 1) {

            if(address == getData[i].from.toLowerCase()) {

                from += getData[i].value /1e18;
            
            } else if(address == getData[i].to.toLowerCase()) {
                to += getData[i].value /1e18;
                
            }

            let time = new Date(timestamp*1000).toLocaleString();
            console.log(j, (getData[i].value /1e18).toFixed(2), time , getData[i].blockNumber);

            j++;
        }

        
    }

    console.log('转出金额:'+ from,'转入金额:' + to)
}

async function outBNB(day0=0,day1=1) {

    data.action = 'txlistinternal';
    let getData = await getJsonData();
    let address  = data.address.toLowerCase();
    let from = 0;
    let to = 0;
    let j = 0;
    for(let i=0;i<getData.length;i++) {

        let timestamp = getData[i].timeStamp;
        
        //时间过滤
        if(filter(day0,day1,timestamp) == 2) {
            flag = true;
            break;
        }

        if(getData[i].isError == '0' && getData[i].value > 0 && filter(day0,day1,timestamp) == 1 && getData[i].from != getData[i].to) {

            if(address == getData[i].from.toLowerCase()) {

                from += getData[i].value /1e18;
            
            } else if(address == getData[i].to.toLowerCase()) {
                to += getData[i].value /1e18;
                
            }

            let time = new Date(timestamp*1000).toLocaleString();
            
            // console.log(j, (getData[i].value /1e18).toFixed(2), time , getData[i].blockNumber);

            j++;
        }

        
    }

    console.log('转出金额:'+ from,'转入金额:' + to)
}

async function getBNBbalance() {

   var url =  'https://api.bscscan.com/api?module=account&action=balance&address='+ data.address;

   let balance =  await $.getJSON(url);
   console.log((balance.result/1e18).toFixed(2));
    
}
// inBNB();
outBNB();
