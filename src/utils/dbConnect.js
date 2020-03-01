const mysql = require('mysql');
const dbConfig = require('../config/dbConfig');


//根据配置开启一条MySQL链接
const connection = mysql.createConnection(dbConfig);

connection.connect();


const execute =(myQuery)=>{
    return new Promise((resolve, reject)=>{
        connection.query(myQuery,(err,data)=>{
            if(err){
                
                
                console.log(err);
                
                if (process.env.NODE_ENV === "dev") {
                    resolve({ affectedRows: 0, msg: err.sqlMessage });
                } else {
                    //写进日志()
                    resolve({ affectedRows: 0 });
                }
            }else{
                
                resolve(data);
                // console.log(data);
            }
        });
    });
    
}

   
// connection.end();

module.exports = execute;