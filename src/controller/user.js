const execute = require('../utils/dbConnect');
const {
    getPrizeList
} = require('./prize.js');
const getRdm = require('../utils/getRdm');

const signup = async ({
    phone
}) => {
    let sql = `INSERT INTO user (phone) VALUES ('${phone}')`;
    return await execute(sql).then(data => data);
}

const getUserInfo = async ({
    phone
}) => {
    let sql = `SELECT * FROM user WHERE phone ='${phone}'`;
    return await execute(sql).then(data => data);
}

const draw = async ({id,bingo}) => {
    if (bingo == 0) {
        //还没过中奖
        let prizeList = await getPrizeList();
        let rdm = getRdm(1, 1000);
        let sum = 0;
        // console.log(prizeList);

        for (k of prizeList) {
            sum += k.probability;
            console.log(sum, rdm);
            
            if (rdm <= sum) {
                if(k.day_num<=0||k.all_num<=0){
                    //没库存或当天名额已经没有
                    let record_sql = `INSERT INTO draw_record (user_id, draw_id, prize_name, draw_time) VALUES ('${id}', '-1','谢谢参与', '${Date.now()}')`;
                    let record_result = await execute(record_sql).then(data=>data);

                    let user_sql =`UPDATE user SET draw_num = draw_num-1 WHERE id = '${id}'`;
                    let user_result =  await execute(user_sql).then(data=>data);
                    return {id: -1, name:"谢谢参与"};
                   
                }else{
                    //中奖
                    let stock_sql = `UPDATE prize SET day_num = day_num-1, all_num=all_num-1 WHERE id = '${k.id}'`;
                    let record_sql = `INSERT INTO draw_record (user_id, draw_id, prize_name, draw_time) VALUES ('${id}', '${k.id}','${k.name}', '${Date.now()}')`;
                    // let 
                    let result = await execute(stock_sql).then(data=>data);
                    let record_result = await execute(record_sql).then(data=>data);
                    
                    let user_sql='';
                    if(k.big_prize==0){
                        //不是大奖
                        user_sql =`UPDATE user SET draw_num = draw_num-1 WHERE id = '${id}'`;
                    }else{
                        //是大奖
                        user_sql =`UPDATE user SET draw_num = draw_num-1, bingo='1' WHERE id = '${id}'`;
                    }
                    
                    let user_result =  await execute(user_sql).then(data=>data);
                    return {id:k.id,name:k.name};
                }
                
            }
        }
    }else{
        //已中过奖
        let record_sql = `INSERT INTO draw_record (user_id, draw_id, prize_name, draw_time) VALUES ('${id}', '-1','谢谢参与', '${Date.now()}')`;
        let record_result = await execute(record_sql).then(data=>data);

        let user_sql =`UPDATE user SET draw_num = draw_num-1 WHERE id = '${id}'`;
        let user_result =  await execute(user_sql).then(data=>data);
        return {id: -1, name:"谢谢参与"};

    }



    

}

const addAddr = async({phone, address})=>{
    let sql =`UPDATE user SET address = '${address}' WHERE phone = '${phone}'`;
    return await execute(sql).then(data => data);
}
module.exports = {
    signup,
    getUserInfo,
    draw,
    addAddr
};