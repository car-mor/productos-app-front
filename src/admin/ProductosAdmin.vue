<template>
  <div class="container-fluid px-4">
    <h1 class="text-center my-4">Gestión de Productos</h1>

    <div class="position-fixed top-0 end-0 p-3" style="z-index: 1050">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        class="toast show align-items-center text-bg-success border-0"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div class="d-flex">
          <div class="toast-body">
            {{ notification.message }}
          </div>
          <button
            type="button"
            class="btn-close btn-close-white me-2 m-auto"
            @click="closeNotification(notification.id)"
          ></button>
        </div>
      </div>
    </div>

    <!-- Botón para agregar un nuevo producto -->
    <button
      class="btn btn-primary me-4 mb-4 px-4"
      data-bs-toggle="modal"
      data-bs-target="#productModal"
      @click="openAddProductModal"
    >
      <i class="bi bi-plus-circle me-2"></i>Agregar Producto
    </button>

    <!-- Botón para agregar nueva categoría -->
    <button
      class="btn btn-primary me-4 mb-4 px-4"
      data-bs-toggle="modal"
      data-bs-target="#categoryModal"
      @click="openAddCategoryModal"
    >
      <i class="bi bi-folder-plus me-2"></i>Agregar Categoría
    </button>

    <!-- Botón para agregar un nuevo proveedor -->
    <button
      class="btn btn-primary me-4 mb-4 px-4"
      data-bs-toggle="modal"
      data-bs-target="#providerModal"
      @click="openAddProviderModal"
    >
      <i class="bi bi-building-add me-2"></i>Agregar Proveedor
    </button>

    <!-- Tabla de productos (actualizada con categoría)-->
    <div class="table-responsive shadow-sm rounded">
      <table class="table table-hover table-bordered mb-0">
        <thead class="table-dark">
          <tr>
            <th class="text-center" style="width: 80px">Foto</th>
            <th style="min-width: 200px">Nombre</th>
            <th style="min-width: 180px">Descripcion</th>
            <th style="min-width: 180px">Proveedor</th>
            <th style="min-width: 150px">Categoría</th>
            <th style="min-width: 120px">Precio</th>
            <th style="min-width: 150px">Stock</th>
            <th style="min-width: 150px">Estado</th>
            <th style="min-width: 200px">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="product in products"
            :key="product.idProducto"
            :class="{ 'table-danger': product.stock === 0 }"
          >
            <td class="text-center">
              <img
                :src="product.imagenUrl"
                alt="Foto"
                class="rounded"
                style="width: 60px; height: 60px; object-fit: cover"
              />
            </td>
            <td class="align-middle fw-semibold">{{ product.nombreProducto }}</td>
            <td class="align-middle">{{ product.descripcionProducto }}</td>
            <td class="align-middle">
              <div class="d-flex align-items-center">
                {{ product.proveedor.nombreProveedor }}
                <button
                  class="btn btn-sm btn-outline-info ms-2"
                  data-bs-toggle="modal"
                  data-bs-target="#providerDetailsModal"
                  @click="openProviderDetails(product.proveedor.nombreProveedor)"
                  title="Ver detalles del proveedor"
                >
                  <i class="bi bi-info-circle"></i>
                </button>
              </div>
            </td>
            <td class="align-middle">{{ product.categoria.nombreCategoria }}</td>
            <td class="align-middle">${{ product.precioUnitario.toLocaleString() }}</td>
            <td class="align-middle">
              <div class="input-group">
                <input
                  type="number"
                  class="form-control form-control-sm"
                  v-model.number="product.stock"
                  readonly
                  @change="updateProductStock(product)"
                />
                <span class="input-group-text">unids.</span>
              </div>
            </td>
            <td class="align-middle text-center">
              <div class="d-flex justify-content-center align-items-center">
                <span 
                  class="badge" 
                  :class="{
                    'bg-success': product.activo === true,
                    'bg-danger': product.activo === false,
                  }"
                >
                  {{ product.activo ? 'Activo' : 'Inactivo' }}
                </span>
              </div>
            </td>
            <td class="align-middle text-center">
              <button
                class="btn btn-warning btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#productModal"
                @click="openEditProductModal(product)"
              >
                <i class="bi bi-pencil me-1"></i>Editar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal para editar o agregar producto (actualizado con categoría y descrpción del producto) -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      aria-labelledby="productModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="productModalLabel">
              {{ currentProduct.idProducto ? "Editar Producto" : "Agregar Producto" }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form @submit.prevent="saveProduct">
            <div class="modal-body">
              <!-- Primera fila -->
              <div class="row mb-3">
                <div class="col-md-4">
                  <label for="name" class="form-label">Nombre</label>
                  <input
                    v-model="currentProduct.nombreProducto"
                    type="text"
                    class="form-control"
                    id="name"
                    required
                  />
                </div>
                <div class="col-md-4">
                  <label for="photo" class="form-label">Foto URL</label>
                  <input
                    v-model="currentProduct.imagenUrl"
                    type="url"
                    class="form-control"
                    id="photo"
                    required
                  />
                </div>
                <div class="col-md-4">
                  <label for="description" class="form-label">Descripción</label>
                  <input
                    v-model="currentProduct.descripcionProducto"
                    type="text"
                    class="form-control"
                    id="description"
                    required
                  />
                </div>
              </div>

              <!-- Segunda fila -->
              <div class="row mb-3">
                <div class="col-md-4">
                  <label for="provider" class="form-label">Proveedor</label>
                  <select
                    v-model="currentProduct.proveedor"
                    class="form-select"
                    id="provider"
                    required
                  >
                    <option
                      v-for="provider in providers"
                      :key="provider.idProveedor"
                      :value="provider"
                    >
                      {{ provider.nombreProveedor }}
                    </option>
                  </select>
                </div>
                <div class="col-md-4">
                  <label for="category" class="form-label">Categoría</label>
                  <select
                    v-model="currentProduct.categoria"
                    class="form-select"
                    id="category"
                    required
                  >
                    <option
                      v-for="category in categories"
                      :key="category.idCategoria"
                      :value="category"
                    >
                      {{ category.nombreCategoria }}
                    </option>
                  </select>
                </div>
                <div class="col-md-4">
                  <label for="status" class="form-label">Estado</label>
                  <select
                    v-model="currentProduct.activo"
                    class="form-select"
                    id="status"
                    required
                  >
                    <option :value="true">Activo</option>
                    <option :value="false">Inactivo</option>
                  </select>
                </div>
              </div>

              <!-- Tercera fila -->
              <div class="row">
                <div class="col-md-6">
                  <label for="price" class="form-label">Precio</label>
                  <div class="input-group">
                    <span class="input-group-text">$</span>
                    <input
                      v-model.number="currentProduct.precioUnitario"
                      type="number"
                      class="form-control"
                      id="price"
                      required
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <label for="stock" class="form-label">Cantidad en Stock</label>
                  <div class="input-group">
                    <input
                      v-model.number="currentProduct.stock"
                      type="number"
                      class="form-control"
                      id="stock"
                      required
                    />
                    <span class="input-group-text">unidades</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                Cancelar
              </button>
              <button type="submit" class="btn btn-primary">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Modal para agregar categoría -->
    <div
      class="modal fade"
      id="categoryModal"
      tabindex="-1"
      aria-labelledby="categoryModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="categoryModalLabel">Agregar Categoría</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form @submit.prevent="saveCategory">
            <div class="modal-body">
              <div class="mb-3">
                <label for="categoryName" class="form-label">Nombre Categoría</label>
                <input
                  v-model="newCategory.nombreCategoria"
                  type="text"
                  class="form-control"
                  id="categoryName"
                  required
                />
              </div>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="categoryName" class="form-label">Descripción Categoría</label>
                <input
                  v-model="newCategory.descripcionCategoria"
                  type="text"
                  class="form-control"
                  id="categoryName"
                  required
                />
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                Cancelar
              </button>
              <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Modal para agregar proveedor -->
    <div
      class="modal fade"
      id="providerModal"
      tabindex="-1"
      aria-labelledby="providerModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="providerModalLabel">Agregar Proveedor</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form @submit.prevent="saveNewProvider">
            <div class="modal-body">
              <div class="mb-3">
                <label for="newProviderName" class="form-label">Nombre</label>
                <input
                  v-model="newProvider.nombreProveedor"
                  type="text"
                  class="form-control"
                  id="newProviderName"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="newProviderPhone" class="form-label">Teléfono</label>
                <input
                  v-model="newProvider.telefono"
                  type="text"
                  class="form-control"
                  id="newProviderPhone"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="newProviderUrl" class="form-label">URL</label>
                <input
                  v-model="newProvider.urlProveedor"
                  type="url"
                  class="form-control"
                  id="newProviderUrl"
                  required
                />
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                Cancelar
              </button>
              <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Modal para detalles del proveedor (sactualizado) -->
    <div
      class="modal fade"
      id="providerDetailsModal"
      tabindex="-1"
      aria-labelledby="providerDetailsModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="providerDetailsModalLabel">
              Detalles del Proveedor
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label fw-bold">Nombre:</label>
              <p>{{ selectedProvider.nombreProveedor }}</p>
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold">Teléfono:</label>
              <p>{{ selectedProvider.telefono }}</p>
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold">URL:</label>
              <p>
                <a :href="selectedProvider.urlProveedor" target="_blank">{{
                  selectedProvider.urlProveedor
                }}</a>
              </p>
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold">Estado:</label>
              <p>
                <span
                  class="badge"
                  :class="selectedProvider.activo ? 'bg-success' : 'bg-danger'"
                >
                  {{ selectedProvider.activo ? "Activo" : "Inactivo" }}
                </span>
              </p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { toast } from "vue3-toastify";
export default {
  data() {
    return {
      notifications: [],
      products: [],
      providers: [],
      categories: [],
      currentProduct: {
        idProducto: null,
        nombreProducto: "",
        descripcionProducto: "",
        imagenUrl: "",
        proveedor: "",
        categoria: "",
        precioUnitario: 0,
        stock: 0,
        activo: false,
      },
      newCategory: {
        nombreCategoria: "",
        descripcionCategoria: "",
      },
      newProvider: {
        nombreProveedor: "",
        telefono: "",
        urlProveedor: "",
        active: true,
      },
      selectedProvider: {
        idProveedor: null,
        nombreProveedor: "",
        telefono: "",
        urlProveedor: "",
        activo: false,
      },
    };
  },
  created() {
    this.fetchProducts();
    this.fetchCategories();
    this.fetchProviders();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get("/api/v1/productos");
        const products = response.data;
        this.products = [...products];
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
    },
    async fetchCategories() {
      try {
        const response = await axios.get("/api/v1/categorias");
        this.categories = response.data;
      } catch (error) {
        console.error("Error al cargar las categorías:", error);
        this.categories = [];
      }
    },
    async fetchProviders() {
      try {
        const response = await axios.get("/api/v1/proveedores");
        this.providers = response.data;
      } catch (error) {
        console.error("Error al cargar los proveedores:", error);
        this.providers = [];
      }
    },
    openAddProductModal() {
      this.currentProduct = {
        idProducto: null,
        nombreProducto: "",
        descripcionProducto: "",
        imagenUrl: "",
        proveedor: "",
        categoria: "",
        precioUnitario: 0,
        stock: 0,
        activo: false,
      }
    },
    openAddCategoryModal() {
      this.newCategory = {};
    },
    openAddProviderModal() {
      this.newProvider = {};
    },
    async saveCategory() {
      const proxy = new Proxy(this.newCategory, {
        get(target, prop) {
          if (prop === "getOriginal") {
            return () => JSON.parse(JSON.stringify(target)); // Deserializa para eliminar el Proxy
          }
          return prop in target ? target[prop] : undefined;
        },
      });
      try {
        const response = await axios.post("/api/v1/categorias", proxy.getOriginal());
        if (response) {
          toast("Categoría guardada correctamente", {
            hideProgressBar: true,
            autoClose: 1500,
            type: "success",
            theme: "colored",
          });
          this.fetchCategories();
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
    },
    async saveNewProvider() {
      const proxy = new Proxy(this.newProvider, {
        get(target, prop) {
          if (prop === "getOriginal") {
            return () => JSON.parse(JSON.stringify(target)); // Deserializa para eliminar el Proxy
          }
          return prop in target ? target[prop] : undefined;
        },
      });
      try {
        const response = await axios.post("/api/v1/proveedores", proxy.getOriginal());
        if (response) {
          toast("Proveedor guardado correctamente", {
            hideProgressBar: true,
            autoClose: 1500,
            type: "success",
            theme: "colored",
          });
          this.fetchProviders();
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
    },
    openEditProductModal(product) {
      this.currentProduct = { ...product };
    },
    async saveProduct() {
      let successMessage = ''
      if (this.currentProduct.idProducto) {
        successMessage = "Producto actualizado correctamente";
      } else {
        successMessage = "Producto guardado correctamente";
      }
      try {
        const response = await axios.post(
          "/api/v1/productos", this.currentProduct
        );
        if (response) {
          toast(successMessage, {
            hideProgressBar: true,
            autoClose: 1500,
            type: "success",
            theme: "colored",
          });
          this.fetchProducts();
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
    },
    openProviderDetails(providerName) {
      console.log(providerName);
      console.log(this.providers);
      const provider = this.providers.find((p) => p.nombreProveedor === providerName);
      if (provider) {
        this.selectedProvider = { ...provider };
      }
    },
    updateProductStock(product) {
      // Asegurarse de que el stock no sea negativo
      if (product.stock < 0) product.stock = 0;
    },

    // Método para mostrar una notificación
    showNotification(message) {
      const id = Date.now(); // Generar un ID único para la notificación
      this.notifications.push({ id, message });

      // Eliminar la notificación después de 3 segundos
      setTimeout(() => {
        this.notifications = this.notifications.filter(
          (notification) => notification.id !== id
        );
      }, 3000);
    },

    // Método para cerrar una notificación manualmente
    closeNotification(id) {
      this.notifications = this.notifications.filter(
        (notification) => notification.id !== id
      );
    },
  },
};
</script>

<style>
.container-fluid {
  max-width: 1400px;
}

.table th {
  background-color: #2c3e50;
  color: white;
  font-weight: 500;
}

.btn-group {
  gap: 0.5rem;
}

.modal-lg {
  max-width: 800px;
}

.badge {
  min-width: 90px;
  padding: 0.5em 0.8em;
}
</style>
