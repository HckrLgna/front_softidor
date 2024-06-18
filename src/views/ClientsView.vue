<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div
              class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3"
            >
              <h6 class="text-white text-capitalize ps-3">Clientes</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
             
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      Nombre
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    >
                      Email
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      Status
                    </th>
                     
                    <th class="text-secondary opacity-7">Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="cliente in paginatedItems" :key="cliente.id">
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div>
                          <img
                            src="https://www.clipartmax.com/png/small/171-1717870_stockvader-predicted-cron-for-may-user-profile-icon-png.png"
                            class="avatar avatar-sm me-3 border-radius-lg"
                            alt="user1"
                          />
                        </div>
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class="mb-0 text-sm">{{ cliente.name }}</h6>
                           
                        </div>
                      </div>
                    </td>
                    <td>
                      <p class="text-xs font-weight-bold mb-0">
                        {{ cliente.email }}
                      </p>
                       
                    </td>
                    <td class="align-middle text-center text-sm">
                      <span
                        :class="{
                          badge: true,
                          'badge-sm': true,
                          'bg-gradient-success': true,
                          'bg-gradient-danger': false,
                        }"
                        >{{ "ACtivo" }}</span
                      >
                    </td>
                     
                    <td class="align-middle">
                      <a
                        href="javascript:;"
                        class="text-secondary font-weight-bold text-xs"
                        data-toggle="tooltip"
                        data-original-title="Edit user"
                      >
                        Editar | Eliminar
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
export default {
  components: {
    MaterialButton,
  },
  data() {
    return {
      listaClientes: [], // Aquí almacenaremos los productos obtenidos de la API
      itemsPerPage: 5, // Número de elementos por página
      currentPage: 1, // Página actual
       
    };
  },
  computed: {
    pageCount() {
      return Math.ceil(this.listaClientes.length / this.itemsPerPage);
    },
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.listaClientes.slice(startIndex, endIndex);
    },
  },
  async mounted() {
    try {
      const res = await fetch("http://localhost:8090/api/user/all", {
        method: 'GET',
      });
      const data = await res.json();
      this.listaClientes = data.filter(cliente => cliente.roles.includes("CLIENT"))
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
    obtenerVentas() {
    },
  },
};
</script>