<template>
    <h1 class="mt-4">Gestión Usuarios</h1>
    <ol class="breadcrumb mb-4">
        <li class="breadcrumb-item">
            <router-link :to="{ name: 'home' }">
                Dashboard
            </router-link>
        </li>
        <li class="breadcrumb-item active">Usuarios</li>
    </ol>
    <hr class="mb-4">
    <div class="row">
        <div class="col-md-6 col-sm-12">
            <div class="card card-body pt-4">
                <apexchart type="bar" :options="chart_aliados.options" :series="chart_aliados.series"></apexchart>
                <div class="text-end mt-2">
                    <h5 class="fw-bold text-orange">
                        {{ total_aliados }} Aliados
                    </h5>
                </div>
            </div>
        </div>
        <div class="col-md-6 col-sm-12">
            <div class="card card-body">
                <div class="list-group">
                    <router-link :to="{ name: 'panel_usuarios' }" class="list-group-item">
                        <i class="fas fa-solid fa-table-columns me-2"></i>
                        Panel general
                    </router-link>

                    <router-link :to="{ name: 'panel_agentes_usuarios' }" class="list-group-item">
                        <i class="fas fa-solid fa-user-secret me-2"></i>
                        Agentes
                    </router-link>
                    <router-link :to="{ name: 'rutas' }" class="list-group-item">
                        <i class="fas fa-solid fa-route me-2"></i>
                        Rutas
                    </router-link>
                    <router-link :to="{ name: 'beneficios_usuarios' }" class="list-group-item">
                        <i class="fas fa-solid fa-list-check me-2"></i>
                        Beneficios
                    </router-link>
                    <router-link :to="{ name: 'home' }" class="list-group-item">
                        <i class="fas fa-solid fa-download me-2"></i>
                        Descarga
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'
import useAliados from '../../composables/useAliados'
export default {
    name: 'Usuarios_Reddy',
    props: {
        session: Object,
    },
    setup(props) {
        const router = useRouter()

        if (!props.session) {
            router.push({ name: 'login' })
        }

        const { loading, total_aliados, chart_aliados, get_resumen_aliados } = useAliados(props.session)

        get_resumen_aliados({})

        return {
            loading,
            chart_aliados,
            total_aliados,
        }

    }
}
</script>

<style scoped>
.card {
    box-shadow: 0 0 15px 0 rgba(33, 37, 41, .2);
}

.list-group-item {
    font-weight: 600;
    color: #422A92;
}

.list-group-item:focus,
.list-group-item:hover {
    background-color: #f8f9fa;
    color: #ff6700;
    text-decoration: none;
    z-index: 1;
}

.text-orange {
    color: #ff6700 !important;
}
</style>