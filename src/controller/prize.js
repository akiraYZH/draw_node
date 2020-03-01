const path = require('path');
const writeFile = require('../utils/writeFile.js');
const execute = require('../utils/dbConnect');
const fs = require('fs');

const addPrize = async (data)=>{
    
    let img_name = data.img_name || data.prize_img.filename;
    let dir=path.join(__dirname, '../', 'static', 'img', '/', img_name);
    if(await writeFile(dir, img_name, data.prize_img.data).then(data=>data)){
        let sql = `INSERT INTO prize (name, path, all_num, day_num, probability, big_prize) VALUES ('${data.prize_name}','${dir}','${data.stock}','${data.max_per_day}','${data.probability}', '${data.big_prize}')`;
        return await execute(sql).then(data=>data)
        
        
    }else{
        return {affectedRows: 0};
    }
    
}

const updatePrize=async ({prize_id, prize_name, img_name, stock, max_per_day, probability, prize_img, big_prize, status})=>{
    
    let consult_sql = `SELECT * FROM prize WHERE id = '${prize_id}'`;
    let dbData =  await execute(consult_sql).then(data=>data);
    let _img_name = img_name||dbData[0].name;
    let dir=path.join(__dirname, '../', 'static', 'img', '/',_img_name);
    let dir_folder = path.join(__dirname, '../', 'static', 'img', '/');
    let sql = `UPDATE prize SET `
    let middleArr=[];
    let is_updated_img = false;
    
    if(status){
        middleArr.push(`status='${status}'`);
    }
    
    if(prize_name){
        middleArr.push(`name='${prize_name}'`);
    }
    if(big_prize){
        middleArr.push(`big_prize='${big_prize}'`);
    }
    if(stock){
        middleArr.push(`all_num='${stock}'`);
    }
    if(max_per_day){
        middleArr.push(`day_num='${max_per_day}'`);
    }
    if(probability){
        middleArr.push(`probability='${probability}'`);
    }
    if(img_name){
        
        let readRes = fs.readdirSync(dir_folder);
        // 发现路径下有重名的文件则跳出
        if(readRes.includes(img_name)){
            return Promise.resolve(()=>{
                return {affectedRows: 0};
            });
        }
        
        //修改服务器里面文件的名字
        fs.renameSync(dbData[0].path, dir_folder+img_name);
       

        middleArr.push(`path='${dir}'`);
        
    }
    if(prize_img){
        //改图片
        is_updated_img = await writeFile(dir_folder, _img_name, prize_img.data).then(data=>data)
    }
    if(middleArr.length==0&&is_updated_img){
        console.log(is_updated_img);
        
        
        return {affectedRows: 1};
    
    }

    sql =sql + middleArr.join(', ')+ ` WHERE id='${prize_id}'`

    console.log(sql);
    

    return await execute(sql).then(data=>data);
}


const getPrizeList = async ()=>{
    let sql = `SELECT * FROM prize WHERE status ='1'`;
    return await execute(sql).then(data=>data)
}
module.exports = {addPrize, updatePrize, getPrizeList};