<template>
    <div class="py-4 container-fluid mt-5">
      <div class="row mb-4">
        <div class="col-lg-12 position-relative z-index-2">
          <div class="row">
            <div class="col-lg-3 col-md-6 col-sm-6">
              <mini-statistics-card
                :title="{ text: 'Total Produccion. Hoy', value: 'Tn.'+ totalProduccion }"
                detail="<span class='text-success text-sm font-weight-bolder'>+55%</span> than last week"
                :icon="{
                  name: 'weekend',
                  color: 'text-white',
                  background: 'dark',
                }"
              />
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4">
              <mini-statistics-card
                :title="{ text: 'Total Productos', value: totalProductos }"
                detail="<span class='text-success text-sm font-weight-bolder'>+3%</span> than last month"
                :icon="{
                  name: 'leaderboard',
                  color: 'text-white',
                  background: 'primary',
                }"
              />
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4">
              <mini-statistics-card
                :title="{ text: 'Total Clientes', value:  totalClientes }"
                detail="<span class='text-danger text-sm font-weight-bolder'>-2%</span> than yesterday"
                :icon="{
                  name: 'person',
                  color: 'text-white',
                  background: 'success',
                }"
              />
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4">
              <mini-statistics-card
                :title="{ text: 'Ventas', value: 'Bs.'+totalVentas }"
                detail="<span class='text-success text-sm font-weight-bolder'>+5%</span> Just updated"
                :icon="{
                  name: 'weekend',
                  color: 'text-white',
                  background: 'info',
                }"
              />
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-lg-4 col-md-6 mt-4">
              <chart-holder-card title="Produccion diaria" subtitle="Produccion por dia" update="campaign sent 2 days ago">
                <reports-bar-chart v-if="listaProduccion.length > 0" :chart="{ labels: listaDias, datasets: { label: 'cantidad', data: listaProduccion } }" />
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
                <reports-line-chart v-if="listaVentas.length > 0" :chart="{ labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep'], datasets: { label: 'cantidad', data: listaVentas } }" />
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
                  id="tasks-chart"
                  :chart="{
                    labels: [
                      'Apr',
                      'May',
                      'Jun',
                      'Jul',
                      'Aug',
                      'Sep',
                      'Oct',
                      'Nov',
                      'Dec',
                    ],
                    datasets: {
                      label: 'registro',
                      data: listaClientes,
                    },
                  }"
                />
              </chart-holder-card>
            </div>
          </div>
        </div>
      </div>
  
      <div class="row">
        <div class="col-lg-8 col-md-6 mb-md-0 mb-4">
          <project-card
            title="Clientes potenciales"
            description="<i class='fa fa-check text-info' aria-hidden='true'></i> <span class='font-weight-bold ms-1'>30 done</span> this month"
            :headers="['Producto', 'CLiente', 'Monto', 'Progreso']"
            :projects="[
              {
                logo: logoXD,
                title: 'Almendras: ',
                members: [team1, team2, team3, team4],
                budget: '$14,000',
                progress: { percentage: 60, color: 'info' },
              },
              {
                logo: logoAtlassian,
                title: 'Anacardos',
                members: [team2, team4],
                budget: '$3,000',
                progress: { percentage: 10, color: 'info' },
              },
              {
                logo: logoSlack,
                title: 'Avellanas',
                members: [team3, team1],
                budget: 'Not set',
                progress: { percentage: 100, color: 'success' },
              },
              {
                logo: logoSpotify,
                title: 'Macadamias',
                members: [team4, team3, team4, team1],
                budget: '$20,500',
                progress: { percentage: 100, color: 'success' },
              },
              {
                logo: logoJira,
                title: 'Nueces',
                members: [team4],
                budget: '$500',
                progress: { percentage: 25, color: 'info' },
              },
              {
                logo: logoJira,
                title: 'Pistachos',
                members: [team1, team4],
                budget: '$2,000',
                progress: { percentage: 40, color: 'info' },
              },
            ]"
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
              title="Tasa de Retención de Clientes:"
              date-time="Porcentaje de clientes que realizan compras repetidas."
            />
            <TimelineItem
              :icon="{
                component: 'code',
                class: 'text-danger',
              }"
              title="Ingresos por Producto:"
              date-time="Ingresos generados por cada tipo de producto seco."
            />
            <TimelineItem
              :icon="{
                component: 'shopping_cart',
                class: 'text-info',
              }"
              title="Volumen de Ventas:"
              date-time="Cantidad total de productos secos vendidos en un período específico"
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
 
   import axios from "axios";
  //import { ref, onUnmounted } from "vue";
  
  export default {
    name: "dashboard-default",
    data() {
      return {
        totalClientes: 0,
        totalProductos: 0,
        totalVentas: 0,
        totalProduccion: 0,
        arrayClientes: [],
        listaVentas: [0,0,0,0,0,0,0,0,0],
        listaClientes: [0,0,0,0,0,0,0,0,0],
        listaProduccion: [0,0,0,0,0,0,0],
        listaDias: ["L", "M", "M", "J", "V", "S", "D"]
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
    mounted() {
      axios.get('https://backend-gestion-bi.vercel.app/cliente')
        .then(response=>{
          this.arrayClientes = response.data.data;
          this.totalClientes = this.arrayClientes.length
          for (let index = 0; index < this.arrayClientes.length; index++) {
            const fechaInicio = new Date(this.arrayClientes[index].fecha_inicio);
            const mes = fechaInicio.getMonth() + 1; 
  
            if(mes < 9){
              this.listaClientes[ mes ] = this.listaClientes[ mes ] + 1;
            }
          }
          console.log("listaclientes: "+this.listaClientes)
        })
        .catch( error =>{
          console.log(error);
        })
      axios.get('https://backend-gestion-bi.vercel.app/producto')
        .then(response=>{
          this.totalProductos = response.data.data.length
           
        })
        .catch( error =>{
          console.log(error);
        })
        this.getVentas();
        this.getProduccion();
         
    },
    methods: {
      async getVentas() {

      },
      async getProduccion() {

  
      },
       
    }
  };
  </script>
  