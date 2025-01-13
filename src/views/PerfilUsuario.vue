<template>
    <div class="d-flex justify-content-center align-items-center min-vh-100 background-gradient">
      <div class="container py-4 border rounded shadow bg-light">
        <!-- Imagen del perfil -->
        <div class="text-center mb-4 position-relative">
          <input type="file" @change="onImageChange" accept="image/*" class="d-none" ref="imageInput" />
          <div
            class="profile-image-container"
            @click="selectImage"
            :class="{'image-placeholder': !user.image, 'image-hover': !user.image}"
          >
            <img
              v-if="user.image"
              :src="user.image"
              alt="Imagen de perfil"
              class="img-fluid rounded-circle mb-3"
              style="width: 150px; height: 150px; object-fit: cover;"
            />
            <img
              v-else
              src="@/assets/usuario.png"
              alt="Imagen por defecto"
              class="img-fluid rounded-circle mb-3"
              style="width: 150px; height: 150px; object-fit: cover;"
            />
            <span v-if="!user.image" class="change-image-text">Cambiar imagen</span>
          </div>
          <h2>{{ user.name }}</h2>
        </div>
  
        <!-- Información del perfil -->
        <div class="mb-3 d-flex justify-content-between">
          <p class="fs-5 mb-0 flex-grow-1"><strong>Correo electrónico:</strong> {{ user.email }}</p>
          <button class="btn btn-primary btn-sm" @click="editField('email')">Editar</button>
        </div>
        <div class="mb-3 d-flex justify-content-between">
          <p class="fs-5 mb-0 flex-grow-1"><strong>Teléfono:</strong> {{ user.phone }}</p>
          <button class="btn btn-primary btn-sm" @click="editField('phone')">Editar</button>
        </div>
        <div class="mb-3 d-flex justify-content-between">
          <p class="fs-5 mb-0 flex-grow-1"><strong>Dirección:</strong> {{ user.address }}</p>
          <button class="btn btn-primary btn-sm" @click="editField('address')">Editar</button>
        </div>
        <div class="mb-3 d-flex justify-content-between">
          <p class="fs-5 mb-0 flex-grow-1"><strong>Contraseña:</strong> **********</p>
          <button class="btn btn-primary btn-sm" @click="editField('password')">Editar</button>
        </div>
        <div class="mb-3 d-flex justify-content-between">
          <p class="fs-5 mb-0 flex-grow-1"><strong>Fecha de Nacimiento:</strong> {{ user.birthdate }}</p>
          <button class="btn btn-primary btn-sm" @click="editField('birthdate')">Editar</button>
        </div>
  
        <!-- Botón de cierre de sesión -->
        <div class="text-center">
          <button class="btn btn-danger" @click="logout">Cerrar sesión</button>
        </div>
      </div>
    </div>
  
    <!-- Modal para editar el campo -->
    <div v-if="isEditing" class="modal fade show d-block" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar {{ fieldToEdit }}</h5>
            <button type="button" class="close" @click="closeModal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <input v-model="tempValue" type="text" class="form-control" :placeholder="'Ingrese nuevo ' + fieldToEdit">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Cerrar</button>
            <button type="button" class="btn btn-primary" @click="saveChanges">Guardar cambios</button>
          </div>
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
          password: "********",
          birthdate: "31 de Octubre, 2001",
          image: null, // Para almacenar la URL de la imagen cargada
        },
        isEditing: false,
        fieldToEdit: "",
        tempValue: "",
      };
    },
    methods: {
      logout() {
        console.log("Cerrar sesión");
      },
      editField(field) {
        this.fieldToEdit = field;
        this.tempValue = this.user[field];
        this.isEditing = true;
      },
      closeModal() {
        this.isEditing = false;
        this.tempValue = "";
      },
      saveChanges() {
        this.user[this.fieldToEdit] = this.tempValue;
        this.closeModal();
      },
      selectImage() {
        this.$refs.imageInput.click(); // Abrir el selector de archivos cuando se hace clic en la imagen o el botón
      },
      onImageChange(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.user.image = e.target.result; // Asignar la imagen cargada a la propiedad
          };
          reader.readAsDataURL(file); // Leer el archivo como una URL de datos
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .background-gradient {
    background: radial-gradient(circle, white, #0084ff);
  }
  
  .profile-image-container {
    position: relative;
    cursor: pointer;
    display: inline-block;
  }
  
  .profile-image-container .change-image-text {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    color: rgb(0, 0, 0);
    font-size: 1rem;
    font-weight: bold;
    display: none;
  }
  
  .profile-image-container.image-placeholder:hover .change-image-text {
    display: block;
  }
  
  .profile-image-container.image-placeholder:hover img {
    filter: grayscale(100%);
  }
  
  .profile-image-container img {
    transition: filter 0.3s ease;
  }
  
  .modal {
    display: block;
    background-color: rgba(0, 0, 0, 0.5);
  }
  </style>
  