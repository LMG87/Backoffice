<template>
    <h1 class="mt-4">Marketing Piezas</h1>
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
        <li class="breadcrumb-item active">Marketing Piezas</li>
    </ol>
    <hr class="mb-4">
</template>

<script>
export default {

}
</script>

<style></style>