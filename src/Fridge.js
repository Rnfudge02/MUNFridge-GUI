import * as THREE from "three";

class Fridge extends THREE.Group {
    constructor() {
        super();

        const FridgeGeometry = new THREE.BoxGeometry(1.5, 2, 2);
        const FridgeMaterial = new THREE.MeshStandardMaterial({color: 0xFFFFFF});
        const FridgeMesh = new THREE.Mesh(FridgeGeometry, FridgeMaterial);

        this.add(FridgeMesh)
    }
}

function FridgeUnitTest(debugInfo) {

}

export {Fridge, FridgeUnitTest};