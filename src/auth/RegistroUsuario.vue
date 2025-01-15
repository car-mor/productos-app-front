<template>
  <div class="register-container">
    <!-- Imagen a la izquierda -->
    <div class="register-image">
      <img
        src="@/assets/logoElectroShop.png"
        alt="Imagen de registro"
        style="width: 400px; height: auto"
      />
    </div>

    <!-- Formulario de registro -->
    <div class="register-form">
      <h2 class="form-title">Regístrate</h2>
      <form @submit.prevent="handleRegister">
        <!-- Campo de correo y nombre de usuario en la misma fila -->
        <div class="row mb-2">
          <div class="col-6">
            <div class="form-group">
              <label for="email">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                v-model="email"
                class="form-control"
                :class="{ 'is-invalid': emailError }"
                placeholder="Ingresa tu correo"
                required
              />
              <div v-if="emailError" class="invalid-feedback">{{ emailError }}</div>
            </div>
          </div>
          <div class="col-6">
            <div class="form-group">
              <label for="userName">Nombre de Usuario</label>
              <input
                type="text"
                id="userName"
                v-model="userName"
                class="form-control"
                placeholder="Ingresa tu nombre de usuario"
                required
              />
            </div>
          </div>
        </div>

        <!-- Campo de contraseña y confirmar contraseña en la misma fila -->
        <div class="row mb-2">
          <div class="col-6">
            <div class="form-group">
              <label for="password">Contraseña</label>
              <input
                type="password"
                id="password"
                v-model="password"
                class="form-control"
                :class="{ 'is-invalid': passwordError }"
                placeholder="Ingresa tu contraseña"
                required
              />
              <div v-if="passwordError" class="invalid-feedback">{{ passwordError }}</div>
            </div>
          </div>
          <div class="col-6">
            <div class="form-group">
              <label for="confirmPassword">Confirmar Contraseña</label>
              <input
                type="password"
                id="confirmPassword"
                v-model="confirmPassword"
                class="form-control"
                :class="{ 'is-invalid': confirmPasswordError }"
                placeholder="Confirma tu contraseña"
                required
              />
              <div v-if="confirmPasswordError" class="invalid-feedback">{{ confirmPasswordError }}</div>
            </div>
          </div>
        </div>

        <!-- Campo de nombre y apellidos en la misma fila -->
        <div class="row mb-2">
          <div class="col-6">
            <div class="form-group">
              <label for="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                v-model="nombre"
                class="form-control"
                :class="{ 'is-invalid': nombreError }"
                placeholder="Ingresa tu nombre"
                required
              />
              <div v-if="nombreError" class="invalid-feedback">{{ nombreError }}</div>
            </div>
          </div>
          <div class="col-6">
            <div class="form-group">
              <label for="apellidos">Apellidos</label>
              <input
                type="text"
                id="apellidos"
                v-model="apellidos"
                class="form-control"
                placeholder="Ingresa tus apellidos"
                required
              />
            </div>
          </div>
        </div>

        <!-- Campo de teléfono y fecha de nacimiento en la misma fila -->
        <div class="row mb-2">
          <div class="col-6">
            <div class="form-group">
              <label for="telefono">Teléfono</label>
              <input
                type="tel"
                id="telefono"
                v-model="telefono"
                class="form-control"
                placeholder="Ingresa tu teléfono"
                required
              />
            </div>
          </div>
          <div class="col-6">
            <div class="form-group">
              <label for="fechaNacimiento">Fecha de Nacimiento</label>
              <input
                type="date"
                id="fechaNacimiento"
                v-model="fechaNacimiento"
                class="form-control"
                required
              />
            </div>
          </div>
        </div>

        <!-- Campo de calle y colonia en la misma fila -->
        <div class="row mb-2">
          <div class="col-6">
            <div class="form-group">
              <label for="calle">Calle</label>
              <input
                type="text"
                id="calle"
                v-model="calle"
                class="form-control"
                placeholder="Ingresa tu calle"
                required
              />
            </div>
          </div>
          <div class="col-6">
            <div class="form-group">
              <label for="colonia">Colonia</label>
              <input
                type="text"
                id="colonia"
                v-model="colonia"
                class="form-control"
                placeholder="Ingresa tu colonia"
                required
              />
            </div>
          </div>
        </div>

        <!-- Campo de número y código postal en la misma fila -->
        <div class="row mb-2">
          <div class="col-6">
            <div class="form-group">
              <label for="numero">Número Interior</label>
              <input
                type="text"
                id="numero"
                v-model="numero"
                class="form-control"
                placeholder="Número interior"
                required
              />
            </div>
          </div>
          <div class="col-6">
            <div class="form-group">
              <label for="codigoPostal">Código Postal</label>
              <input
                type="text"
                id="codigoPostal"
                v-model="codigoPostal"
                class="form-control"
                placeholder="Ingresa tu código postal"
                required
              />
            </div>
          </div>
        </div>

        <!-- Botón de registro -->
        <button type="submit" class="btn btn-primary w-100">Registrarse</button>
      </form>

      <!-- Botones para regresar y para iniciar sesión -->
      <div class="navigation-buttons mt-3">
        <router-link
          to="/home-screen"
          class="btn btn-outline-secondary w-100 mb-2"
        >
          Regresar a Inicio
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Campos del formulario
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const nombre = ref("");
const apellidos = ref("");
const telefono = ref("");
const fechaNacimiento = ref("");
const calle = ref("");
const colonia = ref("");
const numero = ref("");
const codigoPostal = ref("");
const userName = ref("");

// Errores de validación
const emailError = ref("");
const passwordError = ref("");
const confirmPasswordError = ref("");
const nombreError = ref("");

// Función para manejar el registro
const handleRegister = () => {
  // Validaciones básicas
  emailError.value = email.value.includes("@") ? "" : "Correo no válido.";
  passwordError.value =
    password.value.length >= 6
      ? ""
      : "La contraseña debe tener al menos 6 caracteres.";
  confirmPasswordError.value =
    password.value === confirmPassword.value
      ? ""
      : "Las contraseñas no coinciden.";
  nombreError.value = nombre.value.trim() ? "" : "El nombre es obligatorio.";

  // Si no hay errores, procesar el registro
  if (
    !emailError.value &&
    !passwordError.value &&
    !confirmPasswordError.value &&
    !nombreError.value
  ) {
    console.log({
      email: email.value,
      password: password.value,
      userName: userName.value,
      nombre: nombre.value,
      apellidos: apellidos.value,
      calle: calle.value,
      colonia: colonia.value,
      numero: numero.value,
      codigoPostal: codigoPostal.value,
      telefono: telefono.value,
      fechaNacimiento: fechaNacimiento.value,
      role: {
        id: 2,
      },
    });
  }
};
</script>

<style scoped>
/* Estilos para reducir el tamaño y ajustarlo a una vista más compacta */
.register-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  padding: 20px;
}

.register-form {
  width: 100%;
  max-width: 500px;
  margin-top: 10px;
}

.row {
  margin-bottom: 10px;
}

.form-group {
  margin-bottom: 0.5rem;
}

.btn {
  padding: 10px;
}

.navigation-buttons {
  margin-top: 10px;
}
</style>
