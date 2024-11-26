<template>
  <div>
    <h1>Game Mech Prototypes</h1>
  </div>
</template>

<script>
import * as THREE from 'three';
export default {
  name: 'GameMechPrototypes',
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.$refs.canvasContainer.appendChild(this.renderer.domElement);
      this.camera.position.z = 5;
        
      this.animate();
    },
    animate() {
      requestAnimationFrame(this.animate);
      this.renderer.render(this.scene, this.camera);
    },
  },
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      objects: [],
    };
  },
};



</script>

<style scoped>
h1 {
  color: #42b983;
}
</style>

