class Player {
    constructor(name, avatar) {
        this.name = name;
        this.avatar = avatar;
    }
}

class AvatarPlacement {
    constructor(mapId) {
        this.mapElement = document.getElementById(mapId);
        this.selectedPlayer = null; // Store the selected player
        this.selectedAvatar = null; // Store the selected avatar
        this.offsetX = 0; // Offset for dragging
        this.offsetY = 0; // Offset for dragging
        this.placementMode = false; // Toggle for placement mode


        // Bind map click event
        this.mapElement.addEventListener("click", (event) => this.handleMapClick(event));

        // Bind mousemove event
        document.addEventListener("mousemove", (event) => this.handleMouseMove(event));

        // Bind mouseup event
        document.addEventListener("mouseup", () => this.handleMouseUp());
    }

    enablePlacementMode() {
        if (this.selectedPlayer) {
            this.placementMode = true;
            alert("Player placement is enabled. Click inside the battle map.");
            document.querySelector(".dragon-btn").classList.add("active");
            this.mapElement.classList.add("placing");
        } else {
            alert("Please select a player first.");
        }
    }

    disablePlacementMode() {
        this.placementMode = false;
        alert("Player placement is disabled.");
        document.querySelector(".dragon-btn").classList.remove("active");
        this.mapElement.classList.remove("placing");
    }

    selectPlayer(player) {
        this.selectedPlayer = player;    
    }

    handleMapClick(event) {
        if (!this.placementMode || !this.selectedPlayer) return; // Only proceed if in placement mode and a player is selected

        const mapRect = this.mapElement.getBoundingClientRect();
        const x = event.clientX - mapRect.left;
        const y = event.clientY - mapRect.top;

        if (this.selectedAvatar) {
            this.selectedAvatar.style.left = `${x}px`;
            this.selectedAvatar.style.top = `${y}px`;
            this.selectedAvatar.classList.remove("floating"); // Stop floating effect
            this.selectedAvatar = null; // Clear selected avatar
            return;
        }

        const avatar = document.createElement("img");
        avatar.src = this.selectedPlayer.avatar; // Use the selected player's avatar
        avatar.classList.add("avatar-marker");

        avatar.onload = () => {
            const avatarWidth = avatar.width;
            const avatarHeight = avatar.height;

            avatar.style.left = `${x - avatarWidth / 2}px`;
            avatar.style.top = `${y - avatarHeight / 2}px`;
    };

    avatar.addEventListener("mousedown", (e) => this.handleMouseDown(e, avatar));

    this.mapElement.appendChild(avatar); // Append the avatar to the map
    this.disablePlacementMode(); // Disable placement mode after placing an avatar
    }

    handleMouseDown(event, avatar) {
        event.stopPropagation(); // Prevent triggering map click
        this.selectedAvatar = avatar;
        avatar.classList.add("floating"); // Add floating effect

        this.offsetX = event.clientX - avatar.getBoundingClientRect().left;
        this.offsetY = event.clientY - avatar.getBoundingClientRect().top;
    }

    handleMouseMove(event) {
        if (!this.selectedAvatar) return; // Only proceed if an avatar is selected

        const mapRect = this.mapElement.getBoundingClientRect();
        let x = event.clientX - mapRect.left - this.offsetX;
        let y = event.clientY - mapRect.top - this.offsetY;

        // Keep inside boundaries
        x = Math.max(0, Math.min(x, mapRect.width));
        y = Math.max(0, Math.min(y, mapRect.height));

        this.selectedAvatar.style.left = `${x}px`;
        this.selectedAvatar.style.top = `${y}px`;
    }

    handleMouseUp() {
        if (this.selectedAvatar) {
            this.selectedAvatar.classList.remove("floating"); // Stop floating effect
            this.selectedAvatar = null; // Clear selected avatar
        }
    }
};

// Dragon Placement Button Toggle
let avatarPlacement = null;

function toggleDragonPlacement() {
    if (!avatarPlacement) {
        avatarPlacement = new AvatarPlacement("battleMap");
    }

    if (avatarPlacement.placementMode) {
        avatarPlacement.disablePlacementMode();
    } else {
        avatarPlacement.enablePlacementMode();
    }
}

// Example of player selection
function selectPlayerForPlacement(player) {
    avatarPlacement.selectPlayer(player);
    console.log(`Selected player: ${player.name}`);
}

class PlayerList {
    constructor(players, listId, avatarPlacement) {
        this.players = players; // Array of Player objects
        this.listElement = document.getElementById(listId); // The list element in the DOM
        this.avatarPlacement = avatarPlacement; // Reference to the AvatarPlacement instance

        this.renderPlayerList(); // Initial render of the player list
    }

    renderPlayerList() {
        this.listElement.innerHTML = ""; // Clear existing list

        const ul = document.createElement("ul");

        this.players.forEach(player => {
            const li = document.createElement("li");
            li.style.display = "flex";
            li.style.alignItems = "center";
            li.style.padding = "5px";

            const img = document.createElement("img");
            img.src = player.avatar;
            img.style.width = "40px";
            img.style.height = "40px";
            img.style.borderRadius = "50%";
            img.style.marginRight = "10px";

            const name = document.createElement("span");
            name.textContent = player.name;
            name.style.color = "#fff"; // White text color
            name.style.fontSize = "18px"; // Font size

            li.appendChild(img);
            li.appendChild(name);

            li.addEventListener("click", () => this.selectedPlayer(player)); // Select player on click

            ul.appendChild(li);
        });

        this.listElement.appendChild(ul); // Append the list to the DOM
    }

    selectPlayer(player) {
        this.avatarPlacement.selectPlayer(player); // Set the selected player in AvatarPlacement
        console.log(`Selected player: ${player.name}`); // Log the selected player
    }
}

class App {
    constructor() {
        // Example Players
        this.players = [
            new Player("Promethean", "../Images/Promethean.jpg"),
            new Player("Player 1", "https://example.com/avatar1.png"),
            new Player("Player 2", "https://example.com/avatar2.png"),
            new Player("Player 3", "https://example.com/avatar3.png")
        ];

        // Initialize AvatarPlacement with the battle map
        this.avatarPlacement = new AvatarPlacement("battleMap");

        new PlayerList(this.players, "playerList", this.avatarPlacement); // Initialize PlayerList with the players and AvatarPlacement

        // Enable placement mode (trigger this in the UI somehow, like a button)
        // Example usage:
        // this.avatarPlacement.enablePlacementMode();
    }
}

// Initialize the app
document.addEventListener("DOMContentLoaded", () => {
    const app = new App();
});
