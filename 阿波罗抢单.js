  var thisDay = new Date(new Date().toLocaleDateString()).getTime()/1000 + 14 * 3600 + 0 *60;

  function invest() {
	  
	    
	  if(new Date().getTime()/1000 > thisDay + 1) {

		  console.log(new Date().toLocaleString());
  	
	 	 qiangdan('0.3');

	  } else {
		  
		  var t = setTimeout(function(){
			  clearTimeout(t);
              
              // console.log(new Date().getTime()/1000 - thisDay);

                var time = new Date((thisDay*1000 - new Date().getTime())/1000)
                var hour = (time - time%3600)/3600
                var mins = (time%3600 - time%3600%60)/60
                var second = time%3600%60
                console.log(hour + ':' + mins + ':' + second, new Date().toLocaleString())
                web3.eth.getBlockNumber().then((res)=>{
					// console.log(res)
				});
              
			  invest();
		  },1000);
		  		  
	  }
  };
    
async function qiangdan(val) {
		
		let to = '0xae41e0584708e96c7fd4acb2befba0bae2dc0348';
		let _data = '0x049878f30000000000000000000000000000000000000000000000000429d069189e0000';
		let value = web3.utils.toWei(val)
		var payload =  {from:userWallet.address, to: to, data: _data, value: value, gas: 350000, gasPrice:"5000000000"};
		let gas = await web3.eth.estimateGas({from:userWallet.address, to: to, data:_data});
		payload.gas = web3.utils.numberToHex(parseInt(gas * 2));
		let sign = await userWallet.signTransaction(payload);
		await web3.eth.sendSignedTransaction(sign.rawTransaction).then((res)=>{

            console.log(res)
            
        });

	}

invest();
