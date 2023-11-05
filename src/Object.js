//Import Three.js (used for 3d rendering) as well as FontLoader addon
import * as THREE from "three";
import {FontLoader} from "three/addons/loaders/FontLoader.js";
import {TextGeometry} from "three/addons/geometries/TextGeometry.js";
import helvetiker from "three/examples/fonts/helvetiker_regular.typeface.json";

var fontLoaded = false;
var objFont;

//Object class (used for rendering an object element in the GUI)
class Object extends THREE.Group {
    //Class constructor
    constructor(itemName, itemQty, textureFilename) {
        super();

        if (!fontLoaded) {
            console.log("Waiting for font to finish loading");
            objFont = new FontLoader().parse(helvetiker);
            fontLoaded = true;
        }

        //Add attributes to class
        this.name = itemName;
        this.qty = itemQty;
        this.fontSize = 0.5;

        //Create
        let backgroundGeometry = new THREE.BoxGeometry(4, 4, 0.10);
        let backgroundTexture = new THREE.TextureLoader().load("../assets/background.jpg");
        let backgroundMaterial = new THREE.MeshStandardMaterial({map: backgroundTexture});

        let imageGeometry = new THREE.PlaneGeometry(1, 1);
        let imageTexture = new THREE.TextureLoader().load(textureFilename);
        let imageMaterial = new THREE.MeshStandardMaterial({map: imageTexture});

        let nameGeometry = new TextGeometry(this.name, {font: objFont, size: this.fontSize, height: 0.05});
        let qtyGeometry = new TextGeometry(String(this.qty), {font: objFont, size: this.fontSize, height: 0.05});
        let textMaterial = new THREE.MeshStandardMaterial({color: 0xFFFFFF});

        //Create meshes and add them to the group
        this.backgroundMesh = new THREE.Mesh(backgroundGeometry, backgroundMaterial)
        this.imageMesh = new THREE.Mesh(imageGeometry, imageMaterial);
        this.nameMesh = new THREE.Mesh(nameGeometry, textMaterial);
        this.qtyMesh = new THREE.Mesh(qtyGeometry, textMaterial);

        //Compute text bounding boxes
        nameGeometry.computeBoundingBox();
        qtyGeometry.computeBoundingBox();
        let nameOffset = -nameGeometry.boundingBox.max.x / 2;
        console.log(nameGeometry.boundingBox);
        let qtyOffset = -qtyGeometry.boundingBox.max.x / 2;

        //TODO: Needs appropriate scaling
        this.backgroundMesh.position.set(0, -1, -0.1);
        this.imageMesh.position.set(0, 0, 0);
        this.nameMesh.position.set(nameOffset, -1, 0);
        this.qtyMesh.position.set(qtyOffset, -2, 0);

        //Add meshes to group
        this.add(this.backgroundMesh, this.imageMesh, this.nameMesh, this.qtyMesh);
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

    onLoop() {
        if (this.focus == true) {

        }
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