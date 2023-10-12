//Import Three.js (Used for 3d rendering)
import * as THREE from "three";

//Import GUI user modules
import * as FRIDGE from "../src/Fridge.js";
import * as LISTENER from "../src/Listener.js";
import * as OBJECT from "../src/Object.js";
import * as USER from "../src/User.js";

//Global variables (Used in all functions in this file so global scope makes sense)
const DEBUG = true;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({canvas: document.querySelector("#scene-container")});

//Program entry point
function initScene() {
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    const ambientLighting = new THREE.AmbientLight(0xFFFFFF, 0.5);
    const pointLighting = new THREE.PointLight(0xFFFFFF, 0.75);
    pointLighting.position.set(10, 10, 10);

    scene.add(ambientLighting, pointLighting);

    if (DEBUG == 1) {
        const lightHelper = new THREE.PointLightHelper(pointLighting);
        const gridHelper = new THREE.GridHelper(100, 10);

        scene.add(lightHelper, gridHelper);
    }

    renderer.render(scene, camera);

    initListeners();

    animateScene();
}

function animateScene() {
    renderer.render(scene, camera);

    requestAnimationFrame(animateScene);
}

function initListeners() {
    window.addEventListener("resize", () => {
        if (DEBUG == true) {
            console.log("Resizing");
        }

        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth/window.innerHeight;
        camera.updateProjectionMatrix();
    });

    window.addEventListener("mousedown", LISTENER.onMouseDown);
    window.addEventListener("mouseup", LISTENER.onMouseUp);
    
    window.addEventListener("wheel", (event) => {
        if (event.deltaY > 0) {
            camera.positon.setY(camera.position.y + event.deltaY);
        }

        else if (event.deltaY < 0) {
            camera.position.setY(camera.position.y - event.deltaY);
        }
    })
}

initScene();