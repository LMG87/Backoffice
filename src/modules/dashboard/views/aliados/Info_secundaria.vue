<template>
    <h1 class="mt-4">Información Secundaria</h1>
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
        <li class="breadcrumb-item active">Información Secundaria</li>
    </ol>
    <hr class="mb-4">
    <div v-if="loading" class="col-12 text-center" style="margin-top: 10em">
        <i class="fa-solid fa-spinner fa-spin" style="font-size:50px;"></i>
    </div>
    <div v-else>
        <transition appear name="slide-fade">
            <div class="row">
                <div class="col-lg-12">
                    <div class="mb-3">
                        <div class="float-start">
                            <router-link :to="'/aliado/info_basica/' + id_aliado" class="text-muted">
                                <i class="fa-solid fa-chevron-left"></i> Información principal
                            </router-link>
                        </div>
                        <br />
                    </div>
                    <div class="mt-2 mb-3">
                        <h3 class="text-orange fw-bold">{{ aliado.nombre_aliado }}</h3>
                    </div>
                    <div class="card">
                        <div class="card-header">
                            <h4 class="text-orange fw-bold">Información secundaria</h4>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-12 form-group mt-3">
                                    <label>
                                        Fase del aliado
                                        <Tooltip :message="'clasificación por tipo de aliado'" />
                                    </label>
                                    <select v-model="alianza.id_tipo_alianza" class="form-control">
                                        <option v-for="(tipo_alianza, index_tipo_alianza) in tipos_alianza"
                                            :key="index_tipo_alianza" :value="tipo_alianza.id_tipo_alianza">
                                            {{ tipo_alianza.tipo_alianza }}
                                        </option>
                                    </select>
                                </div>
                                <div class="col-lg-12 form-group mt-3">
                                    <label>
                                        Tipo de aliado
                                        <small>(clasificación por tipo de descuento)</small>
                                    </label>
                                    <select @change="set_descuento" v-model="alianza.id_tipo_descuento" class="form-control"
                                        :disabled="aliado.estado_aliado == 2 && session.usuario.perfil != 0
                                            ">
                                        <option v-for="(tipo_descuento, index_tipo_descuento) in tipos_descuento"
                                            :key="index_tipo_descuento" :value="tipo_descuento.id_tipo_descuento">
                                            {{ tipo_descuento.tipo_descuento }}
                                        </option>
                                    </select>
                                </div>

                                <div class="col-lg-12 form-group mt-3"
                                    v-if="alianza.id_tipo_descuento != 1 && alianza.id_tipo_descuento != 2">
                                    <label>
                                        Servicios
                                        <small>
                                            (se especifica el tipo de servicio que se prestara, ejemplo: 10%
                                            de descuento en
                                            productos)
                                        </small>
                                    </label>
                                    <div v-if="alianza.servicios.length != 0">
                                        <div v-for="(servicio, index_servicio) in alianza.servicios" :key="index_servicio">
                                            <span>{{ index_servicio + 1 }}.</span>
                                            <input v-model="servicio.servicio" class="form-control" :disabled="aliado.estado_aliado == 2 &&
                                                session.usuario.perfil != 0
                                                " />
                                            <div v-if="aliado.estado_aliado != -1" class="text-end">
                                                <a @click="quitar_servicio(index_servicio)" href="javascript:void(0)"
                                                    class="text-danger">
                                                    <i class="bx bx-trash"></i> Quitar servicio
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="aliado.estado_aliado != -1" class="mt-3">
                                        <a @click="agregar_servicio" href="javascript:void(0)" class="text-orange">
                                            <i class="bx bx-plus-circle"></i> Agregar servicio
                                        </a>
                                    </div>
                                </div>

                                <div class="col-lg-12 form-group mt-3">
                                    <label>
                                        Porcentaje de descuento
                                        <small>(por defecto se pone por el tipo de aliado, pero
                                            en el caso de
                                            premium o menos de 15% se debe poner manual)</small>
                                    </label>
                                    <input v-model="alianza.descuento" class="form-control" type="text"
                                        :disabled="aliado.estado_aliado == 2 && session.usuario.perfil != 0" />
                                </div>
                                <div class="col-lg-12 form-group mt-3">
                                    <label>
                                        Personal administrativo
                                        <small>(cantidad de personal del area
                                            administrativa)</small>
                                    </label>
                                    <input v-model="aliado.personal_admin" class="form-control" type="number" :disabled="aliado.estado_aliado == 2 && session.usuario.perfil != 0
                                        " />
                                </div>
                                <div class="col-lg-12 form-group mt-3">
                                    <label>
                                        Personal operativo
                                        <small>(cantidad de personal del area
                                            operativa)</small>
                                    </label>
                                    <input v-model="aliado.personal_operativo" class="form-control" type="number" :disabled="aliado.estado_aliado == 2 && session.usuario.perfil != 0
                                        " />
                                </div>
                                <div class="col-lg-12 form-group mt-3">
                                    <label>
                                        Tipo de establecimiento
                                        <small>(se debe seleccionar un tipo de negocio entre
                                            virtual o
                                            presencial)</small>
                                    </label>
                                    <select v-model="aliado.establecimiento" class="form-select mb-3">
                                        <option selected>Selecciona tipo de establecimiento</option>
                                        <option value="0">Presencial</option>
                                        <option value="1">Virtual</option>
                                    </select>
                                </div>
                                <div class="col-lg-12 form-group mt-3">
                                    <label class="mb-4">
                                        Sede de beneficios
                                        <small>(direccion donde se aplicaran los
                                            descuentos, por defecto
                                            es la
                                            principal, pero se pueden adicionar si el aliado tiene más
                                            sedes.)</small>
                                    </label>
                                    <div v-if="alianza.direcciones.length != 0">
                                        <div class="row" v-for="(direccion, index_direccion) in alianza.direcciones"
                                            :key="index_direccion">
                                            <div class="col-lg-2">
                                                <span v-if="index_direccion != 0" class="fw-bold mt-2">
                                                    Nombre Sede{{ index_direccion + 1 }}.
                                                </span>
                                                <span v-if="index_direccion == 0" class="fw-bold mt-2">
                                                    Nombre Principal.
                                                </span>
                                                <input v-if="index_direccion == 0" v-model="direccion.nombre"
                                                    class="form-control"
                                                    :disabled="aliado.estado_aliado == 2 && session.usuario.perfil != 0" />
                                                <input v-if="index_direccion != 0" v-model="direccion.nombre"
                                                    class="form-control"
                                                    :disabled="aliado.estado_aliado == 2 && session.usuario.perfil != 0" />
                                            </div>
                                            <div class="col-lg-3">
                                                <span v-if="index_direccion != 0" class="fw-bold mt-2">
                                                    Dirección {{ index_direccion + 1 }}.
                                                </span>
                                                <span v-if="index_direccion == 0" class="fw-bold mt-2">
                                                    DirecciónPrincipal.
                                                </span>
                                                <input v-model="direccion.direccion" class="form-control"
                                                    :disabled="aliado.estado_aliado == 2 && session.usuario.perfil != 0" />
                                            </div>
                                            <div class="col-lg-2">
                                                <span v-if="index_direccion != 0" class="fw-bold mt-2">
                                                    latitud {{ index_direccion + 1 }}.
                                                </span>
                                                <span v-if="index_direccion == 0" class="fw-bold mt-2">
                                                    latitud Principal.
                                                </span>
                                                <input v-model="direccion.latitud" class="form-control"
                                                    :disabled="aliado.estado_aliado == 2 && session.usuario.perfil != 0" />
                                            </div>
                                            <div class="col-lg-2">
                                                <span v-if="index_direccion != 0" class="fw-bold mt-2">
                                                    longitud {{ index_direccion + 1 }}.
                                                </span>
                                                <span v-if="index_direccion == 0" class="fw-bold mt-2">longitud
                                                    Principal.
                                                </span>
                                                <input v-model="direccion.longitud" class="form-control"
                                                    :disabled="aliado.estado_aliado == 2 && session.usuario.perfil != 0" />
                                            </div>
                                            <div class="col-lg-3">
                                                <span v-if="index_direccion != 0" class="fw-bold mt-2">
                                                    telefono / whatsapp {{ index_direccion + 1 }}.
                                                </span>
                                                <span v-if="index_direccion == 0" class="fw-bold mt-2">
                                                    telefono / whatsapp Principal.
                                                </span>
                                                <input v-model="direccion.telefono" class="form-control"
                                                    :disabled="aliado.estado_aliado == 2 && session.usuario.perfil != 0" />
                                            </div>
                                            <div v-if="aliado.estado_aliado != -1" class="text-end">
                                                <a v-if="index_direccion != 0" @click="quitar_direccion(index_direccion)"
                                                    href="javascript:void(0)" class="text-danger">
                                                    <i class="bx bx-trash"></i> Quitar dirección
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="aliado.estado_aliado != -1" class="mt-3">
                                        <a @click="agregar_direccion" href="javascript:void(0)" class="text-orange">
                                            <i class="bx bx-plus-circle"></i> Agregar dirección
                                        </a>
                                    </div>
                                </div>

                                <div class="col-lg-12 form-group mt-3">
                                    <label>
                                        Descripción
                                        <small>(descripcion general de los servicios y descuentos, se
                                            visualiza en la app y
                                            la pagina web)</small>
                                    </label>
                                    <textarea v-model="alianza.descripcion" class="form-control" rows="6"></textarea>
                                </div>

                            </div>
                            <hr />
                            <div class="mt-3 mb-2 text-end">
                                <button @click="update_aliado(1)" class="btn btn-orange btn-lg rounded-pill mt-2 ms-1">
                                    <i class="fa-regular fa-floppy-disk"></i> Guardar y finalizar
                                </button>
                                <button @click="update_aliado(2)" class="btn btn-success btn-lg rounded-pill mt-2 ms-1">
                                    <i class="fa-regular fa-floppy-disk"></i> Guardar y continuar
                                    <i class="fa-solid fa-chevron-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import Tooltip from '@/modules/dashboard/components/Tooltip.vue'
import useAliados from '../../composables/useAliados'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { computed, ref, watch } from 'vue'
export default {
    name: 'Info_basica_view',
    components: { Tooltip },
    props: {
        session: Object
    },
    setup(props) {

        const route = useRoute()
        const store = useStore()
        const aliado = computed(() => store.getters['dashboard/getAliado'])
        const alianza = computed(() => store.getters['dashboard/getAlianza'])

        const id_aliado = ref(null)

        const { loading, get_aliado, get_tipos_alianzas, get_tipos_descuentos } = useAliados(props.session)

        id_aliado.value = route.params.id

        get_aliado(id_aliado.value)
        get_tipos_alianzas()
        get_tipos_descuentos()

        watch(
            () => route.params.id,
            () => {
                id_aliado.value = route.params.id
                get_aliado(id_aliado.value)
            }
        )

        return {
            loading,
            aliado,
            id_aliado,
            alianza,
            tipos_alianza: computed(() => store.getters['dashboard/getTiposAlianzas']),
            tipos_descuento: computed(() => store.getters['dashboard/getTiposDescuentos']),
        }

    }
}
</script>

<style scoped>
label {
    font-weight: 600 !important;
}

a.text-muted {
    text-decoration: none;
}

.text-orange {
    color: #ff6700;
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