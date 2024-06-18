<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div
              class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3"
            >
              <h6 class="text-white text-capitalize ps-3">Bombas</h6>
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
                        Crear Bomba
                      </h1>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <form @submit.prevent="storePump">
                        <div class="mb-3">
                          <material-input
                            id="pump_name"
                            type="text"
                            label="name"
                            name="name"
                            v-model:value="newPump.name"
                            required
                          />
                        </div>
                        <div class="mb-3">
                          <material-input
                            id="pump_description"
                            type="text"
                            label="Descripcion"
                            name="pump_quantity"
                            v-model:value="newPump.description"
                          />
                        </div>

                        <div class="mt-3 mb-3">
                          <label for="selectFuel" class="form-label"
                            >Tipo de combustible</label
                          >
                          <select
                            id="selectFuel"
                            class="form-select"
                            aria-label="Seleccione un combustible"
                            name="fuel"
                            v-model="newPump.fuel_type"
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

                        <div class="mt-3 mb-3">
                          <label for="selectTank" class="form-label"
                            >Assignacion de tanque</label
                          >
                          <select
                            id="selectTank"
                            class="form-select"
                            aria-label="Seleccione un tanque"
                            name="tank"
                            v-model="newPump.tank"
                          >
                            <option selected>Selecciona un tanque</option>
                            <option
                              v-for="tank in arrayTanks"
                              :key="tank.id"
                              :value="tank.name"
                            >
                              {{ tank.name }}
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
                      Nombre de la bomba
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    >
                      Tipo de combustible
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      Nombre del tanque
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      Opciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="pumps in paginatedItems" :key="pumps.id">
                    <td class="align-middle text-center text-sm">
                      <span
                        :class="{
                          badge: true,
                          'badge-sm': false,
                          'bg-gradient-success': pumps.status == 1,
                          'bg-gradient-danger': pumps.status == 0,
                        }"
                        >{{
                          pumps.status == 1 ? "disponible" : "no disponible"
                        }}</span
                      >
                    </td>
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class="mb-0 text-sm">{{ pumps.name }}</h6>
                          <p class="text-xs text-secondary mb-0">
                            {{ pumps.description }}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs font-weight-bold">{{
                        pumps.fuel_type
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
                        >{{ pumps.tank }}</span
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
export default {
  name: "tables",
  components: {
    MaterialButton,
    MaterialAlert,
    MaterialInput,
  },
  data() {
    return {
      pumps: [],
      arrayFuels: [],
      arrayTanks: [],
      itemsPerPage: 5, // Número de elementos por página
      currentPage: 1, // Página actual
      newPump: {
        name: "",
        description: "",
        fuel_type: "",
        status: 0,
        tank: "",
      },
      alertaVisible: false,
      alertaColor: "success",
      alertaIcono: "fas fa-check",
      alertaMensaje: "",
    };
  },
  computed: {
    pageCount() {
      return Math.ceil(this.pumps.length / this.itemsPerPage);
    },
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.pumps.slice(startIndex, endIndex);
    },
  },
  async mounted() {
    try {
      const res = await fetch("http://localhost:8090/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          query:
            "query ListarTanques{ getAllPump{ id name fuel_type tank status }, getAllFuel{ id name sale_price measurement }, getAllTank{ id name cap_max fuel }}",
        }),
      });
      const data = await res.json();
      console.log(data);
      this.pumps = data["data"]["getAllPump"];
      this.arrayFuels = data["data"]["getAllFuel"];
      this.arrayTanks = data["data"]["getAllTank"];
    } catch (error) {
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
    async storePump() {
      try {
        const res = await fetch("http://localhost:8090/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            query: `mutation GuardarBomba{
                              savePump(pumpDto : {
                                name : "${this.newPump.name}",
                                description : ${this.newPump.description}, 
                                fuel_type: ${this.newPump.fuel_type}, 
                                tank : ${this.newPump.tank}, 
                                })
                                { id description tank }}`,
          }),
        });

        console.log(res);
        if (res.ok) {
          this.mostrarAlerta(
            "Bomba guardada correctamente",
            "success",
            "fas fa-check"
          );
          this.$router.push("/pumps");
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
  },
};
</script>
