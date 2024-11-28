import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Timer } from "three/addons/misc/Timer.js";
import GUI from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new GUI({
  title: "Debuger",
}).close();
const earthGui = gui.addFolder("Earth Control").close();
const earthPositionGui = earthGui.addFolder("Earth Position").close();
const earthRotateGui = earthGui.addFolder("Earth Rotate").close();
const lightGui = gui.addFolder("Light Control").close();
const whiteLightGui = lightGui.addFolder("White Light").close();
const orangeLightGui = lightGui.addFolder("Orange Light").close();

// Canvas
const canvas = document.querySelector("canvas#threeJS");

// Scene
const scene = new THREE.Scene();

/**
 * Earth
 */
const textureLoader = new THREE.TextureLoader();
const earthTexure = textureLoader.load("./textures/world.png");
earthTexure.colorSpace = THREE.SRGBColorSpace;

let earthPos = { x: 5, y: 5, z: 1.8 };
let earthRot = { x: 0, y: 2.5, z: 0 };
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(1, 64, 64),
  new THREE.MeshStandardMaterial({
    transparent: true,
    roughness: 0.6,
    metalness: 0.1,
    map: earthTexure,
  })
);
earth.position.set(earthPos.x, earthPos.y, earthPos.z);
scene.add(earth);

earthGui
  .add(earth.material, "roughness")
  .min(0)
  .max(1)
  .step(0.0001)
  .name("roughness");
earthGui
  .add(earth.material, "metalness")
  .min(0)
  .max(1)
  .step(0.0001)
  .name("metalness");
earthPositionGui.add(earth.position, "x").min(0).max(10).step(0.001).name("X");
earthPositionGui.add(earth.position, "y").min(0).max(10).step(0.001).name("Y");
earthPositionGui.add(earth.position, "z").min(0).max(10).step(0.001).name("Z");
earthRotateGui.add(earth.rotation, "x").min(-1).max(1).step(0.001).name("X");
// earthRotateGui.add(earth.rotation, "y").min(0).max(10).step(0.001).name("Y");
earthRotateGui.add(earth.rotation, "z").min(-1).max(1).step(0.001).name("Z");

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight("#ffffff", 0.07);
scene.add(ambientLight);

lightGui
  .add(ambientLight, "intensity")
  .min(0)
  .max(1)
  .step(0.0001)
  .name("ambient-light-opacity");

// White light
const whiteLight = new THREE.DirectionalLight("#FFFFFF", 3);
whiteLight.position.set(3, 2, 1);
scene.add(whiteLight);

whiteLightGui
  .add(whiteLight, "intensity")
  .min(0)
  .max(10)
  .step(0.0001)
  .name("INTENSITY");
whiteLightGui
  .add(whiteLight.position, "x")
  .min(-10)
  .max(10)
  .step(0.001)
  .name("POSITION X");
whiteLightGui
  .add(whiteLight.position, "y")
  .min(-10)
  .max(10)
  .step(0.001)
  .name("POSITION Y");
whiteLightGui
  .add(whiteLight.position, "z")
  .min(-10)
  .max(10)
  .step(0.001)
  .name("POSITION Z");

// orage light
const orangeLight = new THREE.DirectionalLight("#FA4B00", 5);
orangeLight.position.set(-10, -4, 1);
scene.add(orangeLight);

orangeLightGui
  .add(orangeLight, "intensity")
  .min(0)
  .max(10)
  .step(0.0001)
  .name("INTENSITY");
orangeLightGui
  .add(orangeLight.position, "x")
  .min(-10)
  .max(10)
  .step(0.001)
  .name("POSITION X");
orangeLightGui
  .add(orangeLight.position, "y")
  .min(-10)
  .max(10)
  .step(0.001)
  .name("POSITION Y");
orangeLightGui
  .add(orangeLight.position, "z")
  .min(-10)
  .max(10)
  .step(0.001)
  .name("POSITION Z");

// mouse following light
const followLight = new THREE.DirectionalLight("#FA4B00", 0);
followLight.position.set(-10, -4, 2);
scene.add(followLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  1,
  100
);
camera.position.set(5, 5, 5);
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const timer = new Timer();
let animStart = false;
let earthYrotSpeed = 0.01;

const tick = () => {
  // Timer
  timer.update();
  // Update controls
  // controls.update();

  //animation
  if (animStart) {
    earthPos.x < 6.5 ? (earthPos.x += 0.05) : true;
    earthPos.y > 4.85 ? (earthPos.y -= 0.05) : true;
    earthPos.z > 1.1 ? (earthPos.z -= 0.05) : true;

    earthRot.x > -0.3 ? (earthRot.x -= 0.05) : true;
    earthRot.z > -0.09 ? (earthRot.z -= 0.05) : true;

    earth.position.set(earthPos.x, earthPos.y, earthPos.z);
    earth.rotation.x = earthRot.x;
    earth.rotation.z = earthRot.z;
  }

  //earth rotation animation
  earthRot.y += earthYrotSpeed;
  earth.rotation.y = earthRot.y;

  // Render
  renderer.render(scene, camera);
  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

//anim
setTimeout(() => {
  document.body.classList.add("active");
  animStart = true;
  earthYrotSpeed = 0.018;

  orangeLight.intensity = 0.5;
  followLight.intensity = 3;

  setTimeout(() => {
    animStart = false;
  }, 1000);
}, 2000);

document.body.addEventListener(
  "mousemove",
  (e) => {
    let x = (e.x * 5) / window.innerWidth - 2.5;
    let y = ((e.y * 5) / window.innerHeight - 2.5) * -1;

    followLight.position.x = x;
    followLight.position.y = y;
    console.log(x, y);
  },
  false
);
