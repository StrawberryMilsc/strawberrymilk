<template>
  <div ref="canvasContainer" class="canvas-container">
    <h1>3D Game</h1>
  </div>
</template>

<script>
import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';

export default {
  name: '3d-game',
  mounted() {
    this.initThree();
  },
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
    };
  },
  methods: {
    initThree() {
      // Set up the scene, camera, and renderer
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.$refs.canvasContainer.appendChild(this.renderer.domElement);

      // Add Pointer Lock Controls for first-person perspective
      const controls = new PointerLockControls(this.camera, document.body);
      this.scene.add(controls.getObject()); // Add the controls' object (camera) to the scene

      const instructions = document.createElement('div');
      instructions.style.cssText = 'position:absolute;top:20px;left:20px;color:white;';
      instructions.innerHTML = 'Click to play';
      document.body.appendChild(instructions);

      // Event listener to lock pointer
      document.addEventListener('click', () => {
        controls.lock();
        instructions.style.display = 'none'; // Hide instructions after clicking
      });

      // Add a simple ground plane
      const geometry = new THREE.PlaneGeometry(100, 100);
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
      const plane = new THREE.Mesh(geometry, material);
      plane.rotation.x = Math.PI / 2; // Rotate the plane to be horizontal
      this.scene.add(plane);

      // Add a grid helper
      const gridHelper = new THREE.GridHelper(100, 10);
      this.scene.add(gridHelper);

      // Set camera position
      this.camera.position.y = 1; // Raise the camera above the ground

      

      // Game loop
      const gameLoop = () => {
        requestAnimationFrame(gameLoop); // Call the game loop again
        controls.update(); // Update the controls
        this.update();
        this.renderer.render(this.scene, this.camera); // Render the scene
      };

      gameLoop(); // Start the game loop
    },
    update() {
      this.move();
      // Update game state here (e.g., move objects, check collisions)
      // This method can be expanded as needed
    },
    move() {
      // Movement variables
      const velocity = new THREE.Vector3();
      const direction = new THREE.Vector3();
      const speed = 0.1;

      // Handle keyboard input
      const keys = {};
      document.addEventListener('keydown', (event) => {
        keys[event.code] = true;
      });
      document.addEventListener('keyup', (event) => {
        keys[event.code] = false;
      });
      
        // Handle movement
        direction.set(0, 0, 0); // Reset direction
        if (keys['KeyW']) direction.z = -1; // Move forward
        if (keys['KeyS']) direction.z = 1; // Move backward
        if (keys['KeyA']) direction.x = -1; // Move left
        if (keys['KeyD']) direction.x = 1; // Move right

        // Normalize direction and apply speed
        if (direction.length() > 0) {
          direction.normalize();
          velocity.addScaledVector(direction, speed);
        }

        // Update camera position based on velocity
        this.camera.position.add(velocity);
        velocity.multiplyScalar(0.9); // Dampen the velocity for smoother movement

    }
  },
};
</script>

<style scoped>
.canvas-container {
  width: 100%;
  height: 100vh; /* Full height */
  overflow: hidden; /* Prevent scrollbars */
}
</style>
