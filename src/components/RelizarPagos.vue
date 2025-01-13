<template>
  <div class="container mt-4">
    <h2 class="d-flex align-items-center justify-content-between mb-4">
      Finalizar la compra de manera segura
      <img src="../assets/logoElectroShop.png" alt="Seguridad" style="max-height: 150px;" />
    </h2>

    <!-- Información de envío -->
    <div class="card mb-4">
      <div class="card-body">
        <p>
          Enviar a: <strong>{{ shippingAddress.name }}</strong><br />
          {{ shippingAddress.address }}
        </p>
        <button class="btn btn-link p-0" @click="changeAddress">Cambiar</button>
      </div>
    </div>

    <!-- Métodos de pago -->
    <div class="card mb-4">
      <div class="card-body">
        <h5 class="card-title">Método de pago</h5>

        <!-- Mis tarjetas -->
        <div class="mb-3">
          <h6>Mis tarjetas</h6>
          <router-link to="/metodo-pago" class="btn btn-outline-primary btn-sm">
            Agregar una tarjeta de crédito o débito
          </router-link>
        </div>

        <!-- Pagar en efectivo -->
        <div class="mb-3">
          <h6>Tus servicios de pago</h6>
          <div class="form-check">
            <input class="form-check-input" type="radio" id="cash" name="payment" />
            <label class="form-check-label" for="cash">Pagar en efectivo</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" id="card" name="payment" />
            <label class="form-check-label" for="card">Pagar con tarjeta</label>
          </div>
        </div>

        <!-- Saldo disponible -->
        <div class="mb-3">
          <h6>Tu saldo disponible</h6>
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Ingresa un código de tarjeta de regalo" />
            <button class="btn btn-primary">Aplicar</button>
          </div>
        </div>

        <!-- Otros métodos de pago -->
        <div class="mb-3">
          <h6>Otros métodos de pago</h6>
          <button class="btn btn-outline-primary btn-sm">Agregar un nuevo vale de despensa</button>
        </div>
      </div>
    </div>

    <!-- Resumen del pedido -->
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Resumen del pedido</h5>
        <p>Total (IVA incluido): <strong>$799.00</strong></p>
        <div>
          <!-- Botón para confirmar pago y dirección -->
          <button 
            class="btn btn-outline-success w-100"
            @click="showModal"
          >
            Confirmar pago y dirección de envío
          </button>

          <!-- Modal de confirmación -->
          <div 
            class="modal fade"
            id="confirmationModal"
            tabindex="-1"
            aria-labelledby="confirmationModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="confirmationModalLabel">¡Pedido confirmado!</h5>
                  <button 
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body text-center">
                  <!-- Ícono de check -->
                  <div class="check-icon">
                    <i class="bi bi-check-circle-fill text-success" style="font-size: 3rem;"></i>
                  </div>
                  <!-- Texto de confirmación -->
                  <p class="mt-3 fw-bold text-success">¡Se confirmó tu pedido! Espéralo muy pronto.</p>
                </div>
                <div class="modal-footer">
                  <button 
                    type="button"
                    class="btn btn-outline-danger"
                    data-bs-dismiss="modal"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para cambiar dirección -->
    <div 
      class="modal fade"
      id="changeAddressModal"
      tabindex="-1"
      aria-labelledby="changeAddressModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="changeAddressModalLabel">Cambiar dirección</h5>
            <button 
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="name" class="form-label">Nombre</label>
              <input 
                type="text" 
                id="name" 
                class="form-control" 
                v-model="shippingAddress.name" 
              />
            </div>
            <div class="mb-3">
              <label for="address" class="form-label">Dirección</label>
              <input 
                type="text" 
                id="address" 
                class="form-control" 
                v-model="shippingAddress.address" 
              />
            </div>
          </div>
          <div class="modal-footer">
            <button 
              type="button" 
              class="btn btn-outline-danger" 
              data-bs-dismiss="modal"
            >
              Cancelar
            </button>
            <button 
              type="button" 
              class="btn btn-outline-success"
              data-bs-dismiss="modal"
            >
              Cambiar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";

export default {
  data() {
    return {
      shippingAddress: {
        name: "Gerardo Ortiz",
        address: "Cerrada de Alborada, TARANGO, CIUDAD DE MÉXICO, 01588",
      },
    };
  },
  methods: {
    changeAddress() {
      const modalElement = document.getElementById("changeAddressModal");
      const modalInstance = new Modal(modalElement);

      // Abre el modal
      modalInstance.show();
    },
    showModal() {
      const modalElement = document.getElementById("confirmationModal");
      const modalInstance = new Modal(modalElement);

      // Muestra el modal
      modalInstance.show();
    },
  },
};
</script>

<style scoped>
.card-title {
  color: #111;
}

.check-icon {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
