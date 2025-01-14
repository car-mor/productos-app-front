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
            :key="product.id"
            :class="{ 'table-danger': product.stock === 0 }"
          >
            <td class="text-center">
              <img
                :src="product.photo"
                alt="Foto"
                class="rounded"
                style="width: 60px; height: 60px; object-fit: cover"
              />
            </td>
            <td class="align-middle fw-semibold">{{ product.name }}</td>
            <td class="align-middle">{{ product.description }}</td>
            <td class="align-middle">
              <div class="d-flex align-items-center">
                {{ product.provider }}
                <button
                  class="btn btn-sm btn-outline-info ms-2"
                  data-bs-toggle="modal"
                  data-bs-target="#providerDetailsModal"
                  @click="openProviderDetails(product.provider)"
                  title="Ver detalles del proveedor"
                >
                  <i class="bi bi-info-circle"></i>
                </button>
              </div>
            </td>
            <td class="align-middle">{{ product.category }}</td>
            <td class="align-middle">${{ product.price.toLocaleString() }}</td>
            <td class="align-middle">
              <div class="input-group">
                <input
                  type="number"
                  class="form-control form-control-sm"
                  v-model.number="product.stock"
                  @change="updateProductStock(product)"
                />
                <span class="input-group-text">unids.</span>
              </div>
            </td>
            <td class="align-middle">
              <div class="d-flex align-items-center">
                <select
                  class="form-select form-select-sm me-2"
                  v-model="product.status"
                  @change="updateProductStatus(product)"
                >
                  <option value="active">Activo</option>
                  <option value="inactive">Inactivo</option>
                  <option value="discontinued">Descontinuado</option>
                </select>
                <span
                  class="badge"
                  :class="{
                    'bg-success':
                      product.status === 'active' && product.stock > 0,
                    'bg-warning': product.status === 'inactive',
                    'bg-danger':
                      product.status === 'discontinued' || product.stock === 0,
                  }"
                >
                  {{ getStatusText(product) }}
                </span>
              </div>
            </td>
            <td class="align-middle">
              <div class="btn-group">
                <button
                  class="btn btn-warning btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#productModal"
                  @click="openEditProductModal(product)"
                >
                  <i class="bi bi-pencil me-1"></i>Editar
                </button>
                <button
                  class="btn btn-danger btn-sm"
                  @click="confirmDelete(product)"
                >
                  <i class="bi bi-trash me-1"></i>Eliminar
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal para editar o agregar producto (actualizado con categoría y descrpción del producto) -->
    <ddiv
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
              {{ currentProduct.id ? "Editar Producto" : "Agregar Producto" }}
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
                    v-model="currentProduct.name"
                    type="text"
                    class="form-control"
                    id="name"
                    required
                  />
                </div>
                <div class="col-md-4">
                  <label for="photo" class="form-label">Foto URL</label>
                  <input
                    v-model="currentProduct.photo"
                    type="url"
                    class="form-control"
                    id="photo"
                    required
                  />
                </div>
                <div class="col-md-4">
                  <label for="description" class="form-label"
                    >Descripción</label
                  >
                  <input
                    v-model="currentProduct.description"
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
                    v-model="currentProduct.provider"
                    class="form-select"
                    id="provider"
                    required
                  >
                    <option
                      v-for="provider in providers"
                      :key="provider.id"
                      :value="provider.name"
                    >
                      {{ provider.name }}
                    </option>
                  </select>
                </div>
                <div class="col-md-4">
                  <label for="category" class="form-label">Categoría</label>
                  <select
                    v-model="currentProduct.category"
                    class="form-select"
                    id="category"
                    required
                  >
                    <option
                      v-for="category in categories"
                      :key="category.id"
                      :value="category.name"
                    >
                      {{ category.name }}
                    </option>
                  </select>
                </div>
                <div class="col-md-4">
                  <label for="status" class="form-label">Estado</label>
                  <select
                    v-model="currentProduct.status"
                    class="form-select"
                    id="status"
                    required
                  >
                    <option value="active">Activo</option>
                    <option value="inactive">Inactivo</option>
                    <option value="discontinued">Descontinuado</option>
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
                      v-model.number="currentProduct.price"
                      type="number"
                      class="form-control"
                      id="price"
                      required
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <label for="stock" class="form-label"
                    >Cantidad en Stock</label
                  >
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
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button type="submit" class="btn btn-primary">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    </ddiv>

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
            <h5 class="modal-title" id="categoryModalLabel">
              Agregar Categoría
            </h5>
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
                <label for="categoryName" class="form-label"
                  >Nombre de la Categoría</label
                >
                <input
                  v-model="currentCategory.name"
                  type="text"
                  class="form-control"
                  id="categoryName"
                  required
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button type="submit" class="btn btn-primary">Guardar</button>
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
            <h5 class="modal-title" id="providerModalLabel">
              Agregar Proveedor
            </h5>
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
                  v-model="newProvider.name"
                  type="text"
                  class="form-control"
                  id="newProviderName"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="newProviderPhone" class="form-label"
                  >Teléfono</label
                >
                <input
                  v-model="newProvider.phone"
                  type="text"
                  class="form-control"
                  id="newProviderPhone"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="newProviderUrl" class="form-label">URL</label>
                <input
                  v-model="newProvider.url"
                  type="url"
                  class="form-control"
                  id="newProviderUrl"
                  required
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button type="submit" class="btn btn-primary">Guardar</button>
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
              <p>{{ selectedProvider.name }}</p>
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold">Teléfono:</label>
              <p>{{ selectedProvider.phone }}</p>
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold">URL:</label>
              <p>
                <a :href="selectedProvider.url" target="_blank">{{
                  selectedProvider.url
                }}</a>
              </p>
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold">Estado:</label>
              <p>
                <span
                  class="badge"
                  :class="selectedProvider.active ? 'bg-success' : 'bg-danger'"
                >
                  {{ selectedProvider.active ? "Activo" : "Inactivo" }}
                </span>
              </p>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
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
      notifications: [],
      products: [
        {
          id: 1,
          name: "Producto 1",
          description: "Descripción del producto 1",
          photo:
            "https://images.pexels.com/photos/30147974/pexels-photo-30147974/free-photo-of-iced-coffee-with-biscuit-topping-on-wooden-table.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          provider: "Proveedor 1",
          category: "Categoría 1",
          price: 100,
          stock: 10,
          status: "active",
        },
        {
          id: 2,
          name: "Producto 2",
          description: "Descripción del producto 2",
          photo:
            "https://images.pexels.com/photos/5195399/pexels-photo-5195399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          provider: "Proveedor 2",
          category: "Categoría 2",
          price: 200,
          stock: 0,
          status: "inactive",
        },
        {
          id: 3,
          name: "Producto 3",
          description: "Descripción del producto 3",
          photo:
            "https://images.pexels.com/photos/21701368/pexels-photo-21701368/free-photo-of-cup-of-tea-and-candle-on-table.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=10",
          provider: "Proveedor 2",
          category: "Categoría 2",
          price: 200,
          stock: 20,
          status: "active",
        },
        {
          id: 4,
          name: "Producto 4",
          description: "Descripción del producto 4",
          photo:
            "https://images.pexels.com/photos/28907971/pexels-photo-28907971/free-photo-of-refreshing-iced-drinks-in-cafe-setting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          provider: "Proveedor 2",
          category: "Categoría 2",
          price: 200,
          stock: 10,
          status: "active",
        },
      ],
      providers: [
        {
          id: 1,
          name: "Proveedor 1",
          phone: "123456789",
          url: "https://proveedor1.com",
          active: true,
        },
        {
          id: 2,
          name: "Proveedor 2",
          phone: "987654321",
          url: "https://proveedor2.com",
          active: true,
        },
      ],
      categories: [
        { id: 1, name: "Categoría 1" },
        { id: 2, name: "Categoría 2" },
      ],
      currentProduct: {
        id: null,
        name: "",
        description: "",
        photo: "",
        provider: "",
        ategory: "",
        price: 0,
        stock: 0,
        status: "active",
      },
      currentCategory: {
        id: null,
        name: "",
      },
      newProvider: {
        id: null,
        name: "",
        phone: "",
        url: "",
        active: true,
      },
      selectedProvider: {
        id: null,
        name: "",
        phone: "",
        url: "",
        active: false,
      },
    };
  },
  methods: {
    openAddProductModal() {
      this.currentProduct = {
        id: null,
        name: "",
        description: "",
        photo: "",
        provider: "",
        ategory: "",
        price: 0,
        stock: 0,
        status: "active",
      };
    },
    openAddCategoryModal() {
      this.currentCategory = {
        id: null,
        name: "",
      };
    },
    openAddProviderModal() {
      this.newProvider = {
        id: null,
        name: "",
        phone: "",
        url: "",
        active: true,
      };
    },
    saveCategory() {
      if (this.currentCategory.id) {
        const index = this.categories.findIndex(
          (c) => c.id === this.currentCategory.id
        );
        this.categories[index] = { ...this.currentCategory };
      } else {
        this.currentCategory.id = Date.now();
        this.categories.push({ ...this.currentCategory });
      }
      // Mostrar notificación
      this.showNotification("Categoría guardada exitosamente");
      // Cerrar el modal
      const modal = document.getElementById("categoryModal");
      const modalInstance = bootstrap.Modal.getInstance(modal);
      modalInstance.hide();
    },
    saveNewProvider() {
      this.newProvider.id = Date.now();
      this.providers.push({ ...this.newProvider });
      // Mostrar notificación
      this.showNotification("Proveedor guardado exitosamente");
      // Cerrar el modal
      const modal = document.getElementById("providerModal");
      const modalInstance = bootstrap.Modal.getInstance(modal);
      modalInstance.hide();
    },
    openEditProductModal(product) {
      this.currentProduct = { ...product };
    },
    saveProduct() {
      if (this.currentProduct.id) {
        const index = this.products.findIndex(
          (p) => p.id === this.currentProduct.id
        );
        this.products[index] = { ...this.currentProduct };
      } else {
        this.currentProduct.id = Date.now();
        this.products.push({ ...this.currentProduct });
      }
      // Cerrar el modal después de guardar
      const modal = document.getElementById("productModal");
      const modalInstance = bootstrap.Modal.getInstance(modal);
      modalInstance.hide();
    },
    confirmDelete(product) {
      if (confirm(`¿Está seguro de eliminar el producto "${product.name}"?`)) {
        this.deleteProduct(product.id);
      }
    },
    deleteProduct(id) {
      this.products = this.products.filter((p) => p.id !== id);
    },
    openProviderDetails(providerName) {
      const provider = this.providers.find((p) => p.name === providerName);
      if (provider) {
        this.selectedProvider = { ...provider };
      }
    },
    updateProductStock(product) {
      // Asegurarse de que el stock no sea negativo
      if (product.stock < 0) product.stock = 0;
    },
    updateProductStatus(product) {
      // Aquí puedes agregar lógica adicional cuando se actualiza el estado
      console.log(
        `Estado del producto ${product.name} actualizado a: ${product.status}`
      );
    },
    getStatusText(product) {
      if (product.stock === 0) return "Agotado";
      switch (product.status) {
        case "active":
          return "Disponible";
        case "inactive":
          return "Inactivo";
        case "discontinued":
          return "Descontinuado";
        default:
          return "Desconocido";
      }
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
