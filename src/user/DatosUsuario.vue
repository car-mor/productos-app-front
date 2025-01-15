<template>
  <div class="d-flex min-vh-50 background-gradient">
    <div class="container py-4 border rounded shadow bg-light">
      <!-- Imagen del perfil -->
      <div class="text-center mb-4">
        <img
          src="@/assets/usuario.png"
          alt="Imagen por defecto"
          class="img-fluid rounded-circle mb-3"
          style="width: 150px; height: 150px; object-fit: cover"
        />
        <h2>{{ username }}</h2> 
      </div>

      <!-- Información del perfil -->
      <div class="mb-3 d-flex justify-content-between">
        <p class="fs-5 mb-0 flex-grow-1">
          <strong>Correo electrónico:</strong> {{ user.email }}
        </p>
      </div>
      <div class="mb-3 d-flex justify-content-between">
        <p class="fs-5 mb-0 flex-grow-1">
          <strong>Teléfono:</strong> {{ user.telefono }}
        </p>
      </div>
      <div class="mb-3 d-flex justify-content-between">
        <p class="fs-5 mb-0 flex-grow-1">
          <strong>Dirección:</strong> {{ formatAddres() }}
        </p>
      </div>
      <div class="mb-3 d-flex justify-content-between">
      </div>
      <div class="mb-3 d-flex justify-content-between">
        <p class="fs-5 mb-0 flex-grow-1">
          <strong>Fecha de Nacimiento:</strong> {{ user.fechaNacimiento }}
        </p>
      </div>

      <!-- Botón de cierre de sesión -->
      <div class="text-center">
        <button class="btn btn-danger" @click="logout">Cerrar sesión</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserProfile",
  data() {
    return {
      user: {},
    };
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("userInfo"));
  },
  computed: {
    username() {
      return `${this.user.nombre} ${this.user.apellidos}`;
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('userInfo');
      localStorage.removeItem('isLogged');
      this.$router.push({name: 'InicioSesion'})
    },
    formatAddres()  {
      if (!this.user || !this.user.calle || !this.user.colonia || !this.user.numero || !this.user.codigoPostal) {
        return "Dirección incompleta";
      }
      return `${this.user.calle} ${this.user.numero}, ${this.user.colonia}, CP ${this.user.codigoPostal}`;
    },
  },
};
</script>

<style scoped>
.modal {
  display: block;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
