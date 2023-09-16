<template>
    <table v-if="table_type == 'aliados'" class="table table-bordered table-condensed table-hover my_table">
        <thead>
            <tr>
                <th style="width: 2%" class="text-center">
                    <Popper>
                        <a>
                            <i class="fa-solid fa-circle-info"></i>
                        </a>
                        <template #content>
                            <div class="card px-3 py-3">
                                <p>El semaforo funciona con fecha de registro<br>
                                    y los días que tarda en completarce<br>
                                    el aliado:</p>
                                <ul>
                                    <li>Verde 0 a 10 días</li>
                                    <li>amarillo de 10 a 15 días</li>
                                    <li>Rojo mayor a 15 días</li>
                                </ul>
                            </div>
                        </template>
                    </Popper>
                </th>
                <th style="width: 2%" class="text-center">#</th>
                <th style="width: 18%">Nombre</th>
                <th class="text-center" style="width: 6%">
                    Estado
                </th>
                <th class="text-center" style="width: 10%">
                    Agente
                </th>
                <th style="width: 7%">Fecha Corte</th>
                <th style="width: 7%">Descuento</th>
                <th style="width: 7%">WhatsApp</th>
                <th class="text-center" style="width: 7%">
                    Info legal
                </th>
                <th class="text-center" style="width: 7%">
                    Contrato
                </th>
                <th class="text-center" style="width: 6%">
                    Logo
                </th>
                <th class="text-center" style="width: 7%">
                    Pieza revista
                </th>
                <th class="text-center" style="width: 7%">
                    Pieza redes
                </th>
                <th class="text-center" style="width: 7%">
                    Opciones
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(aliado, index_aliado) in data_local" v-bind:key="index_aliado">
                <td class="text-center">
                    <Popper v-if="aliado.estado_aliado != 2">
                        <a
                            :class="{ 'text-success': aliado.dias >= 0 && aliado.dias < 10, 'text-warning': aliado.dias >= 10 && aliado.dias < 15, 'text-danger': aliado.dias >= 15 }">
                            <i class="bx bxs-circle bx-xs"></i>
                        </a>
                        <template #content>
                            <div class="card px-3 py-3">
                                <p>Fecha de registro: <strong>{{ aliado.fecha_registro }}</strong></p>
                                <br>
                                <p>Días trascurridos: <strong>{{ aliado.dias }}</strong></p>
                            </div>
                        </template>
                    </Popper>
                </td>
                <td class="text-center">
                    {{ aliado.num }}
                </td>
                <td>
                    <router-link v-bind:to="'/aliado/' + aliado.id_aliado">
                        <h5 class="text-orange fw-bold mb-0">
                            {{ aliado.nombre_aliado }}
                        </h5>
                    </router-link>
                    <span class="fw-bold text-muted">
                        {{ aliado.categoria }}
                    </span>
                    <br />
                    <span v-if="aliado.sucursal != null" class="fw-bold text-muted">
                        {{ aliado.sucursal.sucursal }}
                    </span>
                </td>
                <td class="text-center">
                    <span>
                        <span v-if="aliado.estado_aliado == 0" class="badge bg-primary fw-bold startus">Interesado</span>
                        <span v-if="aliado.estado_aliado == 1" class="badge bg-danger fw-bold startus">Pendiente</span>
                        <span v-if="aliado.estado_aliado == 2" class="badge bg-success fw-bold startus">Completa</span>
                        <span v-if="aliado.estado_aliado == 3" class="badge bg-warning fw-bold startus">Exitosa</span>
                    </span>
                    <br />
                </td>
                <td>
                    <div v-if="aliado.agente != null">
                        <span class="text-uppercase">
                            {{ aliado.agente.usuario }}
                        </span>
                    </div>
                    <small class="text-muted">
                        {{ aliado.fecha_registro }}
                    </small>
                </td>
                <td class="text-center">
                    {{ aliado.fecha_corte }}
                </td>
                <td>
                    <span v-if="aliado.alianza != null">
                        {{ aliado.alianza.tipo_descuento }}
                    </span>
                </td>
                <td>{{ aliado.whatsapp }}</td>
                <td class="text-center">
                    <a v-if="aliado.info_legal != null" href="" target="_blank" class="text-success icona">
                        <i class="fas fa-solid fa-circle-check"></i>
                    </a>
                    <span v-else class="text-danger icona">
                        <i class="fas fa-solid fa-circle-xmark"></i>
                    </span>
                </td>
                <td class="text-center">
                    <a v-if="aliado.tipo_firma == 1" :href="aliado.contrato_fisico" target="_blank"
                        class="text-success icona">
                        <i class="fas fa-solid fa-circle-check"></i>
                    </a>
                    <a v-if="aliado.tipo_firma == 3" :href="aliado.url_contrato" target="_blank" class="text-success icona">
                        <i class="fas fa-solid fa-circle-check"></i>
                    </a>
                    <span v-if="aliado.tipo_firma == 0 || aliado.tipo_firma == 2" class="text-danger icona">
                        <i class="fas fa-solid fa-circle-xmark"></i>
                    </span>
                </td>
                <td class="text-center">
                    <a v-if="aliado.logo != null" v-bind:href="aliado.logo" target="_blank" class="text-success icona">
                        <i class="fas fa-solid fa-circle-check"></i>
                    </a>
                    <span v-else class="text-danger icona">
                        <i class="fas fa-solid fa-circle-xmark"></i>
                    </span>
                </td>
                <td class="text-center">
                    <a v-if="aliado.pieza_horizontal != null" v-bind:href="aliado.pieza_horizontal" target="_blank"
                        class="text-success icona">
                        <i class="fas fa-solid fa-circle-check"></i>
                    </a>
                    <span v-else class="text-danger icona">
                        <i class="fas fa-solid fa-circle-xmark"></i>
                    </span>
                </td>
                <td class="text-center">
                    <a v-if="aliado.pieza_vertical != null" v-bind:href="aliado.pieza_vertical" target="_blank"
                        class="text-success icona">
                        <i class="fas fa-solid fa-circle-check"></i>
                    </a>
                    <span v-else class="text-danger icona">
                        <i class="fas fa-solid fa-circle-xmark"></i>
                    </span>
                </td>
                <td class="text-center">
                    <div class="dropdown">
                        <a class="btn btn-outline-primary btn-sm rounded-pill dropdown-toggle" href="javascript:void(0)"
                            role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                            Opciones
                        </a>

                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink">
                            <li>
                                <router-link :to="{ name: 'ficha_aliado', params: { id: aliado.id_aliado } }"
                                    class="dropdown-item">
                                    Ficha
                                </router-link>
                            </li>
                            <li v-if="local_session.usuario.perfil != 4 && local_session.usuario.perfil != 3">
                                <router-link :to="{ name: 'info_basica_aliado', params: { id: aliado.id_aliado } }"
                                    class="dropdown-item">
                                    Editar
                                </router-link>
                            </li>

                            <li v-if="local_session.usuario.perfil != 4 && local_session.usuario.perfil != 3">
                                <a href="javascript:void(0)" class="dropdown-item">
                                    Contrato
                                </a>
                            </li>

                            <li v-if="local_session.usuario.perfil != 4 && local_session.usuario.perfil != 3">
                                <a href="javascript:void(0)" class="dropdown-item">
                                    Pendientes
                                </a>
                            </li>

                            <li v-if="local_session.usuario.perfil != 4 && local_session.usuario.perfil != 3">
                                <router-link v-bind:to="'/aliado/solicitudes/' + aliado.id_aliado" class="dropdown-item">
                                    Solicitudes de diseño
                                </router-link>
                            </li>
                            <li v-if="local_session.usuario.perfil != 4 && local_session.usuario.perfil != 3">
                                <router-link v-bind:to="'/aliado/anexos/' + aliado.id_aliado" class="dropdown-item">
                                    Anexos
                                </router-link>
                            </li>
                            <li
                                v-if="aliado.estado_aliado == 2 && local_session.usuario.perfil != 4 && local_session.usuario.perfil != 3">
                                <a class="dropdown-item">
                                    Código QR
                                </a>
                            </li>
                            <li v-if="local_session.usuario.perfil == 0">
                                <a href="javascript:void(0)" class="dropdown-item text-warning">
                                    Re-enviar Correo
                                </a>
                            </li>
                            <li v-if="local_session.usuario.perfil == 0">
                                <a href="javascript:void(0)" class="dropdown-item text-danger">
                                    Eliminar
                                </a>
                            </li>
                        </ul>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <table v-else-if="table_type == 'agentes'" class="table table-bordered table-condensed table-hover my_table">
        <thead>
            <tr>
                <th style="width: 2%">#</th>
                <th style="width: 20%">Nombre</th>
                <th class="text-center" style="width: 9%">
                    Estado
                </th>
                <th class="text-center" style="width: 15%">
                    Agente
                </th>
                <th class="text-center" style="width: 15%">
                    Fecha de Completo
                </th>
                <th class="text-center" style="width: 15%">
                    Fecha de Corte
                </th>
                <th style="width: 15%">
                    Comision Aliado
                </th>
                <th style="width: 15%">
                    Comision Piezas
                </th>
                <th class="text-center" style="width: 8%">
                    Opciones
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(aliado, index_aliado) in data_local" v-bind:key="index_aliado">
                <td>{{ aliado.num }}</td>
                <td>
                    <router-link v-bind:to="'/aliado/' + aliado.id_aliado">
                        <h5 class="text-orange fw-bold mb-0">
                            {{ aliado.nombre_aliado }}
                        </h5>
                    </router-link>
                    <span class="fw-bold text-muted">
                        {{ aliado.categoria }} </span><br />
                    <span v-if="aliado.sucursal != null" class="fw-bold text-muted">
                        {{ aliado.sucursal.sucursal }}
                    </span>
                </td>
                <td class="text-center">
                    <span>
                        <span v-if="aliado.estado_aliado == 0" class="badge bg-primary fw-bold startus">Interesado</span>
                        <span v-if="aliado.estado_aliado == 1" class="badge bg-danger fw-bold startus">Pendiente</span>
                        <span v-if="aliado.estado_aliado == 2" class="badge bg-success fw-bold startus">Completa</span>
                        <span v-if="aliado.estado_aliado == 3" class="badge bg-warning fw-bold startus">Exitosa</span>
                    </span>
                </td>
                <td>
                    <div v-if="aliado.agente != null">
                        <span class="text-uppercase">{{
                            aliado.agente.usuario
                        }}</span>
                    </div>
                    <small class="text-muted">
                        {{ aliado.fecha_registro }}
                    </small>
                </td>
                <td class="text-center">
                    {{ aliado.fecha_completo }}
                </td>
                <td class="text-center">
                    {{ aliado.fecha_corte }}
                </td>
                <td>
                    <div v-if="aliado.alianza">
                        <div v-if="aliado.alianza.id_tipo_alianza == null">
                            {{ currency.format(0) }}
                        </div>
                        <div v-if="aliado.alianza.id_tipo_alianza == '1'">
                            <h4 v-if="aliado.alianza.id_tipo_descuento == '0'">
                                {{ currency.format(0) }}
                            </h4>
                            <h4 v-if="aliado.alianza.id_tipo_descuento == '1'">
                                {{ currency.format(20000) }}
                            </h4>
                            <h4 v-if="aliado.alianza.id_tipo_descuento == '2'">
                                {{ currency.format(15000) }}
                            </h4>
                            <h4 v-if="aliado.alianza.id_tipo_descuento == '3'">
                                {{ currency.format(12000) }}
                            </h4>
                            <h4 v-if="aliado.alianza.id_tipo_descuento == '4'">
                                {{ currency.format(12000) }}
                            </h4>
                            <h4 v-if="aliado.alianza.id_tipo_descuento == '5'">
                                {{ currency.format(12000) }}
                            </h4>
                        </div>
                        <div v-if="aliado.alianza.id_tipo_alianza == '2'">
                            <h4 v-if="aliado.alianza.id_tipo_descuento == '0'">
                                {{ currency.format(0) }}
                            </h4>
                            <h4 v-if="aliado.alianza.id_tipo_descuento == '1'">
                                {{ currency.format(40000) }}
                            </h4>
                            <h4 v-if="aliado.alianza.id_tipo_descuento == '2'">
                                {{ currency.format(30000) }}
                            </h4>
                            <h4 v-if="aliado.alianza.id_tipo_descuento == '3'">
                                {{ currency.format(25000) }}
                            </h4>
                            <h4 v-if="aliado.alianza.id_tipo_descuento == '4'">
                                {{ currency.format(15000) }}
                            </h4>
                            <h4 v-if="aliado.alianza.id_tipo_descuento == '5'">
                                {{ currency.format(12000) }}
                            </h4>
                        </div>
                        <div v-if="aliado.alianza.id_tipo_alianza == '3'">
                            <h4 v-if="aliado.alianza.id_tipo_descuento == '0'">
                                {{ currency.format(0) }}
                            </h4>
                            <h4 v-if="aliado.alianza.id_tipo_descuento == '1'">
                                {{ currency.format(65000) }}
                            </h4>
                            <h4 v-if="aliado.alianza.id_tipo_descuento == '2'">
                                {{ currency.format(45000) }}
                            </h4>
                            <h4 v-if="aliado.alianza.id_tipo_descuento == '3'">
                                {{ currency.format(35000) }}
                            </h4>
                            <h4 v-if="aliado.alianza.id_tipo_descuento == '4'">
                                {{ currency.format(25000) }}
                            </h4>
                            <h4 v-if="aliado.alianza.id_tipo_descuento == '5'">
                                {{ currency.format(15000) }}
                            </h4>
                        </div>
                        <div v-if="aliado.alianza.id_tipo_alianza == '5'">
                            <h4 v-if="aliado.alianza.id_tipo_descuento == '0'">
                                {{ currency.format(0) }}
                            </h4>
                            <h4 v-if="aliado.alianza.id_tipo_descuento == '1'">
                                {{ currency.format(40000) }}
                            </h4>
                            <h4 v-if="aliado.alianza.id_tipo_descuento == '2'">
                                {{ currency.format(30000) }}
                            </h4>
                            <h4 v-if="aliado.alianza.id_tipo_descuento == '3'">
                                {{ currency.format(25000) }}
                            </h4>
                            <h4 v-if="aliado.alianza.id_tipo_descuento == '4'">
                                {{ currency.format(15000) }}
                            </h4>
                            <h4 v-if="aliado.alianza.id_tipo_descuento == '5'">
                                {{ currency.format(12000) }}
                            </h4>
                        </div>
                        <div v-if="aliado.alianza.id_tipo_alianza == '6'">
                            <h4 v-if="aliado.alianza.id_tipo_descuento == '0'">
                                {{ currency.format(0) }}
                            </h4>
                            <h4 v-if="aliado.alianza.id_tipo_descuento == '1'">
                                {{ currency.format(40000) }}
                            </h4>
                            <h4 v-if="aliado.alianza.id_tipo_descuento == '2'">
                                {{ currency.format(30000) }}
                            </h4>
                            <h4 v-if="aliado.alianza.id_tipo_descuento == '3'">
                                {{ currency.format(25000) }}
                            </h4>
                            <h4 v-if="aliado.alianza.id_tipo_descuento == '4'">
                                {{ currency.format(15000) }}
                            </h4>
                            <h4 v-if="aliado.alianza.id_tipo_descuento == '5'">
                                {{ currency.format(12000) }}
                            </h4>
                        </div>
                        <div v-if="aliado.alianza.id_tipo_alianza == '7'">
                            <h4 v-if="aliado.alianza.id_tipo_descuento == '0'">
                                {{ currency.format(0) }}
                            </h4>
                            <h4 v-if="aliado.alianza.id_tipo_descuento == '1'">
                                {{ currency.format(20000) }}
                            </h4>
                            <h4 v-if="aliado.alianza.id_tipo_descuento == '2'">
                                {{ currency.format(15000) }}
                            </h4>
                            <h4 v-if="aliado.alianza.id_tipo_descuento == '3'">
                                {{ currency.format(12000) }}
                            </h4>
                            <h4 v-if="aliado.alianza.id_tipo_descuento == '4'">
                                {{ currency.format(12000) }}
                            </h4>
                            <h4 v-if="aliado.alianza.id_tipo_descuento == '5'">
                                {{ currency.format(12000) }}
                            </h4>
                        </div>
                    </div>
                    <div v-else>
                        <h4>{{ currency.format(0) }}</h4>
                    </div>
                </td>
                <td>
                    <h4 v-if="aliado.solicitud_pieza">
                        {{ currency.format(5000) }}
                    </h4>
                    <h4 v-else>
                        {{ currency.format(0) }}
                    </h4>
                </td>
                <td class="text-center">
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
                            <li>
                                <router-link v-bind:to="'/aliado/info_basica/' +
                                    aliado.id_aliado
                                    " class="dropdown-item">Editar</router-link>
                            </li>
                            <li>
                                <router-link v-bind:to="'/aliado/anexos/' + aliado.id_aliado
                                    " class="dropdown-item">Anexos
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <table v-else-if="table_type == 'usuarios'" class="table table-bordered table-condensed table-hover my_table">
        <thead>
            <tr>
                <th style="width: 2%" class="text-center">
                    <a
                        v-tooltip="'<p>El semaforo funciona con fecha de corte y se<br>muestra dependiendo del tiempo<br>que falta para que se venza<br>la membresia:</p><ul><li>verde  90 a 60 días</li><li>amarillo 60 a 30</li><li>rojo menores a 30 días</li><ul>'">
                        <i class='bx bx-info-circle'></i>
                    </a>
                </th>
                <th style="width: 2%" class="text-center">#</th>
                <th style="width: 20%">Nombres y apellidos</th>
                <th class="text-center" style="width: 6%">
                    Estado
                </th>
                <th class="text-center" style="width: 10%">
                    Agente
                </th>
                <th class="text-center" style="width: 10%">
                    Tipo Membresia
                </th>
                <th class="text-center" style="width: 10%">
                    Fecha Corte
                </th>
                <th style="width: 10%">Email</th>
                <th style="width: 10%">WhatsApp</th>
                <th style="width: 10%">Celular</th>
                <th style="width: 12%">Dirección</th>
                <th class="text-center" style="width: 12%">
                    Opciones
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(usuario, index_usuario) in data_local" v-bind:key="index_usuario">
                <td class="text-center">
                    <a v-if="usuario.dias_vencimiento < 90" href="javascript:void(0)"
                        v-tooltip="{ content: 'Fecha de Corte: <strong>' + usuario.fecha_corte + '</strong><br> Días trascurridos: <strong>' + usuario.dias_vencimiento + '</strong>', }"
                        :class="{ 'text-success': usuario.dias_vencimiento > 60 && usuario.dias_vencimiento < 90, 'text-warning': usuario.dias_vencimiento < 60 && usuario.dias_vencimiento > 30, 'text-danger': usuario.dias_vencimiento < 30, }">
                        <i class="bx bxs-circle bx-xs"></i>
                    </a>
                </td>
                <td class="text-center">{{ usuario.num }}</td>
                <td class="text-uppercase fw-bold text-orange">
                    {{ usuario.nombres }} {{ usuario.apellidos }}
                </td>
                <td class="text-center">
                    <span>
                        <span v-if="usuario.estado_registro == 0" class="badge bg-primary fw-bold">Interesado</span>
                        <span v-if="usuario.estado_registro == 1" class="badge bg-danger fw-bold">Pendiente</span>
                        <span v-if="usuario.estado_registro == 2" class="badge bg-success fw-bold">Completa</span>
                        <span v-if="usuario.estado_registro == 3" class="badge bg-warning fw-bold">Exitosa</span>
                    </span>
                </td>
                <td>
                    <div v-if="usuario.agente != null">
                        <span class="text-uppercase">{{
                            usuario.agente.usuario
                        }}</span>
                    </div>
                    <small class="text-muted">
                        {{ usuario.fecha_registro }}
                    </small>
                </td>
                <td class="text-center">
                    <div v-if="usuario.membresia.tipo_membresia == 1">
                        Super WOW
                    </div>
                    <div v-if="usuario.membresia.tipo_membresia == 2">
                        WOW
                    </div>
                    <div v-if="usuario.membresia.tipo_membresia == 3">
                        Básica
                    </div>
                </td>
                <td class="text-center">
                    {{ usuario.fecha_corte }}
                </td>
                <td>
                    {{ usuario.email }}
                </td>
                <td>{{ usuario.whatsapp }}</td>
                <td>{{ usuario.celular }}</td>
                <td>{{ usuario.direccion }}</td>
                <td class="text-center">
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
                                <router-link class="dropdown-item" v-bind:to="'/pago/' + usuario.id_usuario
                                    ">
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
                </td>
            </tr>
        </tbody>
    </table>
    <div v-else>
        No hay Tabla para este tipo de consulta
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
    name: 'tables-component',
    props: {
        table_type: String,
        data: Object,
        session: Object
    },
    setup(props) {

        const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

        return {
            currency,
            local_session: ref(props.session),
            data_local: ref(props.data)
        }

    }

}
</script>

<style scoped>
.my_table td {
    padding: 5px !important;
    height: auto !important;
    font-size: 11px;
}

.my_table td .icona {
    font-size: 20px;
}

.my_table td .startus {
    font-size: 12px;
}

.my_table td a {
    text-decoration: none;
}

.my_table td .text-orange {
    color: #ff6700;
}

.my_table td {
    vertical-align: middle;
}

.my_table th {
    text-transform: uppercase;
    font-size: 12px;
}
</style>