var windowZindexArr = [];
var selectedWindow;

function dragElement(elemnt) {
var elmnt = document.getElementById(elemnt);
var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
if (document.getElementById(elmnt.id + "-head")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "-head").onmousedown = dragMouseDown;
} else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
}

function dragMouseDown(e) {
    e = e || window.event;
    if (e.button == 1) {
        closeDragElement();
        killWindow(elmnt.id);
    }
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag; 
}

function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    if (elmnt.offsetTop - pos2 > (4 * window.innerHeight / 100)) {
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    }
    if (elmnt.offsetLeft - pos1 > 48) { 
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
    for (var i = 0; i < windowZindexArr.length; i++) {
        windowZindexArr[i].style.zIndex = "0";
    }
    elmnt.style.zIndex = "9";
    selectedWindow = elmnt.id;
}

function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
}
}

function ResizeWindow(wid, width = 500, height = 500) {
    var windowres = document.getElementById(wid);
    windowres.style.width = width;
    windowres.style.height = height;
}

function killWindow(wid) {
    var killedboy = document.getElementById(wid);
    const index = windowZindexArr.indexOf(killedboy);
    if (index > -1) {
        windowZindexArr.splice(index, 1);
      }
    killedboy.parentElement.removeChild(killedboy);
}

function createWindow(title, width, height, wid, bodytext = "") {
    if (windowZindexArr.length > 0) {
        return;
    }

    var cWindow = document.createElement("div");
    cWindow.classList = "window";
    cWindow.style.zIndex = 9;
    cWindow.style.width = width;
    cWindow.style.height = height;
    cWindow.style.top = "80px";
    cWindow.style.left  = "450px";
    cWindow.id = wid; 

    var cWindowHeader = document.createElement("div");
    cWindowHeader.classList = "window-head";
    cWindowHeader.id = wid + "-head";

    var cWindowTitle = document.createElement("span");
    cWindowTitle.classList = "window-title";
    cWindowTitle.innerText = title;
    cWindowHeader.append(cWindowTitle);

    var cWindowButtons = document.createElement("div");
    cWindowButtons.classList = "window-buttons";

    var cMinimize = document.createElement("div");
    cMinimize.classList = "minimize wincon";
    cWindowButtons.appendChild(cMinimize);

    var cMaximize = document.createElement("div");
    cMaximize.classList = "maximize wincon";
    cWindowButtons.appendChild(cMaximize);

    var cClose = document.createElement("div");
    cClose.classList = "close wincon";
    cWindowButtons.appendChild(cClose);
    cClose.onclick = function() {killWindow(wid)};

    cWindowHeader.appendChild(cWindowButtons);

    var cBody = document.createElement("div");
    cBody.innerHTML = bodytext;
    cBody.classList = "window-body";

    cWindow.appendChild(cWindowHeader);
    cWindow.appendChild(cBody);

    windowZindexArr.push(cWindow);

    return cWindow;
}

function qCreate(title, id, bodytext="") {
    if (windowZindexArr.length > 0) {
        return;
    }
    var wind = createWindow(title, 500, 500, id, bodytext);
    document.body.append(wind);
    dragElement(id);
}

var currentId = 0;

// window prompts

var credits = `<div>DAMS Version 0.0</div><div style="text-align:center;"><div id="logoc" style="background:url(assets/logoc.png);height: 120px;background-position: center;background-size: contain;background-repeat: no-repeat;"></div><br><br>Made by antiassailant and NavyEOD_24.</div>`;