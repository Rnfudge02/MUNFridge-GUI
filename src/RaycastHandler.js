import * as THREE from "three"

class RaycastHandler {
    constructor() {
        this.raycaster = new THREE.Raycaster();
        this.pos = new THREE.Vector2();
    }

    raycast(cam, list) {
        this.raycaster.setFromCamera(this.pos, cam);
        const intersects = this.raycaster.intersectObjects(list);

        if (intersects[0] != null) {
            if (this.mouseDepressed) {
                return intersects[0];
            }

            else {
                return intersects[0];
            }
        }

        else {
            return null;
        }
    }

    setPos(xPos, yPos) {
        this.pos.set(xPos, yPos);
    }

    setDepressed() {
        this.mouseDepressed = true;
    }

    setReleased() {
        this.mouseDepressed = false;
    }
}

export {RaycastHandler};