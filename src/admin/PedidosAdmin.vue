<template>
  <div class="container mt-5">
    <h2>Historial de Pedidos</h2>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>ID Pedido</th>
            <th>Cliente</th>
            <th>Fecha de Pedido</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pedido in pedidos" :key="pedido.idPedido">
            <td>{{ pedido.idPedido }}</td>
            <td>{{ pedido.cliente.nombre }} {{ pedido.cliente.apellidos }}</td>
            <td>{{ formatDate(pedido.fechaCompra) }}</td>
            <td>${{ pedido.precioTotal || currency }}</td>
            <td>
              <button class="btn btn-info btn-sm" @click="verDetalles(pedido)">Ver detalles</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal de detalles del pedido -->
    <div v-if="mostrarModal" class="custom-modal">
      <div class="custom-modal-content">
        <div class="custom-modal-header">
          <h5>Detalles del Pedido</h5>
          <button class="close-btn" @click="cerrarModal">X</button>
        </div>
        <div class="custom-modal-body">
          <div v-if="pedidoSeleccionado">
            <h5>Información del Cliente</h5>
            <p><strong>Nombre:</strong> {{ pedidoSeleccionado.cliente.nombre }} {{ pedidoSeleccionado.cliente.apellidos }}</p>
            <p><strong>Email:</strong> {{ pedidoSeleccionado.cliente.email }}</p>
            <p><strong>Teléfono:</strong> {{ pedidoSeleccionado.cliente.telefono }}</p>
          </div>
          <div v-else>
            <p>Cargando detalles...</p>
          </div>
        </div>
        <div class="custom-modal-footer">
          <button class="btn btn-secondary" @click="cerrarModal">Cerrar</button>
        </div>
      </div>
    </div>
    <div v-if="mostrarModal" class="custom-modal-backdrop" @click="cerrarModal"></div>
  </div>
</template>

<script>
import axios from "axios";
import { toast } from "vue3-toastify";

export default {
  data() {
    return {
      pedidos: [],
      mostrarModal: false,
      pedidoSeleccionado: null,
    };
  },
  created() {
    this.fetchPedidos();
  },
  methods: {
    async fetchPedidos() {
      try {
        const response = await axios.get("/api/v1/pedidos");
        this.pedidos = response.data;
      } catch (error) {
        if (error.response) {
          const messageError =
            error.response.data.message || "Error al cargar los pedidos.";
          toast(messageError, {
            hideProgressBar: true,
            autoClose: 1500,
            type: "error",
            theme: "colored",
          });
        } else {
          console.error("Error de conexión:", error);
        }
      }
    },
    verDetalles(pedido) {
      this.pedidoSeleccionado = pedido;
      this.mostrarModal = true;
    },
    cerrarModal() {
      this.mostrarModal = false;
      this.pedidoSeleccionado = null;
    },
    formatDate(date) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(date).toLocaleDateString("es-MX", options);
    },
  },
  filters: {
    currency(value) {
      return `$${value.toFixed(2)}`;
    },
  },
};
</script>

  <style scoped>
  .table th {
    background-color: #f0f8ff;
    color: #333;
  }
  
  .table-striped tbody tr:nth-of-type(odd) {
    background-color: #f8f9fa;
  }
  
  .btn-info {
    background-color: #17a2b8;
  }
  
  .btn-info:hover {
    background-color: #138496;
  }
  
  .custom-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    z-index: 1050;
    width: 90%;
    max-width: 600px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .custom-modal-header,
  .custom-modal-footer {
    padding: 15px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #ddd;
  }
  
  .custom-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .custom-modal-body {
    padding: 15px;
  }
  
  .close-btn {
    background: transparent;
    border: none;
    font-size: 1.2em;
    cursor: pointer;
  }
  
  .custom-modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1040;
  }
  </style>
  