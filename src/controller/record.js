const execute = require('../utils/dbConnect');

const getRecordAll =async ()=>{
    let sql = `SELECT u.phone, r.prize_name, r.draw_time FROM user u INNER JOIN draw_record r ON u.id=r.user_id`;
    return await execute(sql).then(data=>data)
}

const getRecord = async ()=>{
    let sql = `SELECT u.phone, r.prize_name, r.draw_time FROM user u INNER JOIN draw_record r ON u.id=r.user_id WHERE draw_id <> '-1'`;
    return await execute(sql).then(data=>data)
}
module.exports={getRecordAll, getRecord}