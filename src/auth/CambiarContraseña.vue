<template>
  <div class="container-fluid bg-light py-5">
    <div class="row justify-content-center">
      <div class="col-12 col-md-10 col-lg-8">
        <div class="card shadow-sm border-0 rounded-4">
          <div class="card-body">
            <h3 class="text-center text-dark mb-4">Cambiar Contraseña</h3>
            <form @submit.prevent="submitForm">
              <div class="mb-3">
                <label for="currentPassword" class="form-label"
                  >Contraseña Actual</label
                >
                <input
                  type="password"
                  class="form-control"
                  id="currentPassword"
                  v-model="currentPassword"
                  required
                  placeholder="Ingresa tu contraseña actual"
                />
              </div>
              <div class="mb-3">
                <label for="newPassword" class="form-label"
                  >Nueva Contraseña</label
                >
                <input
                  type="password"
                  class="form-control"
                  id="newPassword"
                  v-model="newPassword"
                  required
                  placeholder="Ingresa tu nueva contraseña"
                />
              </div>
              <div class="mb-3">
                <label for="confirmNewPassword" class="form-label"
                  >Confirmar Nueva Contraseña</label
                >
                <input
                  type="password"
                  class="form-control"
                  id="confirmNewPassword"
                  v-model="confirmNewPassword"
                  required
                  placeholder="Confirma tu nueva contraseña"
                />
              </div>
              <button type="submit" class="btn btn-primary w-100 py-2 mt-3">
                Cambiar Contraseña
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toast } from 'vue3-toastify'
import axios from 'axios';
export default {
  data() {
    return {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      user: {},
    };
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("userInfo"));
  },
  methods: {
    async submitForm() {
      if (this.newPassword !== this.confirmNewPassword) {
        toast("Las contraseñas no coinciden", {
          hideProgressBar: true,
          autoClose: 1500,
          type: "error",
          theme: "colored",
        })
      } else {
        const data = {
          username: this.user.userName,
          currentPassword: this.currentPassword,
          newPassword: this.newPassword
        }
        try {
          const response = await axios.post('/api/v1/updatePassword', data);
          if (response) {
            toast(response.data, {
              hideProgressBar: true,
              autoClose: 600,
              type: "success",
              theme: "colored",
            })
            this.currentPassword = "";
            this.newPassword = "";
            this.confirmNewPassword = "";
          }
        } catch (error) {
          if (error.response) {
            console.log(error)
            let messageError = !error.response.data.message 
              ? error.response.data 
              : error.response.data.message
            toast(messageError, {
              hideProgressBar: true,
              autoClose: 1500,
              type: "error",
              theme: "colored",
            })
          }
        }
      } 
    },
  },
};
</script>

<style scoped>
.bg-light {
  background-color: #f8f9fa !important;
}
.card {
  border-radius: 1rem;
}
h3 {
  font-family: "Arial", sans-serif;
  font-weight: 600;
}
input.form-control {
  border-radius: 0.5rem;
  font-size: 1rem;
}
button {
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 1rem;
  transition: background-color 0.3s;
}
button:hover {
  background-color: #0069d9;
}
</style>
