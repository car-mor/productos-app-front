<template>
  <header class="header">
    <div class="header-container">
      <h1 class="logo">ElectroShop</h1>

      <nav>
      <ul class="nav-menu">
        <li>
          <router-link 
            to="/home-screen" 
            class="text-dark text-decoration-none p-2 d-inline-block link-hover"
          >
            <h6>Inicio</h6>
          </router-link>
        </li>
        <!-- Menú desplegable de categorías -->
        <li class="dropdown">
          <a 
            href="#" 
            class="nav-link text-dark text-decoration-none p-2 d-inline-block link-hover" 
            @click.prevent="toggleDropdown"
          >
            Categorías
            <span :class="['arrow', { open: isDropdownOpen }]">↓</span>
          </a>
          <ul v-if="isDropdownOpen" class="dropdown-menu">
            <li 
              v-if="categories.length === 0" 
              class="dropdown-item empty-state"
            >
              No hay categorías disponibles
            </li>
            <li
              v-else
              v-for="category in categories"
              :key="category.idCategoria"
            >
              <a 
                :href="'/categorias/' + category.id" 
                class="dropdown-item text-dark text-decoration-none p-2 d-inline-block link-hover"
              >
                {{ category.nombreCategoria }}
              </a>
            </li>
          </ul>
        </li>
        <li>
          <a 
            href="#" 
            class="nav-link text-dark text-decoration-none p-2 d-inline-block link-hover"
            @click.prevent="toggleContactModal"
          >
            Contacto
          </a>
        </li>
      </ul>
    </nav>
      <div class="actions-group">
        <div class="search-bar" v-if="isSearchBarEnabled">
          <input
            type="text"
            placeholder="Buscar productos..."
            v-model="searchQuery"
            :disabled="!isSearchBarEnabled"
          />
          <SearchIcon class="search-icon" />
        </div>

        <!-- UserIcon con menú condicional -->
        <div class="user-actions">
          <div class="icon-button" @click="toggleUserMenu">
            <UserIcon />
          </div>
          <ul :class="['dropdown-menu', { show: isUserMenuOpen }]">
            <li v-if="isLogged">
              <router-link to="/perfil-usuario" class="dropdown-item">
                Mi Perfil
              </router-link>
            </li>
            <li v-if="isLogged">
              <router-link to="/perfil-usuario" class="dropdown-item" @click="logout">
                Cerrar Sesión
              </router-link>
            </li>
            <li v-else>
              <router-link to="/inicio-sesion" class="dropdown-item">
                Iniciar Sesión
              </router-link>
            </li>
          </ul>
          <RouterLink to="/carrito-compras">
            <button class="icon-button cart-button">
              <ShoppingCartIcon />
              <span class="cart-count">{{ cartItemsCount }}</span>
            </button>
          </RouterLink>
        </div>

      </div>
    </div>
  </header>
  <div 
      v-if="showContactModal" 
      class="contact-dropdown mt-3 shadow-lg border-0 p-4 w-50"
    >
    <!-- Encabezado del Modal -->
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
import { ref, onMounted } from "vue";
import { SearchIcon, ShoppingCartIcon, UserIcon } from "lucide-vue-next";
import axios from "axios";

let searchQuery = ref("");
let isDropdownOpen = ref(false);
let isSearchBarEnabled = ref(true);
let categories = ref([]);
let isUserMenuOpen = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value;
};
const cartItemsCount = ref(1)

const user = JSON.parse(localStorage.getItem("userInfo"));

const fetchCategories = async () => {
  try {
    const response = await axios.get("/api/v1/categorias");
    categories.value = response.data;
  } catch (error) {
    console.error("Error al cargar las categorías:", error);
    categories.value = [];
  }
};

const counItemsCarrito = async () => {
  try {
    const response = await axios.get("/api/v1/cart/count-items/", {
      params: { idCarrito: user.carrito.idCarrito }
    });
    cartItemsCount.value = response.data;
    console.log(cartItemsCount)
  } catch (error) {
    console.error("Error al contar los items del carrito:", error);
    cartItemsCount.value = 0;
  }
}

onMounted(() => {
  fetchCategories();
  counItemsCarrito();
});

const contacts = ref([
  { name: "Adriana Vanessa Trejo Reyes", email: "atrejor1601@alumno.ipn.mx" },
  { name: "Carlos Moreno Hernandez", email: "cmorenoh2000@alumno.ipn.mx" },
  { name: "Josué Montalbán Rojas", email: "jmontalbanr2000@alumno.ipn.mx" },
  { name: "Gerardo Uriel Ortiz Ramírez", email: "gortizr2001@alumno.ipn.mx" },
]);

// Controlador para mostrar/ocultar el modal
const showContactModal = ref(false);

const toggleContactModal = () => {
  showContactModal.value = !showContactModal.value;
};

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

.nav-link:hover {
  color: #2563eb;
}

/* Grupo de acciones */
.actions-group {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

/* Barra de búsqueda */
.search-bar {
  position: relative;
  width: 300px;
  flex-shrink: 0;
}

.search-bar input {
  width: 100%;
  padding: 0.5rem 2.5rem 0.5rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  outline: none;
  transition: border-color 0.3s ease;
}

.search-bar input:focus {
  border-color: #2563eb;
}

.search-icon {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.25rem;
  height: 1.25rem;
  color: #9ca3af;
}

/* Botones de usuario y carrito */
.user-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

/* Iconos y botones */
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

/* Responsive para tabletas */
@media (max-width: 1024px) {
  .search-bar {
    width: 200px;
  }
}

/* Responsive para móviles */
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

/* Estilo del menú desplegable */
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-menu {
  position: absolute;
  top: 3rem;
  right: 0;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 0.5rem 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  list-style: none;
  width: 200px;
  margin-top: 0.5rem;
  display: none; /* Se mostrará cuando el menú sea abierto */
}

.dropdown-item {
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: #4b5563;
  display: block;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.dropdown-item:hover {
  background-color: #f3f4f6;
  color: #2563eb;
}

.empty-state {
  color: #9ca3af;
  text-align: center;
  font-style: italic;
}

.arrow {
  display: inline-block;
  margin-left: 0.25rem;
  transition: transform 0.3s ease;
}

.arrow.open {
  transform: rotate(180deg);
}

.link-hover:hover {
  background-color: #e3f2fd;
  border-radius: 0.25rem;
  color: #0d6efd !important;
}

/* Mostrar el menú desplegable cuando se active */
.dropdown-menu.show {
  display: block;
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
</style>
