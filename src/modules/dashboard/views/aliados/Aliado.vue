<template>
    <h1 class="mt-4">Gestión Aliado</h1>
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
        <li class="breadcrumb-item">
            <router-link :to="{ name: 'panel_aliados' }">
                Panel Aliados
            </router-link>
        </li>
        <li class="breadcrumb-item active">Aliado</li>
    </ol>
    <hr class="mb-4">
    <div v-if="loading" class="col-12 text-center" style="margin-top: 10em">
        <i class="fa-solid fa-spinner fa-spin" style="font-size:50px;"></i>
    </div>
    <div v-else>
        <transition appear name="slide-fade">
            <div class="row">
                <div class="col-md-6 offset-md-3">
                    <div class="card mb-3">
                        <div class="card-body text-center">
                            <img v-if="aliado.logo == null" src="assets/img/shop.png" alt="Aliado"
                                class="img-fluid rounded-circle mb-2" width="150" height="150" />
                            <img v-if="aliado.logo != null" :src="aliado.logo" alt="Logo Aliado"
                                class="img-fluid rounded-circle mb-2" width="150" height="150" />
                            <h4 class="mb-0 fw-bold text-orange">
                                {{ aliado.nombre_aliado }}
                            </h4>
                            <div class="mt-3">
                                <span v-if="aliado.estado_aliado == 0" class="badge bg-primary">Interesado</span>
                                <span v-if="aliado.estado_aliado == 1" class="badge bg-danger">Pendiente</span>
                                <span v-if="aliado.estado_aliado == 2" class="badge bg-success">Completa</span>
                                <span v-if="aliado.estado_aliado == 3" class="badge bg-warning">Exitosa</span>
                            </div>
                        </div>
                        <hr class="my-0" />
                        <div class="card-body">
                            <div class="d-grid gap-2">
                                <router-link :to="{ name: 'ficha_aliado', params: { id: aliado.id_aliado } }"
                                    class="btn btn-outline-primary btn-lg rounded-pill">
                                    Ficha
                                </router-link>
                                <router-link v-bind:to="'/aliado/info_basica/' + id_aliado"
                                    class="btn btn-outline-primary btn-lg rounded-pill">
                                    Información básica
                                </router-link>
                                <router-link v-bind:to="'/aliado/info_secundaria/' + id_aliado"
                                    class="btn btn-outline-primary btn-lg rounded-pill">
                                    Información secundaria
                                </router-link>
                                <router-link v-bind:to="'/aliado/anexos/' + id_aliado"
                                    class="btn btn-outline-primary btn-lg rounded-pill">
                                    Anexos
                                </router-link>
                                <router-link v-bind:to="'/aliado/solicitudes/' + id_aliado"
                                    class="btn btn-outline-primary btn-lg rounded-pill">
                                    Solicitudes diseños
                                </router-link>

                                <button v-on:click="generar_contrato" class="btn btn-outline-primary btn-lg rounded-pill">
                                    Contrato
                                </button>
                                <router-link v-bind:to="'/aliado/beneficios/' + id_aliado"
                                    class="btn btn-outline-primary btn-lg rounded-pill">
                                    Beneficios
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import { computed, ref, watch } from 'vue'
import useAliados from '../../composables/useAliados'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
export default {
    name: 'Aliado_view',
    props: {
        session: Object,
    },
    setup(props) {
        const route = useRoute()
        const store = useStore()

        const id_aliado = ref(null)

        const { loading, get_aliado, get_aliado_anexos } = useAliados(props.session)

        id_aliado.value = route.params.id

        get_aliado(id_aliado.value)
        get_aliado_anexos(id_aliado.value)

        watch(
            () => route.params.id,
            () => {
                id_aliado.value = route.params.id
                get_aliado(id_aliado.value)
                get_aliado_anexos(id_aliado.value)
            }
        )

        return {
            loading,
            aliado: computed(() => store.getters['dashboard/getAliado']),
            anexos: computed(() => store.getters['dashboard/getAliadoAnexos'])
        }
    }

}
</script>

<style scoped>
.text-orange {
    color: #ff6700 !important;
}
</style>