<template>
    <h1 class="mt-4">Rutas</h1>
    <ol class="breadcrumb mb-4">
        <li class="breadcrumb-item">
            <router-link :to="{ name: 'home' }">
                Dashboard
            </router-link>
        </li>
        <li class="breadcrumb-item">
            <router-link :to="{ name: 'usuarios-main' }">
                usuarios
            </router-link>
        </li>
        <li class="breadcrumb-item active">Rutas</li>
    </ol>
    <hr class="mb-4">
</template>

<script>
export default {
    name: 'rutas_membresias',

}
</script>

<style></style>