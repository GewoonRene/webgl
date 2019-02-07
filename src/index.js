import * as THREE from 'three';

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

// Setup scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, windowWidth / windowHeight, 0.1, 1000 );

// Create the cube
let geometry = new THREE.BoxGeometry( 1, 1, 1) ;
let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
let cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

// Create the WebGL renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( windowWidth, windowHeight );

// Render
document.body.appendChild( renderer.domElement );

function animate() {
    requestAnimationFrame( animate );

    // Lets rotate the cube every time we call animate
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    // Render the scene with the camera
    renderer.render( scene, camera );
} 
