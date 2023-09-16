<template>
    <h1 class="mt-4">Solicitud Pieza</h1>
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
            <router-link :to="{ name: 'panel-aliados' }">
                Panel Aliados
            </router-link>
        </li>
        <li class="breadcrumb-item active">Solicitud pieza</li>
    </ol>
    <hr class="mb-4">
</template>

<script>
export default {

}
</script>

<style></style>