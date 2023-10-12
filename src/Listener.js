class Listener {
    constructor() {

    }
}

function onMouseUp(event) {

}

function onMouseDown(event) {

}

function ListenerUnitTest(debugInfo) {
    let TestListener = new Listener();

    if (debugInfo) {
        console.log("", TestListener);
    }

    if (typeof (TestListener) == "undefined") {
        console.log("Listener Unit Test 1 (Constructor) Failed...");
        return false;
    }

    else {
        return true;
    }
}

export {Listener, onMouseDown, onMouseUp}