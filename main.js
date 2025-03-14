// References to DOM Elements
const book = document.querySelector("#book");
const papers = document.querySelectorAll(".paper");

let currentLocation = 1;
let numOfPapers = papers.length;
let maxLocation = numOfPapers + 1;

let startX = 0;
let isDragging = false;
let moveX = 0;
let threshold = 10; // Minimum movement to trigger a page turn


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
function openBook() {
    book.style.transform = "translateX(50%)";
    prevBtn.style.transform = "translateX(-180px)";
    nextBtn.style.transform = "translateX(180px)";
}

function closeBook(isAtBeginning) {
    if(isAtBeginning) {
        book.style.transform = "translateX(0%)";
    } else {
        book.style.transform = "translateX(100%)";
    }
    
    prevBtn.style.transform = "translateX(0px)";
    nextBtn.style.transform = "translateX(0px)";
}

function goNextPage() {
    if(currentLocation < maxLocation) {
        switch(currentLocation) {
            case 1:
                openBook();
                paper1.classList.add("flipped");
                paper1.style.zIndex = 1;
                break;
            case 2:
                paper2.classList.add("flipped");
                paper2.style.zIndex = 2;
                break;
            case 3:
                paper3.classList.add("flipped");
                paper3.style.zIndex = 3;
                closeBook(false);
                break;
            default:
                throw new Error("unkown state");
        }
        currentLocation++;
    }
}

function goPrevPage() {
    if(currentLocation > 1) {
        switch(currentLocation) {
            case 2:
                closeBook(true);
                paper1.classList.remove("flipped");
                paper1.style.zIndex = 3;
                break;
            case 3:
                paper2.classList.remove("flipped");
                paper2.style.zIndex = 2;
                break;
            case 4:
                openBook();
                paper3.classList.remove("flipped");
                paper3.style.zIndex = 1;
                break;
            default:
                throw new Error("unkown state");
        }

        currentLocation--;
    }
}
