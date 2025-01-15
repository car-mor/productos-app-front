<template>
  <div>
    <MainHeader />
    <div class="container py-4 mt-4">
      <!-- Verificación si hay productos -->
      <main>
        <div v-if="products.length === 0" class="text-center py-5">
          <h3>No hay productos disponibles</h3>
          <div class="text-center">
            <img src="../assets/pctriste.png" alt="Seguridad" style="max-width: 300px;" />
        </div>
          <p class="text-muted">Por favor, verifica más tarde.</p>
        </div>
        <div v-else class="row g-4">
          <!-- Grid de Productos -->
          <div
            v-for="(product, index) in products"
            :key="index"
            class="col-12 col-sm-6 col-md-4 col-lg-3"
          >
            <div class="card h-100">
              <img
                :src="product.imagenUrl"
                class="card-img-top"
                style="height: 200px; object-fit: cover"
                :alt="product.nombreProducto"
              />
              <div class="card-body">
                <h5 class="card-title">{{ product.name }}</h5>
                <p class="card-text">
                  <span class="fw-bold">Proveedor:</span> {{ product.proveedor.nombreProveedor }}
                </p>
                <p class="card-text">
                  <span class="fs-4 text-primary fw-bold"
                    >${{ product.precioUnitario.toLocaleString() }}</span
                  >
                </p>
                <button class="btn btn-primary w-100" @click="sendToCart(product)">
                  Detalle
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from "vue";
import MainHeader from "@/components/MainHeader.vue";
import { toast } from 'vue3-toastify'
import axios from 'axios';
import { useRouter } from 'vue-router';

const products = ref([]); 
const router = useRouter()

const fetchProducts = async ()  => {
  try {
    const response = await axios.get('/api/v1/productos/activos')
    products.value = response.data
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

const sendToCart = async(product) => {
  router.push({
    name: 'ProductoCliente',
    query: { id: product.idProducto }
  })
}

onMounted(() => {
  fetchProducts();
});

</script>

<style scoped>
.card {
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.card-img-top {
  object-fit: cover;
  height: 200px;
}

.container {
  clear: both;
}

.btn-primary {
  margin-top: auto;
  border: 1px solid #2563eb;
  background-color: transparent;
  color: #2563eb; 
  padding: 10px 20px; 
  font-weight: 500; 
  border-radius: 5px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.btn-primary:hover {
  background-color: #2563eb;
  color: #ffffff;
}
</style>
