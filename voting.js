document.addEventListener("DOMContentLoaded", function(){
    const votes = {};

    document.querySelectorAll(".vote").forEach(item => {
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
        const initial = document.querySelector(".vote").style.backgroundColor;
        const initial2 = document.querySelector(".vote").style.border;

        item.onclick = function() {
            votes[item.parentNode.id] = item.innerText;

            item.style.backgroundColor = "rgb(255, 200, 170, 1)";
            item.style.border = "0.1rem solid rgb(180, 180, 180, 1)";

            item.parentNode.querySelectorAll(".vote").forEach(other => {
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
        // Convert the votes object to a string
        const votesString = JSON.stringify(votes, null, 2);

        // Write the string to a local text file
        const filename = 'votes.txt';
        const file = new Blob([votesString], {type: 'text/plain'});
        const a = document.createElement('a');
        a.href = URL.createObjectURL(file);
        a.download = filename;
        a.click();
    });
});