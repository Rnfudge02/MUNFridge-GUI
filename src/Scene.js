//Import Three.js (Used for 3d rendering)
import * as THREE from "three";

//Import GUI user modules
import * as OBJECT from "../src/Object.js";
import * as USER from "../src/User.js";
import * as RAYCASTER from "../src/RaycastHandler.js"

//Global variables (Used in all functions in this file so global scope makes sense)
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.setZ(7);

const renderer = new THREE.WebGLRenderer({canvas: document.querySelector("#scene-container")});

//Initialize Raycaster
const rHandler = new RAYCASTER.RaycastHandler();

var RowCount = 0;

//Initial Apple and Broccoli test
const apple = new OBJECT.Object("Apple", 3, "../assets/items/apple.png");
const broccoli = new OBJECT.Object("Broccoli", 7, "../assets/items/broccoli.png");
const carrot = new OBJECT.Object("Carrot", 5, "../assets/items/carrot.png");
const milk = new OBJECT.Object("Milk", 3 , "../assets/items/milk.png");
const orange = new OBJECT.Object("Orange", 1, "../assets/items/Orange.png");

//Stores Items in an array
var ItemObjectArray = [apple, broccoli, carrot, milk, orange];

//function that scales UI grouped elements so they are equal parts apart
function UIScale(ItemObjectArray) {
    for (let i=0;  i < ItemObjectArray.length; i++) {
        if (i == 0) {
            ItemObjectArray[i].position.set(i, 0, 0);
            RowCount = 1;
        }

        else if (i < 3) {
            ItemObjectArray[i].position.set(i*4.25, 0, 0);
            scene.add(ItemObjectArray[i]);
        }

        else {
            ItemObjectArray[i].position.set((i-3)*4.25, -4.15, 0);
            scene.add(ItemObjectArray[i]);
            RowCount = 2;            
        }

        scene.add(ItemObjectArray[i]);
    }
}

//position function for camera with respect to UI object groups
function CameraScale(ItemObjectArray) {
    var totalPosX = 0;
    var xPosMean = 0;
    var yPosMean = 0;
    if (ItemObjectArray.length > 3) {
        //checking to see if more than 3 elements
        for (let i=0; i < 4; i++) {
            totalPosX += ItemObjectArray[i].position.x;
        }

        xPosMean = totalPosX / 3;
        yPosMean = (ItemObjectArray[0].position.y + ItemObjectArray[3].position.y)/RowCount-0.9;
    }

    else {
        for (let i=0; i < ItemObjectArray.length; i++) {
            totalPosX += ItemObjectArray[i].position.x;
        }
        
        xPosMean = totalPosX / ItemObjectArray.length;
        yPosMean = (ItemObjectArray[0].position.y);
    }
    //sets camera position
    camera.position.setX(xPosMean);
    camera.position.setY(yPosMean);
}

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

    //Parse
    //responseObj = readJsonFromUrl('http://localhost:4000/item/additemTEST');
    //var count = responseObj.query.count;

    UIScale(ItemObjectArray);
    CameraScale(ItemObjectArray);

    renderer.render(scene, camera);
    initListeners();
    animateScene();
}

//Main animation loop
function animateScene() {
    renderer.render(scene, camera);

    var objDetected = rHandler.raycast(camera, scene.children);
    for (child in objDetected.children) {
        if (child instanceof THREE.Mesh) {
            child.material.emissive.setHex(0xff0000);
        }
    }

    requestAnimationFrame(animateScene);
}

//Listener class and event listener initialization
function initListeners() {
    //Resizing callback function (using inline function notation)
    window.addEventListener("resize", () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth/window.innerHeight;
        camera.updateProjectionMatrix();

        UIScale(ItemObjectArray);
    });

    window.addEventListener("mousemove", (event) => {
        rHandler.setPos(event.x, event.y);
    })

    window.addEventListener("mousedown", () => {
        rHandler.setDepressed();
    });

    window.addEventListener("mouseup", () => {
        rHandler.setReleased();
    });
    
    //Scroll wheel callback function
    window.addEventListener("wheel", (event) => {
        let moveVal;
        if (Math.abs(event.deltaY) >= 10 && Math.abs(event.deltaY) < 100) {
            moveVal  = event.deltaY/10;
        }

        else if (Math.abs(event.deltaY) >= 100) {
            moveVal = event.deltaY/100;
        }

        else if (Math.abs(event.deltaY) >= 1000) {
            moveVal = event.deltaY/1000;
        }

        else {
            moveVal = event.deltaY;
        }

        if (event.deltaY > 0) {
            camera.position.setY(camera.position.y - moveVal);
        }

        else if (event.deltaY < 0) {
            camera.position.setY(camera.position.y - moveVal);
        }
    })
}

initScene();