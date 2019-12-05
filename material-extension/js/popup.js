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


                var input = {"text": selected_text};
                Algorithmia.client("simZZr/+14xD1noBWW+qmocVRI31")
                    .algo("ct83/bunyip_gpt_detector/1.0.0?timeout=300") // timeout is optional
                    .pipe(input).then(function (output) {
                    console.log(output);
                    console.log(output.result.request.result);
                    document.getElementById("legend-card").style.visibility = "visible";
                    document.getElementById("legend-card").style.display = "block";
                    document.getElementById("res-block").innerHTML = "";
                    output.result.request.result.bpe_strings[0] = "";
                    output.result.request.result.bpe_strings.forEach(function (value, i) {

                        var topk = output.result.request.result.real_topk[i][0];
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
                });


                // fetch('http://34.206.181.247:49153/api/analyze', {
                //
                //
                //     method: "POST",
                //     body: JSON.stringify({
                //         project: "gpt-2-small",
                //         text: selected_text
                //     }),
                //     headers: {
                //         "Content-type": "application/json; charset=UTF-8"
                //     }
                // })

            } else {

            }
        });

    });


    /************************/
// MATERIALIZE CSS

    $(".dropdown-button").dropdown();
    $('ul.tabs').tabs();

}); // Doc ready end

    

