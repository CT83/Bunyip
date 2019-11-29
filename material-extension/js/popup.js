$(document).ready(function () {


    var selected_text;

    chrome.tabs.getSelected(null, function (tab) {
        chrome.tabs.executeScript({
            code: "window.getSelection().toString();"
        }, function (selection) {
            selected_text = selection[0];

            if (selected_text.length > 0) {
                document.getElementById("res-card").style.visibility = "visible";
                document.getElementById("info-card").remove();

                fetch('http://localhost:5001/api/analyze', {
                    method: "POST",
                    body: JSON.stringify({
                        project: "gpt-2-small",
                        text: selected_text
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                })
                    .then(response => response.json())
                    .then(function (data) {
                        console.log(data);
                        document.getElementById("res-block").innerHTML = "";
                        data.request.result.bpe_strings[0] = "";
                        data.request.result.bpe_strings.forEach(function (value, i) {

                            var topk = data.request.result.real_topk[i][0];
                            var color = "#E5B0FF";
                            if (topk >= 0 && topk <= 10) {
                                color = "#ADFF80";
                            } else if (topk > 10 && topk <= 100) {
                                color = "#FFEA80";
                            } else if (topk > 100 && topk <= 1000) {
                                color = "#FF9280";
                            }


                            span_block = `<span style="background-color: ${color};">${value} </span>`;
                            document.getElementById("res-block").innerHTML += span_block
                            document.getElementById("res-block").innerHTML.replace("\xc2\xa0", " ")
                        });

                    })
            } else {

            }
        });

    });


    /************************/
// MATERIALIZE CSS

    $(".dropdown-button").dropdown();
    $('ul.tabs').tabs();

}); // Doc ready end

    

