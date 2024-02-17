class Game {
    constructor(vrfString) {
        var vrfString = vrfString; // for saving
    }
}

class User {
    constructor() {
        var username = "";
        var password = "";
        var type = 0; // 0 for level 0, 1 for level 1...
    }
}


/*
understanding area strings:

a: Administration Center
c: Communications Center
r: Research Center
e: Excavator Area
C: Coolant System
E: Electrical System
S: Security & Announcement System

*/

class VRF {
    constructor(number, nodepurity=100, areas="acr") {
        var vrfno = number;
        var nodepurity = nodepurity;

    }
}

/*
terminal
*/

class Terminal {
    constructor() {
        var parser = {};
    }
    argparse(string) {
        console.log(string);        
    }
}