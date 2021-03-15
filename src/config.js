const Config = function(){
    switch(process.env.NODE_ENV){
        case 'development':
            return {
                API_AUTH_URL : "http://localhost:8080/api/auth/",
                API_APP_URL : "http://localhost:8080/api/app/"
            };

        case 'production':
            return {
                API_AUTH_URL : "http://15.236.140.17:8080/api/auth/",
                API_APP_URL : "http://15.236.140.17:8080/api/app/"
            };

        default:
            return {
                API_AUTH_URL : "http://localhost:8080/api/auth/",
                API_APP_URL : "http://localhost:8080/api/app/"
            };
    }
};

module.exports = Config()