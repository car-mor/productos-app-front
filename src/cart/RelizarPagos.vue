<template>
  <div class="container mt-4">
    <h2 class="d-flex align-items-center justify-content-between mb-4">
      Finalizar la compra de manera segura
      <img
        src="../assets/logoElectroShop.png"
        alt="Seguridad"
        style="max-height: 150px"
      />
    </h2>

    <!-- Información de envío -->
    <div class="card mb-4">
      <div class="card-body">
        <div class="mb-3 d-flex align-items-center">
          <CarIcon class="me-2" />
          <h5 class="card-title mb-0">Datos del envío</h5>
        </div>
        <p>
          Enviar a: <strong>{{ shippingAddress.name }}</strong
          ><br />
          {{ shippingAddress.address }}
        </p>
        <button class="btn btn-link p-0" @click="changeAddress">Cambiar</button>
      </div>
    </div>

    <!-- Métodos de pago -->
    <div class="card mb-4">
      <div class="card-body">
        <div class="mb-3 d-flex align-items-center">
          <WalletCardsIcon class="me-2" />
          <h5 class="card-title mb-0">Pagar con tarjeta de crédito o débito</h5>
        </div>
        <!-- Mis tarjetas -->
        <div class="mb-3">
          <h6>Mis tarjetas</h6>
          <form @submit.prevent="agregarTarjeta" class="mb-3">
            <div class="row g-3">
              <div class="col-md-6 position-relative">
                <label for="numeroTarjeta" class="form-label"
                  >Número de tarjeta</label
                >
                <input
                  type="text"
                  id="numeroTarjeta"
                  v-model="nuevaTarjeta.numero"
                  class="form-control pe-5"
                  placeholder="---- ---- ---- ----"
                  required
                />
                <div
                  class="card-icons position-absolute mt-2"
                  style="right: 10px; top: 50%; transform: translateY(-50%)"
                >
                  <img
                    src="../assets/visa.png"
                    alt="Visa"
                    style="width: 30px; margin-right: 5px"
                  />
                  <img
                    src="../assets/mastercard.png"
                    alt="MasterCard"
                    style="width: 30px"
                  />
                </div>
              </div>

              <div class="col-md-3">
                <label for="fechaVencimiento" class="form-label"
                  >Fecha de vencimiento</label
                >
                <input
                  type="text"
                  id="fechaVencimiento"
                  v-model="nuevaTarjeta.fechaVencimiento"
                  class="form-control"
                  placeholder="MM/AA"
                  required
                />
              </div>
              <div class="col-md-3">
                <label for="codigoSeguridad" class="form-label">CVC</label>
                <input
                  type="text"
                  id="codigoSeguridad"
                  v-model="nuevaTarjeta.cvc"
                  class="form-control"
                  placeholder="CVC"
                  required
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Selección de país y checkboxes -->
    <div class="card mb-4">
      <div class="card-body">
        <div class="mb-3 d-flex align-items-center">
          <LucideInfo class="mx-2" />
          <h5 class="card-title">Información adicional</h5>
        </div>
        <div class="mb-3">
          <label for="pais" class="form-label"
            >Selecciona tu país o región</label
          >
          <select
            id="pais"
            class="form-select"
            v-model="paisSeleccionado"
            required
          >
            <option value="">Seleccione una opción</option>
            <option value="MX">México</option>
            <option value="US">Estados Unidos</option>
            <option value="ES">España</option>
            <option value="AR">Argentina</option>
          </select>
        </div>
        <div class="form-check mb-2">
          <input
            class="form-check-input"
            type="checkbox"
            id="aceptarTerminos"
            v-model="aceptaTerminos"
            required
          />
          <label class="form-check-label" for="aceptarTerminos">
            Acepto los términos y condiciones
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            id="mayorEdad"
            v-model="esMayorEdad"
            required
          />
          <label class="form-check-label" for="mayorEdad">
            Confirmo que soy mayor de edad
          </label>
        </div>
      </div>
    </div>

    <!-- Resumen del pedido -->
    <div class="card">
      <div class="card-body">
        <div class="mb-3 d-flex align-items-center">
          <LucideDollarSign class="me-2" />
          <h5 class="card-title">Resumen del pedido</h5>
        </div>
        <p>Total (IVA incluido): <strong>$799.00</strong></p>
        <div>
          <button
            class="btn btn-outline-success w-100"
            @click="showModal"
            :disabled="!aceptaTerminos || !esMayorEdad || !paisSeleccionado"
          >
            Confirmar pago y dirección de envío
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";
import {
  WalletCardsIcon,
  CarIcon,
  LucideDollarSign,
  LucideInfo,
} from "lucide-vue-next";
export default {
  name: "Relizarpagos",
  components: {
    WalletCardsIcon,
    CarIcon,
    LucideDollarSign,
    LucideInfo,
  },
  data() {
    return {
      shippingAddress: {
        name: "Gerardo Ortiz",
        address: "Cerrada de Alborada, TARANGO, CIUDAD DE MÉXICO, 01588",
      },
      nuevaTarjeta: {
        numero: "",
        fechaVencimiento: "",
        cvc: "",
      },
      tarjetas: [],
      paisSeleccionado: "",
      aceptaTerminos: false,
      esMayorEdad: false,
    };
  },
  methods: {
    changeAddress() {
      const modalElement = document.getElementById("changeAddressModal");
      const modalInstance = new Modal(modalElement);
      modalInstance.show();
    },
    showModal() {
      const modalElement = document.getElementById("confirmationModal");
      const modalInstance = new Modal(modalElement);
      modalInstance.show();
    },
    agregarTarjeta() {
      this.tarjetas.push({ ...this.nuevaTarjeta });
      this.nuevaTarjeta = {
        numero: "",
        fechaVencimiento: "",
        cvc: "",
      };
    },
  },
};
</script>
