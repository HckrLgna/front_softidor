<template>
  <div class="py-4 container-fluid mt-5">
    <div class="row mb-4">
      <div class="col-lg-12 position-relative z-index-2">
        <div class="row">
          <div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4">
            <mini-statistics-card
              :title="{ text: 'Prom. Ventas por Bomba', value: promVentaBomba }"
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
                text: 'Vol. Tot. Comb. Vendido:',
                value: 'Gal.' + totalProduccion,
              }"
              detail="<span class='text-success text-sm font-weight-bolder'>+55%</span> Por mes"
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
                background: 'success',
              }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4">
            <mini-statistics-card
              :title="{
                text: 'Ingresos Total por venta de Combustible',
                value: 'Bs.' + totalVentas,
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
        <div class="row mt-4">
          <div class="col-lg-4 col-md-6 mt-4">
            <chart-holder-card
              title="Venta por boma"
              subtitle="Produccion por dia"
              update="campaign sent 2 days ago"
            >
              <reports-bar-chart
                v-if="listaProduccion[0] > 0"
                :chart="{
                  labels: listaDias,
                  datasets: { label: 'cantidad', data: listaProduccion },
                }"
              />
              <div v-else>Loading...</div>
            </chart-holder-card>
          </div>
          <div class="col-lg-4 col-md-6 mt-4">
            <chart-holder-card
              title="Ventas por mes"
              subtitle="(<span class='font-weight-bolder'>+15%</span>) increase in today sales."
              update="utlimos 9 meses"
              color="success"
            >
              <reports-line-chart
                v-if="listaVentas[0] > 0"
                :chart="{
                  labels: [
                    'Ene',
                    'Feb',
                    'Mar',
                    'Abr',
                    'May',
                    'Jun',
                    'Jul',
                    'Ago',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dic',
                  ],
                  datasets: { label: 'cantidad', data: listaVentas },
                }"
              />
              <div v-else>Loading...</div>
              />
            </chart-holder-card>
          </div>
          <div class="col-lg-4 mt-4">
            <chart-holder-card
              title="Retencion de clientes por mes"
              subtitle="Last Campaign Performance"
              update="just updated"
              color="dark"
            >
              <reports-line-chart
                v-if="listaPrecioVenta[0] > 0"
                id="tasks-chart"
                :chart="{
                  labels: [
                    'Ene',
                    'Feb',
                    'Mar',
                    'Abr',
                    'May',
                    'Jun',
                    'Jul',
                    'Ago',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dic',
                  ],
                  datasets: {
                    label: 'registro',
                    data: listaPrecioVenta,
                  },
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
            title="Promedio de Ventas por Bomba:"
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
            title="Volumen Total de Combustible Vendido:"
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
      promVentaBomba: 0,
      totalVentas: 0,
      totalProduccion: 0,
      arrayUsuarios: [],
      listaVentas: [0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0],
      listaPrecioVenta: [0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0],
      listaProduccion: [0, 0, 0, 0, 0, 0, 0],
      listaDias: ["B1", "B2", "B3", "B4", "B5", "B6", "B7"],
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
      const response = await fetch("http://localhost:8090/api/user/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = await response.json();

      this.arrayUsuarios = data.map((client) => ({
        nombre: client.name,
        correo: client.email,
        roles: client.roles,
        permisos: client.permisos,
      }));
      this.listaVenta = data.filter((cliente) =>
        cliente.roles.includes("CLIENT")
      );
      console.log(this.listaVenta);
      this.totalClientes = this.listaVenta.length;
      for (let index = 0; index < this.arrayClientes.length; index++) {
        const fechaInicio = new Date(this.arrayClientes[index].fecha_inicio);
        const mes = fechaInicio.getMonth() + 1;
        if (mes < 9) {
          this.listaVenta[mes] = this.listaVenta[mes] + 1;
        }
      }
    } catch (error) {
      console.log(error);
    }

    this.getProduccion();
    console.log(this.listaProduccion[0]);
  },
  methods: {
    async getProduccion() {
      try {
        const res = await fetch(
          "http://127.0.0.1:5000/api/ventacombustibles/",
          {
            method: "GET",
          }
        );
        const data = await res.json();
        const produccion = [0, 0, 0, 0, 0, 0, 0];
        const totalVenta = [0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0];
        const totalPrecioVenta = [0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0];
        data.forEach((item) => {
          const [day, month, year] = item.fecha.split("/").map(Number);
          const date = new Date(year, month - 1, day);
          const dayOfWeek = date.getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday
          produccion[dayOfWeek] += 1;
        });
        data.forEach((item) => {
          const [day, month, year] = item.fecha.split("/").map(Number);
          const date = new Date(year, month - 1, day);
          const dayOfWeek = date.getMonth(); // 0: Sunday, 1: Monday, ..., 6: Saturday
          totalVenta[dayOfWeek] += item.cantidad / 1000;
        });
        data.forEach((item) => {
          // Obtener el día, mes y año desde la fecha
          const [day, month, year] = item.fecha.split("/").map(Number);

          // Crear un objeto Date con el mes ajustado para base 0 (enero es 0)
          const date = new Date(year, month - 1, day);

          // Obtener el mes (0 para enero, 11 para diciembre)
          const monthIndex = date.getMonth();
          totalPrecioVenta[monthIndex] += parseInt(item.precio); // Convertir a entero para sumar correctamente
        });

        this.listaVentas = totalVenta;
        this.listaProduccion = produccion;
        this.listaPrecioVenta = totalPrecioVenta;
        this.promVentaBomba = this.calcularPromedioCarga(produccion);
        this.totalProduccion = this.listaVentas.reduce((acc, val) => acc + val, 0);
        this.totalVentas = totalPrecioVenta.reduce((acc, val) => acc + val, 0);
        console.log(this.listaPrecioVenta);
      } catch (error) {
        console.log(error);
      }
    },
    calcularPromedioCarga(cargaBombas) {
      const valores = Object.values(cargaBombas);
      const sumaTotal = valores.reduce((acc, val) => acc + val, 0);
      const promedio = sumaTotal / valores.length;
      return parseInt(promedio);
    },
    async CalcularTotalProduccion(produccion) {
      console.log(produccion);
      var res = 1232;
      for (let index = 0; index < produccion.length - 2; index++) {
        res += produccion[index];
      }
      console.log(res);
      return parseInt(res);
    },
  },
};
</script>
