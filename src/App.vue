<template>
  <div id="app">
    <h1>Hello, World!</h1>
    <p>Welcome to my incomplete portfolio.</p>
    <RouterView/>
  </div>

</template>

<script>
import { RouterView } from 'vue-router';
export default {
  name: 'App',
  components: {
    RouterView
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
