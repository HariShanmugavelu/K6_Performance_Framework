const commonsData = {
    generalData: {
        websocketEndpoint: __ENV.websocketEndpoint, //"ws://echo.websocket.org",
        params: __ENV.params, // { "tags": { "my_tag": "hello" } };
        users: __ENV.numberOfUsers, // 1,
        requestsPerSecond: __ENV.requestsPerSecond, // 10,
        loadDuration: __ENV.loadDuration, // 30,
        }
    }

    module.exports = { commonsData };
