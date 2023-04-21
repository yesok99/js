var releaseRate = 0.08;
var investList = Array();
var firstInvestAmount = 1*1000*1.2;
var InvestAmount = firstInvestAmount;
var releaseAmount = 0;
var reInvestAmount = 100;
var profit = 0;
var temProfit = 0;

var plan = 0;


for(let i=0;i<70;i++) {

    let todayProfit = InvestAmount * releaseRate;
    InvestAmount = InvestAmount - todayProfit;

    profit += todayProfit;
    
    if(profit >= reInvestAmount){

        if(plan)
            {
                // 回本方案
                profit = profit - (firstInvestAmount - InvestAmount) / 1.2 ;
                temProfit += profit;
        
                profit = 0;
        
                InvestAmount = firstInvestAmount;
            }
        else {
            
            //全部复投方案
            InvestAmount += profit * 1.2;
            profit = 0;
            
        }

        if(InvestAmount > 2*firstInvestAmount ){
            console.log(i,'天翻倍')
            break;
            
        }
        
    }
    

}

console.log(InvestAmount,temProfit,profit);


   // console.log('第',_week,'周','释放金额：',temrelease , '总释放：',totalRelease);




