const {
    SuccessModule,
    ErrorModule,
    notFoundModule,
    lackModule,
    notLoginModule
} = require('../utils/resModels');
const multipart = require('../utils/multipart');
const checkData = require('../utils/checkData');
const {
    addPrize,
    updatePrize,
    getPrizeList
} = require('../controller/prize');

const prizeRouter = async (req, res) => {

    //增加奖品
    if (req.method == 'POST' && req.path == '/api/prize/add') {
        // console.log(req.body);
        // req.body = multipart(req);
        let result = checkData(req, 'prize_img', 'prize_name', 'stock', 'max_per_day', 'probability', 'big_prize');
        if (result.is_pass) {
            let data = await addPrize(req.body).then(data => data);
            if (data.affectedRows) {
                console.log(data);

                return Promise.resolve(new SuccessModule({
                    prize_id: data.insertId
                }));
            } else {
                return Promise.resolve(new ErrorModule());
            }


        } else {
            return Promise.resolve(new lackModule(result.msg));
        }
    }


    //修改奖品
    if (req.method == 'POST' && req.path == '/api/prize/update') {

        for (k in req.body) {
            if (req.body[k] == '') {
                delete req.body[k];
            }
        }
        // console.log(req.body);
        let result = checkData(req, 'prize_id');
        if (result.is_pass) {
            // console.log(req.body);

            let data = await updatePrize(req.body);

            // console.log(data);

            if (data.affectedRows) {
                return Promise.resolve(new SuccessModule());
            } else {
                return Promise.resolve(new ErrorModule('修改失败, 文件名或已经存在'));
            }


        } else {
            return Promise.resolve(new lackModule(result.msg));
        }
    }
    //获取奖品列表
    if (req.method == 'GET' && req.path == '/api/prize/getPrizeList') {

        let data = await getPrizeList().then(data => data);
        if (data.length) {
            // console.log(data);

            return Promise.resolve(new SuccessModule(data));
        } else {
            return Promise.resolve(new ErrorModule());
        }
    }

    return false;
}

module.exports = prizeRouter;