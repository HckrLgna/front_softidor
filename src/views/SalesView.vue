<template>
  <div class="container-fluid py-4">
    <MaterialAlert
      v-if="alertVisible"
      :color="alertColor"
      :icon="alertIcono"
      :dismissible="true"
      @dismissed="alertVisible = false"
    >
      {{ alertContent }}
    </MaterialAlert>
    <div class="row">
      <div class="col-12">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div
              class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3"
            >
              <h6 class="text-white text-capitalize ps-3">
                Ventas de Combustible
              </h6>
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
                      Usuario
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    >
                      Fecha
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      Precio
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      Cantidad
                    </th>
                    <th class="text-secondary opacity-7"></th>
                  </tr>
                </thead>
                <tbody v-if="ventaCombustible.length > 0">
                  <tr
                    v-for="ventaCombustible in paginatedItems"
                    :key="ventaCombustible.id"
                  >
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
                          <h6 class="mb-0 text-sm">
                            {{ ventaCombustible.usuario_id }}
                          </h6>
                          <span
                            :class="{
                              badge: true,
                              'badge-sm': true,
                              'bg-gradient-success': true,
                              'bg-gradient-danger': false,
                            }"
                            >cliente</span
                          >
                        </div>
                      </div>
                    </td>
                    <td>
                      <p class="text-xs font-weight-bold mb-0">
                        {{ ventaCombustible.date }}
                      </p>
                    </td>
                    <td class="align-middle text-center text-sm">
                      <span class="text-secondary text-xs font-weight-bold">{{
                        ventaCombustible.price
                      }}</span>
                    </td>
                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs font-weight-bold">{{
                        ventaCombustible.quantity
                      }}</span>
                    </td>
                    <td class="align-middle">
                      <a
                        href="javascript:;"
                        class="text-secondary font-weight-bold text-xs"
                        data-toggle="tooltip"
                        data-original-title="Edit user"
                      >
                        Ver | Editar
                      </a>
                    </td>
                  </tr>
                </tbody>
                <tbody v-else>
                  <tr>
                    <td colspan="5" class="text-center">
                      <p class="text-secondary">
                        No hay ventas de productos disponible
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <nav v-if="ventaCombustible.length > 0" class="p-3">
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
      <div class="col-12">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div
              class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3"
            >
              <h6 class="text-white text-capitalize ps-3">
                Ventas de Productos
              </h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <material-button
              class="mx-3 my-2 color-white"
              color="dark"
              size="sm"
              variant="outline"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              >Registrar Venta</material-button
            >
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
                      Registrar detalle de venta
                    </h1>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <form @submit.prevent="crearVentaCombustible">
                      <div class="mb-3">
                        <label for="nombre" class="form-label"
                          >Nombre del producto</label
                        >
                        <input
                          type="text"
                          class="form-control"
                          v-model="nuevoProducto.nombre"
                          required
                        />
                      </div>
                      <div class="mb-3">
                        <label for="descripcion" class="form-label"
                          >Descripción</label
                        >
                        <textarea
                          class="form-control"
                          v-model="nuevoProducto.descripcion"
                        ></textarea>
                      </div>
                      <div class="mb-3">
                        <label for="fecha_creacion" class="form-label"
                          >Fecha de caducidad
                        </label>
                        <input
                          type="date"
                          class="form-control"
                          v-model="nuevoProducto.fecha_caducidad"
                          required
                        />
                      </div>
                      <div class="mb-3">
                        <label for="version" class="form-label">precio</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="nuevoProducto.precio_unitario"
                          required
                        />
                      </div>

                      <button type="submit" class="btn btn-primary">
                        Guardar
                      </button>
                    </form>
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
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      Usuario
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    >
                      Fecha
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      Precio
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      Cantidad
                    </th>
                    <th class="text-secondary opacity-7"></th>
                  </tr>
                </thead>
                <tbody v-if="ventaProductos.length > 0">
                  <tr
                    v-for="ventaProductos in paginatedItems"
                    :key="ventaProductos.id"
                  >
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
                          <h6 class="mb-0 text-sm">
                            {{ ventaProductos.user_id }}
                          </h6>
                          <span
                            :class="{
                              badge: true,
                              'badge-sm': true,
                              'bg-gradient-success': true,
                              'bg-gradient-danger': false,
                            }"
                            >cliente</span
                          >
                        </div>
                      </div>
                    </td>
                    <td>
                      <p class="text-xs font-weight-bold mb-0">
                        {{ ventaProductos.date }}
                      </p>
                    </td>
                    <td class="align-middle text-center text-sm">
                      <span class="text-secondary text-xs font-weight-bold">{{
                        ventaCombustible.price
                      }}</span>
                    </td>
                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs font-weight-bold">{{
                        ventaProductos.totalPaid
                      }}</span>
                    </td>
                    <td class="align-middle">
                      <a
                        href="javascript:;"
                        class="text-secondary font-weight-bold text-xs"
                        data-toggle="tooltip"
                        data-original-title="Edit user"
                      >
                        Ver | Editar
                      </a>
                    </td>
                  </tr>
                </tbody>
                <tbody v-else>
                  <tr>
                    <td colspan="5" class="text-center">
                      <p class="text-secondary">
                        No hay ventas de productos disponible
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <nav v-if="ventaProductos.length > 0" class="p-3">
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
import MaterialAlert from "@/components/MaterialAlert.vue";
export default {
  components: {
    MaterialButton,
    MaterialAlert,
  },
  data() {
    return {
      ventaCombustible: [], // Aquí almacenaremos los productos obtenidos de la API
      ventaProductos: [], // Aquí almacenaremos los productos obtenidos de la API
      itemsPerPage: 5, // Número de elementos por página
      currentPage: 1, // Página actual
      nuevoProducto: {
        id: "",
        fecha: "",
        precio: 0,
        cantidad: 0,
        activo: true,
      },
      alertVisible: false,
      alertColor: "success",
      alertIcono: "check",
      alertContent: "",
    };
  },
  computed: {
    pageCount() {
      return Math.ceil(this.ventaCombustible.length / this.itemsPerPage);
    },
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.ventaCombustible.slice(startIndex, endIndex);
    },
  },
  async mounted() {
    try {
      const resCombustible = await fetch(
        "http://localhost:5000/api/fuel/getAllFuelSales",
        {
          method: "GET",
        }
      );
      const dataCombustible = await resCombustible.json();
      this.ventaCombustible = dataCombustible;
      console.log(this.ventaCombustible);

      const resProducto = await fetch(
        "http://localhost:5000/api/product/getAllProductSales",
        {
          method: "GET",
        }
      );

      const dataProducto = await resProducto.json();
      console.log("dataProducto", dataProducto);
      if (resProducto.status === 200) {
        this.showAlert("success", "check", "Microservicio en linea");
        this.ventaProductos = dataProducto;
        console.log(this.ventaCombustible);
      } else {
        this.alertVisible = true;
        this.alertColor = "danger";
        this.alertIcono = "error";
        this.alertContent =
          "Error al conectar al microservicio: ventas Error - " +
          resCombustible.status;
      }
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
    showAlert(color, icon, content) {
      this.alertVisible = true;
      this.alertColor = color;
      this.alertIcono = icon;
      this.alertContent = content;
      setTimeout(() => {
        this.alertaVisible = false;
      }, 5000);
    },
  },
};
</script>
