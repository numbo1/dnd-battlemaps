document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;
    const dmButton = document.querySelector(".role_btn[href='dungeon_master.html']");
    const advButton = document.querySelector(".role_btn[href='character.html']");

    const dmBg = "url('images/dmBackground.png')"; // Change this to your DM image
    const advBg = "url('images/advBackground.png')"; // Change this to your Adventurer image

    // Set default background
    body.style.backgroundImage = "none";
    body.style.backgroundSize = "cover";
    body.style.backgroundPosition = "center";
    body.style.backgroundAttachment = "fixed";
    body.style.transition = "background 0.5s ease-in-out";

    // Hover effect for Dungeon Master
    dmButton.addEventListener("mouseenter", function () {
        body.style.backgroundImage = dmBg;
    });

    // Hover effect for Adventurer
    advButton.addEventListener("mouseenter", function () {
        body.style.backgroundImage = advBg;
    });

    // Reset when mouse leaves
    dmButton.addEventListener("mouseleave", function () {
        body.style.backgroundImage = "none";
    });

    advButton.addEventListener("mouseleave", function () {
        body.style.backgroundImage = "none";
    });
});
