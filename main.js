// References to DOM Elements
const book = document.querySelector("#book");
const papers = document.querySelectorAll(".paper");

let currentLocation = 1;
let numOfPapers = papers.length;
let maxLocation = numOfPapers + 1;

let startX = 0;
let isDragging = false;
let moveX = 0;
let threshold = 50; // Minimum movement to trigger a page turn

let currentX = 0;
let translateX = 0;
let currentPage = 0;
const totalPages = papers.length;

// Mouse Drag Events (PC)
book.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
});

book.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    moveX = e.clientX - startX;
});

book.addEventListener("mouseup", () => {
    if (!isDragging) return;
    isDragging = false;
    handleSwipe(moveX);
});

// Touch Events (Mobile)
book.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});

book.addEventListener("touchmove", (e) => {
    moveX = e.touches[0].clientX - startX;
});

book.addEventListener("touchend", () => {
    handleSwipe(moveX);
});

// Handles swipe for both mobile and PC
function handleSwipe(diffX) {
    if (diffX < -threshold) {
        goNextPage(); // Swipe left
    } else if (diffX > threshold) {
        goPrevPage(); // Swipe right
    }
}

// Page turning functions (Keep your existing logic)
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



function setTransform(value) {
    book.style.transition = "transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)";
    book.style.transform = `translateX(${value}px)`;
}

book.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
    book.style.transition = "none";
});

book.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    currentX = e.clientX;
    translateX = currentX - startX;
    setTransform(translateX);
});

book.addEventListener("mouseup", () => {
    isDragging = false;
    if (Math.abs(translateX) > threshold) {
        if (translateX < 0 && currentPage < totalPages - 1) {
            currentPage++;
        } else if (translateX > 0 && currentPage > 0) {
            currentPage--;
        }
    }
    updatePage();
});

book.addEventListener("mouseleave", () => {
    isDragging = false;
    updatePage();
});

function updatePage() {
    let newTransform = -currentPage * 350; // Assuming each page width is 350px
    setTransform(newTransform);
}

