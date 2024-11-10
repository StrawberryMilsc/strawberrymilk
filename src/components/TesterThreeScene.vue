<template>
  <div ref="canvasContainer" class="canvas-container"></div>
</template>

<script>
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
export default {
  name: 'ThreeScene',
  data() {
    return {
      mouse: new THREE.Vector2(), // Store mouse position
    };
  },
  mounted() {
    this.initThree();
    window.addEventListener('mousemove', this.onMouseMove); // Add mouse move event listener
  },
  methods: {
    onMouseMove(event) {
      // Update mouse coordinates normalized to [-1, 1]
      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    },
    initThree() {
      const loader = new GLTFLoader();
      
      // Set up the scene, camera, and renderer
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      this.$refs.canvasContainer.appendChild(renderer.domElement);
      
      // Add a directional light
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // White light
      directionalLight.position.set(5, 5, 5); // Position the light
      scene.add(directionalLight);

      // Load the fish model and add it to the scene
      loader.load('/src/assets/models/fish.glb', (gltf) => {
        const fish = gltf.scene;
        scene.add(fish);

        // Set up the animation mixer
        const mixer = new THREE.AnimationMixer(fish);
        gltf.animations.forEach((clip) => {
          mixer.clipAction(clip).play(); // Play each animation clip
        });

        // Store the mixer and fish for use in the animation loop
        this.mixer = mixer;
        this.fish = fish; // Store the fish reference
      });

      camera.position.z = 5;

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        if (this.mixer) this.mixer.update(0.01); // Update the mixer

        // Update fish position based on mouse coordinates
        if (this.fish) {
          // Calculate the target position based on mouse coordinates
          const targetX = this.mouse.x * 5; // Scale for visibility
          const targetY = this.mouse.y * 5; // Scale for visibility

          // Move the fish towards the target position
          this.fish.position.x += (targetX - this.fish.position.x) * 0.1; // Smooth movement
          this.fish.position.y += (targetY - this.fish.position.y) * 0.1; // Smooth movement

          // Calculate the angle to face the mouse position
          const angle = Math.atan2(targetY - this.fish.position.y, targetX - this.fish.position.x);
          this.fish.rotation.z = angle; // Rotate the fish to face the mouse
        }

        renderer.render(scene, camera);
      };

      animate();
    },
  },
};
</script>

<style>
.canvas-container {
  width: 100%;
  height: 100vh; /* Full height */
}
</style>
