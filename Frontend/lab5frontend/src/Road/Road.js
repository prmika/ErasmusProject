import * as THREE from "three";
import {DoubleSide} from "three";

export class Road {
    //Constructeur de la classe Road
    constructor(width, city1, city2){
    this.width = width;
    this.city1 = city1;
    this.city2 = city2;
    }

    addToScene(circleRadius, positions, scene){
        let roadGeometry = new THREE.BufferGeometry();
        //We load the texture of the road
        let loader = new THREE.TextureLoader();


        const roadWidth = 2;
        //connectorScale1/2 are used to harmonize the size of all city connectors. The size will be 1.5 times the circle radius
        const connectorScale1 = 1.5 * circleRadius/Math.abs((positions[this.city2][0] - positions[this.city1][0]));
        const connectorScale2 = 1.5 * circleRadius/Math.abs((positions[this.city1][0] - positions[this.city2][0]));
        //These two variables are used to orient the city connectors to the next warehouse.
        const orientXCity1ToRoad = (positions[this.city2][0] - positions[this.city1][0]) * connectorScale1;
        const orientXRoadToCity2 = (positions[this.city1][0] - positions[this.city2][0]) * connectorScale2;

        //This array contains all the points needed to form the triangles that will form the road. 2 triangles will form a rectangle.
        // The (+ roadWidth/2) and (- roadWidth/2) are used to center the road with the circle of the cities.
        // The (+ (positions[city2][0] - positions[city1][0]) * 0.1) and (- (positions[city2][0] - positions[city1][0]) * 0.1) are used to orient the connector to the next city, and to set up the length of this connector.
        //The (positions(city][2]-0.01) puts the road in the bottom (infinitesimal) of the city.
        const vertices = new Float32Array( [
            //First Connector
            positions[this.city1][0], positions[this.city1][1] - roadWidth/2,  positions[this.city1][2] - 0.01, //centre bas OK
            positions[this.city1][0] + orientXCity1ToRoad, positions[this.city1][1] - roadWidth/2,  positions[this.city1][2] - 0.01, //droite bas OK
            positions[this.city1][0] + orientXCity1ToRoad, positions[this.city1][1] + roadWidth/2,  positions[this.city1][2] - 0.01, //droite haut OK


            positions[this.city1][0] + orientXCity1ToRoad, positions[this.city1][1] + roadWidth/2,  positions[this.city1][2] - 0.01, //droite haut OK
            positions[this.city1][0], positions[this.city1][1] + roadWidth/2,  positions[this.city1][2] - 0.01, //centre haut OK
            positions[this.city1][0], positions[this.city1][1] - roadWidth/2,  positions[this.city1][2] - 0.01, //centre bas OK

            //The ramp
            positions[this.city1][0] + orientXCity1ToRoad, positions[this.city1][1] - roadWidth/2,  positions[this.city1][2] - 0.01, //connector1 (gauche) bas OK
            positions[this.city2][0] + orientXRoadToCity2,  positions[this.city2][1] - roadWidth/2,  positions[this.city2][2] - 0.01, //connector2(droite) bas
            positions[this.city2][0] + orientXRoadToCity2,  positions[this.city2][1] + roadWidth/2,  positions[this.city2][2] - 0.01, //connector2(droite) haut

            positions[this.city2][0] + orientXRoadToCity2,  positions[this.city2][1] + roadWidth/2,  positions[this.city2][2] - 0.01, //connector2(droite) haut
            positions[this.city1][0] + orientXCity1ToRoad, positions[this.city1][1] + roadWidth/2,  positions[this.city1][2] - 0.01, //connector1(gauche) haut OK
            positions[this.city1][0] + orientXCity1ToRoad, positions[this.city1][1] - roadWidth/2,  positions[this.city1][2] - 0.01, //connector1(gauche) bas OK

            //Second Connector
            positions[this.city2][0] + orientXRoadToCity2, positions[this.city2][1] - roadWidth/2,  positions[this.city2][2] - 0.01, //gauche bas OK
            positions[this.city2][0], positions[this.city2][1] - roadWidth/2,  positions[this.city2][2] - 0.01, //centre bas OK
            positions[this.city2][0], positions[this.city2][1] + roadWidth/2,  positions[this.city2][2] - 0.01, //centre haut OK


            positions[this.city2][0], positions[this.city2][1] + roadWidth/2,  positions[this.city2][2] - 0.01, //centre haut OK
            positions[this.city2][0] + orientXRoadToCity2, positions[this.city2][1] + roadWidth/2,  positions[this.city2][2] - 0.01, //gauche haut OK
            positions[this.city2][0] + orientXRoadToCity2, positions[this.city2][1] - roadWidth/2,  positions[this.city2][2] - 0.01 //gauche bas OK

        ] );
        let texture_road = loader.load('./textures/texture_road.jpg');
        texture_road.wrapS = THREE.RepeatWrapping;
        texture_road.wrapT = THREE.RepeatWrapping;
        roadGeometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
        let texture_sky = loader.load('./textures/texture_sky.jpg');
        scene.background = texture_sky;
        //We set the roads in asphalt grey and we enable the DoubleSide attribute which allows us to see the road from the two sides.
        const roadMaterial = new THREE.MeshBasicMaterial( { map: texture_road, side: DoubleSide } );
        const roadMesh = new THREE.Mesh( roadGeometry, roadMaterial );
        scene.add(roadMesh);
    }
}