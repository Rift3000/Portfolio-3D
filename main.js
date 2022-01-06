import './style.css'

import * as THREE from 'three';
import { PointLight } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  // true for mobile device
  alert("Please use PC for optimal viewing");
}else{
  // false for not mobile device
}

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
});

//Audio

//get element and play

//const playButton = document.getElementById( 'playButton' );
//playButton.addEventListener('click', start);

// create a global audio source
//const sound = new THREE.Audio( listener );

// load a sound and set it as the Audio object's buffer

window.onload = function() {
  const listener = new THREE.AudioListener();
  camera.add( listener );

  /*
  const audioLoader = new THREE.AudioLoader();
  audioLoader.load( 'sounds/forest.ogg', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setLoop( true );
	sound.setVolume( 0.5 );
	sound.play();
  });
  */

  const main = new THREE.Audio( listener );
  const songElement = document.getElementById( 'mozart' );
  //sound4.setMediaElementSource( utopiaElement );
  main.setVolume(0.21);
  songElement.play();

}

//play sound when pressed

/*
function start() {

  const listener = new THREE.AudioListener();
  camera.add( listener );

  const main = new THREE.Audio( listener );
  const songElement = document.getElementById( 'mozart' );
  //sound4.setMediaElementSource( utopiaElement );
  main.setVolume( 0.5 );
  songElement.play();
} 
*/


//Our screen view
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

//Our object, it stares at my soul
/*
const geometry = new THREE.TorusGeometry(50, 3, 16, 100)
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus)
*/


const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(ambientLight)

//interact with scene using mouse
//const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('images/space2.png');
scene.background = spaceTexture;


// Jason

const jasonTexture = new THREE.TextureLoader().load('images/jason.jpg');

const jason = new THREE.Mesh(
  new THREE.BoxGeometry(2.8, 2.8, 2.8),
  new THREE.MeshBasicMaterial({ map: jasonTexture })
);

scene.add(jason)


// Planets

const venusTexture = new THREE.TextureLoader().load('images/venus.jpg');
const venusCraterTexture = new THREE.TextureLoader().load('images/venusCrater.jpg');

const venus = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: venusTexture,
    normalMap: venusCraterTexture, 
  })
);

const earthTexture = new THREE.TextureLoader().load('images/earth.jpg');
const earthCraterTexture = new THREE.TextureLoader().load('images/earthCrater.jpg');

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(3, 36, 36),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
    normalMap: earthCraterTexture, 
  })
);

const moonTexture = new THREE.TextureLoader().load('images/moon.jpg');
const moonCraterTexture = new THREE.TextureLoader().load('images/craterMoon.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 20, 20),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: moonCraterTexture, 
  })
);


const marsTexture = new THREE.TextureLoader().load('images/mars.jpg');
const marsCraterTexture = new THREE.TextureLoader().load('images/marsCrater.jpg');

const mars = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: marsTexture,
    normalMap: marsCraterTexture, 
  })
);


const jupiterTexture = new THREE.TextureLoader().load('images/jupiter.jpg');
const jupiterCraterTexture = new THREE.TextureLoader().load('images/jupiterCrater.jpg');

const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(3, 40, 40),
  new THREE.MeshStandardMaterial({
    map: jupiterTexture,
    normalMap: jupiterCraterTexture, 
  })
);



scene.add(venus,earth,moon,mars,jupiter)

// Position
venus.position.z = 10;
venus.position.setX(-4);

earth.position.z = 24;
earth.position.setX(-4);

moon.position.z = 38;
moon.position.setX(-4);

mars.position.z = 55;
mars.position.setX(-4);

jupiter.position.z = 70;
jupiter.position.setX(-4);

jason.position.z = -5;
jason.position.x = 2.5;

function moveCamera() {

  const t = document.body.getBoundingClientRect().top;
  venus.rotation.x += 0.05;
  venus.rotation.y += 0.0075;
  venus.rotation.z += 0.05;

  earth.rotation.x += 0.05;
  earth.rotation.y += 0.0075;
  earth.rotation.z += 0.05;

  moon.rotation.x += 0.05;
  moon.rotation.y += 0.0075;
  moon.rotation.z += 0.05;

  mars.rotation.x += 0.05;
  mars.rotation.y += 0.0075;
  mars.rotation.z += 0.05;

  jupiter.rotation.x += 0.05;
  jupiter.rotation.y += 0.0075;
  jupiter.rotation.z += 0.05;

  jason.rotation.y += -0.01;
  //jason.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();


//Animate that scene
function animate() {
  requestAnimationFrame(animate);

  /*
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  */
  
  jason.rotation.y += -0.002;
  
  venus.rotation.x += 0.005;

  earth.rotation.x += 0.005;

  moon.rotation.x += 0.005;

  mars.rotation.x += 0.005;

  jupiter.rotation.x += 0.005;

  //scene interaction continued
  //controls.update();

  renderer.render(scene, camera);
}


animate();
