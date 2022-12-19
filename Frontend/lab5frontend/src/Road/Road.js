import * as THREE from "three";
import {DoubleSide} from "three";

export class Road {
    //Constructeur de la classe Road
    constructor(width, city1, city2){
    this.width = width;
    this.city1 = city1;
    this.city2 = city2;
    }

    addToScene(circleRadius, positions, scene, texture_road){
        let roadGeometry = new THREE.BufferGeometry();
        let connector1Geometry = new THREE.BufferGeometry();
        let connector2Geometry = new THREE.BufferGeometry();




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
        const verticesConnector1 = new Float32Array([
            //First Connector
            positions[this.city1][0], positions[this.city1][1] - roadWidth/2,  positions[this.city1][2] - 0.01, //centre bas OK
            positions[this.city1][0] + orientXCity1ToRoad, positions[this.city1][1] - roadWidth/2,  positions[this.city1][2] - 0.01, //droite bas OK
            positions[this.city1][0] + orientXCity1ToRoad, positions[this.city1][1] + roadWidth/2,  positions[this.city1][2] - 0.01, //droite haut OK

            positions[this.city1][0] + orientXCity1ToRoad, positions[this.city1][1] + roadWidth/2,  positions[this.city1][2] - 0.01, //droite haut OK
            positions[this.city1][0], positions[this.city1][1] + roadWidth/2,  positions[this.city1][2] - 0.01, //centre haut OK
            positions[this.city1][0], positions[this.city1][1] - roadWidth/2,  positions[this.city1][2] - 0.01, //centre bas OK

        ])
        const verticesConnector2 = new Float32Array([
            //Second Connector
            positions[this.city2][0] + orientXRoadToCity2, positions[this.city2][1] - roadWidth/2,  positions[this.city2][2] - 0.01, //gauche bas OK
            positions[this.city2][0], positions[this.city2][1] - roadWidth/2,  positions[this.city2][2] - 0.01, //centre bas OK
            positions[this.city2][0], positions[this.city2][1] + roadWidth/2,  positions[this.city2][2] - 0.01, //centre haut OK


            positions[this.city2][0], positions[this.city2][1] + roadWidth/2,  positions[this.city2][2] - 0.01, //centre haut OK
            positions[this.city2][0] + orientXRoadToCity2, positions[this.city2][1] + roadWidth/2,  positions[this.city2][2] - 0.01, //gauche haut OK
            positions[this.city2][0] + orientXRoadToCity2, positions[this.city2][1] - roadWidth/2,  positions[this.city2][2] - 0.01 //gauche bas OK

        ])
        const verticesRamp = new Float32Array( [

            //The ramp
            positions[this.city1][0] + orientXCity1ToRoad, positions[this.city1][1] - roadWidth/2,  positions[this.city1][2] - 0.01, //connector1 (gauche) bas OK
            positions[this.city2][0] + orientXRoadToCity2,  positions[this.city2][1] - roadWidth/2,  positions[this.city2][2] - 0.01, //connector2(droite) bas
            positions[this.city2][0] + orientXRoadToCity2,  positions[this.city2][1] + roadWidth/2,  positions[this.city2][2] - 0.01, //connector2(droite) haut

            positions[this.city2][0] + orientXRoadToCity2,  positions[this.city2][1] + roadWidth/2,  positions[this.city2][2] - 0.01, //connector2(droite) haut
            positions[this.city1][0] + orientXCity1ToRoad, positions[this.city1][1] + roadWidth/2,  positions[this.city1][2] - 0.01, //connector1(gauche) haut OK
            positions[this.city1][0] + orientXCity1ToRoad, positions[this.city1][1] - roadWidth/2,  positions[this.city1][2] - 0.01, //connector1(gauche) bas OK

        ] );


        //let texture_road = loader.load('./textures/uv_grid.jpg');

        //texture_road.repeat.set(1/500, 1/500);
        roadGeometry.setAttribute( 'position', new THREE.BufferAttribute( verticesRamp, 3 ) );
        connector1Geometry.setAttribute( 'position', new THREE.BufferAttribute( verticesConnector1, 3 ) );
        connector2Geometry.setAttribute( 'position', new THREE.BufferAttribute( verticesConnector2, 3 ) );



        //let vecteurRoute = new THREE.Vector3(positions[this.city2][1]-positions[this.city1][1],positions[this.city2][2]-positions[this.city1][2], positions[this.city2][2]-positions[this.city1][2])
        //let vecteurRoute = new THREE.Vector3(0,1,1);
        let vecteurRoute = new THREE.Vector3(positions[1][0], positions[1][1], positions[1][2]);
        let longueurRoute = Math.sqrt(Math.pow((positions[this.city1][0]-positions[this.city2][0]),2)+Math.pow((positions[this.city1][1]-positions[this.city2][1]),2)+Math.pow((positions[this.city1][2]-positions[this.city2][2]),2))
        let testRoad = new THREE.PlaneBufferGeometry(longueurRoute,roadWidth,2,1);
        //Ajouter la rotation
        testRoad.lookAt(vecteurRoute);
        //testRoad.translate((positions[this.city1][0]+positions[this.city2][0])/2, (positions[this.city1][1]+positions[this.city2][1])/2, (positions[this.city1][2]+positions[this.city2][2])/2);
        let testRoadMesh = new THREE.Mesh(testRoad, new THREE.MeshStandardMaterial({map: texture_road, side: THREE.DoubleSide}));
        testRoadMesh.position.set((positions[this.city1][0]+positions[this.city2][0])/2, (positions[this.city1][1]+positions[this.city2][1])/2, (positions[this.city1][2]+positions[this.city2][2])/2);
        //mesh1.rotateX(Math.pow(Math.atan((positions[this.city2][1]-positions[this.city1][1]) / (positions[this.city2][0]-positions[this.city1][0])),2));
        //scene.add(testRoadMesh);



        let textureLoader = new THREE.TextureLoader();
        let texture_sky = textureLoader.load('./textures/texture_sky.jpg');
        scene.background = texture_sky;
        const uvs = [
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            /*0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            0.0, 0.0,*/

        ];
        //roadGeometry.computeVertexNormals();
        roadGeometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
        connector1Geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
        connector2Geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
        //We set the roads in asphalt grey and we enable the DoubleSide attribute which allows us to see the road from the two sides.
        texture_road.wrapS = THREE.RepeatWrapping;
        texture_road.wrapT = THREE.RepeatWrapping;
        texture_road.offset.set( 0, 0 );

        const roadMaterial = new THREE.MeshBasicMaterial( { map: texture_road, side: DoubleSide } );
        const roadMesh = new THREE.Mesh( roadGeometry, roadMaterial );
        const connector1Mesh = new THREE.Mesh(connector1Geometry, roadMaterial);
        const connector2Mesh = new THREE.Mesh(connector2Geometry, roadMaterial);
        roadMesh.receiveShadow = true;
        roadMesh.castShadow = true;
        connector1Mesh.receiveShadow = true;
        connector1Mesh.castShadow = true;
        connector2Mesh.receiveShadow = true;
        connector2Mesh.castShadow = true;
        scene.add(roadMesh);
        scene.add(connector1Mesh);
        scene.add(connector2Mesh);
    }
}