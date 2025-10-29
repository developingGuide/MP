import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0e0e0e);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(3, 3, 8);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Lighting
scene.add(new THREE.AmbientLight(0xffffff, 0.6));
const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
dirLight.position.set(5, 10, 5);
scene.add(dirLight);

// Helper function to create layers
function createLayer(width, height, depth, color, yPos, name) {
  const geometry = new THREE.BoxGeometry(width, height, depth);
  const material = new THREE.MeshStandardMaterial({ color });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.y = yPos;
  mesh.name = name;
  scene.add(mesh);
  return mesh;
}

// Starting Y position
let currentY = 0;

// Layer thickness
const thickness = {
  frame: 0.25,
  collector: 0.15,
  graphite: 0.15,
  gasket: 0.08,
  gdl: 0.1,
  ccm: 0.12
};

// Stack colors
const color = {
  frame: 0x606060,
  collector: 0xffb84d,
  graphite: 0x1a1a1a,
  gasket: 0x00ffff,
  gdl: 0x4444ff,
  ccm: 0xff4d4d
};

// Width (smaller in the middle for realism)
const width = 3;
const depth = 3;

// Create stack (top to bottom)
const layers = [
  { type: 'Frame / End Plate', color: color.frame, h: thickness.frame },
  { type: 'Current Collector', color: color.collector, h: thickness.collector },
  { type: 'Graphite Plate', color: color.graphite, h: thickness.graphite },
  { type: 'Gasket', color: color.gasket, h: thickness.gasket },
  { type: 'Gas Diffusion Layer', color: color.gdl, h: thickness.gdl },
  { type: 'Catalyst-Coated Membrane', color: color.ccm, h: thickness.ccm },
  { type: 'Gas Diffusion Layer', color: color.gdl, h: thickness.gdl },
  { type: 'Gasket', color: color.gasket, h: thickness.gasket },
  { type: 'Graphite Plate', color: color.graphite, h: thickness.graphite },
  { type: 'Current Collector', color: color.collector, h: thickness.collector },
  { type: 'Frame / End Plate', color: color.frame, h: thickness.frame }
];

// Build layers stacked vertically
layers.forEach(layer => {
  currentY += layer.h / 2;
  createLayer(width, layer.h, depth, layer.color, currentY, layer.type);
  currentY += layer.h / 2;
});

// Add connector pipes (gas inlet/outlet)
const pipeGeometry = new THREE.CylinderGeometry(0.15, 0.15, currentY, 16);
const pipeMaterial = new THREE.MeshStandardMaterial({ color: 0xdddd00 });
const pipe1 = new THREE.Mesh(pipeGeometry, pipeMaterial);
pipe1.position.set(1.2, currentY / 2, 1.2);
scene.add(pipe1);

const pipe2 = new THREE.Mesh(pipeGeometry, pipeMaterial);
pipe2.position.set(-1.2, currentY / 2, -1.2);
scene.add(pipe2);

// Animation
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
