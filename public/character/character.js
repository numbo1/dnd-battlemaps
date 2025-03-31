
// Class for character objects
class Character {
    constructor(name, image, strength, dexterity, constitution, intelligence, wisdom, charisma) {
        this.name = name;
        this.image = image;
        this.strength = strength;
        this.dexterity = dexterity;
        this.constitution = constitution;
        this.intelligence = intelligence;
        this.wisdom = wisdom;
        this.charisma = charisma;
        
    }
}

// Function for selecting and displaying characters
function selectImage() {
    let images = document.querySelectorAll(".right-panel img");
    let characterDisplay = document.getElementById("characterDisplay");

    images.forEach(image => {
        image.addEventListener("click", function() {
            // Create a new image element
            let newImage = document.createElement("img");
            newImage.src = this.src; // Set source to clicked image
            newImage.alt = "Selected Character";
            newImage.style.width = "20rem"; // Adjust size if needed

            // Clear previous image and add new one
            characterDisplay.innerHTML = "";
            characterDisplay.appendChild(newImage);
        });
    });

}

selectImage();