global.fetch = require("node-fetch");

var proxy_url = "http://localhost:5000/predict";
fetch(proxy_url, {
    method: 'post',
    mode: 'no-cors',
    body: JSON.stringify({text: " have been talking to many seniors about sih for tips and have collected some information to what to do what not to do and all so Tommmorow during i will tell about that also anything you have doubt or idea which you think will be useful tell tommorow during the call"}),
    headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
    }
}).then(function (response) {
    console.log(response);
    return response.json();
}).then(function (output) {
    console.log(output);

});
