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

// var proxy_url = "http://localhost:5000/predict";
// fetch(proxy_url, {
//     method: 'post',
//     mode: 'no-cors',
//     body: JSON.stringify({text: selected_text}),
//     headers: {
//         "Content-type": "application/json; charset=UTF-8",
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Credentials": true
//     }
// }).then(function (response) {
//     console.log(response);
//     return response.json();
// }).then(function (output) {
//     console.log(output);
//     document.getElementById("legend-card").style.visibility = "visible";
//     document.getElementById("legend-card").style.display = "block";
//     document.getElementById("res-block").innerHTML = "";
//     output.result.bpe_strings[0] = "";
//     output.result.bpe_strings.forEach(function (value, i) {
//
//         var topk = output.result.real_topk[i][0];
//         var color = "#E5B0FF";
//         if (topk >= 0 && topk <= 10) {
//             color = "#ADFF80";
//         } else if (topk > 10 && topk <= 100) {
//             color = "#FFEA80";
//         } else if (topk > 100 && topk <= 1000) {
//             color = "#FF9280";
//         }
//
//         value = value.replace("Ġ", "");
//         span_block = `<span style="background-color: ${color};">${value} </span>`;
//         document.getElementById("res-block").innerHTML += span_block
//         document.getElementById("res-block").innerHTML.replace("\xc2\xa0", " ")
//     });
// });