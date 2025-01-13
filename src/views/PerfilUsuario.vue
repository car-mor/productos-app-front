<template>
  <div class="d-flex">
    <!-- Sidebar -->
    <div class="bg-light p-3" style="width: 250px; height: 100vh;">
      <div class="d-flex justify-content-center align-items-center mb-4" style="height: 120px;">
  <img src="../assets/logoElectroShop.png" alt="Logo" class="img-fluid" style="max-height: 150px;">
</div>
      <h5 class="mb-4">Opciones</h5>
      <ul class="nav flex-column">
        <li class="nav-item" v-for="option in options" :key="option.view">
          <a
            href="#"
            class="nav-link d-flex align-items-center"
            :class="{ 'text-primary': activeView === option.view, 'selected-option': activeView === option.view }"
            @click="setView(option.view)"
          >
            <span class="me-2" v-if="option.icon">
              <component :is="option.icon" />
            </span>
            <span class="text-dark">{{ option.label }}</span> <!-- Texto en negro -->
          </a>
        </li>
      </ul>
    </div>

    <!-- Main Content -->
    <div class="p-4 flex-grow-1">
      <SecundaryHeader />
      <component :is="currentComponent" />
    </div>
  </div>
</template>

<script>
import SecundaryHeader from "@/components/SecundaryHeader.vue";
import DireccionesEnvio from "@/components/DireccionesEnvio.vue";
import Pedidos from "@/components/Pedidos.vue";
import DatosUsuario from "@/components/DatosUsuario.vue";
import CambiarContraseña from "@/components/CambiarContraseña.vue";
import { LockKeyholeIcon, HomeIcon, BaggageClaimIcon, UserCircle2 } from 'lucide-vue-next';

export default {
  name: "SidebarLayout",
  components: {
    DireccionesEnvio,
    Pedidos,
    BaggageClaimIcon,
    DatosUsuario,
    CambiarContraseña,
    LockKeyholeIcon,
    HomeIcon,
    UserCircle2,
    SecundaryHeader,
  },
  data() {
    return {
      activeView: "DatosUsuario",
      options: [
        { label: "Direcciones de envío", view: "DireccionesEnvio", icon: HomeIcon  },
        { label: "Mis pedidos", view: "Pedidos", icon: BaggageClaimIcon },
        { label: "General", view: "DatosUsuario", icon: UserCircle2 },
        { label: "Cambiar contraseña", view: "CambiarContraseña", icon: LockKeyholeIcon },
      ],
    };
  },
  computed: {
    currentComponent() {
      return this.activeView;
    },
  },
  methods: {
    setView(view) {
      this.activeView = view;
    },
  },
};
</script>

<style scoped>
.bg-light {
  border-right: 1px solid #ddd;
}
.nav-link {
  cursor: pointer;
  color: black; /* Color de texto por defecto */
}
.nav-link.selected-option {
  background-color: #cbdef1; /* Fondo resaltado para opción seleccionada */
  color: white; /* Cambiar color de texto cuando se selecciona */
  font-weight: bold; /* Resaltar el texto */
}
.nav-link:hover {
  background-color: #f8f9fa; /* Color al pasar el mouse */
}
</style>
