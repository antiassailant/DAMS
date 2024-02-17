var optionsDict = {};

function resOpt() {
    localStorage["options"] = JSON.stringify(optionsDict);
}

if (localStorage["options"] == undefined) {
    optionsDict = {
        "barrelSlider": 0
    };
    localStorage["options"] = JSON.stringify(optionsDict);
}
else {
    optionsDict = JSON.parse(localStorage["options"]);
}

// individual options

document.getElementById('despMap').scale.baseVal = optionsDict["barrelSlider"]; // barrel filter