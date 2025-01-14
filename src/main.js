// main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './plugins'; // Esto usa el export default de plugins/index.js

import 'bootstrap/dist/css/bootstrap.min.css'; // CSS de Bootstrap
import 'bootstrap'; // JavaScript de Bootstrap
import 'bootstrap-icons/font/bootstrap-icons.css';

const app = createApp(App);

app.use(router);
app.use(store); // Usa Vuex store

app.mount('#app');
