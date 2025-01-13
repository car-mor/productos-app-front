<template>
  <div class="container py-4">
    <h1 class="d-flex align-items-center justify-content-between mb-4">Mis Pedidos</h1>
    <div class="card mb-3" v-for="pedido in pedidos" :key="pedido.folio">
      <div class="card-header d-flex justify-content-between">
        <p><strong>Folio:</strong> {{ pedido.folio }}</p>
        <p><strong>Cliente:</strong> {{ pedido.cliente }}</p>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-12 col-md-6">
            <p><strong>Fecha de Compra:</strong> {{ pedido.fecha }}</p>
          </div>
          <div class="col-12 col-md-6">
            <p><strong>Tipo de Pago:</strong> {{ pedido.tipoPago }}</p>
          </div>
          <div class="col-12 col-md-6">
            <p><strong>Precio Total:</strong> ${{ pedido.precioTotal }}</p>
          </div>
          <div class="col-12 col-md-6">
            <p :class="'badge ' + estatusClass(pedido.estatus)">
              <strong>Estatus:</strong> {{ pedido.estatus }}
            </p>
          </div>
          <div class="col-12">
            <p><strong>Dirección de Envío:</strong> {{ pedido.direccionEnvio || 'No especificada' }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pedidos: [
        {
          folio: '0001',
          cliente: 'Gerardo Ortiz',
          fecha: '2025-01-05',
          tipoPago: 'Tarjeta de Crédito',
          precioTotal: 1200.50,
          estatus: 'Entregado',
          direccionEnvio: 'Calle Ficticia 123, Ciudad',
        },
        {
          folio: '0002',
          cliente: 'Gerardo Ortiz',
          fecha: '2025-01-04',
          tipoPago: 'Tarjeta de débito',
          precioTotal: 800.00,
          estatus: 'En Espera',
          direccionEnvio: 'Avenida Imaginaria 456, Ciudad',
        },
        {
          folio: '0003',
          cliente: 'Gerardo Ortiz',
          fecha: '2025-01-03',
          tipoPago: 'Tarjeta de débito',
          precioTotal: 500.75,
          estatus: 'Cancelado',
          direccionEnvio: 'No disponible',
        },
      ],
    };
  },
  methods: {
    estatusClass(estatus) {
      switch (estatus.toLowerCase()) {
        case 'cancelado':
          return 'bg-danger text-white';
        case 'en espera':
          return 'bg-warning text-dark';
        case 'entregado':
          return 'bg-success text-white';
        default:
          return '';
      }
    },
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
