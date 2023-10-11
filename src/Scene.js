import * as THREE from "three";

import * as FRIDGE from "../src/Fridge.js";
import * as LISTENER from "../src/Listener.js";
import * as OBJECT from "../src/Object.js";
import * as USER from "../src/User.js";

function initScene() {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({canvas: document.querySelector("#scene-container")});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    const ambientLighting = new THREE.AmbientLight(0xFFFFFF, 0.5);
    const pointLighting = new THREE.PointLight(0xFFFFFF, 0.75);
    pointLighting.position.set(10, 10, 10);

    scene.add(ambientLighting, pointLighting);



    renderer.render(camera, scene);


    initListeners();

    animateScene();
}

function animateScene() {
    renderer.render(scene, camera);

    requestAnimationFrame(animateScene);
}

function initListeners(scene, camera, renderer) {
    window.addEventListener("resize", () => {

    });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    
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