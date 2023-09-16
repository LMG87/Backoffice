<template>
    <h1 class="mt-4">Panel Agentes</h1>
    <ol class="breadcrumb mb-4">
        <li class="breadcrumb-item">
            <router-link :to="{ name: 'home' }">
                Dashboard
            </router-link>
        </li>
        <li class="breadcrumb-item">
            <router-link :to="{ name: 'aliados-main' }">
                Aliados
            </router-link>
        </li>
        <li class="breadcrumb-item active">Panel agentes</li>
    </ol>
    <hr class="mb-4">
    <div class="card card-body">
        <div class="form-group mb-3">
            <label class="fw-bold">Agente</label>
            <select v-model="agente" @change="get_data(agente)" class="form-select">
                <option value="null">Selecciona un agente</option>
                <option v-for="(agente, index_agente) in agentes" :key="index_agente" :value="agente">
                    {{ agente.nombre_completo }}
                </option>
            </select>
            <span v-if="agente != null" @click="agente = null"
                style="float: right;font-size: 17px;color: red;font-weight: 600;cursor:pointer;">
                <small>Limpiar agente</small>
            </span>
        </div>
        <div class="row justify-content-between" v-if="agente == null | agente == 'null'">
            <div class="col-lg-6">
                <div class="card">
                    <div class="card-header">
                        <h5 class="card-title">Aliados por agentes</h5>
                    </div>
                    <div class="card-body">
                        <div class="chart chart-sm" style="margin-top:38px;" v-if="option" ref="graphElement">
                            <apexchart type="donut" :options="option.chartOptions" :series="option.series">
                            </apexchart>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="card">
                    <div class="card-header">
                        <h5 class="card-title">Aliados por agentes Mes Actual</h5>
                    </div>
                    <div class="card-body" v-if="optionMes">
                        <input v-model="month" type="month" class="form-control" @change="chart_agentes_mes()">
                        <div class="chart chart-sm">
                            <apexchart type="donut" :options="optionMes.chartOptions" :series="optionMes.series"
                                ref="elementChart" v-if="optionMes.series.length > 0">
                            </apexchart>
                            <h4 class="text-center mt-5" v-if="optionMes.series.length == 0">
                                No hay grafico en este mes
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <transition appear name="slide-fade">
                <div class="row">
                    <div class="col-lg-5 d-flex align-items-stretch">
                        <div class="card card-body">
                            <div class="p-1">
                                <apexchart type="bar" :options="chart_aliados.options" :series="chart_aliados.series">
                                </apexchart>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-7 d-flex align-items-stretch">
                        <div class="card card-body">
                            <div class="p-4">
                                <div class="row">
                                    <div class="col-lg-12 mb-4">
                                        <div class="card card-body shadow p-1 mb-1">
                                            <h5 class="fw-bold text-orange">
                                                Total de aliados: {{ total_aliados }}
                                            </h5>
                                        </div>
                                        <div class="card card-body shadow p-1 mt-0">
                                            <h5 class="fw-bold text-orange">
                                                Total de aliados por
                                                {{ agente.nombre_completo }}:
                                                {{ total_aliados }}
                                            </h5>
                                        </div>
                                    </div>
                                    <div class="form-group col-lg-6">
                                        <label>Ciudad</label>
                                        <select v-model="id_sucursal" @change="filtrar" class="form-select">
                                            <option value="null">Todos</option>
                                            <option v-for="(sucursal, index_sucursal) in sucursales"
                                                v-bind:key="index_sucursal" v-bind:value="sucursal.id_sucursal">
                                                {{ sucursal.sucursal }}
                                            </option>
                                        </select>
                                    </div>
                                    <div class="form-group col-lg-6">
                                        <label>Estado</label>
                                        <select v-model="estado" @change="filtrar" class="form-select">
                                            <option value="null">Todos</option>
                                            <option value="0">Interesado</option>
                                            <option value="1">Pendiente</option>
                                            <option value="2">Completa</option>
                                            <option value="3">Exitosa</option>
                                        </select>
                                    </div>
                                    <div class="form-group col-lg-6">
                                        <label>Tipo de descuento</label>
                                        <select v-model="tipo_descuento" @change="filtrar" class="form-select">
                                            <option value="null">Todos</option>
                                            <option v-for="(tipo_descuento, index_tipo_descuento) in tipos_descuento"
                                                v-bind:key="index_tipo_descuento"
                                                v-bind:value="tipo_descuento.id_tipo_descuento">
                                                {{ tipo_descuento.tipo_descuento }}
                                            </option>
                                        </select>
                                    </div>

                                    <div class="form-group col-lg-6">
                                        <label>Categoría</label>
                                        <select v-model="categoria" @change="filtrar" class="form-select">
                                            <option value="null">Todas</option>
                                            <option v-for="(categoria, index_categoria) in categorias"
                                                v-bind:key="index_categoria" v-bind:value="categoria.id_categoria">
                                                {{ categoria.categoria }}
                                            </option>
                                        </select>
                                    </div>
                                    <div class="form-group col-lg-6">
                                        <label>Fase</label>
                                        <select v-model="tipo_alianza" @change="filtrar" class="form-select">
                                            <option value="null">Todos</option>
                                            <option v-for="(tipo_alianza, index_tipo_alianza) in tipos_alianza"
                                                v-bind:key="index_tipo_alianza" v-bind:value="tipo_alianza.id_tipo_alianza">
                                                {{ tipo_alianza.tipo_alianza }}
                                            </option>
                                        </select>
                                    </div>
                                    <div class="form-group col-lg-6">
                                        <label>Mes de completado</label>
                                        <input @change="filtrar" v-model="fecha_completado" type="month"
                                            class="form-control" />
                                    </div>
                                    <div class="col-lg-6">
                                        <button class="btn btn-outline-primary btn-sm rounded-pill mt-2"
                                            @click="getLiquidacion($event)">
                                            Liquidar
                                        </button>
                                    </div>
                                    <div class="col-lg-6">
                                        <button class="btn btn-danger rounded-pill d-table ms-auto my-3"
                                            @click="clear_filters">
                                            <i class="fa-solid fa-broom-ball"></i>
                                            Limpiar filtros
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
            <transition appear name="slide-fade" class="mt-1">
                <div class="row">
                    <div class="col-lg-12">
                        <div v-if="loading" class="col-12 text-center" style="margin-top: 10em">
                            <i class="fa-solid fa-spinner fa-spin" style="font-size:50px;"></i>
                        </div>
                        <div v-else>
                            <div class="card card-body">
                                <div class="mt-3 mb-3 p-2 border text-orange bg-light">
                                    <span class="fw-bold">Mes: <span v-if="fecha_completado != null">{{ fecha_completado
                                    }}</span><span v-else>General</span>
                                    </span>
                                    -
                                    <span class="fw-bold">Cantidad: {{ total_aliados }}
                                    </span>
                                </div>
                                <!-- Tabla -->
                                <Table table_type="agentes" :data="aliados" :session="local_session" />
                            </div>
                            <section class="paginator" v-if="fecha_completado == null">
                                <div class="container">
                                    <ul class="pagination">
                                        <li v-for="num in    pages    " :key="num" class="page-item"
                                            :class="{ 'active': page == num }" @click="changePage(num)">
                                            <span class="page-link">{{ num }}</span>
                                        </li>
                                    </ul>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import Table from '@/modules/dashboard/components/Tables.vue'
import useAliados from '../../composables/useAliados'
export default {
    name: 'Panel_agentes_view',
    components: { Table },
    props: {
        session: Object,
    },
    setup(props) {

        const store = useStore()
        const local_session = ref(props.session)

        const graphElement = ref(null)
        const loading = ref(false)
        const agente = ref(null)
        const categoria = ref(null)
        const id_sucursal = ref(null)
        const tipo_alianza = ref(null)
        const tipo_descuento = ref(null)
        const estado = ref(null)
        const itemsPerPage = ref(10)
        const page = ref(1)
        const pages = ref([])
        const fecha_completado = ref(null)
        const month = ref(null)
        const option = ref(null)
        const optionMes = ref(null)

        const { get_resumen_aliados, get_chart_data, get_chart_mes_data, get_agentes, total_aliados, chart_aliados, get_categorias, get_sucursales, get_tipos_alianzas, get_tipos_descuentos } = useAliados(props.session)

        const getAliados = async () => {
            let id_usaurio = null
            if (agente.value != null) {
                id_usaurio = agente.value.id_usuario
            }
            let params = {
                categoria: categoria.value,
                estado: estado.value,
                id_sucursal: id_sucursal.value,
                id_usuario: id_usaurio,
                itemsPerPage: itemsPerPage.value,
                page: page.value,
                tipo_alianza: tipo_alianza.value,
                tipo_descuento: tipo_descuento.value,
                fecha_completado: fecha_completado.value
            }
            loading.value = true;
            const resp = await store.dispatch('dashboard/getAliados', [params, props.session.token])
            loading.value = false
            let pagesTotal = Math.ceil(resp.data.data.total_aliados / itemsPerPage.value);
            pages.value = range(1, pagesTotal);
            return resp
        }

        const range = (start, end) => {
            return [...Array(end).keys()].map((el) => el + start);
        }

        const changePage = (num) => {
            page.value = num;
            getAliados(props.session.token);
        }

        const filtrar = () => {
            if (fecha_completado.value != null) {
                itemsPerPage.value = 100
            }
            getAliados(props.session.token)
        }

        const clear_filters = () => {
            id_sucursal.value = null
            estado.value = null
            tipo_descuento.value = null
            tipo_alianza.value = null
            categoria.value = null
            fecha_completado.value = null
            itemsPerPage.value = 10

            getAliados(props.session.token)
        }

        const get_data = (agente) => {
            get_resumen_aliados({ 'id_usuario': agente.id_usuario })
            getAliados(props.session.token)
        }

        const chart_agentes = async () => {
            let resp = await get_chart_data()
            let options = {
                chartOptions: {
                    labels: resp.data.nombres,
                    plotOptions: {
                        pie: {
                            expandOnClick: false,
                            size: 200,
                            donut: {
                                labels: {
                                    show: true,
                                    total: {
                                        show: true
                                    }
                                }
                            }
                        }
                    },
                },
                series: resp.data.values
            }
            option.value = options
        }

        const chart_agentes_mes = async () => {
            let resp = await get_chart_mes_data({ 'mes': month.value })
            let options = {
                chartOptions: {
                    labels: resp.data.nombres,
                    plotOptions: {
                        pie: {
                            expandOnClick: false,
                            size: 200,
                            donut: {
                                labels: {
                                    show: true,
                                    total: {
                                        show: true
                                    }
                                }
                            }
                        }
                    },
                },
                series: resp.data.values
            }
            optionMes.value = options
        }

        onMounted(() => {
            if (graphElement.value != null) {
                chart_agentes()
                chart_agentes_mes()
            }
        })

        chart_agentes()
        get_agentes()
        get_chart_mes_data({ 'mes': month.value })
        get_categorias(props.session.token)
        get_sucursales(props.session.token)
        get_tipos_alianzas(props.session.token)
        get_tipos_descuentos(props.session.token)

        watch(
            () => graphElement.value,
            () => {
                chart_agentes()
                chart_agentes_mes()
            }
        )

        return {
            loading,
            local_session,
            aliados: computed(() => store.getters['dashboard/getAliados']),
            agente,
            agentes: computed(() => store.getters['dashboard/getAgentes']),
            categoria,
            categorias: computed(() => store.getters['dashboard/getCategorias']),
            chart_agentes_mes,
            chart_aliados,
            id_sucursal,
            sucursales: computed(() => store.getters['dashboard/getSucursales']),
            tipo_alianza,
            tipo_descuento,
            tipos_alianza: computed(() => store.getters['dashboard/getTiposAlianzas']),
            tipos_descuento: computed(() => store.getters['dashboard/getTiposDescuentos']),
            estado,
            get_chart_mes_data,
            total_aliados,
            filtrar,
            clear_filters,
            changePage,
            get_data,
            page,
            pages,
            fecha_completado,
            month,
            option,
            optionMes,
            graphElement
        }

    }
}
</script>

<style scoped>
.text-orange {
    color: #ff6700;
}

.pagination {
    display: table;
    padding-left: 0;
    margin: 1rem auto;
    border-radius: 0.25rem;
    margin-inline: auto;
    width: max-content;
}

.page-item {
    display: inline;
}

.page-item:first-child .page-link {
    margin-left: 0;
    border-bottom-left-radius: 0.25rem;
    border-top-left-radius: 0.25rem;
}

.page-item:last-child .page-link {
    border-bottom-right-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
}

.page-item.active .page-link,
.page-item.active .page-link:focus,
.page-item.active .page-link:hover {
    z-index: 2;
    color: #fff;
    cursor: default;
    background-color: #422A92;
    border-color: #422A92;
}

.page-item.disabled .page-link,
.page-item.disabled .page-link:focus,
.page-item.disabled .page-link:hover {
    color: #818a91;
    pointer-events: none;
    cursor: not-allowed;
    background-color: #fff;
    border-color: #ddd;
}

.page-link {
    position: relative;
    float: left;
    padding: 0.5rem 0.75rem;
    margin-left: -1px;
    color: #422A92;
    text-decoration: none;
    background-color: #fff;
    border: 1px solid #ddd;
    cursor: pointer;
}

.page-link:focus,
.page-link:hover {
    color: #422A92;
    background-color: #eceeef;
    border-color: #ddd;
}
</style>