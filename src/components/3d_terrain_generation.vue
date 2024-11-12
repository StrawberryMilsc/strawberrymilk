<template>
  <div>
    <h1>3D Terrain Generation</h1>
    <div ref="canvasContainer" class="canvas-container"></div>
  </div>
</template>

<script>
import * as THREE from 'three'; // Importing the THREE.js library for 3D graphics
import { OrbitControls } from 'three/addons/controls/OrbitControls'; // Importing OrbitControls for camera manipulation
import { createNoise2D } from 'simplex-noise';

export default {
  name: 'ThreeD_Terrain_Generation', // Component name
  data() {
    return {
      scene: null, // Variable to hold the 3D scene
      camera: null, // Variable to hold the camera
      renderer: null, // Variable to hold the WebGL renderer
      noiseScale: 0.02, // Scale factor for the noise
    }
  },
  mounted() {
    this.initThree(); // Initialize the 3D scene when the component is mounted
  },
  methods: {
    initThree() {
      const scene = new THREE.Scene(); // Create a new 3D scene
      this.scene = scene; // Assign the scene to the component's data
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // Create a perspective camera
      this.camera = camera; // Assign the camera to the component's data
      const renderer = new THREE.WebGLRenderer(); // Create a WebGL renderer
      renderer.setSize(window.innerWidth, window.innerHeight); // Set the size of the renderer to the window dimensions
      
      this.renderer = renderer; // Assign the renderer to the component's data
      this.$refs.canvasContainer.appendChild(renderer.domElement); // Append the renderer's DOM element to the canvas container
      const controls = new OrbitControls(camera, renderer.domElement); // Create OrbitControls for camera manipulation
      controls.enableDamping = true; // Enable damping for smooth camera movement
      controls.dampingFactor = 0.25; // Set the damping factor
      controls.enableZoom = true; // Enable zooming
      this.scene.add(camera)
      this.generateTerrain(); // Generate the terrain
      function animate() {
        renderer.render(scene, camera); // Render the scene with the camera
        controls.update(); // Update the controls
      };
      animate(); // Start the animation loop
    },
    generateTerrain() {
      const width = 100;
      const depth = 100;
      const geometry = new THREE.PlaneGeometry(width, depth, 100, 100); // Create a plane geometry
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Create a material with a green color
      
      const noise = createNoise2D();

      const heightData = [];
      for (let i = 0; i < width; i++) {
        heightData[i] = [];
        for (let j = 0; j < depth; j++) {
          const height = noise(i * this.noiseScale, j * this.noiseScale);
          heightData[i][j] = height;
        }
      }
      //geometry.setAttribute('height', new THREE.Float32BufferAttribute(heightData, 1));
     
      //geometry.computeVertexNormals(); // Compute the vertex normals
      

      const terrain = new THREE.Mesh(geometry, material); // Create a mesh with the geometry and material
      this.scene.add(terrain); // Add the terrain to the scene

      const light = new THREE.DirectionalLight(0xffffff, 1); // Create a directional light
      light.position.set(200, 200, 200); // Set the light's position
      this.scene.add(light); // Add the light to the scene
    }
  }
};
</script>

<style scoped>
/* Scoped styles for the component can be added here */
</style>
