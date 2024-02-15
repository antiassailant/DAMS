var garbagearray = [];
function dispose() {
    for (var i = 0; i < garbagearray.length; i++) {
        garbagearray[i].parentElement.removeChild(garbagearray[i]);
    }
    garbagearray = [];
}
function garbage(anything) {
    garbagearray.push(anything);
};