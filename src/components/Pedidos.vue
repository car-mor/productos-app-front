<template>
    <div class="container py-4">
      <h1 class="d-flex align-items-center justify-content-between mb-4">Mis Pedidos
        <img src="../assets/logoElectroShop.png" alt="Seguridad" style="max-height: 150px;" />
      </h1>
      <div class="card mb-3" v-for="pedido in pedidos" :key="pedido.folio">
        <div class="card-header d-flex justify-content-between">
          <p><strong>Folio:</strong> {{ pedido.folio }}</p>
          <p><strong>Cliente:</strong> {{ pedido.cliente }}</p>
        </div>
        <div class="card-body">
          <p><strong>Fecha de Compra:</strong> {{ pedido.fecha }}</p>
          <p><strong>Tipo de Pago:</strong> {{ pedido.tipoPago }}</p>
          <p><strong>Precio Total:</strong> ${{ pedido.precioTotal }}</p>
  
          <div v-for="producto in pedido.productos" :key="producto.id" class="d-flex align-items-center mb-2">
            <img :src="producto.imagen" alt="Imagen Producto" class="img-thumbnail" width="50" height="50">
            <div class="ml-3">
              <p><strong>Producto:</strong> {{ producto.nombre }}</p>
              <p><strong>Precio Unitario:</strong> ${{ producto.precioUnitario }}</p>
            </div>
          </div>
  
          <p :class="'badge ' + estatusClass(pedido.estatus)">
            <strong>Estatus:</strong> {{ pedido.estatus }}
          </p>
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
            productos: [
              {
                id: 1,
                nombre: 'Producto 1',
                imagen: 'https://cdn.gameplanet.com/wp-content/uploads/2024/11/07112616/711719595496-P00000004362-ps5-pro-portada.jpg',
                precioUnitario: 300.00,
              },
              {
                id: 2,
                nombre: 'Producto 2',
                imagen: 'https://stgulabmexicoprod.blob.core.windows.net/correosclic/0007844_echo-dot-con-reloj-5ta-gen-bocina-inteligente-alexa-azul.jpeg',
                precioUnitario: 400.50,
              },
            ],
          },
          {
            folio: '0002',
            cliente: 'Gerardo Ortiz',
            fecha: '2025-01-04',
            tipoPago: 'PayPal',
            precioTotal: 800.00,
            estatus: 'En Espera',
            productos: [
              {
                id: 1,
                nombre: 'Producto A',
                imagen: 'https://m.media-amazon.com/images/I/61V-Ff04c1L.jpg',
                precioUnitario: 200.00,
              },
            ],
          },
          {
            folio: '0003',
            cliente: 'Gerardo Ortiz',
            fecha: '2025-01-03',
            tipoPago: 'Efectivo',
            precioTotal: 500.75,
            estatus: 'Cancelado',
            productos: [
              {
                id: 1,
                nombre: 'Producto X',
                imagen: 'https://coregaming.com.mx/assets/uploads/sw_00_1930.jpg?1672693518',
                precioUnitario: 500.75,
              },
            ],
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
  
  .ml-3 {
    margin-left: 1rem;
  }
  </style>
  