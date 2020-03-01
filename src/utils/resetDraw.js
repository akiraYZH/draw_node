const schedule = require('node-schedule');
const execute = require('../utils/dbConnect');

const resetDraw = () => {
    //每分钟的第30秒定时执行一次:
    
    
    schedule.scheduleJob('0 0 0 * * *', async () => {
        let sql = `UPDATE user SET draw_num='10', bingo='0'`;
        let data = await execute(sql).then(data=>data);
        console.log(data);
    });
}
module.exports =resetDraw;