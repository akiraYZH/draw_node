const crypto = require('crypto');
// ase-128-cbc 加密算法要求key和iv长度都为16
const key =  Buffer.from('9vApxLk5G3PAsJrM', 'utf8');
const iv = Buffer.from('FnJL7EDzjqWjcaY9', 'utf8');

const encrypt=(src, key, iv)=>{
    let cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
    let sign = cipher.update(src, 'utf8', 'hex')
    //final 是输出
    sign += cipher.final('hex');

    return sign;
}

const decrypt=(sign, key, iv)=>{
    let decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
    let src = decipher.update(sign, 'hex', 'utf8')
    src+=decipher.final('utf8');
    return src
}
module.exports = {encrypt, decrypt, key, iv}
