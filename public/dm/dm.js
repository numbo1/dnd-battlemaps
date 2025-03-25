// Example Players (Replace with real data later)
const examplePlayers = [
    { name: "John the Brave", avatar: "../Images/avatar1.png" },
    { name: "Elara the Mage", avatar: "../Images/avatar2.png" },
    { name: "Gorim the Barbarian", avatar: "../Images/avatar3.png" },
    { name: "Sylva the Rogue", avatar: "../Images/avatar4.png" }
];

// Fetch Example Players
function fetchPlayersFromDB() {
    const playerListDiv = document.getElementById("playerList");
    playerListDiv.innerHTML = "";

    const ul = document.createElement("ul");

    examplePlayers.forEach((player) => {
        const li = document.createElement("li");
        li.style.display = "flex";
        li.style.alignItems = "center";
        li.style.padding = "5px";

        const img = document.createElement("img");
        img.src = player.avatar || "../Images/default-avatar.png";
        img.style.width = "40px";
        img.style.height = "40px";
        img.style.borderRadius = "50%"; // Circular border for players
        img.style.marginRight = "10px";

        const name = document.createElement("span");
        name.textContent = player.name;
        name.style.color = "white";
        name.style.fontSize = "18px";

        li.appendChild(img);
        li.appendChild(name);
        ul.appendChild(li);
    });

    playerListDiv.appendChild(ul);
}

// Toggle Player Dropdown (Closes Monster Dropdown if open)
function togglePlayerDropdown() {
    const playerListDiv = document.getElementById("playerList");
    const monsterListDiv = document.getElementById("monsterList");

    if (playerListDiv.style.display === "block") {
        playerListDiv.style.display = "none";
    } else {
        playerListDiv.style.display = "block";
        fetchPlayersFromDB();
        monsterListDiv.style.display = "none"; // Close Monster dropdown
    }
}

// Example Monsters (Replace with real data later)
const exampleMonsters = [
    { name: "Imp", avatar: "../enemies/imp.png" },
    { name: "Skeleton", avatar: "../enemies/skeleton.png" },
    { name: "Rat", avatar: "../enemies/rat.png" },
    { name: "Mimic", avatar: "../enemies/mimic.png" }
];

// Fetch Example Monsters
function fetchMonstersFromDB() {
    const monsterListDiv = document.getElementById("monsterList");
    monsterListDiv.innerHTML = "";

    const ul = document.createElement("ul");

    exampleMonsters.forEach((monster) => {
        const li = document.createElement("li");
        li.style.display = "flex";
        li.style.alignItems = "center";
        li.style.padding = "5px";

        const img = document.createElement("img");
        img.src = monster.avatar || "Images/default-monster.png";
        img.style.width = "40px";
        img.style.height = "40px";
        img.style.borderRadius = "0"; // SQUARE border for monsters
        img.style.marginRight = "10px";

        const name = document.createElement("span");
        name.textContent = monster.name;
        name.style.color = "white";
        name.style.fontSize = "18px";

        li.appendChild(img);
        li.appendChild(name);
        ul.appendChild(li);
    });

    monsterListDiv.appendChild(ul);
}

// Toggle Monster Dropdown (Closes Player Dropdown if open)
function toggleMonsterDropdown() {
    const monsterListDiv = document.getElementById("monsterList");
    const playerListDiv = document.getElementById("playerList");

    if (monsterListDiv.style.display === "block") {
        monsterListDiv.style.display = "none";
    } else {
        monsterListDiv.style.display = "block";
        fetchMonstersFromDB();
        playerListDiv.style.display = "none"; // Close Player dropdown
    }
}

let dragonPlacementMode = false;
let selectedDragon = null;
let offsetX = 0, offsetY = 0;

function toggleDragonPlacement() {
    dragonPlacementMode = !dragonPlacementMode;
    const dragonButton = document.querySelector(".dragon-btn");
    const battleMap = document.getElementById("battleMap");

    if (dragonPlacementMode) {
        dragonButton.classList.add("active");
        battleMap.classList.add("placing");
        alert("Dragon placement enabled. Click inside the battle map.");
    } else {
        dragonButton.classList.remove("active");
        battleMap.classList.remove("placing");
        alert("Dragon placement canceled.");
    }
}

// Handle Map Click to Place or Drop Dragon
document.getElementById("battleMap").addEventListener("click", function (event) {
    const mapRect = this.getBoundingClientRect();
    const x = event.clientX - mapRect.left;
    const y = event.clientY - mapRect.top;

    // If moving an existing dragon, place it at the new location
    if (selectedDragon) {
        selectedDragon.style.left = `${x}px`;
        selectedDragon.style.top = `${y}px`;
        selectedDragon.classList.remove("floating"); // Stop floating effect
        selectedDragon = null;
        return;
    }

    // If in placement mode, add a new dragon and adjust its initial position
    if (dragonPlacementMode) {
        const dragon = document.createElement("img");
        dragon.src = "Images/pin.png";
        dragon.classList.add("dragon-marker");

        // Wait for image to load to get its dimensions correctly
        dragon.onload = function () {
            const dragonWidth = this.width;
            const dragonHeight = this.height;

            this.style.left = `${x - dragonWidth / 2}px`;
            this.style.top = `${y - dragonHeight / 2}px`;
        };

        // Click event to enable moving
        dragon.addEventListener("mousedown", function (e) {
            e.stopPropagation(); // Prevent triggering map click
            selectedDragon = this;
            this.classList.add("floating");

            // Calculate offset so the pin follows the cursor exactly
            offsetX = e.clientX - this.getBoundingClientRect().left;
            offsetY = e.clientY - this.getBoundingClientRect().top;
        });

        document.getElementById("battleMap").appendChild(dragon);
        dragonPlacementMode = false;
    }
});

// Make the selected dragon follow the cursor in real time
document.addEventListener("mousemove", function (event) {
    if (selectedDragon) {
        const mapRect = document.getElementById("battleMap").getBoundingClientRect();
        let x = event.clientX - mapRect.left - offsetX;
        let y = event.clientY - mapRect.top - offsetY;


        // Keep inside boundaries
        x = Math.max(0, Math.min(x, mapRect.width));
        y = Math.max(0, Math.min(y, mapRect.height));

        selectedDragon.style.left = `${x}px`;
        selectedDragon.style.top = `${y}px`;
    }
});

// Release the dragon on mouse up
document.addEventListener("mouseup", function () {
    if (selectedDragon) {
        selectedDragon.classList.remove("floating");
        selectedDragon = null;
    }
});

// Styling for the floating effect
const style = document.createElement("style");
style.innerHTML = `
    .dragon-marker {
        position: absolute;
        width: 50px;
        height: 50px;
        cursor: grab;
        transition: transform 0.05s ease-out;
    }
    
    .floating {
        opacity: 0.8;
        pointer-events: none;
        transform: scale(1.1);
    }
`;
document.head.appendChild(style);
