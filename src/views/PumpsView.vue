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
              <material-button class="mx-3 my-2"  color="primary" size="sm" variant="outline" data-bs-toggle="modal" data-bs-target="#exampleModal"
                >Crear nuevo</material-button
              >
              <div class="table-responsive p-0">
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
                  
                    <tr v-for="bombas in paginatedItems" :key="bombas.id">
                      <td class="align-middle text-center text-sm">
                        <span :class="{'badge': true, 'badge-sm': true, 'bg-gradient-success': true  , 'bg-gradient-danger': false}"
                          >{{ 'status'  }}</span
                        >
                      </td>
                      <td>
                        <div class="d-flex px-2 py-1"> 
                          <div class="d-flex flex-column justify-content-center">
                            <h6 class="mb-0 text-sm">{{ bombas.name }}</h6>
                            <p class="text-xs text-secondary mb-0">
                              {{  bombas.description }}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td class="align-middle text-center">
                        <span class="text-secondary text-xs font-weight-bold"
                          >{{bombas.fuel_type}}</span
                        >
                      </td>
                      <td class="align-middle text-center text-sm">
                        <span :class="{'badge': true, 'badge-sm': true, 'bg-gradient-warning': true, 'bg-gradient-danger': false}"
                          >{{bombas.tank  }}</span
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
                  <button @click="prevPage" :disabled="currentPage === 1" :class="{'badge': true, 'badge-sm': true, 'bg-gradient-success': currentPage !== 1, 'bg-gradient-secondary': currentPage === 1}" >Anterior</button>
                  <span class="mx-3">{{ currentPage }} / {{ pageCount }}</span>
                  <button @click="nextPage" :disabled="currentPage === pageCount" :class="{'badge': true, 'badge-sm': true, 'bg-gradient-secondary': currentPage === pageCount, 'bg-gradient-success': currentPage !== pageCount}" >Siguiente</button>
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
    name: "tables",
    components: {
      MaterialButton,
    },
    data() {
      return {
        bombas: [],
        itemsPerPage: 5, // Número de elementos por página
        currentPage: 1, // Página actual
        nuevoProducto: {
          nombre: "",
          descripcion: "",
          fecha_caducidad: "",
          precio_unitario: 0,
          activo: true,
        },
      };
    },
    computed: {
      pageCount() {
        return Math.ceil(this.bombas.length / this.itemsPerPage);
      },
      paginatedItems() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.bombas.slice(startIndex, endIndex);
      },
    },
    async mounted() {
      try{
        const res = await fetch("http://localhost:8090/api/bomba/all",{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        const data = await res.json();
        console.log(data);
        this.bombas = data;
      }catch{
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
      crearProducto(){
        
      }
    },
  
  };
  
  </script>
  