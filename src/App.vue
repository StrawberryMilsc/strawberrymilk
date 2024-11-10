<template>
  <div id="app">
    <h1>Hello, World!</h1>
    <p>Welcome to your Vue.js application.</p>
  </div>
  <!-- <TesterThreeScene /> -->
  <LandingPage />
</template>

<script>
import TesterThreeScene from './components/TesterThreeScene.vue';
import LandingPage from './components/LandingPage.vue';
export default {
  name: 'App',
  components: {
    TesterThreeScene,
    LandingPage,
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
