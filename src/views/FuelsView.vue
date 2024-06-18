<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div
              class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3"
            >
              <h6 class="text-white text-capitalize ps-3">Combustibles</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <material-button
              class="mx-3 my-2"
              color="primary"
              size="sm"
              variant="outline"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              >Crear nuevo</material-button
            >
            <div class="table-responsive p-0">
              <!-- Modal -->
              <div
                class="modal fade"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="exampleModalLabel">
                        Crear Tanque
                      </h1>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <form @submit.prevent="storeFuel">
                        <div class="mb-3">
                          <material-input
                            id="name"
                            type="text"
                            label="Nombre combustible"
                            name="name"
                            v-model:value="newFuel.name"
                            required
                          />
                        </div>
                        <div class="mb-3">
                          <material-input
                            id="sales_price"
                            type="number"
                            label="Precio venta combustible"
                            name="sales_price"
                            v-model:value="newFuel.sale_price"
                          />
                        </div>
                        <div class="mb-3">
                          <material-input
                            id="purchase_price"
                            type="number"
                            label="Precio compra combustible"
                            name="purchase_price"
                            v-model:value="newFuel.purchase_price"
                          />
                        </div>
                         

                        <div class="mt-3 mb-3 p-2">
                          <label for="selectFuel" class="form-label"
                            >Unidad de medida </label
                          >
                          <select
                            id="selectMeasure"
                            class="form-select"
                            aria-label="Seleccione tipo de medicion"
                            name="measure"
                            v-model="newFuel.measurement"
                          >
                            <option selected>Selecciona un combustible</option>
                            <option id="Gal" >Galones</option>
                            <option id="Lts" >Litros</option>
 
                          </select>
                        </div>

                        <button type="submit" class="btn btn-primary">
                          Guardar
                        </button>
                      </form>
                      <!-- Componente de alerta -->
                    </div>
                    <MaterialAlert
                      v-if="alertaVisible"
                      :color="alertaColor"
                      :icon="alertaIcono"
                      :dismissible="true"
                      @dismissed="alertaVisible = false"
                    >
                      {{ alertaMensaje }}
                    </MaterialAlert>
                  </div>
                </div>
              </div>
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      Nombre del combustible
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    >
                      precio de venta($Sus)
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      precio de compra($Sus)
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      Medida (gal)
                    </th>

                    <th class="text-secondary opacity-7">Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="arrayFuels in paginatedItems" :key="arrayFuels.id">
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class="mb-0 text-sm">{{ arrayFuels.name }}</h6>
                          <p class="text-xs text-secondary mb-0">
                            {{}}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td>
                      <p class="text-xs font-weight-bold mb-0">
                        {{ arrayFuels.sale_price }}
                      </p>
                    </td>

                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs font-weight-bold">{{
                        arrayFuels.purchase_price
                      }}</span>
                    </td>
                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs font-weight-bold">{{
                        arrayFuels.measurement
                      }}</span>
                    </td>

                    <td class="align-middle">
                      <a
                        href="javascript:;"
                        class="text-secondary font-weight-bold text-xs"
                        data-toggle="tooltip"
                        data-original-title="Edit user"
                      >
                        Eliminar | Editar
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
              <nav class="p-3">
                <button
                  @click="prevPage"
                  :disabled="currentPage === 1"
                  :class="{
                    badge: true,
                    'badge-sm': true,
                    'bg-gradient-success': currentPage !== 1,
                    'bg-gradient-secondary': currentPage === 1,
                  }"
                >
                  Anterior
                </button>
                <span class="mx-3">{{ currentPage }} / {{ pageCount }}</span>
                <button
                  @click="nextPage"
                  :disabled="currentPage === pageCount"
                  :class="{
                    badge: true,
                    'badge-sm': true,
                    'bg-gradient-secondary': currentPage === pageCount,
                    'bg-gradient-success': currentPage !== pageCount,
                  }"
                >
                  Siguiente
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MaterialButton from "@/components/MaterialButton.vue";
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialAlert from "@/components/MaterialAlert.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Fuels",
  components: {
    MaterialButton,
    MaterialInput,
    MaterialAlert,
  },
  data() {
    return {
      itemsPerPage: 5, // Número de elementos por página
      currentPage: 1, // Página actual
      newFuel: {
        name: "",
        sale_price: "",
        purchase_price: "",
        measurement: "",
      },
      alertaVisible: false,
      alertaMensaje: "",
      alertaColor: "",
      alertaIcono: "",

    };
  },
  created() {
    this.fetchFuels();
  },
  computed: {
    pageCount() {
      return Math.ceil(this.arrayFuels.length / this.itemsPerPage);
    },
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.arrayFuels.slice(startIndex, endIndex);
    },
    ...mapGetters(["getFuels"]),
    arrayFuels() {
      return this.getFuels;
    },
  },
  async mounted() {},
  methods: {
    nextPage() {
      if (this.currentPage < this.pageCount) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    async storeFuel() {
      try {
        const res = await fetch("http://localhost:8090/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          //{"query": "mutation GuardarCombustible{ saveFuel(fuelDto : { name : \"Propano\", sale_price : 45.5, purchase_price: 87.41, measurement: \"Gal\" }) { id name sale_price purchase_price measurement }}"}
          body: JSON.stringify({
            query: `mutation GuardarCombustible{
                              saveFuel(fuelDto : {
                                name : "${this.newFuel.name}",
                                sale_price : ${this.newFuel.sale_price}, 
                                purchase_price: ${this.newFuel.purchase_price}, 
                                measurement : ${this.newFuel.measurement}, 
                                })
                                { id name sale_price, purchase_price, measurement }}`,
          }),
        });

        console.log(res);
        if (res.ok) {
          this.arrayFuels.push(this.newFuel);
          this.mostrarAlerta(
            "Registro guardado correctamente",
            "success",
            "fas fa-check"
          );
          this.$router.push("fuels");
        } else {
          this.mostrarAlerta(
            "Error al guardar el registro",
            "danger",
            "fas fa-times"
          );
        }
      } catch (error) {
        console.log(error);
      }
    },
    mostrarAlerta(mensaje, color, icono) {
      this.alertaMensaje = mensaje;
      this.alertaColor = color;
      this.alertaIcono = icono;
      this.alertaVisible = true;

      // Ocultar la alerta después de 5 segundos
      setTimeout(() => {
        this.alertaVisible = false;
      }, 5000);
    },
    ...mapActions(["fetchFuels"]),
  },
};
</script>
