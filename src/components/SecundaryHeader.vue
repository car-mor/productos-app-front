<template>
  <header class="header">
    <div class="header-container">
      <!-- Logo -->
      <h1 class="logo">ElectroShop</h1>

      <!-- Menú de navegación -->
      <nav>
        <ul class="nav-menu">
          <li>
            <router-link to="/" class="w-100 nav-link">
              Inicio
            </router-link>
          </li>
          <li>
            <router-link to="/producto-cliente" class="nav-link w-100">
              Productos
            </router-link>
          </li>
          <li><a href="#" class="nav-link">Ofertas</a></li>

          <!-- Enlace para mostrar el contenido de contacto -->
          <li>
            <a 
              href="#" 
              class="nav-link" 
              @click.prevent="toggleContactModal"
            >
              Contacto
            </a>
          </li>
        </ul>
      </nav>

      <!-- Grupo de acciones -->
      <div class="actions-group">
        <div class="user-actions">
          <RouterLink :to="isLogged ? '/perfil-usuario' : '/inicio-sesion'">
            <button class="icon-button cart-button">
              <UserIcon />
              <span class="cart-text">{{ isLogged ? 'Mi Perfil' : 'Iniciar Sesión' }}</span>
            </button>
          </RouterLink>

          <!-- Carrito -->
          <RouterLink to="/carrito-compras">
            <button class="icon-button cart-button">
              <ShoppingCartIcon />
              <span class="cart-count">{{ cartItemsCount }}</span>
              <span class="cart-text">Mi carrito</span>
            </button>
          </RouterLink>
        </div>
      </div>
    </div>
  </header>

  <!-- Modal de contacto convertido en dropdown debajo del enlace -->
  <div 
      v-if="showContactModal" 
      class="contact-dropdown mt-3 shadow-lg border-0 p-4 w-50"
    >
  <div class="modal-header bg-primary text-white border-0 rounded-top position-relative p-2">
    <h5 class="modal-title d-flex align-items-center fw-bold mb-0">
      <i class="bi bi-people-fill me-2"></i>
      Información de Contacto
    </h5>
    <button 
      type="button" 
      class="btn-close btn-close-white position-absolute top-0 end-0 m-3" 
      @click="toggleContactModal"
      aria-label="Close"
    ></button>
  </div>

  <div class="modal-body p-4">
    <p class="text-muted mb-4">
      A continuación, encontrarás los datos de las personas encargadas del proyecto. Si necesitas más información, no dudes en contactarnos.
    </p>
    <div class="row g-3">
      <div 
        class="col-md-6" 
        v-for="(contact, index) in contacts" 
        :key="index"
      >
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <h6 class="card-title fw-bold mb-2">
              <i class="bi bi-person-fill text-primary me-2"></i>{{ contact.name }}
            </h6>
            <p class="card-text mb-1">
              <i class="bi bi-envelope-fill text-secondary me-2"></i>{{ contact.email }}
            </p>
            <a 
              :href="'mailto:' + contact.email" 
              class="btn btn-sm btn-outline-primary mt-2"
            >
              <i class="bi bi-send"></i> Enviar Correo
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="modal-footer bg-light">
  </div>
</div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { ShoppingCartIcon, UserIcon } from "lucide-vue-next";
import axios from "axios";

// Datos para el carrito y contactos
const cartItemsCount = ref(0);
const contacts = ref([
  { name: "Adriana Vanessa Trejo Reyes", email: "atrejor1601@alumno.ipn.mx" },
  { name: "Carlos Moreno Hernandez", email: "cmorenoh2000@alumno.ipn.mx" },
  { name: "Josué Montalbán Rojas", email: "jmontalbanr2000@alumno.ipn.mx" },
  { name: "Gerardo Uriel Ortiz Ramírez", email: "gortizr2001@alumno.ipn.mx" },
]);

// Controlador para mostrar/ocultar el modal
const user = JSON.parse(localStorage.getItem("userInfo"));
const isLogged = JSON.parse(localStorage.getItem("isLogged"));
const showContactModal = ref(false);

const toggleContactModal = () => {
  showContactModal.value = !showContactModal.value;
};

const fetchCartItemsCount = async () => {
  try {
    const response = await axios.get("/api/v1/cart/count-items/", {
      params: { idCarrito: user.carrito.idCarrito }
    });
    cartItemsCount.value = response.data;
  } catch (error) {
    console.error("Error al contar los items del carrito:", error);
    cartItemsCount.value = 0;
  }
};

onMounted(() => {
  fetchCartItemsCount();
});

</script>

<style scoped>
/* Estilos principales del header */
.header {
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2563eb;
  white-space: nowrap;
}

/* Menú de navegación */
.nav-menu {
  display: flex;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  text-decoration: none;
  color: #4b5563; 
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-link:hover, 
.nav-link:focus {
  color: #1f2937;
}

.nav-link:hover {
  color: #2563eb;
}

.actions-group {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.user-actions {
  display: flex;
  gap: 1rem;
}

.icon-button {
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: #4b5563;
  transition: color 0.3s ease;
  position: relative;
}

.icon-button:hover {
  color: #2563eb;
}

.cart-button {
  position: relative;
}

.cart-count {
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  background-color: #ef4444;
  color: white;
  font-size: 0.75rem;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.contact-dropdown {
  position: absolute;
  top: 60px;
  right: 0;
  width: 50%;
  background-color: white;
  border-radius: 5px;
  z-index: 1000;
}

@media (max-width: 768px) {
  .header-container {
    flex-wrap: wrap;
    gap: 1rem;
  }

  .nav-menu {
    order: 3;
    width: 100%;
    justify-content: space-around;
  }

  .actions-group {
    flex-grow: 1;
    justify-content: flex-end;
  }
}
</style>
