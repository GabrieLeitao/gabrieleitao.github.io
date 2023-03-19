document.addEventListener("DOMContentLoaded", function(){
    const votes = {};

    const nav = document.querySelector("#nav-container");
    // sticky
    var observer = new IntersectionObserver(function(entries) {
        // no intersection with screen
        if(entries[0].intersectionRatio === 0) {
            nav.classList.add("nav-container-sticky");
        }
        // fully intersects with screen
        else if(entries[0].intersectionRatio === 1) {
            nav.classList.remove("nav-container-sticky");
        }
    }, { threshold: [0,1] });

    observer.observe(document.querySelector("#nav-container-bottom"));

    // scroll down hide
    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", () => {
        if (lastScrollY < window.scrollY && nav.className.includes("nav-container-sticky")) {
            nav.classList.add("nav-hidden");
        } else {
            nav.classList.remove("nav-hidden");
        }
        lastScrollY = window.scrollY;
    });

    // voting
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
        const initial = document.querySelector(".vote").style.backgroundColor

        item.onclick = function() {
            votes[item.parentNode.id] = item.innerText

            item.style.backgroundColor = "rgb(255, 200, 170, 1)";

            item.parentNode.querySelectorAll(".vote").forEach(other => {
                if (item != other) {
                    other.style.backgroundColor = initial
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