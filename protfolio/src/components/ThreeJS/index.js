import "../../style.css";
import * as THREE from "three";
import * as dat from "dat.gui";

export function ThreeJS() {
  // Loading
  const textureLoader = new THREE.TextureLoader();
  const normalTexture = textureLoader.load("/textures/NormalMap_Moon.png");

  // Debug
  const gui = new dat.GUI();

  // Canvas
  const canvas = document.querySelector("canvas.webgl");

  // Scene
  const scene = new THREE.Scene();

  // Objects

  const sphereGeometry = new THREE.SphereGeometry(0.5, 64, 64);

  // Materials

  const material = new THREE.MeshStandardMaterial();
  material.metalness = 0.7;
  material.roughness = 0.2;
  material.normalMap = normalTexture;
  material.color = new THREE.Color(0xbd87ec);

  // Mesh
  const sphere = new THREE.Mesh(sphereGeometry, material);
  scene.add(sphere);

  // Lights

  const pointLight3 = new THREE.PointLight(0xffffff, 2);
  pointLight3.position.set(-3, 2, 2.85);
  pointLight3.intensity = 10;
  scene.add(pointLight3);

  const light3 = gui.addFolder("Light3");
  light3.add(pointLight3.position, "y").min(-3).max(3).step(0.01);
  light3.add(pointLight3.position, "x").min(-6).max(6).step(0.01);
  light3.add(pointLight3.position, "z").min(-3).max(3).step(0.01);
  light3.add(pointLight3, "intensity").min(0).max(10).step(0.01);

  const light3Color = {
    color: 0xbd87ec,
  };

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
    alpha: true,
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  /**
   * Animate
   */

  document.addEventListener("mousemove", onDocumentMouesMove);

  let mouseX = 0;
  let mouseY = 0;

  let targetX = 0;
  let targetY = 0;

  const windowHalfX = window.innerWidth / 2;
  const windowHalfY = window.innerHeight / 2;

  function onDocumentMouesMove(event) {
    mouseX = (event.clientX - windowHalfX) / 2; // 이벤트 객체에서 현재 보이는 화면의 수평값 - 전체 화면의 수평값
    mouseY = (event.clientY - windowHalfY) / 2; // 이벤트 객체에서 현재 보이는 화면의 수직값 - 전체 화면의 수직값
  }
  // 스크롤을 할대 위로 올라가는 느낌을 줘보자
  window.addEventListener("scroll", updataShpere);

  function updataShpere(event) {
    sphere.position.y = window.scrollY * 0.001;
  }
  const clock = new THREE.Clock();

  const tick = () => {
    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;

    const elapsedTime = clock.getElapsedTime();

    // Update objects
    sphere.rotation.y = 0.5 * elapsedTime;

    // 변경되는 값을 적용시키기
    sphere.rotation.y += 0.5 * (targetX - sphere.rotation.y);
    sphere.rotation.x += 0.5 * (targetY - sphere.rotation.x);
    sphere.position.z += -0.05 * (targetY - sphere.rotation.x);
    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
  };

  tick();
}
