import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Optionally import Bootstrap JS (includes Popper.js)
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import MaterialDashboard from "./material-dashboard";

createApp(App).use(store).use(router).mount('#app')
