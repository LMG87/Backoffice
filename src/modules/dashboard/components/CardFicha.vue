<template>
    <div v-if="table_type == 'aliados'">
        <div v-for="(aliado, index_aliado) in data_local" v-bind:key="index_aliado" class="card card-body border mb-3">
            <div class="row">
                <div class="col-lg-12 mb-2">
                    <router-link v-bind:to="'/aliado/info_basica/' + aliado.id_aliado
                        ">
                        <span class="fw-bold text-orange me-3" style="font-size: 1.3em">
                            <i class="bx bx-store"></i>
                            {{ aliado.nombre_aliado }}
                        </span>
                    </router-link>
                    <span>
                        <span v-if="aliado.estado_aliado == 0" class="badge bg-primary fw-bold">Interesado</span>
                        <span v-if="aliado.estado_aliado == 1" class="badge bg-danger fw-bold">Pendiente</span>
                        <span v-if="aliado.estado_aliado == 2" class="badge bg-success fw-bold">Completa</span>
                        <span v-if="aliado.estado_aliado == 3" class="badge bg-warning fw-bold">Exitosa</span>
                    </span>
                    <div class="float-end">
                        <span class="fw-bold text-muted">
                            {{ aliado.categoria }} -
                        </span>
                        <span v-if="aliado.alianza != null" class="fw-bold text-muted">
                            <span>{{ aliado.alianza.tipo_alianza }}</span>
                            -
                            <span>{{
                                aliado.alianza.tipo_descuento
                            }}</span>
                        </span>
                    </div>
                    <hr class="mb-0 mt-1" />
                </div>
                <div class="col-lg-1">
                    <span style="font-size: 0.8em">
                        Zona : <br />
                        <strong v-if="aliado.zona == 1">Norte</strong>
                        <strong v-if="aliado.zona == 2">Sur</strong>
                        <strong v-if="aliado.zona == 3">Oriente</strong>
                        <strong v-if="aliado.zona == 4">Occidente</strong>
                    </span>
                </div>
                <div class="col-lg-3">
                    <span style="font-size: 0.8em">
                        WhatsApp :
                        <strong>{{ aliado.whatsapp }}</strong></span><br />
                    <span style="font-size: 0.8em">
                        Teléfono :
                        <strong>{{ aliado.telefono }}</strong></span>
                </div>
                <div class="col-lg-5">
                    <span style="font-size: 0.8em">
                        Facebook : <br />
                        <strong>{{ aliado.facebook }}</strong></span>
                    <br />
                    <span style="font-size: 0.8em">
                        Instagram : <br />
                        <strong>{{ aliado.instagram }}</strong></span>
                </div>
                <div class="col-lg-3">
                    <span style="font-size: 0.8em">
                        Dirección : <br />
                        <strong>{{ aliado.direccion }}</strong></span>
                </div>
                <div class="col-lg-12 text-end">
                    <div class="dropdown">
                        <a class="btn btn-outline-primary btn-sm rounded-pill dropdown-toggle" href="javascript:void(0)"
                            role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                            Opciones
                        </a>

                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink">
                            <li>
                                <router-link v-bind:to="'/aliado/ficha/' + aliado.id_aliado
                                    " class="dropdown-item">Ficha</router-link>
                            </li>
                            <li v-if="session.usuario.perfil != 4 && session.usuario.perfil != 3">
                                <router-link v-bind:to="'/aliado/info_basica/' +
                                    aliado.id_aliado
                                    " class="dropdown-item">Editar</router-link>
                            </li>

                            <li v-if="session.usuario.perfil != 4 && session.usuario.perfil != 3">
                                <a @click="show_modal_info_contrato(index_aliado)
                                    " href="javascript:void(0)" class="dropdown-item">Contrato</a>
                            </li>

                            <li v-if="session.usuario.perfil != 4 && session.usuario.perfil != 3">
                                <a @click="show_modal_pendientes(index_aliado)
                                    " href="javascript:void(0)" class="dropdown-item">Pendientes</a>
                            </li>

                            <li v-if="session.usuario.perfil != 4 && session.usuario.perfil != 3">
                                <router-link v-bind:to="'/aliado/solicitudes/' +
                                    aliado.id_aliado
                                    " class="dropdown-item">Solicitudes de diseño</router-link>
                            </li>
                            <li v-if="session.usuario.perfil != 4 && session.usuario.perfil != 3">
                                <router-link v-bind:to="'/aliado/anexos/' + aliado.id_aliado
                                    " class="dropdown-item">Anexos
                                </router-link>
                            </li>
                            <!--v-if="aliado.estado_aliado == 2"-->
                            <li
                                v-if="aliado.estado_aliado == 2 && session.usuario.perfil != 4 && session.usuario.perfil != 3">
                                <a @click="get_qr(aliado.id_aliado)" class="dropdown-item">Código QR</a>
                            </li>
                            <li v-if="session.usuario.perfil == 0">
                                <a @click="resend_mail(aliado.nit_aliado)
                                    " href="javascript:void(0)" class="dropdown-item text-warning">Re-enviar
                                    Correo</a>
                            </li>
                            <li v-if="session.usuario.perfil == 0">
                                <a @click="show_modal_eliminar(index_aliado)
                                    " href="javascript:void(0)" class="dropdown-item text-danger">Eliminar</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else-if="table - type == 'usuarios'">
        <div v-for="(usuario, index_usuario) in data_local" v-bind:key="index_usuario" class="card card-body border mb-3">
            <div class="row">
                <div class="col-lg-12 mb-2">
                    <span class="fw-bold text-orange me-3" style="font-size: 1em">
                        <i class="bx bx-user"></i>
                        {{ usuario.nombres }} {{ usuario.apellidos }}
                    </span>
                    <span>
                        <span v-if="usuario.estado_registro == 0" class="badge bg-primary fw-bold">Interesado</span>
                        <span v-if="usuario.estado_registro == 1" class="badge bg-danger fw-bold">Pendiente</span>
                        <span v-if="usuario.estado_registro == 2" class="badge bg-success fw-bold">Completa</span>
                        <span v-if="usuario.estado_registro == 3" class="badge bg-warning fw-bold">Exitosa</span>
                    </span>

                    <hr class="mb-0 mt-1" />
                </div>

                <div class="col-lg-3">
                    <span style="font-size: 0.8em">
                        WhatsApp :
                        <strong>{{ usuario.whatsapp }}</strong></span><br />
                    <span style="font-size: 0.8em">
                        Celular :
                        <strong>{{ usuario.celular }}</strong></span>
                </div>

                <div class="col-lg-3">
                    <span style="font-size: 0.8em">
                        Correo electrónico : <br />
                        <strong>{{ usuario.email }}</strong></span>
                </div>
                <div class="col-lg-12 text-end">
                    <div class="dropdown">
                        <a class="btn btn-outline-primary btn-sm rounded-pill dropdown-toggle" href="javascript:void(0)"
                            role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                            Opciones
                        </a>

                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink">
                            <li>
                                <router-link class="dropdown-item" v-bind:to="'/usuario/info_basica/' +
                                    usuario.id_usuario
                                    ">
                                    Editar
                                </router-link>
                            </li>
                            <li>
                                <router-link class="dropdown-item" v-bind:to="'/beneficiarios/' + usuario.id_usuario
                                    ">
                                    Beneficiarios
                                </router-link>
                            </li>
                            <li>
                                <router-link class="dropdown-item" v-bind:to="'/pago/' + usuario.id_usuario">
                                    Pago
                                </router-link>
                            </li>
                            <li>
                                <router-link class="dropdown-item" v-bind:to="'/anexos_membresia/' +
                                    usuario.id_usuario
                                    ">
                                    Soporte de pago
                                </router-link>
                            </li>
                            <li>
                                <router-link class="dropdown-item" v-bind:to="'/contrato_membresia/' +
                                    usuario.id_usuario
                                    ">
                                    Confirmacion cliente
                                </router-link>
                            </li>
                            <li v-if="session.usuario.perfil == 0">
                                <a v-on:click="show_modal_eliminar(index_usuario)
                                    " href="javascript:void(0)" class="dropdown-item text-danger">Eliminar</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        No hay fichas para este tipo de consulta
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
    name: 'ficha-component',
    props: {
        table_type: String,
        data: Object,
        session: Object
    },
    setup(props) {

        return {
            local_session: ref(props.session),
            data_local: ref(props.data)
        }

    }

}
</script>

<style scoped></style>