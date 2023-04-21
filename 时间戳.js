//计算当天的时间戳
//day = new Date(new Date().toLocaleDateString()).getTime();

date = new Date();
year = date.getFullYear();
month = date.getMonth() + 1;
day = date.getDate();
day = year + '/' + month + '/' + day;

timestamp = new Date(day).getTime()/1000;
daytime = 24 * 3600

//当天11点钟的时间戳
timestamp += 3600 *11 - daytime * 0

console.log(new Date().toLocaleString().replace(/\//g, "-"))

// timerDown : function(){
// 			var endTime = this.endTime;
// 			var t = new Date().getTime();
// 			var e = new Date(('2022-09-28 19:07:00').replace(/\-/g, "/")).getTime() ;
// 			e = endTime;
// 			var m = parseInt((e- t )/1000);
// 			var h =  parseInt(m/3600);
// 			var s = parseInt(m%3600/60);
// 			var min = parseInt(m%3600%60);
// 			//console.log("倒计时：" + h + ':' + s +':' + min , " 开始时间： " + this.startTime, new Date().toLocaleString().replace(/\//g,"-"));
// 			//console.log( new Date().toLocaleString().replace(/\//g,"-"), "倒计时：" + h + ':' + s +':' + min);
// 			console.log(h + ':' + s +':' + min);
// 	},

