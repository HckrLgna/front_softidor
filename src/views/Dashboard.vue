<template>
  <div class="py-4 container-fluid mt-5">
    <div class="row mb-4">
      <div class="col-lg-12 position-relative z-index-2">
        <div class="row">
          <div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4">
            <mini-statistics-card
              :title="{ text: 'Prom. Ventas por Categoria de Producto', value: totalProductProfit }"
              detail="<span class='text-success text-sm font-weight-bolder'>+3%</span>Por dia"
              :icon="{
                name: 'leaderboard',
                color: 'text-white',
                background: 'primary',
              }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6">
            <mini-statistics-card
              :title="{
                text: 'Vol. Tot. Comb. Suministrado:',
                value: 'Gal.' + totalFuelSold,
              }"
              detail="<span class='text-danger text-sm font-weight-bolder'>-15%</span> ultimos meses"
              :icon="{
                name: 'weekend',
                color: 'text-white',
                background: 'success',
              }"
            />
          </div>

          <div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4">
            <mini-statistics-card
              :title="{
                text: 'Total Clientes Adquiridos',
                value: totalClientes,
              }"
              detail="<span class='text-danger text-sm font-weight-bolder'>-2%</span> que ayer"
              :icon="{
                name: 'person',
                color: 'text-white',
                background: 'info',
              }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4">
            <mini-statistics-card
              :title="{
                text: 'Ingresos Total por venta de Combustible',
                value: 'Bs.' + totalFuelProfit,
              }"
              detail="<span class='text-success text-sm font-weight-bolder'>+5%</span> Just updated"
              :icon="{
                name: 'weekend',
                color: 'text-white',
                background: 'dark',
              }"
            />
          </div>
        </div>
        <!-- kpi's result expresed in numbers-->
        <div class="row mt-4">
          <div class="col-lg-4 col-md-6 mt-4">
            <chart-holder-card
              title="Ingresos por venta de productos"
              subtitle="Produccion por dia"
              update="Actualizado hace 2 horas"
            >
            <div class="container">
                <div class="row">
                  <div class="col col-md-6 col-lg-6">
                    <div class="mt-1">
                      <input
                        class="form-control"
                        type="date"
                        id="start-date-product-profit"
                        v-model="startDateProductProfit"
                        :min="minDateProductProfit"
                        :max="maxDateProductProfit"
                        @change="getProductProfits"
                      />
                    </div>
                  </div>
                  <div class="col col-md-6 col-lg-6">
                    <div class="mt-1">
                      <input
                        class="form-control"
                        type="date"
                        id="end-date-product-profit"
                        v-model="endDate"
                        :min="minDateProductProfit"
                        :max="maxDateProductProfit"
                        @change="getProductProfits"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <reports-bar-chart
                v-if="listProductProfit[0] > 0"
                :key="chartKeyProductProfit"
                :chart="{
                  labels: listCategoriesSlog,
                  datasets: { label: 'cantidad', data: listProductProfit },
                }"
              />
              <div v-else>Loading...</div>
            </chart-holder-card>
          </div>
          <div class="col-lg-4 col-md-6 mt-4">
            <chart-holder-card
              title="Combustible suministrado por mes"
              subtitle="(<span class='font-weight-bolder'>-15%</span>) ultimos meses."
              update="utlimos 9 meses"
              color="success"
            >
              <div class="container">
                <div class="row">
                  <div class="col col-md-6 col-lg-6">
                    <div class="mt-1">
                      <input
                        class="form-control"
                        type="date"
                        id="start-date"
                        v-model="startDate"
                        :min="minDate"
                        :max="maxDate"
                        @change="getProduccion"
                      />
                    </div>
                  </div>
                  <div class="col col-md-6 col-lg-6">
                    <div class="mt-1">
                      <input
                        class="form-control"
                        type="date"
                        id="end-date"
                        v-model="endDate"
                        :min="minDate"
                        :max="maxDate"
                        @change="getProduccion"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <reports-line-chart
                v-if="listFuelSold[0] > 0"
                :key="chartKey"
                :chart="{
                  labels: listMonths,
                  datasets: { label: 'cantidad', data: listFuelSold },
                }"
              />
              <div v-else>Loading...</div>
              />
            </chart-holder-card>
          </div>
          <div class="col-lg-4 col-md-12 mt-4">
            <chart-holder-card
              title="Ingreso por venta de combustible"
              subtitle="Ultimos 9 meses."
              update="just updated"
              color="dark"
            >
            <div class="container">
                <div class="row">
                  <div class="col col-md-6 col-lg-6">
                    <div class="mt-1">
                      <input
                        class="form-control"
                        type="date"
                        id="start-date-profit"
                        v-model="startDateFuelProfit"
                        :min="minDateFuelProfit"
                        :max="maxDateFuelProfit"
                        @change="getFuelProfits"
                      />
                    </div>
                  </div>
                  <div class="col col-md-6 col-lg-6">
                    <div class="mt-1">
                      <input
                        class="form-control"
                        type="date"
                        id="end-date-profit"
                        v-model="endDateFuelProfit"
                        :min="minDateFuelProfit"
                        :max="maxDateFuelProfit"
                        @change="getFuelProfits"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <reports-line-chart
                v-if="listFuelProfit[0]>0"
                :key="chartKeyFuelProfit"
                :chart="{
                  labels: listMonthFuelProfit,
                  datasets: { label: 'cantidad', data: listFuelProfit },
                }"
              />
              <div v-else>Loading...</div>
            </chart-holder-card>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-8 col-md-6 mb-md-0 mb-4">
        <project-card
          title="Lista de Usuarios "
          description="<i class='fa fa-check text-info' aria-hidden='true'></i> <span class='font-weight-bold ms-1'>30 done</span> this month"
          :headers="['Nombre', 'Correo', 'Roles', 'Permisos']"
          :clients="arrayUsuarios"
        />
      </div>
      <div class="col-lg-4 col-md-6">
        <timeline-list
          class="h-100"
          title="KPIs"
          description="<i class='fa fa-arrow-up text-success' aria-hidden='true'></i>
          <span class='font-weight-bold'>24%</span> este mes"
        >
          <timeline-item
            :icon="{
              component: 'notifications',
              class: 'text-success',
            }"
            title="Promedio de Ventas Por Productos:"
            date-time="Porcentaje del promedio de ventas de combustible por bomba."
          />
          <TimelineItem
            :icon="{
              component: 'code',
              class: 'text-danger',
            }"
            title="Ingresos Totales por Ventas de Combustible:"
            date-time="Ingresos generados por la venta de combustible."
          />
          <TimelineItem
            :icon="{
              component: 'shopping_cart',
              class: 'text-info',
            }"
            title="Volumen Total de Combustible Suministrado:"
            date-time="cantidad total de combustible vendida en un período específico"
          />
        </timeline-list>
      </div>
    </div>
  </div>
</template>
<script>
import ChartHolderCard from "./components/ChartHolderCard.vue";
import ReportsBarChart from "@/examples/Charts/ReportsBarChart.vue";
import ReportsLineChart from "@/examples/Charts/ReportsLineChart.vue";
import MiniStatisticsCard from "./components/MiniStatisticsCard.vue";
import ProjectCard from "./components/ProjectCard.vue";
import TimelineList from "@/examples/Cards/TimelineList.vue";
import TimelineItem from "@/examples/Cards/TimelineItem.vue";

//import { ref, onUnmounted } from "vue";

export default {
  name: "dashboard-default",
  data() {
    return {
      totalClientes: 0,
       
      arrayUsuarios: [],
      

      totalFuelSold: 0,
      listFuelSold: [],
      listMonths: [],
      startDate: "2023-05-01",
      endDate: "2024-06-18",
      minDate: "2023-05-01",
      maxDate: "2024-06-18",
      chartKey: 0,

      totalFuelProfit: 0,
      listFuelProfit: [],
      listMonthFuelProfit: [],
      startDateFuelProfit: "2023-05-01",
      endDateFuelProfit: "2023-06-18",
      minDateFuelProfit: "2023-05-01",
      maxDateFuelProfit: "2024-06-18",
      chartKeyFuelProfit: 0,
      
      totalProductProfit: 0,
      listProductProfit: [],
      listCategories: [],
      listCategoriesSlog: [],
      startDateProductProfit: "2023-05-01",
      endDateProductProfit: "2024-06-18",
      minDateProductProfit: "2023-05-01",
      maxDateProductProfit: "2024-06-18",
      chartKeyProductProfit: 0,

    };
  },
  components: {
    ChartHolderCard,
    ReportsBarChart,
    ReportsLineChart,
    MiniStatisticsCard,
    ProjectCard,
    TimelineList,
    TimelineItem,
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
            "query ListarUsuarios{ getAllUser{ id name email roles permisos }}",
        }),
      });
      const data = await res.json();
      console.log(data.data.getAllUser);
      this.arrayUsuarios = data.data.getAllUser;
      console.log(this.listaVenta);
    } catch (error) {
      console.log(error);
    }

    this.getProduccion();
    this.getFuelProfits();
    this.getProductProfits();
 
  },
  methods: {
    async getProduccion() {
      try {
        const res = await fetch(
          "http://localhost:5000/api/fuel/quantity_fuel_month",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              start_date: this.startDate,
              end_date: this.endDate,
            }),
          }
        );
        const data = await res.json();

        this.listFuelSold = data.quantities;
        this.listMonths = data.year_months;
        if (this.listFuelSold.length > 0 && this.listMonths.length > 0) {
          this.chartKey += 1; // Incrementa la key para forzar el renderizado
        }
        this.totalFuelSold = this.listFuelSold.reduce((a, b) => a + b, 0);
        this.totalFuelSold = this.totalFuelSold.toFixed(2);
      } catch (error) {
        console.log(error);
      }
    },
    async getFuelProfits(){
      try {
        const res = await fetch(
          "http://localhost:5000/api/fuel/fuel_profit_month",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              start_date: this.startDateFuelProfit,
              end_date: this.endDateFuelProfit,
            }),
          }
        );
        const data = await res.json();

        this.listFuelProfit = data.profit;
        this.listMonthFuelProfit = data.year_months;
        if (this.listFuelProfit.length > 0 && this.listMonthFuelProfit.length > 0) {
          this.chartKeyFuelProfit += 1; // Incrementa la key para forzar el renderizado
        }
        this.totalFuelProfit = this.listFuelProfit.reduce((a, b) => a + b, 0);
        this.totalFuelProfit = this.totalFuelProfit.toFixed(2);
      } catch (error) {
        console.log(error);
      }
    },
    async getProductProfits(){
      try {
        const res = await fetch(
          "http://localhost:5000/api/product/product_category_profit",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              start_date: this.startDateProductProfit,
              end_date: this.endDateProductProfit,
            }),
          }
        );
        const data = await res.json();

        this.listProductProfit = data.profit;
        this.listCategories = data.categories;
        this.listCategoriesSlog = this.listCategories.map(category => category.slice(0, 3));
        if (this.listProductProfit.length > 0 && this.listCategories.length > 0) {
          this.chartKeyProductProfit += 1; // Incrementa la key para forzar el renderizado
        }
        this.totalProductProfit = this.listProductProfit.reduce((a, b) => a + b, 0);
        this.totalProductProfit = this.totalProductProfit.toFixed(2);
      } catch (error) {
        console.log(error);
      }
    },
     
     
  },
};
</script>
