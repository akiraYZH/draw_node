const querystring = require('querystring');

const _setCookie = (res, val, day = 1) => {
    res.setHeader('Set-Cookie', `${val};HttpOnly;Path=/;Max-Age=${60*60*24}`);
}

const _getCookie = (req, key) => {
    const cookieObj = {};

    // console.log(req.headers.cookie);
    
    if (req.headers.cookie) {
        req.headers.cookie.split('; ').forEach(item => {
            const tempData = item.split('=');
            cookieObj[tempData[0].trim()] = tempData[1];
        })
        // console.log(cookieObj[key]);

        if (cookieObj[key]) {
            return cookieObj[key]
        } else {
            return false;
        }
    }else{
        return false;
    }

}

module.exports = {
    _setCookie,
    _getCookie
}