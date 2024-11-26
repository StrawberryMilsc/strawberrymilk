<template>
  <div class="plane">
    <h1>Plane</h1>
    <select v-model="selectedVehicleType">
        <option v-for="vehicleType in vehicle_types" :value="vehicleType.name">{{ vehicleType.name }}</option>
    </select>
  </div>
  <div ref="canvasContainer" class="canvas-container"></div>
</template>

<script>
import * as THREE from 'three';

export default {
  name: 'Plane',
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      vehicle: {},
      vehicle_types: {'plane': {
                            name: 'plane',
                            max_speed:100,
                            max_pitch: 10, 
                            max_roll: 10, 
                            mesh: null, 
                            position: null,
                            rotation: null},
                      'car': {
                            name: 'car', 
                            max_speed: 100, 
                            max_pitch: 0, 
                            max_roll: 0, 
                            mesh: null, 
                            position: null,
                            rotation: null}, 
                      'ship': {
                            name: 'ship', 
                            max_speed: 100, 
                            max_pitch: 0, 
                            max_roll: 0, 
                            mesh: null, 
                            position: null,
                            rotation: null},    
                      'helicopter': {
                            name: 'helicopter', 
                            max_speed: 100, 
                            max_pitch: 10, 
                            max_roll: 10, 
                            mesh: null, 
                            position: null,
                            rotation: null}},
      selectedVehicleType: 'car',
      vehicle_speed: 0,
      vehicle_acceleration: 0,
      moving: false,
    }
  },
  mounted() {
    this.initThree();
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
  },
  methods: {
    initThree() {
    
      const scene = new THREE.Scene();
      this.scene = scene;

      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      this.camera = camera;
      scene.add(camera);
        
      camera.position.z = 5;
        
      const renderer = new THREE.WebGLRenderer();
      this.renderer = renderer;
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.render(scene, camera);
      this.$refs.canvasContainer.appendChild(renderer.domElement);

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      const vehicle = this.initVehicle();
      scene.add(vehicle);
      
      vehicle.position.set(1, 1, 1);
      const d_light = new THREE.DirectionalLight(0xffffff, 1);
      d_light.position.set(10, 10, 10);
      scene.add(d_light);

      scene.add(new THREE.GridHelper(1000, 1000));

      const animate = () => {
        
        this.updateCameraPosition();
        this.updateVehiclePosition();
        this.renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };
      animate();
    },
    initVehicle() {
      const vehicle = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshPhongMaterial({ color: 0x00ff00 })
      );
      this.vehicle = this.vehicle_types[this.selectedVehicleType]; 
      this.vehicle.mesh = vehicle;
      this.vehicle.position = vehicle.position;
      this.vehicle.rotation = 0;
      return vehicle;
    },
    onKeyDown(event) { // {{ edit_3 }}
        if (event.key === 'w') {
            this.vehicle_acceleration += 0.01; // Move forward
            this.moving = true;
        }
        else if (event.key === 's') {
            this.vehicle_acceleration -= 0.01; // Move backward
            this.moving = true;
        }
        if (event.key === 'a') {
            this.vehicle.rotation -= 0.01; // Move left
            this.moving = true;
        }
        else if (event.key === 'd') {
            this.vehicle.rotation += 0.01; // Move right
            this.moving = true;
        }
        this.updateVehiclePosition();
    },
    onKeyUp(event) {
        this.moving = false;
    },
    updateCameraPosition() {
        this.camera.position.x = this.vehicle.position.x;
        this.camera.position.y = this.vehicle.position.y + 2;
        this.camera.position.z = this.vehicle.position.z + 5;
        this.camera.lookAt(this.vehicle.position);
    },
    updateVehiclePosition() {
        if (this.vehicle_speed > this.vehicle.max_speed) {
            this.vehicle_speed = this.vehicle.max_speed;
        }
        else if (this.vehicle_speed < -this.vehicle.max_speed) {
            this.vehicle_speed = -this.vehicle.max_speed;
        }
        this.vehicle_speed += this.vehicle_acceleration;
        this.vehicle_acceleration *= 0.95;
        this.vehicle.rotation += this.vehicle_rotation;
        this.vehicle_rotation *= 0.98;
        this.vehicle.position.z -= this.vehicle_speed;
        
        this.vehicle_speed *= 0.95;
    }
  }
};
</script>

<style scoped> 

</style>
