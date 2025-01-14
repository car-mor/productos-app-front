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
        <h2>{{ user.name }}</h2>
      </div>

      <!-- Información del perfil -->
      <div class="mb-3 d-flex justify-content-between">
        <p class="fs-5 mb-0 flex-grow-1">
          <strong>Correo electrónico:</strong> {{ user.email }}
        </p>
      </div>
      <div class="mb-3 d-flex justify-content-between">
        <p class="fs-5 mb-0 flex-grow-1">
          <strong>Teléfono:</strong> {{ user.phone }}
        </p>
      </div>
      <div class="mb-3 d-flex justify-content-between">
        <p class="fs-5 mb-0 flex-grow-1">
          <strong>Dirección:</strong> {{ user.address }}
        </p>
      </div>
      <div class="mb-3 d-flex justify-content-between">
        <p class="fs-5 mb-0 flex-grow-1"><strong>Contraseña:</strong> ****</p>
      </div>
      <div class="mb-3 d-flex justify-content-between">
        <p class="fs-5 mb-0 flex-grow-1">
          <strong>Fecha de Nacimiento:</strong> {{ user.birthdate }}
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
      user: {
        name: "Gerardo Ortiz",
        email: "mruriel982@gmail.com",
        phone: "56 1379 9463",
        address: "Arbolada 4, Bosques de Tarango, Ciudad de México",
        password: "****",
        birthdate: "31 de Octubre, 2001",
      },
    };
  },
  methods: {
    logout() {
      console.log("Cerrar sesión");
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
