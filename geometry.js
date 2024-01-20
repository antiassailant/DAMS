function toRadians(angle) {
    return angle * (Math.PI / 180);
}

function toDegrees(radians) {
    return radians * (180 / Math.PI);
  }

function createMap(w, h, bg = ".", fg = "#") {
    var map = [];
    map.push(fg.repeat(w));
    for (var i = 0; i < h - 2; i++) {
        map.push(fg + bg.repeat(w - 2) + fg);
    }
    map.push(fg.repeat(w));
    return map;
}
var canMove = true;
var map1 = `                                                       +------------------------------------------------+
                                                       | XXXXX            X     XX          X   X       |
                                               ,       | X   XX    X       X  X  XX   XXX   XX  XX      +--------------------------------------------+
   .   ,                                   .     .     |      XX   XX   X     XX X XX X     XX XXX   X  +                  XX                 XX     |
              .        .               ,         ,     |      XX    X   X     XXX    XX   XX  XX     X          XX         XXXX      XXXXXX    XX    |
    ,      ,    ,                  .                   | XXXXX       X XXXXXXXX  XXXX              XXX  +      X                          XX   XXX   |
           .          .                                | X  XXX  XX   X  XX       X                     +---------------------------+  X   X  X      |
      .      .                  .    ,                 | X                                              |                           |  XXX    X      |
         ,             ,           .          ,        | X   X +-------------------------+---+ +---+----+                   , .     |    X           |
   .               .          ,            .           |       |                         |         |             ,      .  ,    ,   |   X    XX      |
     ,                     .      ,     ,        .     |       |         +---------+     |  X      |         .     .       .    .   |       XX       |
+-------------+------------------+-------------+   +---+--+ +--+---------+  TXXX   |     | X     XX|     ,         ,         .      |        X       |
|   X  .   .  | , X ,  .     X,. |       XX X  |   |   X                    XXXX   | ,   | X      X| .                   ,          |       XX       |
|  , ,  X ,   |  X.X.  ,  P  .,  | XXXXXXX  X  |   +---------------------+ XXXXX   |   . | X XX   X|                                |  XX        X   |
|   X X  P X  |.  X. X     X X . | X XX XXXXX  |   .    , .    ,         |XXXXXXX  |   , |  XX   XX|   ,                            |   X        XX  |
| X .    T    |  X ,X  X    X .X |XXXXXX  XXXX |      .      .           |  XXXX   |     |  X    X | .          ,                   |  XX       XX   |
+-------+  +--+--------+   +-------------+   +-+ ,      ,                |  XX     |     |XXX    XX|                                |                |
|     T     .        T         ,       T       |     ,     ,,     ,      |         |     |         |                        +-------+-------+ +------+--------+
|        ,    ,            .     .             +-------------------------+---+ +---+-----+---+ +---+---+              ,     |                                 |
|        .             ,         ,       .     |T           X          X    .    T      .          X   |          .     .   |   +---------------------------+ |
|          .       .                  ,    ,   +            XXX        XX,    ,      ,    , XXXX  XX   +      ,         ,   |   |                           | |
+---------+#+-+                       .               XX      X         X.           .      XXXXX XXX  #  .                 |   |   +--------------------+  + |
|  XX   XXX  X|      ,                  .      +     X XX                  .     T     .  XXXXXX    XX +                    |   |                        |    |
| X XX XX  XX |    .          ,     ,          +-------------------------+---+ +---+-------------------+    ,               |   |   +                  T |  + |
+-------------+--------------------------------+                         |         |  .   ,               .          ,      | . |   +--------------------+  | |
                  .   ,                                   .              | p%d p%d |             .        .               , |   +---------------------------+ |
      .    ,                 .        .               ,                  |         |   ,      ,    ,                  .     +---------------------------------+
         .         ,      ,    ,                  .                      | p%d p%d |          .         ,..
                          .          .                                   |         |     .      .   .  ,    ,      .    ,
       ,,     ,      .      .                  .    ,                    | p%d p%d |        ,          .    .         .
                        ,             ,           .                      |  T      |  .                  .       ,            .
                  .               .          ,            .              |   +-----+    ,            ,               ,     ,
                    ,                     .      ,     ,                 +---------+
`.split("\n");
var playerX = 26;
var playerY = 13;
var prevChar = " ";
var displayWidth = 20;
var displayHeight = 15;
function displayMap(map, startX=Math.max(0, playerX - displayWidth / 2), startY=Math.max(0, playerY - displayHeight / 2), width=displayWidth, height=displayHeight) {
    var displayContent = map.slice(startY, startY + height)
        .map(function (row) {
            return row.substring(startX, startX + width);
        })
        .join("\n");

    document.getElementById("display").innerHTML = displayContent;
}


function changeLine(map, coords, newchar) {
    map[coords[1]] = map[coords[1]].substring(0, coords[0]) + newchar + map[coords[1]].substring(coords[0] + 1);
    return map;
}

function movePlayer(direction, currentMap) {

    if (!canMove) {
        return;
    }

    canMove = false;
    setTimeout(function () {
        canMove = true;
    }, 50); // Set the delay in milliseconds

    var collstr = "#-+|X%dpP";
    var dialogue = document.getElementById("dialogue");
    dialogue.style.display = "none";
    // Remove the player from the current position
    currentMap[playerY] = currentMap[playerY].substring(0, playerX) + prevChar + currentMap[playerY].substring(playerX + 1);

    // Update player coordinates based on the direction
    if (direction === "left" && playerX > 0 && !(collstr.includes(currentMap[playerY][playerX - 1]))) {
        playerX--;
    } else if (direction === "right" && playerX < currentMap[playerY].length - 1 && !(collstr.includes(currentMap[playerY][playerX + 1]))) {
        playerX++;
    } else if (direction === "up" && playerY > 0 && !(collstr.includes(currentMap[playerY - 1][playerX]))) {
        playerY--;
    } else if (direction === "down" && playerY < currentMap.length - 1 && !(collstr.includes(currentMap[playerY + 1][playerX]))) {
        playerY++;
    }

    // Place the player in the new position
    prevChar = currentMap[playerY][playerX];
    if (prevChar == "#" || prevChar == "T") {
        dialogue.style.display = "";
        dialogue.innerHTML = dialogueObjects[playerY + "," + playerX];
        console.log(playerY, playerX);
    }
    currentMap[playerY] = currentMap[playerY].substring(0, playerX) + "P" + currentMap[playerY].substring(playerX + 1);

    // Update the displayed map
    displayMap(currentMap);
}


var musicPlaying = false;


// DIALOGUE //

var dialogueObjects = {
    // T ELEMENTS
    "15,9": `Amidst the rubble, you can see a defunct rover.`,
    "11,76": `A small plushie of a seal. You are unsure as to the power it may contain and what may hide, so you leave it alone.`,
    "17,6": `A sign that reads the following:<br>NAME: ROV17<br>CONDITION: UNDER MAINTENANCE<br>NOTES: See Incident VRF001#A451`,
    "17,21": `A sign that reads the following:<br>NAME: ROV18<br>CONDITION: NEEDS REPAIRS<br>NOTES: See Incident VRF001#A517`,
    "17,39": "A sign that reads the following:<br>NAME: ROV19<br>CONDITION: UNDER MAINTENANCE<br>NOTES: See Incident VRF001#A402",
    "19,48": "A sign that reads the following:<br>ROVER STATIONS A",
    "19,81": "A sign that reads the following:<br>CARGO AREA LWING",
    "22,81": "A sign that reads the following:<br>CAFETARIA AREA",
    "30,76": "A spilled liquid that seems to have not dried has been detected on the floor. The liquid is in the item database:<br>SAVORY APPETITE UNLOADING SUSTENANCE.<br>SAUS.",
    "23,151": `Hi there Atlas! If you are wondering what the hell this is, this was supposed to be your birthday present, but I couldn't make it in time for your birthday.<br>
But, I thought I could do a good job at recovering it and getting it to work to some extent, and I think I did!<br>
Although it was made for your birthday, I thought that it wouldn't matter what day I picked to gift this to you. A gift is gift, hah. <br>
There is also an original note for your birthday I had made at the same time when I started this that would have been revealed the same way. So the next paragraph or two is going to be that note. Happy late-birthday!<br>
---------------------------------------------------------------------------------<br>
Hey there Atlas!<br>
Happy birthday!<br>
I really hope you enjoyed the little demo thing I did over here.<br>
I know you would probably didnt expect something like this for your birthday, but, this was the best I could think of haha.<br>
Regardless, the effort that went into this gift is completely deserved.<br>
You have been going through some harsh times as of late, and I wanted you to know that you will eventually make it through.<br>
Even in the harshest of times, there will always be a time to smile and to be happy, and I hope right now is one of those times.<br>
When I was facing off against those terrible people, only you were the one right beside me.<br>
When I was in pain, barely able to talk, thinking about terrible things, only you were the one right beside me.<br>
And I will never be able to repay that, regardless of how hard I try.<br>
Thank you for being here Atlas.<br>
Thank you.<br>
I love you.<br>
- Hellbie <3
    `,
    // # ELEMENTS
    "18,78": "",
    "21,11": "",
    "21,103": ""
}

document.addEventListener("keydown", function(event) {
    if (musicPlaying == false) {
        musicPlaying = true;
    }
    document.getElementById("bgm").play();
    switch(event.key) {
        case "ArrowLeft":
            movePlayer("left", map1);
            break;
        case "ArrowRight":
            movePlayer("right", map1);
            break;
        case "ArrowUp":
            movePlayer("up", map1);
            break;
        case "ArrowDown":
            movePlayer("down", map1);
            break;
    }
});

displayMap(map1);
