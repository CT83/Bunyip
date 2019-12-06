$(document).ready(function () {


    var selected_text;

    chrome.tabs.getSelected(null, function (tab) {
        chrome.tabs.executeScript({
            code: "window.getSelection().toString();"
        }, function (selection) {
            if (selection == null) {
                return;
            }
            selected_text = selection[0];
            selected_text = selected_text.replace(/[^a-zA-Z0-9 ]/g, "");

            if (selected_text.length > 0) {
                document.getElementById("res-card").style.visibility = "visible";
                document.getElementById("res-card").style.display = "block";
                document.getElementById("info-card").remove();

                var url = "https://huggingface.co/openai-detector/?" + selected_text;
                fetch(url)
                    .then((resp) => resp.json()) // Transform the data into json
                    .then(function (data) {
                        document.getElementById("fake-prob").innerHTML = data.fake_probability.toFixed(2);
                    });

                var proxy_url = "https://us-central1-bunyip.cloudfunctions.net/function-1";
                // var proxy_url = "http://localhost:5000/predict";
                fetch(proxy_url, {
                    method: 'POST',
                    body: JSON.stringify({text: selected_text}),
                }).then((resp) => resp.json()).then(function (output) {
                    console.log(output);

                    document.getElementById("legend-card").style.visibility = "visible";
                    document.getElementById("legend-card").style.display = "block";
                    document.getElementById("res-block").innerHTML = "";
                    output.result.bpe_strings[0] = "";
                    output.result.bpe_strings.forEach(function (value, i) {

                        var topk = output.result.real_topk[i][0];
                        var color = "#E5B0FF";
                        if (topk >= 0 && topk <= 10) {
                            color = "#ADFF80";
                        } else if (topk > 10 && topk <= 100) {
                            color = "#FFEA80";
                        } else if (topk > 100 && topk <= 1000) {
                            color = "#FF9280";
                        }

                        value = value.replace("Ġ", "");
                        span_block = `<span style="background-color: ${color};">${value} </span>`;
                        document.getElementById("res-block").innerHTML += span_block
                        document.getElementById("res-block").innerHTML.replace("\xc2\xa0", " ")
                    });

                });

            } else {

            }
        });

    });

    $(".dropdown-button").dropdown();
    $('ul.tabs').tabs();

}); // Doc ready end

    

