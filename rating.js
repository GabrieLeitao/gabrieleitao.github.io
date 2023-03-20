document.addEventListener("DOMContentLoaded", function(){
    const rates = {};

    document.querySelectorAll(".rate").forEach(item => {
        // phrases
        item.onmouseover = function() {
            if (item.innerText == "1") {
                item.parentNode.querySelector("#bad").style.opacity = 1;
            }
            if (item.innerText == "5") {
                item.parentNode.querySelector("#good").style.opacity = 1;
            }
        };
        item.onmouseout = function() {
            if (item.innerText == "1") {
                item.parentNode.querySelector("#bad").style.opacity = 0;
            }
            if (item.innerText == "5") {
                item.parentNode.querySelector("#good").style.opacity = 0;
            }
        };

        // voting
        const initial = document.querySelector(".rate").style.backgroundColor;
        const initial2 = document.querySelector(".rate").style.border;

        item.onclick = function() {
            rates[item.parentNode.id] = item.innerText;

            item.style.backgroundColor = "rgb(255, 200, 170, 1)";
            item.style.border = "0.1rem solid rgb(180, 180, 180, 1)";

            item.parentNode.querySelectorAll(".rate").forEach(other => {
                if (item != other) {
                    other.style.backgroundColor = initial;
                    other.style.border = initial2;
                }
            });
        }
    });
    // download file
    const submitButton = document.getElementById('submit');
        submitButton.addEventListener('click', () => {
        // Convert the rates object to a string
        const ratesString = JSON.stringify(rates, null, 2);

        // Write the string to a local text file
        // const filename = 'rates.txt';
        // const file = new Blob([votesString], {type: 'text/plain'});
        // const a = document.createElement('a');
        // a.href = URL.createObjectURL(file);
        // a.download = filename;
        // a.click();
        // Send the votes data to the Google Sheets API using the Fetch API
        const spreadsheetId = '1wJhrvomWlAzffomaOZtSjhEsEinSHEilEwPv6-QchqU'; // replace with your spreadsheet ID
        const sheetName = 'Dados'; // replace with the name of your sheet
        const accessToken = '211301099311-lh66fs24bspsgbouupa3cleume5tjs7t.apps.googleusercontent.com'; // replace with your access token
        const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}:append?valueInputOption=RAW`;
        const requestData = {
            values: [[ratesString]]
        };

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
        .then(response => {
            if (response.ok) {
                console.log('Rates submitted successfully');
            } else {
                console.error('Failed to submit rates');
            }
        })
        .catch(error => {
            console.error('Failed to submit rates:', error);
        });
    });
});