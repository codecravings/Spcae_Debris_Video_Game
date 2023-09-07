const player = document.getElementById("player");
const scoreValue = document.getElementById("score-value");

let score = 0;
let orientation = "normal"; // Initial orientation

// Set the initial position of the player
let playerX = window.innerWidth / 2 - 25; // Center horizontally
let playerY = window.innerHeight / 2 - 25; // Center vertically
player.style.left = playerX + "px";
player.style.top = playerY + "px";

// Function to move the player using w, a, s, d keys and set orientation
document.addEventListener("keydown", (event) => {
    const step = 10;
    switch (event.key) {
        case "w":
            playerY -= step;
            orientation = "normal";
            break;
        case "a":
            playerX -= step;
            orientation = "left";
            break;
        case "s":
            playerY += step;
            orientation = "upside-down";
            break;
        case "d":
            playerX += step;
            orientation = "right";
            break;
    }
    player.style.left = playerX + "px";
    player.style.top = playerY + "px";
    player.style.transform = `rotate(${getRotationDeg(orientation)}deg)`;

    // Check for collisions with random images
    const images = document.querySelectorAll("images/obj.png");
    images.forEach((image) => {
        if (isColliding(player, image)) {
            collectImage(image);
        }
    });
});

// Function to handle image collection
function collectImage(image) {
    score += 8; // Increase score by 8 points
    scoreValue.textContent = score;
    document.body.removeChild(image);
}

// Function to create random images
function createRandomImage() {
    const image = new Image();
    image.src = "images/obj.png";
    image.className = "random-image"; // Add a class for easy selection
    image.style.position = "absolute";
    image.style.width = "50px";
    image.style.height = "50px";
    image.style.left = Math.random() * (window.innerWidth - 50) + "px";
    image.style.top = Math.random() * (window.innerHeight - 50) + "px";
    document.body.appendChild(image);
}

// Create random images every 5 seconds
setInterval(createRandomImage, 5000);

// Function to get rotation degrees based on orientation
function getRotationDeg(orientation) {
    switch (orientation) {
        case "left":
            return -90;
        case "upside-down":
            return 180;
        case "right":
            return 90;
        default:
            return 0; // "normal"
    }
}

// Function to check for collision between two elements
function isColliding(element1, element2) {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();
    return (
        rect1.left < rect2.right &&
        rect1.right > rect2.left &&
        rect1.top < rect2.bottom &&
        rect1.bottom > rect2.top
    );
}
