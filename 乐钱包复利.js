var releaseRate = 0.05;
var investList = Array();
var firstInvestAmount = 2*10000;
var releaseAmount = 0;
var reInvestAmount = 100;


investList.push({investAmount: firstInvestAmount,releaseAmount: 2*firstInvestAmount});

for(let week=0; week < 40; week++) {

    var teminvestList = Array();
    
    for(let i=0; i<investList.length; i++) {
    
    
        var _releaseAmount = investList[i].investAmount * releaseRate;
        releaseAmount += _releaseAmount;
        
        investList[i].releaseAmount -= _releaseAmount;
    
        //去掉释放结束的
        if(investList[i].releaseAmount) {
            
            teminvestList.push(investList[i]);
        }

        //复投
        if(releaseAmount >= reInvestAmount) {

            var newInvest = {};
            
            newInvest.investAmount = releaseAmount - releaseAmount % reInvestAmount;
            newInvest.releaseAmount = newInvest.investAmount * 2;
            teminvestList.push(newInvest);

            //加速5%
            releaseAmount = releaseAmount % reInvestAmount ;//+ newInvest.releaseAmount * 0.05;
            
        }
    
    }
    
    investList = teminvestList;

}

console.log('乐钱包 投两万U，复投十个月，每周释放5%的收益情况')
var totalRelease = 0;
for(let week=0; week < 40; week++) {

    var teminvestList = Array();
    var temrelease = 0;
    
    for(let i=0; i<investList.length; i++) {
    
    
        var _releaseAmount = investList[i].investAmount * releaseRate;
        temrelease += _releaseAmount;
        totalRelease += _releaseAmount;
        
        investList[i].releaseAmount -= _releaseAmount;
    
        //去掉释放结束的
        if(investList[i].releaseAmount) {
            
            teminvestList.push(investList[i]);
        }

    
    }
    
    investList = teminvestList;
    if(week<9)
        _week = '0' + (week+1).toString();
    else 
        _week = (week+1).toString();


    console.log('第',_week,'周','释放金额：',temrelease , '总释放：',totalRelease);

}


