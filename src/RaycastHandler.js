import * as THREE from "three"

const RAYCASTDEBUG = true;

class RaycastHandler {
    constructor() {
        this.raycaster = new THREE.Raycaster();
        this.pos = new THREE.Vector2();
    }

    raycast(cam) {
        this.raycaster.setFromCamera(this.pos, cam);
        const intersects = this.raycaster.intersectObjects(this.checklist);

        if (intersects[0] != null) {
            if (mouseDepressed) {
                return intersects[0];
            }

            else {
                return null;
            }
        }

        else {
            return null;
        }
    }

    setPos(xPos, yPos) {
        if (RAYCASTDEBUG == true) {
            console.log("xPos %d, yPos %d", xPos, yPos);
        }

        this.pos.set(xPos, yPos);
    }

    setDepressed() {
        if (RAYCASTDEBUG == true) {
            console.log("Raycaster detecting mouse has been depressed");
        }

        this.mouseDepressed = true;
    }

    setReleased() {
        if (RAYCASTDEBUG == true) {
            console.log("Raycaster detecting mouse has been released");
        }

        this.mouseDepressed = false;
    }

    link(checklist) {
        if (RAYCASTDEBUG == true) {
            console.log("Items added to raycast tracking:", checklist)
        }

        this.checklist = checklist;
    }
}

function RaycastHandlerUnitTest() {
    const rHandler = new RaycastHandler();
    
}

export {RaycastHandler, RaycastHandlerUnitTest};