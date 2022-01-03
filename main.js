import './style.css'

import * as THREE from 'three';
import { PointLight } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
});

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

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;


// Jason

const jasonTexture = new THREE.TextureLoader().load('images/jason.jpg');

const jason = new THREE.Mesh(
  new THREE.BoxGeometry(2.8, 2.8, 2.8),
  new THREE.MeshBasicMaterial({ map: jasonTexture })
);

scene.add(jason)


// Moon

const moonTexture = new THREE.TextureLoader().load('images/moon.jpg');
const craterTexture = new THREE.TextureLoader().load('craterMoon.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: craterTexture, 
  })
);

scene.add(moon)

// Set
moon.position.z = 30;
moon.position.setX(-10);

jason.position.z = -5;
jason.position.x = 2.5;

function moveCamera() {

  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.0075;
  moon.rotation.z += 0.05;

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
  
  moon.rotation.x += 0.005;

  //scene interaction continued
  //controls.update();

  renderer.render(scene, camera);
}


animate();
