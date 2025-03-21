document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;
    const roleDetails = document.getElementById("role-details");
    const roleButtons = document.querySelectorAll(".role_btn");

    const backgrounds = {
        "Dungeon Master": "url('Images/MagicalForest.jpg')",
        "Adventurer": "url('Images/Plains.png')"
    };

    const roles = {
        "Dungeon Master": "As a Dungeon Master, you craft the world, control NPCs, and guide the adventurers on their journey.",
        "Adventurer": "As an Adventurer, you embark on epic quests, battle monsters, and uncover hidden treasures."
    };

    roleButtons.forEach(button => {
        button.addEventListener("mouseenter", function () {
            const roleName = this.querySelector(".role_name").textContent;
            body.style.backgroundImage = backgrounds[roleName];
            roleDetails.textContent = roles[roleName];
            roleDetails.style.opacity = "1";
            roleDetails.style.scale = "1.3";
        });

    });
});
