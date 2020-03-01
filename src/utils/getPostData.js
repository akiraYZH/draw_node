const multipart = require('../utils/multipart');

const getPostData = (req) => {
    return new Promise((resolve, reject) => {
        if (req.method == 'POST') {

            // if(req.headers['content-type'].indexOf('multipart/form-data')!=-1){
            //     req.setEncoding('binary');
            // }
            let postData = Buffer.from('', 'utf8');

            req.on('data', chunk => {
                let buf = Buffer.from(chunk, 'utf8');
                postData = Buffer.concat([postData, buf]);

            });
            // console.log(_binary);
            req.on('end', () => {
                try {
                    let _postData=null;
                    if (req.headers['content-type'].indexOf('multipart/form-data') != -1) {
                        let _utf8 = postData.toString('utf8');
                        let _binary = postData.toString('binary');
                        _postData = multipart(_utf8);
                        _postData.prize_img.data = multipart(_binary).prize_img.data;
                    } else {
                        _postData = JSON.parse(postData.toString('utf8'));
                    }

                    // console.log(_postData);

                    resolve(_postData);
                } catch {
                    resolve({});
                }
            })

        } else {
            resolve({})
        }
    })
}

module.exports = getPostData;