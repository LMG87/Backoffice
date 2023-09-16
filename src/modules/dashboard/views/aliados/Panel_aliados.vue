<template>
    <h1 class="mt-4">Panel Aliados</h1>
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
        <li class="breadcrumb-item active">Panel Aliados</li>
    </ol>
    <hr class="mb-4">
    <div>
        <div>
            <div class="row">
                <div class="col-lg-6">
                    <div class="text-start mb-2">
                        <router-link class="btn btn-orange rounded-pill" to="/">
                            <i class="fa-solid fa-circle-plus"></i>
                            Aliado Nuevo
                        </router-link>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="text-end mb-2">
                        <a class="btn rounded-pill"
                            :class="{ 'btn-primary': !mostrarFiltros, 'btn-secondary': mostrarFiltros }"
                            @click="mostrarFiltros = !mostrarFiltros">
                            <i class="bx bx-filter-alt"></i>
                            <span v-if="mostrarFiltros">
                                <i class="fa-solid fa-filter-circle-xmark"></i>
                                Ocultar filtros
                            </span>
                            <span v-if="!mostrarFiltros">
                                <i class="fa-solid fa-filter"></i>
                                Mostrar filtros
                            </span>
                        </a>
                    </div>
                </div>
                <div v-if="mostrarFiltros" class="col-lg-12 mb-2">
                    <div class="row">
                        <div class="col-12 d-flex align-items-stretch">
                            <div class="card card-body">
                                <div class="p-4">
                                    <div class="row">
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
                                            <label>Zona</label>
                                            <select v-model="zona" @change="filtrar" class="form-select">
                                                <option value="null">Todas</option>
                                                <option value="1">Norte</option>
                                                <option value="2">Sur</option>
                                                <option value="3">Oriente</option>
                                                <option value="4">Occidente</option>
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
                                                <option v-for="( tipo_alianza, index_tipo_alianza) in tipos_alianza"
                                                    v-bind:key="index_tipo_alianza"
                                                    v-bind:value="tipo_alianza.id_tipo_alianza">
                                                    {{ tipo_alianza.tipo_alianza }}
                                                </option>
                                            </select>
                                        </div>
                                        <div class="col-12">
                                            <button class="btn btn-danger rounded-pill d-table mx-auto my-3"
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
                </div>
            </div>
        </div>
        <div class="card px-3 py-3">
            <div class="row justify-content-between mb-2">
                <div class="col-4">
                    <div class="input-group mb-3 shadow border">
                        <span class="input-group-text" id="basic-addon1">
                            <strong>
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </strong>
                        </span>
                        <input @keyup="get_search" v-model="search" type="text" class="form-control"
                            placeholder="Buscar aliado..." aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                </div>
                <div class="col-2">
                    <div class="d-table ms-auto">
                        <div class="d-flex" style="align-items: center;">
                            <label class="form-check-label me-2"
                                :class="{ 'color-success': !vista, 'color-primary': vista }">
                                <Popper>
                                    <a>
                                        <i class="fa-solid fa-table"></i>
                                    </a>
                                    <template #content>
                                        <div class="card px-3 py-3" style="color: #000000;">
                                            Vista Tabla
                                        </div>
                                    </template>
                                </Popper>
                            </label>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitch"
                                    v-model="vista">
                            </div>
                            <label class="form-check-label" :class="{ 'color-success': vista, 'color-primary': !vista }">
                                <Popper>
                                    <a>
                                        <i class="fa-regular fa-address-card"></i>
                                    </a>
                                    <template #content>
                                        <div class="card px-3 py-3" style="color: #000000;">
                                            Vista Ficha
                                        </div>
                                    </template>
                                </Popper>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row justify-content-between mb-2">
                <div class="col-2">
                    <div class="form-floating">
                        <select v-model="itemsPerPage" class="form-select" id="floatingSelect"
                            aria-label="Floating label select" @change="filtrar" style="border-radius:20px;">
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="30">30</option>
                            <option value="50">50</option>
                        </select>
                        <label for="floatingSelect">cantidad de objetos en tabla</label>
                    </div>
                </div>
                <div class="col-2" style="text-align:end;">
                    <button class="btn btn-success me-1 rounded-pill" style="padding:3px 10px;">
                        <download-excel :data="aliadosImp" :fields="json_fields" worksheet="My Worksheet" name="Aliados.xls"
                            style="color:#ffffff;font-weight:600;">
                            <i class="fa-solid fa-download"></i>
                            Descarga
                        </download-excel>
                    </button>
                    <button @click="download_qr" class="btn btn-success me-1 rounded-pill" style="padding:3px 10px;">
                        <i class="fa-solid fa-qrcode"></i>
                        QRs
                    </button>
                </div>
            </div>
            <div v-if="loading" class="col-12 text-center" style="margin-top: 10em">
                <i class="fa-solid fa-spinner fa-spin" style="font-size:50px;"></i>
            </div>
            <div v-else class="col-12">
                <Table table_type="aliados" :data="aliados" :session="local_session" v-if="!vista" />

                <Ficha table_type="aliados" :data="aliados" :session="local_session" v-if="vista" />

            </div>
        </div>
        <section class="paginator">
            <div class="container">
                <ul class="pagination">
                    <li v-for="num in    pages    " :key="num" class="page-item" :class="{ 'active': page == num }"
                        @click="changePage(num)">
                        <span class="page-link">{{ num }}</span>
                    </li>
                </ul>
            </div>
        </section>
    </div>
</template>

<script>
import { computed, ref } from 'vue'
import Table from '@/modules/dashboard/components/Tables.vue'
import Ficha from '@/modules/dashboard/components/CardFicha.vue'
import { useStore } from 'vuex'
import useAliados from '../../composables/useAliados'
export default {
    name: 'Panel_aliados_view',
    components: { Table, Ficha },
    props: {
        session: Object,
    },
    setup(props) {

        const store = useStore()
        const local_session = ref(props.session)

        const aliados = computed(() => store.getters['dashboard/getAliados'])
        const aliadosImp = ref([])
        const categoria = ref(null)
        const estado = ref(null)
        const id_sucursal = ref(null)
        const id_usuario = ref(null)
        const itemsPerPage = ref(10)
        const loading = ref(false)
        const mostrarFiltros = ref(false)
        const page = ref(1)
        const pages = ref([])
        const search = ref(null)
        const tipo_alianza = ref(null)
        const tipo_descuento = ref(null)
        const vista = ref(false)
        const zona = ref(null)

        const { get_categorias, get_sucursales, get_tipos_alianzas, get_tipos_descuentos } = useAliados(local_session.value)

        const getAliados = async () => {
            loading.value = true;
            let params = {
                categoria: categoria.value,
                estado: estado.value,
                id_sucursal: id_sucursal.value,
                id_usuario: id_usuario.value,
                itemsPerPage: itemsPerPage.value,
                page: page.value,
                search: search.value,
                tipo_alianza: tipo_alianza.value,
                tipo_descuento: tipo_descuento.value,
                zona: zona.value,
            }
            const resp = await store.dispatch('dashboard/getAliados', [params, local_session.value.token])
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
            console.log()
            getAliados(local_session.value.token);
        }

        const filtrar = () => {
            getAliados(local_session.value.token)
            getAliadosImp()
        }

        const clear_filters = () => {
            id_sucursal.value = null
            estado.value = null
            tipo_descuento.value = null
            zona.value = null
            tipo_alianza.value = null
            categoria.value = null

            mostrarFiltros.value = false

            getAliados(local_session.value.token)
        }

        const setVista = () => {
            if (vista.value == 1) {
                vista.value = 2
            } else {
                vista.value = 1
            }
        }

        const get_search = () => {
            if (page.value != 1) {
                page.value = 1;
            }
            getAliados(local_session.value.token);
        }

        const download_qr = () => {
            window.open("https://reddytech.com.co/api/index.php/download/qr_aliados/" + local_session.value.token, "_blank");
        }

        const getAliadosImp = async () => {
            loading.value = true;
            let params = {
            };
            const resp = await store.dispatch('dashboard/getAliadosImp', [params, local_session.value.token])
            aliadosImp.value = resp.data.data.aliados
        }

        getAliados(local_session.value.token)
        getAliadosImp()
        get_categorias()
        get_sucursales()
        get_tipos_alianzas()
        get_tipos_descuentos()

        return {
            loading,
            local_session,

            aliados,
            aliadosImp,
            categoria,
            categorias: computed(() => store.getters['dashboard/getCategorias']),
            changePage,
            clear_filters,
            download_qr,
            estado,
            filtrar,
            get_search,
            id_sucursal,
            itemsPerPage,
            mostrarFiltros,
            page,
            pages,
            search,
            setVista,
            sucursales: computed(() => store.getters['dashboard/getSucursales']),
            tipo_alianza,
            tipo_descuento,
            tipos_alianza: computed(() => store.getters['dashboard/getTiposAlianzas']),
            tipos_descuento: computed(() => store.getters['dashboard/getTiposDescuentos']),
            vista,
            zona,
            json_fields: {
                Nombre: "nombre_aliado",
                Estado: {
                    field: "estado_aliado",
                    callback: (value) => {
                        if (value == 2) {
                            return 'Completado'
                        } else if (value == 1) {
                            return 'pendiente'
                        }
                    }
                },
                Categoria: "categoria",
                "Fecha de Registro": "fecha_registro",
                Zona: "zona",
            },
        }
    }

}
</script>

<style scoped>
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

.color-success {
    background-color: #198754;
    color: #ffffff;
    padding: 5px 10px;
    border-radius: 30px;
}

.color-primary {
    background-color: gray;
    color: #ffffff;
    padding: 5px 10px;
    border-radius: 30px;
}

.btn-orange {
    background-color: #ff6700;
    color: #ffffff;
    font-weight: 600;
    padding: 5px 10px;
}
</style>