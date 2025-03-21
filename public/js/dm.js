// Map functionality
const canvas = document.getElementById("gameMap");
const ctx = canvas.getContext("2d");

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const size = 50; // Grid size

    ctx.strokeStyle = "#888";
    for (let x = 0; x < canvas.width; x += size) {
        for (let y = 0; y < canvas.height; y += size) {
            ctx.strokeRect(x, y, size, size);
        }
    }
}

function toggleGrid() {
    drawGrid();
}

function clearMap() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Dice Rolling
function rollDice() {
    const diceValue = document.getElementById("dice").value;
    const result = Math.floor(Math.random() * diceValue) + 1;
    document.getElementById("diceResult").innerText = result;
}

// Encounter Generation
function generateEncounter() {
    alert("A new encounter has been generated!");
}

// Initiative Tracker
function startInitiative() {
    alert("Initiative order started!");
}

// Save Notes
function saveNotes() {
    const notes = document.getElementById("sessionNotes").value;
    localStorage.setItem("sessionNotes", notes);
    alert("Notes saved!");
}

// Load saved notes on page load
document.addEventListener("DOMContentLoaded", () => {
    const savedNotes = localStorage.getItem("sessionNotes");
    if (savedNotes) {
        document.getElementById("sessionNotes").value = savedNotes;
    }
});
