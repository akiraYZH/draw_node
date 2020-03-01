
//匹配日常参数, 只包含大小写字母, 数字, "_"
const regNormal=(target)=>{
    let res = /^\w+$/.test(target);
    
    return res;
}

//匹配邮箱
const regEmail=(target)=>{
    return /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(target);
}

//匹配手机
const regPhone=(target)=>{
    return /^1[3456789]\d{9}$/.test(target);
}

//匹配真实姓名, 包含中文
const regChinese=(target)=>{
    return /^([\u4e00-\u9fa5]{1,20}|[a-zA-Z\.\s]{1,20})$/.test(target);
}

const regNumber=(target)=>{
    return /^\d+$/.test(target);
}
const regBoolean=(target)=>{
    return /^\d+$/.test(target);
}
module.exports = {regNormal, regPhone, regEmail, regChinese, regNumber, regBoolean};