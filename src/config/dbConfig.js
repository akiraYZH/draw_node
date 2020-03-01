let dbConfig = {
    host:'localhost',
    port:8889,
    user:'root',
    password:'root',
    database:'027draw'
};


switch (process.env.NODE_ENV){
    case 'test':
        dbConfig = {
            host:'localhost',
            port:8890,
            user:'test',
            password:'test',
            database:'027draw'
        }
        break;
    case 'pro':
        dbConfig = {
            host:'localhost',
            port:8889,
            user:'root',
            password:'root',
            database:'027draw'
        }
        break;
}

module.exports = dbConfig;
