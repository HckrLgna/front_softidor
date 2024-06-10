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
                        Author
                      </th>
                      <th
                        class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                      >
                        Function
                      </th>
                      <th
                        class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                      >
                        Status
                      </th>
                      <th
                        class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                      >
                        Employed
                      </th>
                      <th class="text-secondary opacity-7"></th>
                    </tr>
                  </thead>
                  <tbody>
                  
                    <tr v-for="cliente in paginatedItems" :key="cliente.id">
                      <td>
                        <div class="d-flex px-2 py-1">
                          <div>
                            <img
                              src=" "
                              class="avatar avatar-sm me-3 border-radius-lg"
                              alt="user1"
                            />
                          </div>
                          <div class="d-flex flex-column justify-content-center">
                            <h6 class="mb-0 text-sm">{{ cliente.nombre }}</h6>
                            <p class="text-xs text-secondary mb-0">
                              {{ cliente.email }}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p class="text-xs font-weight-bold mb-0">{{ cliente.funcion }}</p>
                        <p class="text-xs text-secondary mb-0">{{cliente.cargo}}</p>
                      </td>
                      <td class="align-middle text-center text-sm">
                        <span :class="{'badge': true, 'badge-sm': true, 'bg-gradient-success': cliente.estatus, 'bg-gradient-danger': !cliente.estatus}"
                          >{{cliente.estatus ? 'ACtivo' : 'Inactivo' }}</span
                        >
                      </td>
                      <td class="align-middle text-center">
                        <span class="text-secondary text-xs font-weight-bold"
                          >{{cliente.fecha_inicio}}</span
                        >
                      </td>
                      <td class="align-middle">
                        <a
                          href="javascript:;"
                          class="text-secondary font-weight-bold text-xs"
                          data-toggle="tooltip"
                          data-original-title="Edit user"
                        >
                          Edit
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
      <div class="row">
        <div class="col-12">
          <div class="card my-4">
            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div
                class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3"
              >
                <h6 class="text-white text-capitalize ps-3">Bomba</h6>
              </div>
            </div>
            <div class="card-body px-0 pb-2">
              <material-button class="mx-3 my-2"  color="primary" size="sm" variant="outline" data-bs-toggle="modal" data-bs-target="#exampleModal"
                >Crear nuevo</material-button
              >
              <!-- Modal -->
              <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="exampleModalLabel">Crear producto</h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body ">
                      <form @submit.prevent="crearProducto">
                        <div class="mb-3">
                          <label for="nombre" class="form-label">Nombre del producto</label>
                          <input type="text" class="form-control" v-model="nuevoProducto.nombre" required>
                        </div>
                        <div class="mb-3">
                          <label for="descripcion" class="form-label">Descripción</label>
                          <textarea class="form-control" v-model="nuevoProducto.descripcion"></textarea>
                        </div>
                        <div class="mb-3">
                          <label for="fecha_creacion" class="form-label">Fecha de caducidad </label>
                          <input type="date" class="form-control" v-model="nuevoProducto.fecha_caducidad" required>
                        </div>
                        <div class="mb-3">
                          <label for="version" class="form-label">precio</label>
                          <input type="text" class="form-control" v-model="nuevoProducto.precio_unitario" required>
                        </div>
                         
                        <button type="submit" class="btn btn-primary">Guardar</button>
                      </form>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                      
                    </div>
                  </div>
                </div>
              </div>
              <div class="table-responsive p-0">
                <table
                  class="table align-items-center justify-content-center mb-0"
                >
                  <thead>
                    <tr>
                      <th
                        class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                      >
                        Bomba
                      </th>
                      <th
                        class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                      >
                        Precio unitario
                      </th>
                      <th
                        class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                      >
                        Estado
                      </th>
                      <th
                        class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2"
                      >
                        Porcentaje examen de calidad
                      </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="producto in productos.data " :key="producto.id">
                      <td>
                        <div class="d-flex px-2">
                          <div>
                            <img
                              src=""
                              class="avatar avatar-sm rounded-circle me-2"
                              alt="spotify"
                            />
                          </div>
                          <!-- Aquí puedes mostrar la información del producto -->
                          <div class="my-auto">
                            <h6 class="mb-0 text-sm">{{ producto.nombre  }}</h6>
                          </div>
                           
                        </div>
                      </td>
                      <td>
                        <p class="text-sm font-weight-bold mb-0">{{ producto.precio_unitario }}</p>
                      </td>
                      <td>
                        <!-- Puedes mostrar el estado del producto aquí -->
  
                        <span class="text-xs font-weight-bold"> {{ producto.activo ? 'Activo' : 'Inactivo' }} </span>
                      </td>
                      <td class="align-middle text-center">
                        <div
                          class="d-flex align-items-center justify-content-center"
                        >
                          <span class="me-2 text-xs font-weight-bold">60%</span>
                          <div>
                            <div class="progress">
                              <div
                                class="progress-bar bg-gradient-info"
                                role="progressbar"
                                aria-valuenow="60"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                style="width: 60%"
                              ></div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="align-middle">
                        <button class="btn btn-link text-secondary mb-0">
                          <i
                            class="fa fa-ellipsis-v text-xs"
                            aria-hidden="true"
                          ></i>
                        </button>
                      </td>
                    </tr>
                    
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import MaterialButton from "@/components/MaterialButton.vue";
  export default {
    name: "tables",
    components: {
      MaterialButton,
    },
    data() {
      return {
        productos: [],
        clientes: [], // Aquí almacenaremos los productos obtenidos de la API
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
        return Math.ceil(this.clientes.length / this.itemsPerPage);
      },
      paginatedItems() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.clientes.slice(startIndex, endIndex);
      },
    },
    mounted() {
      
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
        const formData = new FormData();
        formData.append("nombre", this.nuevoProducto.nombre);
        formData.append("descripcion", this.nuevoProducto.descripcion);
        formData.append("fecha_creacion", this.nuevoProducto.fecha_creacion);
        formData.append("version", this.nuevoProducto.version);
        formData.append("file", this.nuevoProducto.file);
        formData.append("id_usuario", 1);

      }
    },
  
  };
  
  </script>
  