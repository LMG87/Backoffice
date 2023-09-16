<template>
    <h1 class="mt-4">Lista por Codigo</h1>
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
        <li class="breadcrumb-item active">Lista por Codigo</li>
    </ol>
    <hr class="mb-4">
</template>

<script>
export default {

}
</script>

<style></style>