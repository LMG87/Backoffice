<template>
    <h1 class="mt-4">Beneficios Usuarios</h1>
    <ol class="breadcrumb mb-4">
        <li class="breadcrumb-item">
            <router-link :to="{ name: 'home' }">
                Dashboard
            </router-link>
        </li>
        <li class="breadcrumb-item">
            <router-link :to="{ name: 'usuarios-main' }">
                Usuarios
            </router-link>
        </li>
        <li class="breadcrumb-item active">Beneficios Usuarios</li>
    </ol>
    <hr class="mb-4">
</template>

<script>
export default {
    name: 'beneficios_usaurios',

}
</script>

<style></style>