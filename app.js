const _url = require('url');
const getPostData = require('./src/utils/getPostData');
const prizeRouter =require('./src/router/prize');
const userRouter =require('./src/router/user');
const recordRouter =require('./src/router/record');
const {SuccessModule, ErrorModule, notFoundModule, lackModule, notLoginModule} = require('./src/utils/resModels.js');


const serverHandle = async (req, res)=>{
    //设置response的格式
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin','*');
    
    
    
    
    const oUrl = _url.parse(req.url, true);
    //Path
    req.path = oUrl.pathname;
    //GET
    req.query = oUrl.query;
    //POST
    req.body = await getPostData(req).then(data=>data);

    // console.log(req.body);
    const prizeData = await prizeRouter(req, res);
    if(prizeData){
        res.end(JSON.stringify(prizeData));
        return;
    }
    
    const userData = await userRouter(req, res);
    if(userData){
        res.end(JSON.stringify(userData));
        return;
    }

    const recordData = await recordRouter(req, res);
    // console.log(recordData);
    
    if(recordData){
        res.end(JSON.stringify(recordData));
        return;
    }

    res.end(JSON.stringify(new ErrorModule()));
    return;

    
}

module.exports = serverHandle;