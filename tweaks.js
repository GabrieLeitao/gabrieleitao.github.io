document.addEventListener("DOMContentLoaded", function(){

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
});