const {
    SuccessModule,
    ErrorModule,
    notFoundModule,
    lackModule,
    notLoginModule
} = require('../utils/resModels');
const checkData = require('../utils/checkData');
const {
    signup,
    getUserInfo,
    draw,
    addAddr
} = require('../controller/user');

const {
    encrypt,
    decrypt,
    key,
    iv
} = require('../utils/encrypt');
const {
    _setCookie,
    _getCookie
} = require('../utils/cookieModule');

const userRouter = async (req, res) => {
    //注册 signup
    if (req.method == 'POST' && req.path == '/api/user/signup') {
        let result = checkData(req, 'phone');
        console.log(req.body);
        if (result.is_pass) {


            let data = await signup(req.body).then(data => data);
            console.log(data);
            if (data.affectedRows) {
                return Promise.resolve(new SuccessModule({
                    user_id: data.insertId
                }));
            } else {
                return Promise.resolve(new ErrorModule('注册失败: ' + data.msg));
            }


        } else {
            return Promise.resolve(new lackModule(result.msg));
        }
    }

    //登录 login
    if (req.method == 'POST' && req.path == '/api/user/login') {
        let result = checkData(req, 'phone');

        if (result.is_pass) {

            let data = await getUserInfo(req.body).then(data => data);

            if (data.length) {
                _setCookie(res, `signed=${encrypt(data[0].phone, key, iv)}`);

                return Promise.resolve(new SuccessModule());
            } else {
                return Promise.resolve(new ErrorModule('用户不存在'));
            }



        } else {
            return Promise.resolve(new lackModule(result.msg));
        }
    }
    //抽奖
    if (req.method == 'GET' && req.path == '/api/user/draw') {
        if (_getCookie(req, 'signed')) {
            req.query.phone = decrypt(_getCookie(req, 'signed'), key, iv);
            // console.log(req.query.phone);

            let result = checkData(req, 'phone');

            if (result.is_pass) {

                let userInfo = await getUserInfo(req.query).then(data => data);

                if (userInfo.length) {
                    //已登录状态
                    // console.log(userInfo);
                    
                    if(userInfo[0].draw_num){
                        //还有剩余次数
                        let data = await draw(userInfo[0]);
                        console.log(data);
                        
                        return Promise.resolve(new SuccessModule(data));
                        
                    }else{
                        return Promise.resolve(new ErrorModule('当天次数已用完'));
                    }
                    

                    
                } else {
                    return Promise.resolve(new notLoginModule());
                }



            } else {
                return Promise.resolve(new ErrorModule('非法操作'));
            }
        } else {
            return Promise.resolve(new notLoginModule());
        }

    }


    //增加地址
    if (req.method == 'POST' && req.path == '/api/user/add_address') {
        if (_getCookie(req, 'signed')) {
            req.body.phone = decrypt(_getCookie(req, 'signed'), key, iv);
            // console.log(req.query.phone);

            let result = checkData(req, 'phone', 'address');

            if (result.is_pass) {
                
                
                let userInfo = await getUserInfo(req.body).then(data => data);
                
                if (userInfo.length) {
                    //已登录状态
                    
                    
                    
                    if(!userInfo[0].address){
                        //还有剩余次数
                        // let data = await draw(userInfo[0]);
                        let data = await addAddr(req.body)
                        console.log(data);
                        if(data.changedRows){
                            return Promise.resolve(new SuccessModule());
                        }else{
                            return Promise.resolve(new ErrorModule());
                        }
                        
                        
                        
                    }else{
                        
                        return Promise.resolve(new ErrorModule('地址已存在'));
                    }
                    

                    
                } else {
                    return Promise.resolve(new notLoginModule());
                }



            } else {
                return Promise.resolve(new ErrorModule('非法操作'));
            }
        } else {
            return Promise.resolve(new notLoginModule());
        }
    }
    return false;
}

module.exports = userRouter;