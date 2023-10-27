import * as THREE from "three"

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
        this.pos.set(xPos, yPos);
    }

    setDepressed() {
        this.mouseDepressed = true;
    }

    setReleased() {
        this.mouseDepressed = false;
    }

    link(checklist) {
        this.checklist = checklist;
    }
}

export {RaycastHandler};