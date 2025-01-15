<template>
  <div v-if="product" class="container py-4">
    <div class="row h-100">
      <!-- Columna de la imagen -->
      <div class="col-md-6 mb-4 h-100">
        <img
          :src="product.imagenUrl || defaultImage"
          :alt="product.nombreProducto"
          class="img-fluid rounded"
        />

        <!-- Miniaturas adicionales solo si hay más de una imagen -->
        <div
          v-if="product.additionalImages && product.additionalImages.length > 0"
          class="d-flex mt-3 gap-2"
        >
          <div
            v-for="(image, index) in product.additionalImages"
            :key="index"
            class="thumbnail-container"
            style="width: 80px; height: 80px"
          >
            <img
              :src="image"
              :alt="product.name"
              class="img-thumbnail"
              style="
                width: 100%;
                height: 100%;
                object-fit: cover;
                cursor: pointer;
              "
              @click="setMainImage(image)"
            />
          </div>
        </div>
      </div>

      <!-- Columna de detalles -->
      <div class="col-md-6">
        <h2 class="mb-2">{{ product.nombreProducto }}</h2>
        <p class="text-muted mb-3">de {{ product.proveedor.nombreProveedor }}</p>

        <div class="fs-3 fw-bold text-primary mb-4">
          {{ formatPrice(product.precioUnitario) }}
        </div>

        <!-- Stock status -->
        <div class="mb-4">
          <span v-if="product.stock > 0" class="badge bg-success">En stock</span>
          <span v-else class="badge bg-danger">Agotado</span>
        </div>

        <!-- Cantidad y botón de agregar al carrito -->
        <div class="mb-4">
          <label for="quantity" class="form-label">Cantidad:</label>
          <div class="d-flex gap-3 align-items-center">
            <div class="input-group" style="width: 130px">
              <button
                class="btn btn-outline-secondary"
                type="button"
                @click="decreaseQuantity"
                :disabled="quantity <= 1"
              >
                <i class="bi bi-dash"></i>
              </button>
              <input
                type="number"
                class="form-control text-center"
                id="quantity"
                v-model.number="quantity"
                min="1"
                readonly
                :max="product.stock"
              />
              <button
                class="btn btn-outline-secondary"
                type="button"
                @click="increaseQuantity"
                :disabled="quantity >= product.stock"
              >
                <i class="bi bi-plus"></i>
              </button>
            </div>

            <button
              class="btn btn-primary"
              @click="addToCart"
              :disabled="product.stock <= 0"
            >
              Agregar al carrito
            </button>
          </div>
        </div>

        <!-- Descripción -->
        <div class="mt-4">
          <h5>Descripción</h5>
          <p>{{ product.descripcionProducto }}</p>
        </div>
      </div>
    </div>
    <!-- Componente de reseñas -->
    <ResenasProducto :productId="product.idProducto" />
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import ResenasProducto from "@/cart/ResenasProducto.vue";
import axios from "axios";
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue3-toastify'

export default defineComponent({
  name: "ProductDetail",
  components: {
    ResenasProducto,
  },

  setup() {
    const route = useRoute();
    const router = useRouter()
    const product = ref(null);
    const quantity = ref(1);
    const defaultImage = "https://via.placeholder.com/500"; // Imagen genérica por defecto
    const user = JSON.parse(localStorage.getItem("userInfo"));
    console.log(user)

    const loadProduct = async () => {
      const idProduct = route.query.id
      console.log(idProduct)
      try {
        const response = await axios.get(
          `/api/v1/productos/${idProduct}`
        )
        product.value = response.data;
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

    // Agregar al carrito
    const addToCart = async () => {
      const data = {
        cantidad: quantity.value,
        producto: product.value,
        carrito: user.carrito,
      }
      try {
        const response = await axios.post('/api/v1/cart/add', data);
        if (response) {
          toast("Producto añadido al carrito", {
            hideProgressBar: true,
            autoClose: 600,
            type: "success",
            theme: "colored",
            onClose: () => {
              router.push({name: 'CarritoDeCompras'})
            },
          })
        }
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
    };

    // Formatear precio
    const formatPrice = (price) => {
      return new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
      }).format(price);
    };

    // Manejar cantidad
    const increaseQuantity = () => {
      quantity.value++;
    };

    const decreaseQuantity = () => {
      if (quantity.value > 1) {
        quantity.value--;
      }
    };

    // Cambiar imagen principal
    const setMainImage = (image) => {
      const currentMain = product.value.mainImage;
      product.value = {
        ...product.value,
        mainImage: image,
        additionalImages: product.value.additionalImages.map((img) =>
          img === image ? currentMain : img
        ),
      };
    };

    onMounted(loadProduct);

    return {
      product,
      quantity,
      defaultImage,
      formatPrice,
      increaseQuantity,
      decreaseQuantity,
      setMainImage,
      addToCart,
    };
  },
});
</script>

<style scoped>
.thumbnail-container {
  transition: all 0.2s ease-in-out;
}

.thumbnail-container:hover {
  transform: scale(1.05);
}

/* Asegurar que las imágenes mantengan su aspecto */
.img-fluid {
  max-height: 500px;
  object-fit: contain;
}
</style>
