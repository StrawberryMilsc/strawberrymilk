import { createApp } from 'vue'; // Import the createApp function from Vue
import App from './App.vue'; // Import the root App component
import router from './router/routes'; // Import the router configuration
//import './assets/styles.css'; // Import global styles (if any)

// Create the Vue application instance
const app = createApp(App);

// Use the router and store
app.use(router);

// Mount the application to the DOM
app.mount('#app');
