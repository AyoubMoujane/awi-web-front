const Config = function(){
    switch(process.env.NODE_ENV){
        case 'development':
            return {
                API_URL : "http://localhost:8080/api/auth/",
            };

        case 'production':
            return {
                API_URL : "http://15.236.140.17:8080/api/auth/",
            };

        default:
            return {
                API_URL : "http://localhost:8080/api/auth/",
            };
    }
};

module.exports = Config()