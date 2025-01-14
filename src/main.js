<<<<<<< HEAD
// Importa los estilos de tu proyecto y Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'; // CSS de Bootstrap
import 'bootstrap'; // JavaScript de Bootstrap
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'vue3-toastify/dist/index.css';
// import '@fortawesome/fontawesome-free/css/all.min.css'; // Estilos de Font Awesome
// Importa Vue y las configuraciones de tu proyecto
=======
// main.js
>>>>>>> d0c667e285c2719f5bb0c8277bef4dfafe78374a
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './plugins'; // Esto usa el export default de plugins/index.js

import 'bootstrap/dist/css/bootstrap.min.css'; // CSS de Bootstrap
import 'bootstrap'; // JavaScript de Bootstrap
import 'bootstrap-icons/font/bootstrap-icons.css';

const app = createApp(App);

app.use(router);
<<<<<<< HEAD
// Monta la aplicación
=======
app.use(store); // Usa Vuex store

>>>>>>> d0c667e285c2719f5bb0c8277bef4dfafe78374a
app.mount('#app');
