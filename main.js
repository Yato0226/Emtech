const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const book = document.querySelector("#book");

const paper1 = document.querySelector("#p1");
const paper2 = document.querySelector("#p2");
const paper3 = document.querySelector("#p3");
const paper4 = document.querySelector("#p4");
const paper5 = document.querySelector("#p5");
const paper6 = document.querySelector("#p6");
const paper7 = document.querySelector("#p7");
const paper8 = document.querySelector("#p8");
const paper9 = document.querySelector("#p9");
const paper10 = document.querySelector("#p10");
const paper11 = document.querySelector("#p11");
const paper12 = document.querySelector("#p12");
const paper13 = document.querySelector("#p13");
const paper14 = document.querySelector("#p14");
const paper15 = document.querySelector("#p15");

// Event Listener
prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);

// Business Logic
let currentLocation = 1;
let numOfPapers = 15;
let maxLocation = numOfPapers + 1;

function openBook() {
    book.style.transform = "translateX(50%)";
    prevBtn.style.transform = "translateX(-180px)";
    nextBtn.style.transform = "translateX(180px)";
}

function closeBook(isBeginning) {
    if(isBeginning) {
        book.style.transform = "translateX(0%)";
    } else {
        book.style.transform = "translateX(0%)";
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
                break;
            case 4:
                paper4.classList.add("flipped");
                paper4.style.zIndex = 4;
                break;
            case 5:
                paper5.classList.add("flipped");
                paper5.style.zIndex = 5;
                break;
            case 6:
                paper6.classList.add("flipped");
                paper6.style.zIndex = 6;
                break;
            case 7:
                paper7.classList.add("flipped");
                paper7.style.zIndex = 7;
                break;
            case 8:
                paper8.classList.add("flipped");
                paper8.style.zIndex = 8;
                break;
            case 9:
                paper9.classList.add("flipped");
                paper9.style.zIndex = 9;
                break;
            case 10:
                paper10.classList.add("flipped");
                paper10.style.zIndex = 10;
                break;
            case 11:
                paper11.classList.add("flipped");
                paper11.style.zIndex = 11;
                break;
            case 12:
                paper12.classList.add("flipped");
                paper12.style.zIndex = 12;
                break;
            case 13:
                paper13.classList.add("flipped");
                paper13.style.zIndex = 13;
                break;
            case 14:
                paper14.classList.add("flipped");
                paper14.style.zIndex = 14;
                break;
            case 15:
                paper15.classList.add("flipped");
                paper15.style.zIndex = 15;
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
                paper1.style.zIndex = 15;
                break;
            case 3:
                paper2.classList.remove("flipped");
                paper2.style.zIndex = 14;
                break;
            case 4:
                paper3.classList.remove("flipped");
                paper3.style.zIndex = 13;
                break;
            case 5:
                paper4.classList.remove("flipped");
                paper4.style.zIndex = 12;
                break;
            case 6:
                paper5.classList.remove("flipped");
                paper5.style.zIndex = 11;
                break;
            case 7:
                paper6.classList.remove("flipped");
                paper6.style.zIndex = 10;
                break;
            case 8:
                paper7.classList.remove("flipped");
                paper7.style.zIndex = 9;
                break;
            case 9:
                paper8.classList.remove("flipped");
                paper8.style.zIndex = 8;
                break;
            case 10:
                paper9.classList.remove("flipped");
                paper9.style.zIndex = 7;
                break;
            case 11:
                paper10.classList.remove("flipped");
                paper10.style.zIndex = 6;
                break;
            case 12:
                paper11.classList.remove("flipped");
                paper11.style.zIndex = 5;
                break;
            case 13:
                paper12.classList.remove("flipped");
                paper12.style.zIndex = 4;
                break;
            case 14:
                paper13.classList.remove("flipped");
                paper13.style.zIndex = 3;
                break;
            case 15:
                paper14.classList.remove("flipped");
                paper14.style.zIndex = 2;
                break;
            case 16:
                openBook();
                paper15.classList.remove("flipped");
                paper15.style.zIndex = 1;
                break;
            default:
                throw new Error("unkown state");
        }
        currentLocation--;
    }
}

// Drag/Swipe Functionality

book.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    book.style.transition = 'none'; // Disable transition during drag for direct control
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    currentX = e.clientX - startX;
    book.style.transform = `translateX(calc(50% + ${currentX}px))`; // Adjust book position based on drag
});

document.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    isDragging = false;
    book.style.transition = 'transform 0.5s ease-in-out'; // Re-enable transition for smooth animation

    if (currentX < -100) { // Swipe left for next page (adjust threshold as needed)
        goNextPage();
    } else if (currentX > 100) { // Swipe right for prev page (adjust threshold as needed)
        goPrevPage();
    } else {
        // If not enough swipe, return to original position
        if (currentLocation > 1 && currentLocation < maxLocation) { // Book is open
            openBook(); // Re-open to 50% if it was open
        } else if (currentLocation === 1) {
            closeBook(true); // Close to beginning
        } else if (currentLocation === maxLocation) {
            closeBook(false); // Close to end
        }
    }
    startX = 0;
    currentX = 0;
});

// Touch event listeners for mobile devices
book.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
    book.style.transition = 'none';
});

document.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX - startX;
    book.style.transform = `translateX(calc(50% + ${currentX}px))`;
});

document.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    isDragging = false;
    book.style.transition = 'transform 0.5s ease-in-out';

    if (currentX < -50) { // Swipe left for next page (adjust threshold for touch)
        goNextPage();
    } else if (currentX > 50) { // Swipe right for prev page (adjust threshold for touch)
        goPrevPage();
    } else {
        // If not enough swipe, return to original position
        if (currentLocation > 1 && currentLocation < maxLocation) {
            openBook();
        } else if (currentLocation === 1) {
            closeBook(true);
        } else if (currentLocation === maxLocation) {
            closeBook(false);
        }
    }
    startX = 0;
    currentX = 0;
});

// Prevent text selection during drag (optional but recommended)
book.addEventListener('dragstart', (e) => {
    e.preventDefault();
});