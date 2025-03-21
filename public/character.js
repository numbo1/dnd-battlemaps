// script.js

function changeFeature(feature, imgFile) {
    document.getElementById(feature).src = imgFile;
}

function removeFeature(feature) {
    document.getElementById(feature).src = "";
}

function changeSkinColor(bodyFile) {
    document.getElementById("body").src = bodyFile;
}

function changeHeight(size) {
    let characterTable = document.querySelector(".character-table");
    characterTable.className = "character-table " + size;
}

document.addEventListener("DOMContentLoaded", () => {
    const features = {
        hair: ["hair1.png", "hair2.png"],
        eyes: ["eyes1.png", "eyes2.png"],
        nose: ["nose1.png", "nose2.png"],
        ears: ["ears1.png", "ears2.png"],
        body: ["body1.png", "body2.png", "body3.png"]
    };

    Object.keys(features).forEach(feature => {
        const select = document.createElement("select");
        select.id = feature;
        select.onchange = function () {
            changeFeature(feature, this.value);
        };
        
        const defaultOption = document.createElement("option");
        defaultOption.textContent = `Select ${feature.charAt(0).toUpperCase() + feature.slice(1)}`;
        defaultOption.value = "";
        select.appendChild(defaultOption);
        
        features[feature].forEach(option => {
            const opt = document.createElement("option");
            opt.value = option;
            opt.textContent = option.replace(/\D/g, "");
            select.appendChild(opt);
        });
        
        document.getElementById(`${feature}-options`).appendChild(select);
    });

    // Skin color dropdown
    const skinSelect = document.createElement("select");
    skinSelect.id = "skin-color";
    skinSelect.onchange = function () {
        changeSkinColor(this.value);
    };
    
    ["body1.png", "body2.png", "body3.png"].forEach(option => {
        const opt = document.createElement("option");
        opt.value = option;
        opt.textContent = option.replace(/\D/g, "");
        skinSelect.appendChild(opt);
    });
    document.getElementById("skin-options").appendChild(skinSelect);
    
    // Height dropdown
    const heightSelect = document.createElement("select");
    heightSelect.id = "height";
    heightSelect.onchange = function () {
        changeHeight(this.value);
    };
    
    ["small", "medium", "tall"].forEach(size => {
        const opt = document.createElement("option");
        opt.value = size;
        opt.textContent = size.charAt(0).toUpperCase() + size.slice(1);
        heightSelect.appendChild(opt);
    });
    document.getElementById("height-options").appendChild(heightSelect);
    });
function changeStat(stat, value) {
    let currentStat = document.getElementById(stat);
    let newValue = parseInt(currentStat.innerText) + value;
    if (newValue >= 0) { // Ensure the value does not go below 0
      currentStat.innerText = newValue;
    }
}
let availablePoints = 10; // Initial stat points in the bank

// Function to handle changing stats
function changeStat(stat, value) {
  const currentStat = document.getElementById(stat);
  const pointsDisplay = document.getElementById("Points");

  // Get the current stat value
  let currentStatValue = parseInt(currentStat.innerText);
  
  // Check if the value we want to add or subtract is within the available stat points
  if (value === 1 && availablePoints > 0) {
    // Increase the stat
    currentStat.innerText = currentStatValue + 1;
    availablePoints -= 1; // Decrease available points
  } else if (value === -1 && currentStatValue > 0) {
    // Decrease the stat (but not below 0)
    currentStat.innerText = currentStatValue - 1;
    availablePoints += 1; // Increase available points
  }

  // Update the Stat Points Bank
  pointsDisplay.innerText = availablePoints;
}

document.addEventListener("DOMContentLoaded", function () {
  // Attach event listeners to each stat button
  const buttons = document.querySelectorAll('button');

  // Loop through each button and add event listeners
  buttons.forEach(button => {
    button.addEventListener('click', function () {
      const stat = this.parentElement.querySelector('span').id;
      const value = parseInt(this.innerText === "+" ? 1 : -1); // Determine if the button clicked is +1 or -1
      changeStat(stat, value);
    });
  });
});
