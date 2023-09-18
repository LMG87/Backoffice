<template>
    <h1 class="mt-4">Información Básica</h1>
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
        <li class="breadcrumb-item active">Información Básica</li>
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
                        <div class="float-end">
                            <router-link :to="'/aliado/info_secundaria/' + id_aliado" class="text-muted">
                                Información secundaria <i class="fa-solid fa-chevron-right"></i>
                            </router-link>
                        </div>
                        <br />
                    </div>
                    <div class="mt-3 mb-3">
                        <h3 class="text-orange fw-bold">{{ aliado.nombre_aliado }}</h3>
                    </div>
                    <div class="card px-2 py-2">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-12 form-group mt-3">
                                    <label>
                                        Ciudad
                                        <Tooltip :message="'Ciudad de ubicación Aliado'" />
                                    </label>
                                    <select v-model="aliado.sucursal" @change="filtrar" class="form-select"
                                        :disabled="aliado.estado_aliado == 2 && session.usuario.perfil != 0">
                                        <option value="null">Todos</option>
                                        <option v-for="(sucursal, index_sucursal) in sucursales" :key="index_sucursal"
                                            :value="sucursal">
                                            {{ sucursal.sucursal }}
                                        </option>
                                    </select>
                                    <div class="text-end">
                                        <a v-on:click="load_nueva_ciudad = true" href="javascript:void(0)">Crear nueva</a>
                                    </div>
                                </div>
                                <div class="col-lg-6 form-group mt-3">
                                    <label>
                                        Nombre del aliado
                                        <Tooltip :message="'Razon social o nombre comercial'" />
                                    </label>
                                    <input v-model="aliado.nombre_aliado" class="form-control" type="text" :disabled="aliado.estado_aliado == 2 && session.usuario.perfil != 0
                                        " />
                                </div>
                                <div class="col-lg-6 form-group mt-3">
                                    <label>
                                        NIT del aliado
                                        <Tooltip
                                            :message="'Identificación que sale en el RUT, escribirlo sin puntos, preferiblemente no poner digito de verificación'" />
                                    </label>
                                    <input v-model="aliado.nit_aliado" class="form-control" type="text" :disabled="aliado.estado_aliado == 2 && session.usuario.perfil != 0
                                        " />
                                </div>

                                <div class="col-lg-6 form-group mt-3">
                                    <label>
                                        WhatsApp
                                        <Tooltip :message="'Preferiblemente cuenta empresarial'" />
                                    </label>
                                    <input v-model="aliado.whatsapp" v-on:blur="copiar(1)" class="form-control" type="text"
                                        @keypress="isNumber($event)" :disabled="aliado.estado_aliado == 2 && session.usuario.perfil != 0
                                            " />
                                </div>
                                <div class="col-lg-6 form-group mt-3">
                                    <label>
                                        Celular
                                        <Tooltip :message="'Preferiblemente número empresarial'" />
                                    </label>
                                    <input v-model="aliado.telefono" class="form-control" type="text"
                                        @keypress="isNumber($event)" :disabled="aliado.estado_aliado == 2 && session.usuario.perfil != 0
                                            " />
                                </div>
                                <div class="col-lg-6 form-group mt-3">
                                    <label>
                                        Correo electrónico
                                        <Tooltip
                                            :message="'Validar bien antes de guardar, es obligatorio, no se puede poner un correo inexistente'" />
                                    </label>
                                    <input v-model="aliado.email" class="form-control" type="mail" :disabled="aliado.estado_aliado == 2 && session.usuario.perfil != 0
                                        " />
                                </div>
                                <div class="col-lg-6 form-group mt-3">
                                    <label>
                                        Facebook
                                        <Tooltip :message="'Nombre de como aparece en url o en su defecto id'" />
                                    </label>
                                    <input v-model="aliado.facebook" class="form-control" type="text" :disabled="aliado.estado_aliado == 2 && session.usuario.perfil != 0
                                        " />
                                </div>
                                <div class="col-lg-6 form-group mt-3">
                                    <label>
                                        Instagram
                                        <Tooltip :message="'Nombre tal cual como aparece en la @'" />
                                    </label>
                                    <input v-model="aliado.instagram" class="form-control" type="text" :disabled="aliado.estado_aliado == 2 && session.usuario.perfil != 0
                                        " />
                                </div>
                                <div class="col-lg-6 form-group mt-3">
                                    <label>
                                        Zona
                                        <Tooltip :message="'Ubicación cardinal Norte, Sur, centro, oriente, occidente'" />
                                    </label>
                                    <select v-model="aliado.zona" class="form-select"
                                        :disabled="aliado.estado_aliado == 2 && session.usuario.perfil != 0">
                                        <option value="null">Selecciona la zona</option>
                                        <option value="1">Norte</option>
                                        <option value="2">Sur</option>
                                        <option value="3">Oriente</option>
                                        <option value="4">Occidente</option>
                                        <option value="5">Centro</option>
                                    </select>
                                </div>
                                <div class="col-lg-12 form-group mt-3">
                                    <label>
                                        Dirección principal establecimiento
                                        <Tooltip :message="'Dirección de la sede principal'" />
                                    </label>
                                    <input v-model="aliado.direccion" class="form-control" type="text" :disabled="aliado.estado_aliado == 2 && session.usuario.perfil != 0
                                        " />
                                </div>
                                <div v-if="loading_ubicacion" class="col-lg-12 text-center text-info">
                                    Espera. Detectando ubicación...
                                </div>
                                <div class="col-lg-6 form-group mt-3">
                                    <label>Latitud</label>
                                    <input v-model="aliado.lat" class="form-control" type="text" />
                                </div>
                                <div class="col-lg-6 form-group mt-3">
                                    <label>Longitud</label>
                                    <input v-model="aliado.lng" class="form-control" type="text" />
                                    <div class="text-end">
                                        <a v-on:click="get_ubicacion" href="javascript:void(0)">Detectar ubicación</a>
                                    </div>
                                </div>
                                <div class="col-lg-12 form-group mt-3">
                                    <label>
                                        Categoría
                                        <Tooltip :message="'Grupo al que pertenece el negocio aliado'" />
                                    </label>
                                    <select v-model="aliado.id_categoria" class="form-select" :disabled="aliado.estado_aliado == 2 && session.usuario.perfil != 0
                                        ">
                                        <option value="null">Selecciona una categoría</option>
                                        <option v-for="(categoria, index_categoria) in categorias"
                                            v-bind:key="index_categoria" v-bind:value="categoria.id_categoria">
                                            {{ categoria.categoria }}
                                        </option>
                                    </select>
                                </div>
                                <div class="col-lg-12 mt-3">
                                    <hr>
                                </div>
                                <div class="col-lg-6 form-group mt-3">
                                    <label>
                                        Nombre del representante legal
                                        <Tooltip :message="'Nombre completo con apellidos'" />
                                    </label>
                                    <input v-model="aliado.representante_legal" v-on:blur="copiar(2)" class="form-control"
                                        type="text" :disabled="aliado.estado_aliado == 2 && session.usuario.perfil != 0
                                            " />
                                </div>
                                <div class="col-lg-6 form-group mt-3">
                                    <label>
                                        Identificación del representante legal
                                        <Tooltip :message="'Numero de cedula sin puntos'" />
                                    </label>
                                    <input v-model="aliado.identificacion_representante_legal" class="form-control"
                                        type="text" @keypress="isNumber($event)" :disabled="aliado.estado_aliado == 2 && session.usuario.perfil != 0
                                            " />
                                </div>
                                <div class="col-lg-6 form-group mt-3">
                                    <label>
                                        Nombre del contacto
                                        <Tooltip
                                            :message="'Por defecto es el representante legal, pero se puede cambiar, nombre completo con apellidos'" />
                                    </label>
                                    <input v-model="aliado.nombre_contacto" class="form-control" type="text" :disabled="aliado.estado_aliado == 2 && session.usuario.perfil != 0
                                        " />
                                </div>
                                <div class="col-lg-6 form-group mt-3">
                                    <label>
                                        Celular del contacto
                                        <Tooltip :message="'Numero telefonico del contacto principal'" />
                                    </label>
                                    <input v-model="aliado.telefono_contacto" class="form-control" type="text"
                                        @keypress="isNumber($event)" :disabled="aliado.estado_aliado == 2 && session.usuario.perfil != 0
                                            " />
                                </div>
                                <div class="col-lg-6 form-group mt-3">
                                    <label>
                                        Correo electrónico del contacto
                                        <Tooltip
                                            :message="'Correo electrónico del contacto principal preferiblemente del representante legal'" />
                                    </label>
                                    <input v-model="aliado.email_contacto" class="form-control" type="text"
                                        @keypress="isNumber($event)" :disabled="aliado.estado_aliado == 2 && session.usuario.perfil != 0
                                            " />
                                </div>
                                <div class="col-lg-12 mt-3">
                                    <hr>
                                </div>
                                <div v-if="session.usuario.perfil == 0" class="col-lg-6 form-group">
                                    <label>Agente</label>
                                    <select v-model="aliado.usuario.id_usuario" class="form-select">
                                        <option value="null">Selecciona una categoría</option>
                                        <option v-for="(agente, index_usuario) in agentes" :key="index_usuario"
                                            :value="agente.id_usuario">
                                            {{ agente.nombre_completo }}
                                        </option>
                                    </select>
                                </div>
                                <div v-if="session.usuario.perfil == 0" class="col-lg-6 form-group">
                                    <label>Estado</label>
                                    <select v-model="aliado.estado_aliado" class="form-select">
                                        <option value="0">Interesado</option>
                                        <option value="1">Pendiente</option>
                                        <option value="2">Completa</option>
                                        <option value="3">
                                            Exitosa
                                        </option>
                                    </select>
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
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import useAliados from '../../composables/useAliados'
import Tooltip from '@/modules/dashboard/components/Tooltip.vue'
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

        const id_aliado = ref(null)

        const { loading, get_aliado, get_categorias, get_sucursales, get_agentes } = useAliados(props.session)

        id_aliado.value = route.params.id

        const update_aliado = (step) => {
            console.log(step, aliado.value)
        }

        get_aliado(id_aliado.value)
        get_categorias()
        get_sucursales()
        get_agentes()

        watch(
            () => route.params.id,
            () => {
                id_aliado.value = route.params.id
                get_aliado(id_aliado.value)
            }
        )

        return {
            loading,
            update_aliado,
            aliado,
            id_aliado,
            categorias: computed(() => store.getters['dashboard/getCategorias']),
            sucursales: computed(() => store.getters['dashboard/getSucursales']),
            agentes: computed(() => store.getters['dashboard/getAgentes']),
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