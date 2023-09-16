<template>
    <router-view :session="session" />
</template>

<script>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
export default {
    name: 'General-layout',
    setup() {

        const route = useRoute()
        const session = ref(null)

        const setSession = () => {
            session.value = localStorage.getItem("session_back");
            if (session.value != undefined) {
                session.value = JSON.parse(session.value);
            }
        }

        setSession()

        watch(
            () => route.name,
            () => setSession(),
        )

        return {
            session
        }

    }
}
</script>

<style></style>