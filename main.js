const book = document.querySelector("#book");
const papers = document.querySelectorAll(".paper");

let currentLocation = 1;
let numOfPapers = papers.length;
let maxLocation = numOfPapers + 1;
let startX = 0;

// Swipe detection
book.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});

book.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;
    let diff = startX - endX;

    if (diff > 50) { // Swipe left (Next Page)
        goNextPage();
    } else if (diff < -50) { // Swipe right (Previous Page)
        goPrevPage();
    }
});

// Page turning functions
function goNextPage() {
    if (currentLocation < maxLocation) {
        let paper = papers[currentLocation - 1];
        paper.classList.add("flipped");
        paper.style.zIndex = currentLocation;
        currentLocation++;
    }
}

function goPrevPage() {
    if (currentLocation > 1) {
        currentLocation--;
        let paper = papers[currentLocation - 1];
        paper.classList.remove("flipped");
        paper.style.zIndex = numOfPapers - currentLocation;
    }
}
