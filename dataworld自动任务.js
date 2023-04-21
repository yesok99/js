/*
	javascript:var _script = document.createElement("script");_script.setAttribute("src","http://localhost/web3/js/jquery.min.js");document.body.appendChild(_script);console.log('众筹注入');
	javascript:var _script1 = document.createElement("script");_script1.setAttribute("src","http://localhost/web3/js/dataworkTask.js");document.body.appendChild(_script1);
*/
!function(){
if(typeof(s) ==  "undefined") {
	var s = document.createElement("div");
	s.innerHTML = "<div>start...</div>";
	style = 'color:red;font-size:16px;line-height:150%;width:40%;z-index:10000;position:fixed;top:0;left:0;bottom:0;padding:10px;overflow-y:scroll'
	s.setAttribute("style", style);
	document.body.appendChild(s);
} else {
// 	s.innerHTML = "<div>start...</div>";
}
// 	document.body.removeChild(s);
s.ondblclick = function(){
	this.innerHTML = "";
}

function todoTask(Account) {
	var _token = Account.token;
	var doTask = {
		TaskFinish : 0,
		signIn : 0,
		counter:1,
		 //token : 0,
		 taskAnswer : {},
		 param: {plat: "web", version: "1.0.0", token: _token, lang: "zh_CN" },
		 login: function(){
			 let param = this.param;
			 param.account = Account.account;
			 param.loginPwd = Account.loginPwd;
			 param.prefix = Account.prefix;
			 param.token = "";
			 var getJson = {data: param,type: "GET",dataType: "json", async: false};//, headers :{Origin: "https://blockwins.com", Referer: "https://blockwins.com"}};
/*
			 var getJson = this.getJson;
			 getJson.data = param;
*/
			 getJson.url = "https://fil.blockwins.com/app/customer/open/login";
			 if(Account.token)
			 	return true;
			 $.ajax(getJson).then((r) => {
				 			
					 				if(r.msg == '成功') {
						 				Account.token = r.result.customerVo.token ;
						 				console.log(Account.account, "登陆成功");
						 				s.innerHTML = s.innerHTML + "<div>" + Account.account + "登陆成功"
					 				}
					 			});
			 
		 },
	     taskTopic :  function() { 
		     		//TaskFinish = 0;
		 			var param = this.param;
		 			param.token = _token;
		 			this.taskAnswer = param;
		 			var result;
		 			var getJson = {data: param,type: "GET",dataType: "json",async: false};
		 			
		 			var weekList = getJson;
		 			weekList.url = "https://fil.blockwins.com/app/signTask/weekList";
		 			
		 			if(Account.signIn == 0) {
				 			$.ajax(weekList).then((r) => {
				 			
				 			if(r.msg == '成功') {
					 			var dailyTask = getJson;
					 			dailyTask.url = "https://fil.blockwins.com/app/signTask/dailyTask";
					 			$.ajax(dailyTask).then((r) => {
				 			
					 				if(r.msg == '成功') {
						 				Account.signIn = 1;
						 				console.log("签到成功", Account.account);
						 				s.innerHTML = s.innerHTML + "<div>" +"签到成功: " + Account.account + "<div>";
					 				}
					 			});
				 			}
				 		});
		 			}
		 			
		 			
		 			var taskTopic = getJson;
		 			taskTopic.url = "https://fil.blockwins.com/app/signTask/taskTopic";
					$.ajax(taskTopic).then((r) => {
// 									if(r.msg != '该日期签到任务已完成') 
// 										console.log("问题：" + r.result.correctOption);
									this.taskAnswer.topicId = r.result.topicId;
									this.taskAnswer.topicType = r.result.topicType;
									this.taskAnswer.submitOption = r.result.correctOption;
									if(r.msg == '该日期签到任务已完成') {
										this.TaskFinish = 1;
										Account.finish = 1;
										console.log("该日期签到任务已完成: ", Account.account);
										s.innerHTML =  s.innerHTML + "<div>" + "该日期签到任务已完成：" + Account.account + "</div>";
									}
										
								});
	
					},
					
		answer :  function () {
					if(this.TaskFinish) return true;
					$.ajax({
						            url: "https://fil.blockwins.com/app/signTask/submitAnswer",
						            data: this.taskAnswer,
						            type: "POST",
						            dataType: "json",
						            async: false,
								}).then((r) => {
									console.log('第', Account.counter, '题完成');
									s.innerHTML = s.innerHTML + "<div>" + Account.account +	':第' +Account.counter +'题完成</div>' ;							
									Account.counter ++;
								});
					}
		}
		
		return doTask;
		function _doTask() {
				if(doTask.TaskFinish) {
					
					return;
				}
					
				doTask.taskTopic();
				Timers = setTimeout(()=>{
						
						if(!doTask.TaskFinish) {
							doTask.answer();
						}
				           clearTimeout(Timers);    
				           _doTask();      
				       }, 1000);
			}
		
		_doTask();
		
}

function sleep(ms) {
    return new Promise(function(resolve, reject) {
        setTimeout(resolve,ms);
    })
}
	var arrToken = [ ];

	arrToken.push({"account" : "723205320@qq.com", "loginPwd" : "2f7cc7f2ca3b9f9981d363e8170acef0", "prefix" : 86, "token" : "", "finish" : 0, "signIn" : 0, "counter" : 0, "login" : 0});

	arrToken.push({"account" : "642877513@qq.com", "loginPwd" : "2f7cc7f2ca3b9f9981d363e8170acef0", "prefix" : 86, "token" : "", "finish" : 0, "signIn" : 0, "counter" : 0, "login" : 0});
	
	arrToken.push({"account" : "2608555120@qq.com", "loginPwd" : "2f7cc7f2ca3b9f9981d363e8170acef0", "prefix" : 86, "token" : "", "finish" : 0, "signIn" : 0, "counter" : 0, "login" : 0});

	
	

async function start() {
	for(let i = 0; i < arrToken.length; i++) {
		try {
				var todo =  todoTask(arrToken[i]);
				todo.login();
				if(arrToken[i].finish == 0 && arrToken[i].token) {
					todo.taskTopic();
					await sleep(100);
					todo.answer();
				}

			} catch(e) {
				console.log(e);
				await sleep(1000);
			    start();
			}
	}
	
// 	var flag  = 1;
	for(let i = 0; i < arrToken.length; i++) {
// 		flag = flag && arrToken[i].finish;
		if( arrToken[i].finish == 0) {
			await sleep(100);
			start();
			break;
		}
			
	}
	
/*
	if(flag == 0) {
		await sleep(100);
		start();

	}
*/
// 	console.log("waiting for next start...");
}

start(); 

}();

