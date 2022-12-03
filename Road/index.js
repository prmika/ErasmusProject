import * as THREE from "./three.module.js";
import * as dat from "./lil-gui.module.min.js";
import { OrbitControls } from "./OrbitControls.js";
import {CircleGeometry} from "./three.module.js";
import { FBXLoader } from 'https://cdn.skypack.dev/three@0.138.0/examples/jsm/loaders/FBXLoader';
const gui = new dat.GUI()

//////////////////////////////////////////////////////
/////////////////CREATION OF GUI//////////////////////

const world = {
    circle: {
        radius: 10,
        x: 0,
        y: 0,
        z:0
    }
}
gui.add(world.circle, 'radius', 1, 5).
    onChange(() => {

        cities[1].geometry.dispose()
        cities[1].geometry = new THREE.CircleGeometry(world.circle.radius,50,0);
});
gui.add(world.circle, 'x', -50, 50).
onChange(() => {

    cities[1].position.set(world.circle.x, cities[1].position.y, cities[1].position.z);
});
gui.add(world.circle, 'y', -50, 50).
onChange(() => {

    cities[1].position.set(cities[1].position.x, world.circle.y, cities[1].position.z);
});
gui.add(world.circle, 'z', -5, 5).
onChange(() => {

    cities[1].position.set(cities[1].position.x, cities[1].position.y, world.circle.z);
});

/////////////////END OF GUI///////////////////////////
//////////////////////////////////////////////////////


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

//////////////////////////////////////////////
////////////CREATION OF LIGHT/////////////////

const light = new THREE.DirectionalLight(0xFFFFFF, 1); //1 is the bright of the light (1 is the max)
light.position.set(0,0,1);
scene.add(light);

//////////////////////////////////////////////
////////////CREATION OF LIGHT 2/////////////////

const backLight = new THREE.AmbientLight(0xFFFFFF, 1); //1 is the bright of the light (1 is the max)

scene.add(backLight);

/////////////////////////////////////////////////////////
/////////////CREATION OF CAMERA CONTROLLER///////////////
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



//////////////////////////////////////////////
/////////////CREATION OF PLANE///////////////

const planeGeometry = new THREE.PlaneGeometry(visibleWidthAtZDepth(camera.position.z - 5, camera),visibleHeightAtZDepth(camera.position.z - 5, camera),10,10);
const planeMaterial = new THREE.MeshPhongMaterial({color: 0xFF0000, side: THREE.DoubleSide}); //MeshPhongMaterial : Material that reacts to the light
planeMaterial.flatShading = true;
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
//scene.add(planeMesh);



////////////////////////////////////////////////////////////////////////////////
/////////////////DEFINITION OF CITIES AND WAREHOUSES////////////////////////////

//Warehouses :

//longitude, latitude, altitude OR in three js axis : z, x, y
const positions = [[8.2451,40.9321,250], [8.6410,41.0072,550], [8.7613,42.1115,200], [8.6210,41.2279,700], [8.6963, 41.1844, 350]];

const circleRadius = visibleHeightAtZDepth(camera.position.z - 5,camera) / (positions.length * 2);
const circleGeometry = new THREE.CircleGeometry(circleRadius,50,0);
const circleMaterial = new THREE.MeshPhongMaterial({color: 0x00FF00, side: THREE.DoubleSide});
let cities = [];


let xMin = 0, xMax = 0, yMin = 0, yMax = 0, zMax = 0;
//We convert Geographical coordinates into Cartesian coordinates
for (let i = 0; i < positions.length; i++){
    //Formula x=... in the doc Data.pdf
    positions[i][0] = ( (50 - (-50)) / (8.7613 - 8.2451) ) * (positions[i][0] - 8.2451) + (-50);

    //Formula y=... in the doc Data.pdf
    positions[i][1] = ( (50 - (-50)) / (42.1115 - 40.8387) ) * (positions[i][1] - 40.8387) + (-50);

    //Formula z=... in the doc Data.pdf
    positions[i][2] = ( (50 - 0) / (800 - 0) ) * (positions[i][2] - 0) + 0;


    if (positions[i][0] < xMin) xMin = positions[i][0] - circleRadius;
    if (positions[i][0] > xMax) xMax = positions[i][0] + circleRadius;
    if (positions[i][1] < yMin) yMin = positions[i][1] - circleRadius;
    if (positions[i][1] > yMin) yMax = positions[i][1] + circleRadius;
    if (i == 0) zMax = positions[i][2]
    else if (positions[i][2] > zMax) zMax = positions[i][2];
    console.log("position point avant "+i+" : "+positions[i]);

}
let scaleX = (2 * visibleWidthAtZDepth(camera.position.z - 5,camera))/(xMax-xMin);
let offsetX = -xMin * 2 * visibleWidthAtZDepth(camera.position.z,camera) / (xMax - xMin) - visibleHeightAtZDepth(camera.position.z,camera);
let scaleY = (2 * visibleHeightAtZDepth(camera.position.z - 5,camera))/(yMax-yMin);
let offsetY = -yMin * 2 * visibleHeightAtZDepth(camera.position.z,camera) / (yMax - yMin) - visibleHeightAtZDepth(camera.position.z,camera);

for (let i = 0; i < positions.length; i++){
    positions[i][2] = positions[i][2] - zMax - 5 - circleRadius;

    positions[i][0] = positions[i][0] * scaleX + offsetX;
    positions[i][1] = positions[i][1] * scaleY + offsetY;

    /*

    positions[i][0] = positions[i][0] * (2 * visibleWidthAtZDepth(positions[i][2],camera))/(xMax-xMin) + (-xMin * 2 * visibleWidthAtZDepth(positions[i][2],camera) / (xMax - xMin) - visibleHeightAtZDepth(positions[i][2],camera));
    positions[i][1] = positions[i][1] * (2 * visibleHeightAtZDepth(positions[i][2],camera))/(yMax-yMin) + (-yMin * 2 * visibleHeightAtZDepth(positions[i][2],camera) / (yMax - yMin) - visibleHeightAtZDepth(positions[i][2],camera));
    */
    console.log("position point après "+i+" : "+positions[i]);
}
const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );
console.log("xMin: "+xMin);
console.log("xMax: "+xMax);
console.log("yMin: "+yMin);
console.log("yMax: "+yMax);
console.log("zMax: "+zMax);
console.log("visibleWidthAtDepth: "+ visibleWidthAtZDepth(camera.position.z - 5, camera));
console.log("visibleHeightAtDepth: "+ visibleHeightAtZDepth(camera.position.z - 5, camera));


for (let i=0; i < positions.length; i++){
    cities.push(new THREE.Mesh(circleGeometry,circleMaterial));
    cities[i].position.set(positions[i][0],positions[i][1],positions[i][2]);
    scene.add(cities[i]);
}

camera.position.z = 5; //We move back the camera to see the cube
controls.update(); //Must be called after any manual changes to the camera's transform

/////////////////////////////////////////////
//////////CREATION OF LINE///////////////////
const lineMaterial = new THREE.LineBasicMaterial( { color: 0x0000ff } );
const points = [];
points.push( new THREE.Vector3( positions[0][0], positions[0][1], positions[0][2] ) );
//points.push( new THREE.Vector3( positions[0][0], positions[0][1], positions[0][2] ) );
points.push( new THREE.Vector3( positions[1][0], positions[1][1], positions[1][2]) );

const lineGeometry = new THREE.BufferGeometry().setFromPoints( points );
const line = new THREE.Line( lineGeometry, lineMaterial );
lineMaterial.linewidth = 3;
scene.add( line );

//////////////////////////////////////////////
//////////IMPORT OF WAREHOUSE MODEL///////////

let modelScale = 0.001;
const loader = new FBXLoader();
let warehouses = [];

for (let i = 0; i<positions.length;i++) {
    loader.load('warehouse_model.fbx', function (warehouseModel) {
        warehouseModel.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        warehouseModel.scale.set(modelScale, modelScale, modelScale);

        warehouses.push(warehouseModel);
        warehouses[i].position.set(positions[i][0] - circleRadius * 3, positions[i][1], positions[i][2]);
        scene.add(warehouses[i]);
        console.log(warehouses[i].position);

    });
}
//////////////////////////////////////////
////////////INFINITE LOOP/////////////////
function animate(){
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();