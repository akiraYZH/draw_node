// console.log(arr);
const fs = require('fs');
const multipart = (rawData)=>{
    
    let arr = rawData.split('------WebKitFormBoundary');
    let data = {};
    arr.shift();
    arr.pop();
    arr.forEach(item => {
        // console.log(item.substring(item.indexOf('name="')+6, item.indexOf('"', item.indexOf('"', )+1)));
        let key = item.substring(item.indexOf('name="') + 6, item.indexOf('"', item.indexOf('"', ) + 1));
        let content = item.substring(item.indexOf('; ') + 2);
        // console.log(content);

        if (content.indexOf('image') != -1) {
            //is image
            let img_obj = {};
            let str1 = content.split('; ')[1];
            img_obj.filename = str1.substring(str1.indexOf('"') + 1, str1.indexOf('"', str1.indexOf('"', ) + 1));

            let str2 = '';
            str2 = content.split('\r\n\r\n')[1];
            // str2='\r\n'+str2;
            // str2 = str2.substring(0, str2.indexOf('\r\n',str2.indexOf('\r\n')+1));
            
            img_obj.data = str2;
            // console.log(content.substring( content.indexOf('"')+1 ,content.indexOf('"', content.indexOf('"', )+1)));

            data[key] = img_obj;
        } else {
            //is not image
            let str = content.split('\r\n\r\n')[1]

            data[key] = str.substring(0, str.indexOf('\r\n'));
        }
        // data[key]=

    })
    
    // console.log(data);

    return data;
}


module.exports = multipart;