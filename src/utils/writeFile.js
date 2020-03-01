const fs = require('fs');
const path = require('path');
// const path = require('path');

const existDir = (dirPath) => {
    fs.stat(dirPath, (err, status) => {
        return status;
    })
}

const _mkdir = (dirPath) => {
    return new Promise((resolve) => {
        fs.mkdir(dirPath, {
            recursive: true
        }, () => {
            resolve(true);
        })
    })
}
// const _log = async (content, type='log')=>{
// 	const logData = baseLog(content, type);
// 	if(!existDir(logData.dirPath)){
// 		await _mkdir(logData.dirPath);
// 	}
// 	// console.log(logData);
// 	fs.createWriteStream(logData.fileName, {flags:'a'}).write(logData.content+'\n\n');
// }

const writeFile = async (dir,fileName,content) => {
    if (!existDir(dir)) {
        await _mkdir(dir);
    }
    return new Promise((resolve, reject)=>{
        console.log(dir+fileName);
        
        fs.writeFile(dir+fileName, content, 'binary', (err) => {
            if (err) {
                reject(false);
            }else{
                resolve(true)
            }

        });
    })
    

}

module.exports = writeFile;