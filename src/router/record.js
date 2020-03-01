const {
    SuccessModule,
    ErrorModule,
    notFoundModule,
    lackModule,
    notLoginModule
} = require('../utils/resModels');
// const multipart = require('../utils/multipart');
// const checkData = require('../utils/checkData');
const {getRecordAll, getRecord} = require('../controller/record');

const recordRouter = async (req, res) => {

    //获取全部记录
    if (req.method == 'GET' && req.path == '/api/record/getRecordAll') {

        let data = await getRecordAll().then(data => data);
        if (data.length) {
            // console.log(data);

            return Promise.resolve(new SuccessModule(data));
        } else {
            return Promise.resolve(new ErrorModule());
        }
    }
    
    //获取非谢谢惠顾的记录
    if (req.method == 'GET' && req.path == '/api/record/getRecord') {
        console.log(123);
        
        let data = await getRecord().then(data => data);
        console.log(data);
        
        if (data.length) {
            // console.log(data);

            return Promise.resolve(new SuccessModule(data));
        } else {
            return Promise.resolve(new ErrorModule());
        }
    }

    return false;
}

module.exports = recordRouter;