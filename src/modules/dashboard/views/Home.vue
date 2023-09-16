<template>
    <h1 class="mt-4">Dashboard</h1>
    <ol class="breadcrumb mb-4">
        <li class="breadcrumb-item active">Dashboard</li>
    </ol>
    <hr class="mb-4">
</template>

<script>
import { useRouter } from 'vue-router'
export default {
    name: 'Home-reddy',
    props: {
        session: Object,
    },
    setup(props) {

        const router = useRouter()

        if (!props.session) {
            router.push({ name: 'login' })
        }

    }
}
</script>

<style></style>