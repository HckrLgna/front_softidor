<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div
              class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3"
            >
              <h6 class="text-white text-capitalize ps-3">Tanques</h6>
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
                      <form @submit.prevent="crearTanque">
                        <div class="mb-3">
                          <material-input
                            id="name"
                            type="text"
                            label="name"
                            name="name"
                            v-model:value="nuevoTanque.name"
                            required
                          />
                        </div>
                        <div class="mb-3">
                          <material-input
                            id="fuel_quantity"
                            type="number"
                            label="Cantidad de combustible"
                            name="fuel_quantity"
                            v-model:value="nuevoTanque.fuel_quantity"
                          />
                        </div>
                        <div class="mb-3">
                          <material-input
                            id="cap_max"
                            type="number"
                            label="Capacidad Maxima"
                            name="cap_max"
                            v-model:value="nuevoTanque.cap_max"
                          />
                        </div>
                        <material-input
                          id="cap_min"
                          type="number"
                          label="Capacidad Minima"
                          name="cap_min"
                          v-model:value="nuevoTanque.cap_min"
                        />

                        <div class="mt-3 mb-3 p-2">
                          <label for="selectFuel" class="form-label"
                            >Tipo de combustible</label
                          >
                          <select
                            id="selectFuel"
                            class="form-select"
                            aria-label="Seleccione un combustible"
                            name="fuel"
                            v-model="nuevoTanque.fuel"
                          >
                            <option selected>Selecciona un combustible</option>
                            <option
                              v-for="fuel in arrayFuels"
                              :key="fuel.id"
                              :value="fuel.name"
                            >
                              {{ fuel.name }}
                            </option>
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
                      Estado
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      Nombre del tanque
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    >
                      Cantidad de combustible
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      Capacidad Maxima
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      Capacidad Minima
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      Tipo de combustible
                    </th>
                    <th class="text-secondary opacity-7"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="tanques in paginatedItems" :key="tanques.id">
                    <td class="align-middle text-center text-sm">
                      <span
                        :class="{
                          badge: true,
                          'badge-sm': true,
                          'bg-gradient-success': tanques.fuel_quantity > 150,
                          'bg-gradient-danger': tanques.fuel_quantity <= 150,
                        }"
                        >{{
                          tanques.fuel_quantity <= 150 ? "risk" : "available"
                        }}</span
                      >
                    </td>
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class="mb-0 text-sm">{{ tanques.name }}</h6>
                          <p class="text-xs text-secondary mb-0">{{}}</p>
                        </div>
                      </div>
                    </td>

                    <td>
                      <p class="text-xs font-weight-bold mb-0">
                        {{ tanques.fuel_quantity }}
                      </p>
                    </td>

                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs font-weight-bold">{{
                        tanques.cap_max
                      }}</span>
                    </td>
                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs font-weight-bold">{{
                        tanques.cap_min
                      }}</span>
                    </td>
                    <td class="align-middle text-center text-sm">
                      <span
                        :class="{
                          badge: true,
                          'badge-sm': true,
                          'bg-gradient-warning': true,
                          'bg-gradient-danger': false,
                        }"
                        >{{ tanques.fuel }}</span
                      >
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
import { mapGetters, mapActions } from "vuex";

export default {
  name: "tanks",
  components: {
    MaterialButton,
    MaterialInput,
    MaterialAlert,
  },
  data() {
    return {
      tanques: [],
      itemsPerPage: 5, // Número de elementos por página
      currentPage: 1, // Página actual
      nuevoTanque: {
        name: "",
        fuel_quantity: 0,
        cap_max: 0,
        cap_min: 0,
        fuel: "",
      },
      alertaVisible: false,
      alertaColor: "success",
      alertaIcono: "fas fa-check",
      alertaMensaje: "",
    };
  },
  created() {
    this.fetchFuels();
  },
  computed: {
    pageCount() {
      return Math.ceil(this.tanques.length / this.itemsPerPage);
    },
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.tanques.slice(startIndex, endIndex);
    },
    ...mapGetters(["getFuels"]),
    arrayFuels() {
      return this.getFuels;
    },
  },
  async mounted() {
    try {
      const res = await fetch("http://34.176.196.5/graphql",{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            query: "query ListarTanques{ getAllTank{ id name cap_max fuel }}"
          })
        });
        const data = await res.json();
        console.log(data);
        this.tanques = data["data"]["getAllTank"];
    } catch(error) {
      console.log(error);
    }
  },
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
    async crearTanque() {
      try {
        const res = await fetch("http://34.176.196.5/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            query: `mutation GuardarTanque{ saveTank(tankDto : { name : "${this.nuevoTanque.name}", fuel_quantity : ${this.nuevoTanque.fuel_quantity}, cap_max: ${this.nuevoTanque.cap_max}, cap_min : ${this.nuevoTanque.cap_min}, fuel: "${this.nuevoTanque.fuel}" }){ id name fuel_quantity cap_max cap_min fuel }}`
          }),
        });

        console.log(res);
        if (res.ok) {
          this.mostrarAlerta(
            "Registro guardado exitosamente",
            "success",
            "fas fa-check"
          );
          this.$router.push("/tanques");
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
