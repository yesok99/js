
/*
javasctipt:
var _script = document.createElement("script");
_script.setAttribute("src","http://localhost/web3/js/jquery.min.js");
document.body.appendChild(_script);
javasctipt:
var _script1 = document.createElement("script");
_script1.setAttribute("src","http://localhost/web3/js/zhongchou.js");
document.body.appendChild(_script1);
*/

var  playGame = {
	timespace :1000,
	endTime : new Date(('2022-09-30 19:08:00').replace(/\-/g, "/")).getTime() ,
	stop : 0,
	startTime : '2023-09-30 19:08:00',
	currDateTime : 0,
	 _roundId : 0,
	 success0 : 0,
	 success1 : 0,
	 token0 : "658950bf60e144cf95ccc3f691d1a346",
	 token1 : "5b1744c7269e43bf866b82bf47c8e20e",
	 account : [],
     setInit : function() { 
					//$(function(){
					 this.timespace = 1000;
					 this.stop = 0;
					 this.success0 = 0;
					 this.success1 = 0;
					 for(let i = 0; i < this.account.length ; i++) {
						 this.account[i].success = 0;
						 this.myAsset(this.account[i].token);
					 }
					 
/*
					 this.myAsset(this.token0);
					 this.myAsset(this.token1);
*/
					   var param1 = {
					            "activityId": 59,
								"plat": "web",
								"version": "1.0.0",
								"token": this.account[0].token,
								"lang": "zh_CN"
					     }
					        $.ajax({
					            url: "https://filgame.blockwins.com/app/game/round/lastRound?",
					            //data: JSON.stringify(param1),
					            data: param1,
					            type: "GET",
					            dataType: "json",
					            async: false,
					            //contentType: "application/json", //必须这样写POST   还要加JSON.stringify()    
					            
							}).then((o)=>{
							var s = {};
							s.lastRoundInfo = o.result.lastRoundInfo;
					        this._roundId = s.lastRoundInfo.roundId;
					        this.startTime = s.lastRoundInfo.startTime;
					        this.currDateTime = o.result.currDate;
					// 		e = new Date(o.result.currDate.replace(/\-/g, "/")).getTime() ; 
							this.endTime = new Date(s.lastRoundInfo.startTime.replace(/\-/g, "/")).getTime() ;
							console.log({"startTime" : s.lastRoundInfo.startTime , "timestamp" : this.endTime, "coinName" : o.result.lastRoundInfo.coinName, "_roundId" : this._roundId});
							});
					//});
				},

    fastPurchase : function (_token, _amount = 0){

									  var urlfastPurchase = "https://filgame.blockwins.com/app/game/purchase/fastPurchase";
									  var urlnormalPurchase = "https://filgame.blockwins.com/app/game/purchase/normalPurchase";
									  var _url = "";
									  var param1 = param1 = {"roundId": this._roundId,  "plat": "web", "version": "1.0.0", "token": _token, "lang": "zh_CN"};									     									      if(_amount == 0) {
										     _url = urlfastPurchase;
									     } else {
										     _url = urlnormalPurchase;
										     param1 = {"roundId": this._roundId, "amount": _amount, "plat": "web", "version": "1.0.0", "token": _token, "lang": "zh_CN"};
									     }
									        $.ajax({
									            url: _url,
									            //data: JSON.stringify(param1),
									            data: param1,
									            type: "POST",
									            dataType: "json",
									            async: false,
									            //contentType: "application/json"  
											}).then((o)=>{
												console.log(o);
												let _stop  = 1;
												if(o.msg == '成功')
												{
													for(let i = 0; i < this.account.length ; i++) {
														if(_token == this.account[i].token) {
															this.account[i].success = 1;
															console.log("抢单成功", this.account[i].token);
														}
															
														_stop  = _stop && this.account[i].success;
														this.stop  = _stop;
												}
/*
													if(_token == this.token0) {
														this.success0 = 1;
														
													}
														
													if(_token == this.token1) {
														this.success1 = 1;
														console.log("抢单成功...token1" );
													}
*/

												}
											});
								},
								
		myAsset : function(_token){

				var param1 = {"plat": "web", "version": "1.0.0", "token": _token, "lang": "zh_CN"};
		        $.ajax({
		            url: "https://filgame.blockwins.com/app/game/asset/myAsset", data: param1, type: "GET", dataType: "json", async: false
					}).then((o)=>{
					
						if(o.code == 200) {

							userId = o.result.accountInfo.userId;
							availableAmount = o.result.page[0].availableAmount;
							coinName = o.result.page[0].coinName;
							
							console.log({"userId" : userId, "availableAmount" : availableAmount, "coinName" : coinName, "token" : _token});
						}
				});
	}	,

	timerDown : function(){
			var endTime = this.endTime;
			var t = new Date().getTime();
			var e = new Date(('2022-09-28 19:07:00').replace(/\-/g, "/")).getTime() ;
			e = endTime;
			var m = parseInt((e- t )/1000);
			var h =  parseInt(m/3600);
			var s = parseInt(m%3600/60);
			var min = parseInt(m%3600%60);
			//console.log("倒计时：" + h + ':' + s +':' + min , " 开始时间： " + this.startTime, new Date().toLocaleString().replace(/\//g,"-"));
			//console.log( new Date().toLocaleString().replace(/\//g,"-"), "倒计时：" + h + ':' + s +':' + min);
			console.log(h + ':' + s +':' + min);
	},
   gameStart : function(){
		
		var endTime = this.endTime;
		var timespace = this.timespace;
		var stop = this.stop;
		var curTime = new Date().getTime();
		if(curTime - endTime < 3000 && !this.stop) {
			this.timerDown();
		} else {
			console.log("停止计时...");
		}
		
		if((endTime - curTime <=2000) && (curTime - endTime <= 3000) ) {
			this.timespace = 100;
			if(!this.stop) {
					console.log("倒计时开始" , (endTime - curTime), '毫秒');
				}
			
		} else {
			this.timespace = 1000;
		}
	
		if( (endTime - curTime <= -100) && (curTime - endTime <= 1000) ) {
				
				if(!this.stop) {
					console.log("开始抢单..." , new Date().toLocaleString().replace(/\//g,"-"));
				}
				
/*
				if(this.success0 == 0) {
					this.fastPurchase(this.token0, 1000);
				}
					
				if(this.success1 == 0) {
					this.fastPurchase(this.token1);
				}
*/
				for(let i = 0; i < this.account.length; i++ ) {
					if(this.account[i].success == 0)
						this.fastPurchase(this.account[i].token, this.account[i].amount);
				}
				
			}
		
		 Timers = setTimeout(()=>{

	           clearTimeout(Timers);    
	           this.gameStart();      
	       }, this.timespace);
	},
	
	setEndtime : function(){
		this.setInit();
		this.endTime = new Date().getTime() + 5000;
	},
	
	currentTime : function(){
		this.setInit();
		console.log( this.currDateTime ,  new Date().toLocaleString().replace(/\//g,"-"));
		Timers = setTimeout(()=>{

	           clearTimeout(Timers);    
	           this.currentTime();      
	       }, 1000);
	}
}

playGame.account.push({"token" : "658950bf60e144cf95ccc3f691d1a346", "success" : 0, "amount" : 10});
playGame.account.push({"token" : "5b1744c7269e43bf866b82bf47c8e20e", "success" : 0, "amount" : 0});
playGame.setInit();
playGame.gameStart();
//playGame.currentTime();

// playGame.endTime = new Date(('2022-09-29 22:26:00').replace(/\-/g, "/")).getTime();

// sct总额：109165  usdt总额：5 ,2022.10.2
