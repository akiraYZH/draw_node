const http = require('http');
const serverHandle =require('../app');
const resetDraw = require('../src/utils/resetDraw');


http.createServer(serverHandle).listen(8000);

//设置每天凌晨更新用户可抽取次数以及是否中奖状态
resetDraw();