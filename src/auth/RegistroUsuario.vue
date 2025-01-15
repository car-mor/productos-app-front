<template>
  <div class="register-container">
    <!-- Imagen a la izquierda -->
    <div class="register-image">
      <img
        src="@/assets/logoElectroShop.png"
        alt="Imagen de registro"
        class="img-fluid"
      />
    </div>

    <!-- Formulario de registro -->
    <div class="register-form">
      <h2 class="form-title">Regístrate</h2>
      <form @submit.prevent="handleRegister">
        <!-- Campo de correo y nombre de usuario en la misma fila -->
        <div class="row mb-3">
          <div class="col-12 col-md-6">
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
          <div class="col-12 col-md-6">
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
        <div class="row mb-3">
          <div class="col-12 col-md-6">
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
          <div class="col-12 col-md-6">
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
        <div class="row mb-3">
          <div class="col-12 col-md-6">
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
          <div class="col-12 col-md-6">
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
        <div class="row mb-3">
          <div class="col-12 col-md-6">
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
          <div class="col-12 col-md-6">
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
        <div class="row mb-3">
          <div class="col-12 col-md-6">
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
          <div class="col-12 col-md-6">
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
        <div class="row mb-3">
          <div class="col-12 col-md-6">
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
          <div class="col-12 col-md-6">
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
import { useRouter } from 'vue-router';
import axios from "axios";
import { toast } from 'vue3-toastify'
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

const router = useRouter()

// Función para manejar el registro
const handleRegister = async () => {
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
    try {
      const response = await axios.post('/api/v1/signup', {
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
          id: 2
        },
      }) 
      if (response) {
        console.log(response.data.email);
        router.push({
          name: 'Autenticacion',
          query: { email: response.data.email }
        })
      }
    } catch (error) {
      if (error.response) {
        let messageError = error.response.data.message
        toast(messageError, {
          hideProgressBar: true,
          autoClose: 1500,
          type: "error",
          theme: "colored",
        })
      }
    }
  }
};
</script>

<style scoped>
/* Estilos para hacerlo responsivo */
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  padding: 20px;
  flex-wrap: wrap;
}

.register-image {
  max-width: 350px;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.register-form {
  max-width: 800px;
  width: 100%;
}

.row {
  margin-bottom: 1.5rem;
}

.form-group label {
  font-weight: normal;
}

.form-group input {
  padding: 10px;
}

@media (max-width: 768px) {
  .register-container {
    flex-direction: column;
    align-items: center;
  }

  .register-image {
    margin-bottom: 20px;
  }
}

.form-title {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.btn-outline-secondary {
  text-align: center;
}

.w-100 {
  width: 100%;
}

.invalid-feedback {
  font-size: 0.9rem;
  color: #dc3545;
}
</style>
