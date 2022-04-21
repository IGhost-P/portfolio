import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

// Loading
const textureLoader = new THREE.TextureLoader(); // 텍스쳐를 가져오기위함
const normalTexture = textureLoader.load("/textures/NormalMap.png"); // 텍스쳐를 가져온다

// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
// const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );
const sphereGeometry = new THREE.SphereGeometry(0.5, 64, 64); // class 이름이 조금 변경됨

// Materials

const material = new THREE.MeshStandardMaterial();
material.metalness = 0.7;
material.roughness = 0.2;
material.normalMap = normalTexture;
material.color = new THREE.Color(0x292929);

// Mesh
const sphere = new THREE.Mesh(sphereGeometry, material);
scene.add(sphere);

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

// Lights 2
// LIGHTS를 좀더 늘려보자
const pointLight2 = new THREE.PointLight(0xff0000, 2);
// 위치 조정
// pointLight.position.x = 2;
// pointLight.position.y = 3;
// pointLight.position.z = 4;
pointLight2.position.set(1, 1, 1); // == x,y,z
scene.add(pointLight2);

// gui를 이용해 control을 할수있다
// gui.add(pointLight2.position, "y");

// gui 옵션을 이용해 value를 설정할수 있다
gui.add(pointLight2.position, "y").min(-3).max(3).step(0.01);
gui.add(pointLight2.position, "x").min(-6).max(6).step(0.01);
gui.add(pointLight2.position, "z").min(-3).max(3).step(0.01);
gui.add(pointLight2, "intensity").min(0).max(10).step(0.01);

// pointLigth를 도와주는 helper를 만들수 있다
const pointLightHelper = new THREE.PointLightHelper(pointLight2, 1);
scene.add(pointLightHelper);

// Light 3

const pointLight3 = new THREE.PointLight(0xff0000, 2);
pointLight3.position.set(-1.86, 1, -1.65);
pointLight3.intensity = 10;
scene.add(pointLight3);

// gui 하나에 다 보여주지말고  폴더로 보여줄수도 있다

const light3 = gui.addFolder("Light3");
light3.add(pointLight3.position, "y").min(-3).max(3).step(0.01);
light3.add(pointLight3.position, "x").min(-6).max(6).step(0.01);
light3.add(pointLight3.position, "z").min(-3).max(3).step(0.01);
light3.add(pointLight3, "intensity").min(0).max(10).step(0.01);

const light3Color = {
  color: 0xff0000,
};
// gui에 색깔의 기본값을 설정해주고 , gui를 통해 색깔을 변경할수 있게 해준다
light3.addColor(light3Color, "color").onChange(() => {
  pointLight3.color.set(light3Color.color);
});

const pointLightHelper2 = new THREE.PointLightHelper(pointLight3, 1);
scene.add(pointLightHelper2);
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
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true, // 배그라운드를 투명하게 하기 위해서 사용함
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.5 * elapsedTime;

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
