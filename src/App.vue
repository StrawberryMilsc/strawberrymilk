<template>
  <div id="app">
    <h1>Hello, World!</h1>
    <p>Welcome to your Vue.js application.</p>
  </div>
  <!-- <TesterThreeScene /> -->
  <!-- <LandingPage /> -->
  <!-- <L_System /> -->
  <!-- <PTG /> -->
  <ThreeD_Terrain_Generation />
</template>

<script>
import TesterThreeScene from './components/TesterThreeScene.vue';
import LandingPage from './components/LandingPage.vue';
import L_System from './components/L_System.vue';
import PTG from './components/ptg.vue';
import ThreeD_Terrain_Generation from './components/3d_terrain_generation.vue';
export default {
  name: 'App',
  components: {
    TesterThreeScene,
    LandingPage,
    L_System,
    PTG,
    ThreeD_Terrain_Generation,
  },
};
</script>

<style>
#app {
  text-align: center;
  margin-top: 50px;
}

h1 {
  color: #42b983; /* Vue.js green */
}

p {
  font-size: 18px;
}
</style>
