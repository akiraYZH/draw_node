

class checkDataModule{
    constructor(data,msg,code){
        if(typeof data ==='string' && typeof msg !='string'){
            [data,msg]=[msg,data];
        }else if(typeof data ==='string' && typeof msg=== 'string'){
            msg = data;
            data = [];
        }
        // console.log(data, this.data);
        
        this.code= code;
        this.msg=msg;
        this.data=data;
    }
}

class SuccessModule extends checkDataModule{
    constructor(data, msg='成功操作'){
        super(data, msg, 1);
    }
}

class ErrorModule extends checkDataModule{
    constructor(data, msg='操作错误'){
        super(data, msg, 0);
    }
}

class notFoundModule extends checkDataModule{
    constructor(data, msg='请求方式不对或者接口地址不正确'){
        super(data, msg, -1);
    }
}

class lackModule extends checkDataModule{
    constructor(data, msg='缺少必填参数'){
        super(data, msg, -2);
    }
}

class notLoginModule extends checkDataModule{
    constructor(data, msg='请登录后再进行操作'){
        super(data, msg,-3);
    }
}

module.exports={SuccessModule, ErrorModule, notFoundModule, lackModule, notLoginModule}