class Player {
    constructor(name, avatar) {
        this.name = name;
        this.avatar = avatar;
    }
}

class AvatarPlacement {
    constructor(mapId) {
        this.mapElement = document.getElementById(mapId);
        this.selectedPlayer = null;
        this.selectedAvatar = null;
        this.offsetX = 0;
        this.offsetY = 0;
        this.placementMode = false;

        this.mapElement.addEventListener("click", (event) => this.handleMapClick(event));
        document.addEventListener("mousemove", (event) => this.handleMouseMove(event));
        document.addEventListener("mouseup", () => this.handleMouseUp());
    }

    enablePlacementMode() {
        if (this.selectedPlayer) {
            this.placementMode = true;
            alert("Player placement enabled. Click inside the battle map.");
            document.querySelector(".dragon-btn").classList.add("active");
            this.mapElement.classList.add("placing");
        } else {
            alert("Please select a player first.");
        }
    }

    disablePlacementMode() {
        this.placementMode = false;
        document.querySelector(".dragon-btn").classList.remove("active");
        this.mapElement.classList.remove("placing");
    }

    selectPlayer(player) {
        this.selectedPlayer = player;
    }

    handleMapClick(event) {
        if (!this.placementMode || !this.selectedPlayer) return;

        const mapRect = this.mapElement.getBoundingClientRect();
        const x = event.clientX - mapRect.left;
        const y = event.clientY - mapRect.top;

        if (this.selectedAvatar) {
            this.selectedAvatar.style.left = `${x}px`;
            this.selectedAvatar.style.top = `${y}px`;
            this.selectedAvatar.classList.remove("floating");
            this.selectedAvatar = null;
            return;
        }

        const avatar = document.createElement("img");
        avatar.src = this.selectedPlayer.avatar;
        avatar.classList.add("avatar-marker");

        avatar.onload = () => {
            avatar.style.left = `${x - avatar.width / 2}px`;
            avatar.style.top = `${y - avatar.height / 2}px`;
        };

        avatar.addEventListener("mousedown", (e) => this.handleMouseDown(e, avatar));
        this.mapElement.appendChild(avatar);
        this.disablePlacementMode();
    }

    handleMouseDown(event, avatar) {
        event.stopPropagation();
        this.selectedAvatar = avatar;
        avatar.classList.add("floating");

        this.offsetX = event.clientX - avatar.getBoundingClientRect().left;
        this.offsetY = event.clientY - avatar.getBoundingClientRect().top;
    }

    handleMouseMove(event) {
        if (!this.selectedAvatar) return;

        const mapRect = this.mapElement.getBoundingClientRect();
        let x = event.clientX - mapRect.left - this.offsetX;
        let y = event.clientY - mapRect.top - this.offsetY;

        x = Math.max(0, Math.min(x, mapRect.width));
        y = Math.max(0, Math.min(y, mapRect.height));

        this.selectedAvatar.style.left = `${x}px`;
        this.selectedAvatar.style.top = `${y}px`;
    }

    handleMouseUp() {
        if (this.selectedAvatar) {
            this.selectedAvatar.classList.remove("floating");
            this.selectedAvatar = null;
        }
    }
}

class PlayerList {
    constructor(players, listId, avatarPlacement) {
        this.players = players;
        this.listElement = document.getElementById(listId);
        this.avatarPlacement = avatarPlacement;
        this.renderPlayerList();
    }

    renderPlayerList() {
        this.listElement.innerHTML = "";
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
            name.style.color = "#fff";
            name.style.fontSize = "18px";

            li.appendChild(img);
            li.appendChild(name);
            li.addEventListener("click", () => this.selectPlayer(player));

            ul.appendChild(li);
        });

        this.listElement.appendChild(ul);
    }

    selectPlayer(player) {
        this.avatarPlacement.selectPlayer(player);
        console.log(`Selected player: ${player.name}`);
    }
}

class App {
    constructor() {
        this.players = [
            new Player("Promethean", "../Images/Promethean.jpg"),
            new Player("Elara the Mage", "../Images/avatar2.png"),
            new Player("Gorim the Barbarian", "../Images/avatar3.png"),
            new Player("Sylva the Rogue", "../Images/avatar4.png")
        ];

        this.avatarPlacement = new AvatarPlacement("battleMap");
        new PlayerList(this.players, "playerList", this.avatarPlacement);

        // Add event listeners for dropdown toggles
        document.querySelector(".player-btn").addEventListener("click", togglePlayerDropdown);
        document.querySelector(".monster-btn").addEventListener("click", toggleMonsterDropdown);
    }
}

// Ensure script runs after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    new App();
});

// Function to toggle the player list dropdown
function togglePlayerDropdown() {
    let playerList = document.getElementById("playerList");
    if (playerList) {
        playerList.style.display = (playerList.style.display === "none" || playerList.style.display === "") ? "block" : "none";
    } else {
        console.error("Player list not found!");
    }
}

// Function to toggle the monster list dropdown
function toggleMonsterDropdown() {
    let monsterList = document.getElementById("monsterList");
    if (monsterList) {
        monsterList.style.display = (monsterList.style.display === "none" || monsterList.style.display === "") ? "block" : "none";
    } else {
        console.error("Monster list not found!");
    }
}

// Function to toggle dragon placement mode
function toggleDragonPlacement() {
    if (!window.avatarPlacement) {
        window.avatarPlacement = new AvatarPlacement("battleMap");
    }

    if (window.avatarPlacement.placementMode) {
        window.avatarPlacement.disablePlacementMode();
    } else {
        window.avatarPlacement.enablePlacementMode();
    }
}
