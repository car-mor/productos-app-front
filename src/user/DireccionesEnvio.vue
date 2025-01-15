<template>
  <div class="container">
    <div class="card mb-4">
      <div class="card-header bg-crema">
        <h5 class="mb-0">Direcciones de Envío</h5>
      </div>
      <div class="card-body">
        <table class="table table-hover">
          <thead class="thead-crema">
            <tr>
              <th>Calle</th>
              <th>Colonia</th>
              <th>Número</th>
              <th>Código Postal</th>
              <th>Teléfono Celular</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.idUsuario">
              <td>{{ user.calle }}</td>
              <td>{{ user.colonia }}</td>
              <td>{{ user.numero }}</td>
              <td>{{ user.codigoPostal }}</td>
              <td>{{ user.telefono }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: []
    };
  },
  created() {
    this.users.push(JSON.parse(localStorage.getItem("userInfo")));
    console.log(this.users)
  },
};
</script>

<style scoped>
.container {
  margin-top: 20px;
}

.table {
  border-collapse: separate; /* Separar celdas */
  border-spacing: 10px; /* Espacio entre las celdas */
}

.table td,
.table th {
  text-align: left;
  border-left: 2px solid #ddd; /* Agregar borde izquierdo */
}

.table th {
  background-color: #d5edf8; /* Tono crema para el header */
  color: #000000; /* Color oscuro para el texto */
  font-weight: bold;
}

.table tbody tr {
  border: 1px solid #ddd; /* Borde entre filas */
  border-radius: 8px; /* Bordes redondeados en las filas */
  transition: background-color 0.3s ease;
}

.table td,
.table th {
  border-radius: 6px; /* Bordes redondeados en las celdas */
}
</style>
