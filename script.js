let scene, camera, renderer, controls;
let currentMesh;

init();
animate();

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0f172a);

  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 3, 8);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth - 220, window.innerHeight);
  document.getElementById("canvas-container").appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  const light1 = new THREE.DirectionalLight(0xffffff, 1);
  light1.position.set(5, 10, 7);
  scene.add(light1);

  const light2 = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(light2);

  window.addEventListener("resize", onWindowResize);
}

function clearShape() {
  if (currentMesh) {
    scene.remove(currentMesh);
    currentMesh.geometry.dispose();
  }
}

function showShape(shape) {
  clearShape();

  let geometry;
  const material = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    metalness: 0.3,
    roughness: 0.4
  });

  switch (shape) {
    case "sphere":
      geometry = new THREE.SphereGeometry(1.5, 64, 64);
      break;
    case "cube":
      geometry = new THREE.BoxGeometry(2, 2, 2);
      break;
    case "cuboid":
      geometry = new THREE.BoxGeometry(3, 2, 1.5);
      break;
    case "cylinder":
      geometry = new THREE.CylinderGeometry(1, 1, 3, 64);
      break;
    case "cone":
      geometry = new THREE.ConeGeometry(1.5, 3, 64);
      break;
    case "hemisphere":
      geometry = new THREE.SphereGeometry(
        1.5,
        64,
        64,
        0,
        Math.PI * 2,
        0,
        Math.PI / 2
      );
      break;
    case "pyramid":
      geometry = new THREE.ConeGeometry(1.8, 3, 4);
      break;
    case "prism":
      geometry = new THREE.CylinderGeometry(1.2, 1.2, 3, 3);
      break;
  }

  currentMesh = new THREE.Mesh(geometry, material);
  scene.add(currentMesh);
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = (window.innerWidth - 220) / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth - 220, window.innerHeight);
}
