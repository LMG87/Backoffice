<template>
    <h1 class="mt-4">Ficha</h1>
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
        <li class="breadcrumb-item active">Ficha</li>
    </ol>
    <hr class="mb-4">
    <div v-if="loading" class="col-12 text-center" style="margin-top: 10em">
        <i class="fa-solid fa-spinner fa-spin" style="font-size:50px;"></i>
    </div>
    <div v-else>
        <transition appear name="slide-fade">
            <div class="row">
                <div class="col-lg-12">
                    <div v-if="aliado.estado_aliado == 2" class="alert alert-success fw-bold text-center">
                        Completo
                    </div>
                    <div v-if="aliado.estado_aliado == 3" class="alert alert-warning fw-bold text-center">
                        Exitoso
                    </div>
                    <div v-if="aliado.estado_aliado == 1" class="alert alert-danger fw-bold text-center">
                        Pendiente
                    </div>
                    <div v-if="aliado.estado_aliado == 0" class="alert alert-info fw-bold text-center">
                        Interesado
                    </div>
                </div>
                <div class="col-md-4 col-xl-3">
                    <div class="card mb-3">
                        <div class="card-header">
                            <h4 class="fw-bold text-center text-orange mb-0">
                                {{ aliado.nombre_aliado }}
                            </h4>
                        </div>
                        <div class="card-body text-center">
                            <img v-if="aliado.logo != null" :src="aliado.logo" alt="Logo Aliado"
                                class="img-fluid rounded-circle mb-2" width="150" height="150" />
                        </div>
                        <hr class="my-0" />
                        <div class="card-body text-center">
                            <div class="d-grid gap-2">
                                <a v-if="anexos.pieza_revista != null" v-bind:href="anexos.pieza_revista" target="_blank"
                                    class="btn btn-orange rounded-pill">
                                    Pieza revista
                                </a>
                                <a v-if="anexos.pieza_redes != null" v-bind:href="anexos.pieza_redes" target="_blank"
                                    class="btn btn-orange rounded-pill">
                                    Pieza redes
                                </a>

                                <a v-if="anexos.pieza_historias != null" v-bind:href="anexos.pieza_historias"
                                    target="_blank" class="btn btn-orange rounded-pill">
                                    Pieza historias
                                </a>

                                <a v-if="anexos.pieza_app != null" v-bind:href="anexos.pieza_app" target="_blank"
                                    class="btn btn-orange rounded-pill">
                                    Pieza app
                                </a>

                                <a v-if="anexos.portafolio != null" v-bind:href="anexos.portafolio" target="_blank"
                                    class="btn btn-orange rounded-pill">
                                    Portafolio
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-8 col-xl-9">
                    <div class="card">
                        <div class="card-body h-100">
                            <div class="row">
                                <div class="col-lg-12 form-group">
                                    <label>Agente</label>
                                    <h6 v-if="aliado.usuario != null" class="fw-bold text-orange text-uppercase">
                                        {{ aliado.usuario.nombre_completo }}
                                    </h6>
                                </div>
                                <div class="col-lg-6 form-group">
                                    <label>Nombre</label>
                                    <h6 class="fw-bold text-orange">
                                        {{ aliado.nombre_aliado }}
                                    </h6>
                                </div>
                                <div class="col-lg-6 form-group">
                                    <label>Zona</label>
                                    <h6 v-if="aliado.zona == 1" class="fw-bold text-orange">
                                        Norte
                                    </h6>
                                    <h6 v-if="aliado.zona == 2" class="fw-bold text-orange">
                                        Sur
                                    </h6>
                                    <h6 v-if="aliado.zona == 3" class="fw-bold text-orange">
                                        Este
                                    </h6>
                                    <h6 v-if="aliado.zona == 4" class="fw-bold text-orange">
                                        Oeste
                                    </h6>
                                </div>
                                <div class="col-lg-6 form-group">
                                    <label>Teléfono / Whatsapp</label>
                                    <h6 class="fw-bold text-orange">
                                        {{ aliado.telefono }} / {{ aliado.whatsapp }}
                                    </h6>
                                </div>
                                <div class="col-lg-6 form-group">
                                    <label>Categoría</label>
                                    <h6 class="fw-bold text-orange">
                                        {{ aliado.categoria }}
                                    </h6>
                                </div>
                                <div class="col-lg-6 form-group">
                                    <label>Redes</label><br />
                                    <small>Facebook</small>
                                    <h6 class="fw-bold text-orange">
                                        {{ aliado.facebook }}
                                    </h6>
                                    <small>Instagram</small>
                                    <h6 class="fw-bold text-orange">
                                        {{ aliado.instagram }}
                                    </h6>
                                </div>
                                <div class="col-lg-6 form-group">
                                    <label>Nombre contacto</label>
                                    <h6 class="fw-bold text-orange">
                                        {{ aliado.nombre_contacto }}
                                    </h6>
                                </div>
                                <div class="col-lg-6 form-group">
                                    <label>Ubicación</label>
                                    <h6 class="fw-bold text-orange">
                                        {{ aliado.direccion }}
                                    </h6>
                                </div>
                                <div class="col-lg-6 form-group">
                                    <label>Correo</label>
                                    <h6 class="fw-bold text-orange">
                                        {{ aliado.email }}
                                    </h6>
                                </div>
                                <div class="col-lg-6 form-group">
                                    <label>Personal</label>
                                    <h6 class="fw-bold text-orange">
                                        <span>Operativo: </span>{{ aliado.personal_operativo
                                        }}<br />
                                        <span>Administrativo: </span>{{ aliado.personal_admin }}
                                    </h6>
                                </div>
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
import { useRoute } from 'vue-router'
import useAliados from '../../composables/useAliados'
import { useStore } from 'vuex'
export default {
    name: 'Ficha_view',
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

.btn-orange {
    background-color: #ff6700;
    color: #ffffff;
    font-weight: 600;
    padding: 5px 10px;
}

.card {
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
}
</style>