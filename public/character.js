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

function randomizeStats() {
    document.getElementById("str").innerText = Math.floor(Math.random() * 10) + 8;
    document.getElementById("dex").innerText = Math.floor(Math.random() * 10) + 8;
    document.getElementById("int").innerText = Math.floor(Math.random() * 10) + 8;
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