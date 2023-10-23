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
    //Perform Unit Tests
    OBJECT.ObjectUnitTest();

    //Configure renderer
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    //Create lighting and add to scene
    const ambientLighting = new THREE.AmbientLight(0xFFFFFF, 0.5);
    const pointLighting = new THREE.PointLight(0xFFFFFF, 0.75);
    pointLighting.position.set(10, 10, 10);

    scene.add(ambientLighting, pointLighting);

    //If debug flag is set, add light and grid visualizers
    if (DEBUG == 1) {
        const lightHelper = new THREE.PointLightHelper(pointLighting);
        const gridHelper = new THREE.GridHelper(100, 10);

        scene.add(lightHelper, gridHelper);
    }

    //const testObj = new Object("Apple", 3, "../assets/items/apple.png");

    //scene.add(testObj);

    renderer.render(scene, camera);

    initListeners();

    animateScene();
}

//Main animation loop
function animateScene() {
    renderer.render(scene, camera);

    requestAnimationFrame(animateScene);
}

//Listener class and event listener initialization
function initListeners() {
    //Resizing callback function (using inline function notation)
    window.addEventListener("resize", () => {
        if (DEBUG == true) {
            console.log("Resizing");
        }

        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth/window.innerHeight;
        camera.updateProjectionMatrix();
    });

    //Mouse pressed and release events, defined in Listener.js
    window.addEventListener("mousedown", LISTENER.onMouseDown);
    window.addEventListener("mouseup", LISTENER.onMouseUp);
    
    //Scroll wheel callback function
    window.addEventListener("wheel", (event) => {
        if (event.deltaY > 0) {
            if (DEBUG == true) {
                console.log("Scrolling Up");
                console.log(camera.position.y);
            }
            camera.position.setY(camera.position.y + event.deltaY);
        }

        else if (event.deltaY < 0) {
            if (DEBUG == true) {
                console.log("Scrolling Down");
                console.log(camera.position.y);
            }
            camera.position.setY(camera.position.y + event.deltaY);
        }
    })
}

//Call program entry point
initScene();