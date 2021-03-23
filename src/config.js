const Config = function () {
    switch (process.env.NODE_ENV) {
        case 'development':
            return {
                API_URL: "http://localhost:8080/api",
            };

        case 'production':
            return {
                API_URL: "http://15.236.140.17:8080/api",
            };

        default:
            return {
                API_URL: "http://localhost:8080/api",
            };
    }
};

module.exports = Config()