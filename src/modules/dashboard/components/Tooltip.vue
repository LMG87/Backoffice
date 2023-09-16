<template>
    <Popper>
        <a>
            <small style="margin-left:5px; color: #ff6700;">
                <i class="fa-solid fa-circle-info"></i>
            </small>
        </a>
        <template #content>
            <div class="card px-3 py-3">
                {{ local_message }}
            </div>
        </template>
    </Popper>
</template>

<script>
import { ref } from 'vue'
export default {
    name: 'tooltip-component',
    props: {
        message: Object
    },
    setup(props) {

        return {
            local_message: ref(props.message),
        }

    }
}
</script>

<style></style>