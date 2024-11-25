import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Timer } from "three/addons/misc/Timer.js";
import GUI from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new GUI({
  title: "Debuger GUI",
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

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(1, 64, 64),
  new THREE.MeshStandardMaterial({
    transparent: true,
    roughness: 0.6,
    metalness: 0.1,
    map: earthTexure,
  })
);
earth.position.set(5, 5, 1.5);
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
earthRotateGui.add(earth.rotation, "x").min(0).max(10).step(0.001).name("X");
// earthRotateGui.add(earth.rotation, "y").min(0).max(10).step(0.001).name("Y");
earthRotateGui.add(earth.rotation, "z").min(0).max(10).step(0.001).name("Z");

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
const orangeLight = new THREE.DirectionalLight("#FA4B00", 7);
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

console.log(timer);
const tick = () => {
  // Timer
  timer.update();
  // Update controls
  // controls.update();
  earth.rotation.y = (Math.PI / 2) * (timer._elapsed / 3000);

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
