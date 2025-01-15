<template>
  <div class="h-screen w-full flex flex-col md:flex-row bg-gray-100">
    <MainHeader />
    <div class="container py-4">
      <h2 class="mb-4">Carrito de Compras</h2>

      <!-- Verificación de datos -->
      <template v-if="cartLenght">
        <!-- Grid container -->
        <div class="row">
          <!-- Lista de Productos - Ocupa 8 columnas en pantallas grandes -->
          <div class="col-md-8">
            <div class="card shadow-md mb-4">
              <div class="card-body">
                <!-- Encabezado de la lista -->
                <div class="d-none d-md-flex w-full border-bottom pb-2 mb-3">
                  <div class="col-6">Producto</div>
                  <div class="col-2 text-center">Cantidad</div>
                  <div class="col-2 text-center">Precio</div>
                  <div class="col-2 text-center">Subtotal</div>
                </div>

                <!-- Items del carrito -->
                <template v-if="cartLenght > 0">
                  <div
                    v-for="item in cart"
                    :key="item.id"
                    class="row align-items-center py-3 border-bottom"
                  >
                    <!-- Información del producto -->
                    <div class="col-12 col-md-6 mb-2 mb-md-0">
                      <div class="d-flex align-items-center">
                        <img
                          :src="item.producto.imagenUrl"
                          :alt="item.producto.nombreProducto"
                          class="cart-item-image me-3"
                          style="width: 80px; height: 80px; object-fit: cover"
                        />
                        <div>
                          <h6 class="mb-0">{{ item.producto.nombreProducto }}</h6>
                          <small class="text-muted"
                            >Proveedor: {{ item.producto.proveedor.nombreProveedor }}</small
                          >
                        </div>
                      </div>
                    </div>

                    <!-- Control de cantidad -->
                    <div class="col-12 col-md-2 mb-2 mb-md-0">
                      <div
                        class="d-flex justify-content-center align-items-center"
                      >
                        <button
                          class="btn btn-sm btn-outline-secondary"
                          @click="decreaseQuantity(item)"
                        >
                          <i class="bi bi-dash"></i>
                          <!-- Ícono de menos -->
                        </button>
                        <input
                          type="number"
                          class="form-control form-control-sm mx-2 text-center"
                          style="width: 60px"
                          v-model.number="item.cantidad"
                          readonly
                          :max="item.producto.stock"
                        />
                        <button
                          class="btn btn-sm btn-outline-secondary"
                          :disabled="item.cantidad >= item.producto.stock"
                          @click="increaseQuantity(item)"
                        >
                          <i class="bi bi-plus"></i>
                          <!-- Ícono de más -->
                        </button>
                      </div>
                    </div>

                    <!-- Precio unitario -->
                    <div class="col-6 col-md-2 text-end text-md-center">
                      <span class="d-inline d-md-none">Precio: </span>
                      {{ formatPrice(item.producto.precioUnitario) }}
                    </div>

                    <!-- Subtotal -->
                    <div class="col-6 col-md-2 text-end text-md-center">
                      <span class="d-inline d-md-none">Subtotal: </span>
                      {{ formatPrice(item.producto.precioUnitario * item.cantidad) }}
                      <button
                        class="btn btn-sm text-danger ms-2"
                        @click="removeItem(item)"
                      >
                        <i class="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                </template>

                <!-- Carrito vacío -->
                <div v-else class="text-center py-5">
                  <i class="bi bi-cart-x fs-1 text-muted"></i>
                  <p class="mt-2">Tu carrito está vacío</p>
                  <router-link to="/products" class="btn btn-primary">
                    Continuar Comprando
                  </router-link>
                </div>
              </div>
            </div>
          </div>

          <!-- Resumen del Carrito -->
          <div class="col-md-4">
            <div class="card shadow-sm">
              <div class="card-body">
                <h5 class="card-title mb-4">Resumen de Compra</h5>

                <!-- Dirección de envío -->
                <div class="mb-4">
                  <h6 class="mb-2">Dirección de Envío</h6>
                  <address class="mb-0" v-if="cart.shippingAddress"></address>
                  <button
                    class="btn btn-sm btn-outline-primary mt-2"
                    @click="showAddressForm = true"
                  >
                    Ver dirección
                  </button>
                  <!-- Modal para editar dirección -->
                  <template v-if="showAddressForm">
                    <div class="modal-overlay">
                      <div class="modal-content shadow bg-white">
                        <h5>Dirección de entrega</h5>
                        <div class="mb-3">
                          <label for="street" class="form-label">
                            {{ editAddress }}
                          </label>
                        </div>
                        <div class="d-flex justify-content-end">
                          <button
                            type="button"
                            class="btn btn-primary"
                            @click="showAddressForm = false"
                          >
                            Cerrar
                          </button>
                        </div>
                      </div>
                    </div>
                  </template>
                </div>

                <!-- Totales -->
                <div class="border-top pt-3">
                  <div class="d-flex justify-content-between mb-2">
                    <span>Subtotal</span>
                    <span>{{ formatPrice( subTotal ) }}</span>
                  </div>
                  <div class="d-flex justify-content-between mb-2">
                    <span>Envío</span>
                    <span>{{ formatPrice(0.0) }}</span>
                  </div>
                  <div
                    class="d-flex justify-content-between fw-bold mt-3 pt-3 border-top"
                  >
                    <span>Total</span>
                    <span>{{ formatPrice( subTotal ) }}</span>
                  </div>

                  <router-link
                    :to="{ path: '/metodo-pago', query: { subTotal: subTotal } }"
                    class="w-100 mt-4"
                  >
                    <button
                      class="btn btn-primary w-100"
                      :disabled="!cart.length"
                    >
                      Proceder al Pago
                    </button>
                  </router-link>
                  <router-link
                    to="/home-screen"
                    class="btn btn-outline-secondary w-100 mt-3"
                  >
                    Regresar a Inicio
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="text-center py-5">
          <p>Cargando...</p>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import MainHeader from "@/components/MainHeader.vue";
import axios from "axios";
export default defineComponent({
  name: "ShoppingCart",

  components: {
    MainHeader,
  },

  setup() {
    const cart = ref([]);
    const cartLenght = ref(0);
    const subTotal = ref(0);
    const showAddressForm = ref(false);
    const user = JSON.parse(localStorage.getItem("userInfo"));

    const loadCart = async () => {
      try {
        const response = await axios.get("/api/v1/cart/by-user/", {
          params: { idCliente: user.idCliente },
        });
        cart.value = response.data;
        cartLenght.value = cart.value.length;
        getSubTotal()
      } catch (error) {
        if (error.response) {
          let messageError = error.response.data.message;
          toast(messageError, {
            hideProgressBar: true,
            autoClose: 1500,
            type: "error",
            theme: "colored",
          });
        }
      }
    };

    const formatAddres = () => {
      if (!user || !user.calle || !user.colonia || !user.numero || !user.codigoPostal) {
        return "Dirección incompleta";
      }
      return `${user.calle} ${user.numero}, ${user.colonia}, CP ${user.codigoPostal}`;
    }
    const editAddress = ref(formatAddres());

    // Formatear precio
    const formatPrice = (price) =>
      new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
      }).format(price);
    
    const getSubTotal = async () => {
      console.log(user.carrito.idCarrito)
      try {
        const response = await axios.get("/api/v1/cart/get-total/", {
          params: { idCarrito: user.carrito.idCarrito }
        })
        if (response) {
          subTotal.value = parseFloat(response.data).toFixed(2);
        }
      } catch (error) {
        if (error.response) {
          let messageError = error.response.data.message;
          toast(messageError, {
            hideProgressBar: true,
            autoClose: 1500,
            type: "error",
            theme: "colored",
          });
        }
      }
    }

    // Actualizar cantidad de un producto
    const updateQuantity = async (item) => {
      item['carrito'] = user.carrito;
      try {
        const response = await axios.post("/api/v1/cart/update", item)
        if (response ) {
          loadCart()
          getSubTotal()
        }
      } catch (error) {
        if (error.response) {
          let messageError = error.response.data.message;
          toast(messageError, {
            hideProgressBar: true,
            autoClose: 1500,
            type: "error",
            theme: "colored",
          });
        }
      }
    };

    const increaseQuantity = (item) => {
      item.cantidad++;
      updateQuantity(item);
    };

    const decreaseQuantity = (item) => {
      if (item.cantidad > 1) {
        item.cantidad--;
      }
      updateQuantity(item);
    };

    const removeItem = async (item) => {
      item['carrito'] = user.carrito;
      try {
        const response = await axios.post("/api/v1/cart/remove", item)
        if (response ) {
          loadCart()
          getSubTotal()
        }
      } catch (error) {
        if (error.response) {
          let messageError = error.response.data.message;
          toast(messageError, {
            hideProgressBar: true,
            autoClose: 1500,
            type: "error",
            theme: "colored",
          });
        }
      }
    };

    const proceedToCheckout = () => {
      alert("Redirigiendo al checkout...");
    };

    onMounted(loadCart);

    return {
      cart,
      cartLenght,
      subTotal,
      showAddressForm,
      editAddress,
      formatPrice,
      increaseQuantity,
      decreaseQuantity,
      removeItem,
      proceedToCheckout,
    };
  },
});
</script>

<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
