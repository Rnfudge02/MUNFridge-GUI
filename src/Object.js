//Import Three.js (used for 3d rendering) as well as FontLoader addon
import * as THREE from "three";
import {FontLoader} from "three/addons/loaders/FontLoader.js";
import {TextGeometry} from "three/addons/geometries/TextGeometry.js";

//Global code to load font for objects
var fontLoaded = false;
const fontStr = "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json";
const defaultSize = 12;

var objFont;

function loadFont() {
    objFont = new FontLoader().load(fontStr,
        function(font) {
            console.log("font loaded successfully!");
            fontLoaded = true;
        },
    
        function(xhr) {
            console.log("%d bytes loaded out of %d bytes", xhr.loaded, xhr.total);
        },
    
        function(err) {
            console.log("Error occured loading font " + fontStr);
        }
    )
}

//Object class (used for rendering an object element in the GUI)
class Object extends THREE.Group {
    //Class constructor
    constructor(itemName, itemQty, textureFilename) {
        //
        super();

        if (!fontLoaded) {
            console.log("Waiting for font to finish loading");
            loadFont();
        }

        this.name = itemName;
        this.qty = itemQty;
        this.fontSize = defaultSize;

        //Create
        let imageGeometry = new THREE.PlaneGeometry();
        let imageTexture = new THREE.TextureLoader().load(textureFilename);
        let imageMaterial = new THREE.MeshStandardMaterial({map: imageTexture});

        let nameGeometry = new TextGeometry(this.name, {font: objFont, size: this.fontSize});
        let qtyGeometry = new TextGeometry(String(this.qty), {font: objFont, size: this.fontSize});
        let textMaterial = new THREE.MeshStandardMaterial({color: 0xFFFFFF});

        //Create meshes and add them to the group
        const imageMesh = new THREE.Mesh(imageGeometry, imageMaterial);
        const nameMesh = new THREE.Mesh(nameGeometry, textMaterial);
        const qtyMesh = new THREE.Mesh(qtyGeometry, textMaterial);

        imageMesh.position.set(0, 0, 0);
        nameMesh.position.set(1, 0, 0);
        qtyMesh.position.set(2, 0, 0);

        this.add(imageMesh, nameMesh, qtyMesh);
    }

    getName() {
        return this.name;
    }

    getQty() {
        return this.qty;
    }

    updateName(newName) {
        this.name = newName;
    }

    updateQty(newQty) {
        this.qty = newQty;
    }
}

function ObjectUnitTest(debugInfo) {
    let TestObject = new Object("TestObject", 3,  "../assets/Items/TestObject.png");

    if (debugInfo) {
        console.log("", TestObject);
    }

    if (typeof (TestObject) == "undefined") {
        console.log("Object Unit Test 1 (Constructor) Failed...");
        return false;
    }

    if (TestObject.getName() != "TestObject" || TestObject.getQty() != 3) {
        console.log("Object Unit Test 2 (Accessors) Failed...");
        return false;
    }

    TestObject.updateName("TestObject2");
    TestObject.updateQty(5);

    if (TestObject.getName() != "TestObject2" || TestObject.getQty() != 5) {
        console.log("Object Unit Test 3 (Mutators) Failed...\n Expected: TestObject2 & 5, got %s & %d", TestObject.getName(), TestObject.getQty());
        return false;
    }

    else {
        console.log("All Object Unit Tests Passed Successfully!");
        return true;
    }

    
}

export {Object, ObjectUnitTest};