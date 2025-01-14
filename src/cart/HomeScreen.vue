<template>
  <div>
    <MainHeader />
    <div class="container py-4 mt-4">
      <!-- Grid de Productos -->
      <main>
        <div class="row g-4">
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
                  Agregar al carrito
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

const products = ref([]); 

const fetchProducts = async ()  => {
  try {
    const response = await axios.get('/api/v1/productos')
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
  console.log(product)
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
}
</style>
