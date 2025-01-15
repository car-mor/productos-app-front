<template>
  <div
    class="container d-flex justify-content-center align-items-center vh-100"
  >
    <div class="card p-4 shadow card-custom">
      <h3 class="text-center mb-2">Validación de cuenta</h3>
      <div class="text-center">
        <img
          src="../assets/logoElectroShop.png"
          alt="Seguridad"
          style="max-width: 300px"
        />
      </div>

      <p class="text-muted text-center mb-4">
        Introduce el código de verificación que se envió al correo que
        registraste.
      </p>
      <div class="d-flex justify-content-center mb-4">
        <input
          v-for="(digit, index) in code"
          :key="index"
          type="text"
          class="form-control text-center mx-1"
          maxlength="1"
          v-model="code[index]"
          :ref="'input' + index"
          @input="handleInput(index)"
          @keydown.backspace="handleBackspace(index)"
          style="width: 40px; font-size: 24px"
        />
      </div>
      <div class="d-flex justify-content-center">
        <button class="btn btn-outline-primary w-50 mb-2" @click="validateCode">
          VALIDAR CÓDIGO
        </button>
      </div>

      <a href="#" class="text-center text-warning d-block" @click="resendCode">
        Enviar nuevo código
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      code: ["", "", "", "", "", ""], // Array para almacenar cada dígito
    };
  },
  methods: {
    handleInput(index) {
      // Avanza al siguiente input si el actual está lleno
      if (this.code[index].length === 1 && index < this.code.length - 1) {
        this.$refs["input" + (index + 1)][0]?.focus();
      }
    },
    handleBackspace(index) {
      // Retrocede al campo anterior si se presiona backspace en un campo vacío
      if (this.code[index] === "" && index > 0) {
        this.$refs["input" + (index - 1)][0]?.focus();
      }
    },
    validateCode() {
      const fullCode = this.code.join("");
      if (fullCode.length === 6) {
        alert(`Código validado: ${fullCode}`);
      } else {
        alert("Por favor, completa todos los campos.");
      }
    },
    resendCode() {
      alert("Se ha enviado un nuevo código.");
    },
  },
};
</script>

<style scoped>
.card {
  background: #fff;
  backdrop-filter: blur(10px);
  border: none;
}

.card-custom {
  width: 90%; /* Tamaño inicial en pantallas pequeñas */
  max-width: 500px; /* Límite para pantallas medianas */
}

@media (min-width: 992px) {
  /* Estilo para pantallas grandes */
  .card-custom {
    max-width: 700px;
    padding: 40px;
  }
}

input:focus {
  border-color: #1a8bc8;
  box-shadow: 0 0 5px rgba(5, 158, 209, 0.5);
}
</style>
