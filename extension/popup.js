var selected_text;
chrome.tabs.getSelected(null, function (tab) {
    chrome.tabs.executeScript({
        code: "window.getSelection().toString();"
    }, function (selection) {
        selected_text = selection[0];
        document.getElementById("selected-text").innerHTML = selected_text;
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
                document.getElementById("verdict-text").innerHTML = data.result.percent+"%";
            })
    });

});
