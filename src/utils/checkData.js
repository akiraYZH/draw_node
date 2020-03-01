//是否是全部参数
//missing necessary:1
//wrong format:2
const {
    regNormal,
    regPhone,
    regEmail,
    regChinese,
    regNumber,
    regBoolean
} = require('../utils/regModule');

const extraCheck = (targetName,targetVal)=>{
    switch (targetName){
        case 'phone':
        case 'tel':
            return regPhone(targetVal);
        case 'mail':
        case 'email':
            return regEmail(targetVal);
        case 'real_name':
            return regChinese(targetVal);
        case "blog_id":
        case "stock":
        case "max_per_day":
        case "probability":
            return regNumber(targetVal);
        case 'prize_name':
        case 'content':
            return regNormal(targetVal);
        default:
            return true;
    }
    
}
//全部参数需要进行简单检测(必须填)
//指定某些参数需要进行特定检测(必须填)
const checkData = (req, ...targetArr) => {
    
    let dataObj = {};

    if (req.method === 'POST') {
        dataObj = req.body;
    } else if (req.method === 'GET') {
        dataObj = req.query;
    }

    for(k of targetArr){
        if (dataObj[k]==undefined||null) {
            // console.log(dataObj[k]);
            
            
            return {is_pass:false, msg:`缺少必填参数${k}`};
        }
    }

    

    for (k in dataObj){
        if(!extraCheck(k,dataObj[k])){
            return {is_pass:false, msg:`参数${k}格式错误`};
        } 
    }

    return {is_pass:true, msg:`格式正确`}

}

module.exports = checkData;