<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div
              class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3"
            >
              <h6 class="text-white text-capitalize ps-3">Productos</h6>
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
                        Crear Producto
                      </h1>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <form @submit.prevent="storeProduct">
                        <div class="mb-3">
                          <material-input
                            id="name"
                            type="text"
                            label="Nombre producto"
                            name="name"
                            v-model:value="newProduct.name"
                            required
                          />
                        </div>
                        <div class="mb-3">
                          <material-input
                            id="sales_price"
                            type="number"
                            label="Precio venta producto"
                            name="sales_price"
                            v-model:value="newProduct.sale_price"
                          />
                        </div>
                        <div class="mb-3">
                          <material-input
                            id="purchase_price"
                            type="number"
                            label="Precio compra producto"  
                            name="purchase_price"
                            v-model:value="newProduct.purchase_price"
                          />
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
                      Nombre del producto
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    >
                      precio de Compra(Bol)
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      precio de venta($Bol)
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      Estado
                    </th>

                    <th class="text-secondary opacity-7">Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="listProducts in paginatedItems" :key="listProducts.id">
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class="mb-0 text-sm">{{ listProducts.name }}</h6>
                          <p class="text-xs text-secondary mb-0">{{}}</p>
                        </div>
                      </div>
                    </td>

                    <td>
                      <p class="text-xs font-weight-bold mb-0">
                        {{ listProducts.purchase_price }}
                      </p>
                    </td>

                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs font-weight-bold">{{
                        listProducts.sale_price
                      }}</span>
                    </td>
                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs font-weight-bold">{{
                        listProducts.status == 1 ? "Activo" : "Inactivo"
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
 
export default {
  name: "Products",
  components: {
    MaterialButton,
    MaterialInput,
    MaterialAlert,
  },
  data() {
    return {
      itemsPerPage: 5, // Número de elementos por página
      currentPage: 1, // Página actual
      listProducts: [],
      newProduct: {
        name: "",
        purchase_price: "",
        sale_price: "",
      },
      alertaVisible: false,
      alertaMensaje: "",
      alertaColor: "",
      alertaIcono: "",
    };
  },
  created() {
    
  },
  computed: {
    pageCount() {
      return Math.ceil(this.listProducts.length / this.itemsPerPage);
    },
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.listProducts.slice(startIndex, endIndex);
    },
    
  },
  async mounted() {
    try {
      const res = await fetch("http://localhost:5000/api/product/getAllProducts", {
        method: "GET",
      });
      const data = await res.json();
      this.listProducts = data;
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
    async storeProduct() {
      try {
        const res = await fetch("http://localhost:5000/api/product/saveProduct", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          //{"query": "mutation GuardarCombustible{ saveFuel(fuelDto : { name : \"Propano\", sale_price : 45.5, purchase_price: 87.41, measurement: \"Gal\" }) { id name sale_price purchase_price measurement }}"}
          body: JSON.stringify(this.newProduct),
        });

        console.log(res);
        if (res.ok) {
          this.arrayFuels.push(this.newFuel);
          this.mostrarAlerta(
            "Registro guardado correctamente",
            "success",
            "fas fa-check"
          );
          this.$router.push("products");
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
