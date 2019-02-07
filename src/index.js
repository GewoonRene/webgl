import * as THREE from 'three';

let camera, scene, renderer, group, controls;
let mouseX = 0, mouseY = 0;

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

init();
animate();

function init() 
{
    // Camera setup
    camera = new THREE.PerspectiveCamera( 75, windowWidth / windowHeight, 0.1, 2000 );
    camera.position.z = 50;

    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xffffff );

    // Render setup
    renderer = new THREE.WebGLRenderer( {antialias: true });
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( windowWidth, windowHeight );
    document.body.appendChild( renderer.domElement );

    // Window Resize
    window.addEventListener( 'resize', onWindowResize, false );

    // Create cube
    group = new THREE.Group();
    let geometry = new THREE.BoxBufferGeometry( 10, 10, 10 );
    let material = new THREE.MeshNormalMaterial();
    
    for ( let i = 0; i < 200; i++) {
        let mesh = new THREE.Mesh( geometry, material );
        mesh.position.x = (Math.random()*140)-80;
        mesh.position.y = (Math.random()*140)-80;
        mesh.position.z = (Math.random()*140)-80;

        mesh.rotation.x = Math.random() * 2 * Math.PI;
        mesh.rotation.y = Math.random() * 2 * Math.PI;
        
        mesh.matrixAutoUpdate = false;
	    mesh.updateMatrix();

        group.add( mesh );

    }

    // Add scene objects
    scene.add( group );

}

function animate() 
{
    requestAnimationFrame( animate );
    render();
}

function render() 
{
    // Setup rotation speed
    let time = Date.now() * 0.001;
    let rotateX = Math.sin( time * 0.7 ) * 0.5;
    let rotateY = Math.sin( time * 0.3 ) * 0.5;
    let rotateZ = Math.sin( time * 0.2 ) * 0.5;

    // Update position
    camera.position.x += ( mouseX - camera.position.x ) * 0.05;
    camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
    camera.lookAt( scene.position );

    // Animation
    group.rotation.x = rotateX;
    group.rotation.y = rotateY;
    group.rotation.z = rotateZ;

    renderer.render( scene, camera );
}

function onWindowResize()
{
    camera.aspect = windowWidth / windowHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( windowWidth, windowHeight );
}
