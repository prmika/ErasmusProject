import * as THREE from "three";
import * as dat from "./lil-gui.module.min.js";
import { OrbitControls } from "./three.js-master/examples/jsm/controls/OrbitControls.js"
import {CircleGeometry, Object3D} from "three";
import { FBXLoader } from 'https://cdn.skypack.dev/three@0.138.0/examples/jsm/loaders/FBXLoader';
import {DoubleSide} from "three";
import { GLTFLoader } from "./GLTFLoader.js";
import { Road } from "./Road.js";

//////////////////////////////////////////////////////
////////////CREATION OF SCENE AND CAMERA//////////////
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75, //Degree of view of the camera
    window.innerWidth / window.innerHeight, //Ratio
    0.1, //Clipping plane of the objects near to camera
    1000) //Clipping plane of the objects far from camera
    //We will see objects that are in a distance between 0.1 to 1000
camera.up= new THREE.Vector3(0,0,1); //We define the z axis as the top axis

//////////////////////////////////////////////
////////////CREATION OF RENDERER//////////////
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(devicePixelRatio); //Avoid jagging of meshes
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;
renderer.shadowMapSoft = true;

renderer.shadowCameraNear = 3;
renderer.shadowCameraFar = camera.far;
renderer.shadowCameraFov = 50;

renderer.shadowMapBias = 0.0039;
renderer.shadowMapDarkness = 0.5;
renderer.shadowMapWidth = 1024;
renderer.shadowMapHeight = 1024;

//////////////////////////////////////////////
///////////CREATION OF A SUN//////////////////
const skyColor = 0xB1E1FF;  // light blue
const groundColor = 0xB97A20;  // brownish orange
const intensity = 0.5;
const hemispherelight = new THREE.HemisphereLight(skyColor, groundColor, intensity);
scene.add(hemispherelight);


let sunLight = new THREE.DirectionalLight(0xffffff, 1);
sunLight.castShadow = true; //We enable the shadows
//const cameraHelper = new THREE.CameraHelper(sunLight.shadow.camera);
//scene.add(cameraHelper);
let d = 100;
sunLight.shadow.camera.left = -d;
sunLight.shadow.camera.right = d;
sunLight.shadow.camera.top = d;
sunLight.shadow.camera.bottom = -d;

sunLight.target.updateMatrixWorld();
scene.add(sunLight);

//Set up shadow properties for the light
sunLight.shadow.mapSize.width = 512; // default
sunLight.shadow.mapSize.height = 512; // default
sunLight.shadow.camera.near = 0.5; // default
sunLight.shadow.camera.far = 500; // default

/////////////////////////////////////////////////////////
/////////////CREATION OF CAMERA CONTROLLER///////////////

//We create a new Orbit controller. We will use it at the end of the file.
const controls = new OrbitControls( camera, renderer.domElement );

//Source of visibleHeightAtZDepth and visibleWidthAtZDepth: https://discourse.threejs.org/t/functions-to-calculate-the-visible-width-height-at-a-given-z-depth-from-a-perspective-camera/269
const visibleHeightAtZDepth = ( depth, camera ) => {
    // compensate for cameras not positioned at z=0
    const cameraOffset = camera.position.z;
    if ( depth < cameraOffset ) depth -= cameraOffset;
    else depth += cameraOffset;

    // vertical fov in radians
    const vFOV = camera.fov * Math.PI / 180;

    // Math.abs to ensure the result is always positive
    return 2 * Math.tan( vFOV / 2 ) * Math.abs( depth );
};

const visibleWidthAtZDepth = ( depth, camera ) => {
    const height = visibleHeightAtZDepth( depth, camera );
    return height * camera.aspect;
};

////////////////////////////////////////////////////////////////////////////////
/////////////////DEFINITION OF WAREHOUSES LOCATIONS////////////////////////////

//Warehouses longitude, latitude, altitude OR in three js axis : z, x, y
const positions = [
    [8.2451,40.9321,250],
    [8.6410,41.0072,550],
    [8.7613,42.1115,200],
    [8.6210,41.2279,700],
    [8.6963, 41.1844, 350],
    [8.4770, 40.8387, 750],
    [8.3304, 41.2052, 0],
    [8.6291, 41.1579, 600],
    [8.7609, 41.3804, 400],
    [8.5483, 40.9268, 100],
    [8.4738, 41.3431, 650],
    [8.4907, 40.9005, 300],
    [8.5600, 41.3391, 450],
    [8.3956, 40.8430, 50],
    [8.4983, 41.1887, 800],
    [8.7479, 41.3517, 150],
    [8.6118, 41.1239, 500]
];




//sunLight.position.set(0,0,0);
sunLight.position.set(positions[0][0], positions[0][1], positions[0][2]+10);
sunLight.target.updateMatrixWorld();

//We define the radius of the circles that will represent the cities.
let textureLoader = new THREE.TextureLoader();
let texture_city = textureLoader.load('./textures/texture_road.jpg');
texture_city.wrapS = THREE.RepeatWrapping;
texture_city.wrapT = THREE.RepeatWrapping;
const circleRadius = 3;
const circleGeometry = new THREE.CircleGeometry(circleRadius,50,0);
const circleMaterial = new THREE.MeshPhongMaterial({map: texture_city, side: THREE.DoubleSide});


//This array will contain all the cities.
let cities = [];

//These values will allow us to replace the camera and the center of the orbit controller according to the positions of the cities.
let xMin = 0, xMax = 0, yMin = 0, yMax = 0, zMax = 0;

//We convert Geographical coordinates into Cartesian coordinates
for (let i = 0; i < positions.length; i++){
    //Formula x=... in the doc Data.pdf
    positions[i][0] = ( (50 - (-50)) / (8.7613 - 8.2451) ) * (positions[i][0] - 8.2451) + (-50);

    //Formula y=... in the doc Data.pdf
    positions[i][1] = ( (50 - (-50)) / (42.1115 - 40.8387) ) * (positions[i][1] - 40.8387) + (-50);

    //Formula z=... in the doc Data.pdf
    positions[i][2] = ( (50 - 0) / (800 - 0) ) * (positions[i][2] - 0) + 0;

    //We determine the extreme values of x, y and z from all the cities to readjust the orbit controller and to move the camera as needed.
    if (positions[i][0] < xMin) xMin = positions[i][0] - circleRadius;
    if (positions[i][0] > xMax) xMax = positions[i][0] + circleRadius;
    if (positions[i][1] < yMin) yMin = positions[i][1] - circleRadius;
    if (positions[i][1] > yMin) yMax = positions[i][1] + circleRadius;
    if (i == 0) zMax = positions[i][2]
    else if (positions[i][2] > zMax) zMax = positions[i][2];
    //console.log("position point avant "+i+" : "+positions[i]);

}

//We move the cities in front of us
for (let i = 0; i < positions.length; i++){
    positions[i][2] = positions[i][2] - 2 * zMax - 3;
}

//We create a visual representation of the 3 axis to debug
const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

//We add the circles representing the cities in the scene.
for (let i=0; i < positions.length; i++){
    cities.push(new THREE.Mesh(circleGeometry,circleMaterial));
    cities[i].castShadow = true;
    cities[i].receiveShadow = true;
    cities[i].position.set(positions[i][0],positions[i][1],positions[i][2]);
    scene.add(cities[i]);
}

camera.position.z = +5; //We move back the camera to better see the cities.
controls.update(); //Must be called after any manual changes to the camera's transform

//////////////////////////////////////////////
////////////IMPORT OF TRUCK MODEL/////////////
let truck;
new GLTFLoader().load("./models/gltf/truck.glb", (truckModel) => {
    truck = truckModel.scene;
    truck.traverse(function (child) {
        if (child.isMesh) {
            child.castShadow = true
            child.receiveShadow = true
        }
    })
    if(positions[0]) truck.position.set(positions[0][0],positions[0][1],positions[0][2]);
    truck.rotateX(Math.PI/2);
    truck.castShadow = true;
    truck.receiveShadow = true;
    scene.add(truck);
});

//////////////////////////////////////////////
//////////IMPORT OF WAREHOUSE MODEL///////////
const fbxLoader = new FBXLoader();
let modelScale = 0.005; //This is the scale factor of the warehouse model, to avoid it to be huge.
let warehouses = []; //This array will contain all the warehouses models.

//We add a warehouse 3d model in the scene at the side of each city.
for (let i = 0; i<positions.length;i++) {
    fbxLoader.load('./models/fbx/warehouse_model.fbx', function (warehouseModel) {
        /*warehouseModel.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });*/
        warehouseModel.scale.set(modelScale, modelScale, modelScale);
        warehouseModel.rotateY(1.5707963268);
        warehouseModel.rotateZ(1.5707963268);

        warehouses.push(warehouseModel);
        warehouses[i].position.set(positions[i][0] - circleRadius * 3, positions[i][1], positions[i][2]);
        console.log("gloubiboulga");
        scene.add(warehouses[i]);
    });
}

//This function allows us to generate an integer number higher than 0 and lower strictly than max.
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

//We connect each city to 2 other random cities.
//We load the texture of the road and sky
let texture_sky = textureLoader.load('./textures/texture_sky.jpg');
scene.background = texture_sky;
let texture_road = textureLoader.load('./textures/texture_road3.jpg');
let routes = [];
let randomCity2;
for (let i=0; i<positions.length; i++){
    do{
        randomCity2 = getRandomInt(positions.length);
    }while(randomCity2 == i); //This makes impossible to connect a city to itself
    routes.push(new Road(3, i, randomCity2, circleRadius, positions, texture_road)); //We add the road between City i and an other one in the list of roads
    routes[i].addToScene(scene);// We connect the 2 cities.
/*
    do{
       route.city2 = getRandomInt(positions.length);
        route.addToScene(circleRadius, positions, scene);// We connect the 2 cities.
    }while (route.city2 == randomCity || route.city2 == i); //This makes impossible to connect a city to itself or to the precedent city.
*/
}
console.log(routes);
//This function add a road between the city 1 and the city 2
// let route = new Road(1,2,3,circleRadius,positions,texture_road);
// route.addToScene(scene);
// console.log(route);


//We put the center of the OrbitControl at the center of the cities
controls.target.set( (xMax+xMin)/2, (yMax+yMin)/2, (positions[0][2]+positions[1][2])/2 ); //We put the center of the orbit controller at the middle of the cities to  make the control more convenient.



//////////////////////////////////////////
////////////TRUCK MOTION/////////////////

// Event listeners to handle key down and key up events
window.addEventListener('keydown', onKeyDown);
window.addEventListener('keyup', onKeyUp);
let fast = 1; //Acceleration of the truck
const fastMax = 3; //Max speed of the truck
function onKeyDown(event) {
    // update the movement vector based on the key that was pressed
    switch (event.keyCode) {
        case 90: // Z key
            if(truck) {
                truck.translateZ(0.1 * fast);
                if(fast < fastMax){ //We accelerate the truck until it reach its max speed
                    fast += 0.5;
                }
            }
            break;
        case 81: // Q key
            if(truck) truck.rotation.y += 0.2;
            break;
        case 83: // S key
            if(truck) {
                truck.translateZ(-0.1 * fast);
                if(fast < fastMax){ //We accelerate the truck until it reach its max speed
                    fast += 0.5;
                }
            }
            break;
        case 68: // D key
            if(truck) truck.rotation.y -= 0.1;
            break;
    }
}

function onKeyUp(event) {
    // update the movement vector based on the key that was released
    switch (event.keyCode) {
        case 90: // Z key
            fast = 1; //We reset the acceleration of the truck
            break;
        case 81: // Q key
            if(truck) truck.rotation.z = 0;
            break;
        case 83: // S key
            fast = 1; //We reset the acceleration of the truck
            break;
        case 68: // D key
            if(truck) truck.rotation.z = 0;
            break;
    }
}

//////////////////////////////////////////
////////////INFINITE LOOP/////////////////

//This is the infinite loop that animates the scene
function animate(){
    if(truck) console.log(truck.collision);
    //if(truck) updateTruck();
    requestAnimationFrame(animate);
    controls.update(); //We update the orbit controller
    renderer.render(scene, camera);
}

animate(); //We call the function that animates the scene.