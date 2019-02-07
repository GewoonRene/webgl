import * as THREE from 'three';

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

// Setup scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, windowWidth / windowHeight, 0.1, 1000 );

scene.background = ( new THREE.Color('skyblue'));
camera.position.z = 5;

// Cube class
function Cube( x, y, z ) {
    let geometry = new THREE.BoxGeometry( x, y, z ) ;
    let material = new THREE.MeshBasicMaterial();
    let cube = new THREE.Mesh( geometry, material );

    return cube;
}

let cubeArray = [];
for ( let i = 0; i < 3; i++) {
    cubeArray.push( new Cube( 1, 1, 1) );
    cubeArray[i].position.x = (Math.random() * (3 - -3) + -3);
    scene.add( cubeArray[i] );
}

// Create the WebGL renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( windowWidth, windowHeight );

// Render
document.body.appendChild( renderer.domElement );

let shouldGoRight = false;
function animate() {
    requestAnimationFrame( animate );

    for (let i = 0; i < cubeArray.length; i++) {
        let randomSpeed = (Math.random() * (0.1 - 0.01) + 0.01);
        if ( cubeArray[i].position.x > 3 ) {
            shouldGoRight = false;
        } else if ( cubeArray[i].position.x < -3 ) {
            shouldGoRight = true;
        }
    
        cubeArray[i].position.x = cubeArray[i].position.x += shouldGoRight ? randomSpeed : -randomSpeed;
        cubeArray[i].rotation.z = cubeArray[i].rotation.z += shouldGoRight ? randomSpeed: -randomSpeed;
    }

    // Render the scene and add the camera
    renderer.render( scene, camera );
} animate ();

