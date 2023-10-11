import * as THREE from "three";

class Object extends THREE.Group {
    constructor(itemName, itemQty, textureFilename) {
        super();

        this.name = itemName;
        this.qty = itemQty;

        let imageGeometry = new THREE.PlaneGeometry();
        let imageTexture = new THREE.TextureLoader().load(textureFilename);
        let imageMaterial = new THREE.MeshStandardMaterial({texture: imageTexture});

        //let nameGeometry = new THREE.TextGeometry();
        //let qtyGeometry = new THREE.TextGeometry();
        //let textMaterial = new MEshStandardMaterial();

        const imageMesh = new THREE.Mesh(imageGeometry, imageMaterial);
        //const nameMesh = new THREE.Mesh(nameGeometry, textMaterial);
        //const qtyMesh = new THREE.Mesh(qtyGeometry, textMaterial);

        add(imageMesh);
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
        this.itemQty = newQty;
    }
}

function ObjectUnitTest(debugInfo) {
    let TestObject = new Object("TestObject", 3,  "../assets/TestObject.png");

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
        console.log("Object Unit Test 3 (Mutators) Failed...");
        return false;
    }

    else {
        console.log("All Object Unit Tests Passed Successfully!");
        return true;
    }

    
}

export {Object, ObjectUnitTest};