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
            <tr v-for="pedido in pedidos" :key="pedido.id">
              <td>{{ pedido.id }}</td>
              <td>{{ pedido.cliente }}</td>
              <td>{{ pedido.fecha }}</td>
              <td>{{ pedido.total | currency }}</td>
              <td>
                <button class="btn btn-info btn-sm" @click="verDetalles(pedido.id)">Ver detalles</button>
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
              <h5>Productos</h5>
              <table class="table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Precio Unitario</th>
                    <th>Cantidad</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="producto in pedidoSeleccionado.productos" :key="producto.id">
                    <td>{{ producto.nombre }}</td>
                    <td>{{ producto.precioUnitario | currency }}</td>
                    <td>{{ producto.cantidad }}</td>
                  </tr>
                </tbody>
              </table>
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
  export default {
    name: "HistorialPedidos",
    data() {
      return {
        pedidos: [
          { 
            id: 1, 
            cliente: "Juan Pérez", 
            fecha: "2024-01-10", 
            total: 100.50, 
            productos: [
              { id: 1, nombre: "Producto A", precioUnitario: 25.00, cantidad: 2 },
              { id: 2, nombre: "Producto B", precioUnitario: 50.50, cantidad: 1 },
            ]
          },
          { 
            id: 2, 
            cliente: "María Gómez", 
            fecha: "2024-01-12", 
            total: 50.75, 
            productos: [
              { id: 3, nombre: "Producto C", precioUnitario: 25.75, cantidad: 2 },
            ]
          },
          { 
            id: 3, 
            cliente: "Carlos López", 
            fecha: "2024-01-14", 
            total: 25.00, 
            productos: [
              { id: 4, nombre: "Producto D", precioUnitario: 25.00, cantidad: 1 },
            ]
          },
        ],
        pedidoSeleccionado: null,
        mostrarModal: false,
      };
    },
    methods: {
      verDetalles(id) {
        const pedido = this.pedidos.find(pedido => pedido.id === id);
        this.pedidoSeleccionado = pedido;
        this.mostrarModal = true;
      },
      cerrarModal() {
        this.mostrarModal = false;
        this.pedidoSeleccionado = null;
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
  