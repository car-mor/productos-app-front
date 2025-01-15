<template>
  <div class="container py-4">
    <h1 class="d-flex align-items-center justify-content-between mb-4">
      Mis Pedidos
    </h1>
    <div class="card mb-3" v-for="pedido in pedidos" :key="pedido.folio">
      <div class="card-header d-flex justify-content-between">
        <p><strong>Folio:</strong> {{ pedido.numeroFolio }}</p>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-12 col-md-6">
            <p><strong>Fecha de Compra:</strong> {{ pedido.fechaCompra }}</p>
          </div>
          <div class="col-12 col-md-6">
            <p><strong>Tipo de Pago:</strong> {{ pedido.tipodePago }}</p>
          </div>
          <div class="col-12 col-md-6">
            <p><strong>Precio Total:</strong> ${{ pedido.precioTotal }}</p>
          </div>
          <div class="col-12 col-md-6">
            <p :class="'badge ' + estatusClass(pedido.estatusPedido)">
              <strong>Estatus:</strong> {{ pedido.estatusPedido }}
            </p>
          </div>
          <div class="col-12">
            <p>
              <strong>Dirección de Envío:</strong>
              {{ pedido.direccionEnvio || "No especificada" }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      user: {},
      pedidos: [],
    };
  },
  created() {
    this.user = (JSON.parse(localStorage.getItem("userInfo")));
    this.loadPedidos();
  },
  methods: {
    estatusClass(estatus) {
      switch (estatus.toLowerCase()) {
        case "cancelado":
          return "bg-danger text-white";
        case "preparando":
          return "bg-warning text-dark";
        case "entregado":
          return "bg-success text-white";
        default:
          return "";
      }
    },
    formatAddres()  {
      if (!this.user || !this.user.calle || !this.user.colonia || !this.user.numero || !this.user.codigoPostal) {
        return "Dirección incompleta";
      }
      return `${this.user.calle} ${this.user.numero}, ${this.user.colonia}, CP ${this.user.codigoPostal}`;
    },
    async loadPedidos() {
      try {
        const response = await axios.get('/api/v1/pedidos/by-cliente/', {
          params: { idCliente: this.user.idCliente }
        })
        this.pedidos = response.data;
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
  },
};
</script>

<style scoped>
.container {
  background-color: #f5f5f5;
}

.card-header p {
  margin: 0;
}

.card-body p {
  margin: 5px 0;
}

.row .col-md-6 {
  margin-bottom: 15px;
}
</style>
