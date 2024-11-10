<template>
  <div ref="canvasContainer" class="canvas-container"></div>
</template>

<script>
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
export default {
  name: 'ThreeScene',

  mounted() {
    this.initThree();
  },
  methods: {
    initThree() {
      
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

      camera.position.z = 5;

      // Animation loop
      const animate = () => {
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
