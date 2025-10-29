import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(2, 2, 6);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Lighting
const ambient = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambient);
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(3, 5, 2);
scene.add(dirLight);

// ---- Fuel Cell Stack Mock ----

// Base Plate
const baseGeometry = new THREE.BoxGeometry(3, 0.2, 3);
const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x555555 });
const basePlate = new THREE.Mesh(baseGeometry, baseMaterial);
basePlate.position.y = 0;
scene.add(basePlate);

// Bipolar Plate
const bipolarGeometry = new THREE.BoxGeometry(2.5, 0.3, 2.5);
const bipolarMaterial = new THREE.MeshStandardMaterial({ color: 0x8888ff });
const bipolarPlate = new THREE.Mesh(bipolarGeometry, bipolarMaterial);
bipolarPlate.position.y = 0.35;
scene.add(bipolarPlate);

// Membrane Layer
const membraneGeometry = new THREE.BoxGeometry(2.2, 0.1, 2.2);
const membraneMaterial = new THREE.MeshStandardMaterial({ color: 0xff6666 });
const membrane = new THREE.Mesh(membraneGeometry, membraneMaterial);
membrane.position.y = 0.55;
scene.add(membrane);

// Top Plate
const topGeometry = new THREE.BoxGeometry(3, 0.2, 3);
const topMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
const topPlate = new THREE.Mesh(topGeometry, topMaterial);
topPlate.position.y = 0.75;
scene.add(topPlate);

// Connector Cylinder
const connectorGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1.2, 16);
const connectorMaterial = new THREE.MeshStandardMaterial({ color: 0xdddd00 });
const connector = new THREE.Mesh(connectorGeometry, connectorMaterial);
connector.position.set(1, 0.6, 1);
scene.add(connector);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Resize handler
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
