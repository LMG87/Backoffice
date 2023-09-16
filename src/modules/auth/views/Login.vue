<template>
    <div class="row justify-content-center" style="height: calc(100vh - 69px);">
        <div class="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
            <div class="d-table-cell align-middle">
                <div class="card shadow-lg border-0 rounded-lg" style="padding:0 1.5em;">
                    <div class="card-header">
                        <h3 class="text-center font-weight-light my-4">
                            <img class="img-fluid" src="assets/img/logo-login.png" alt="logo">
                        </h3>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="onSubmit">
                            <div class="form-floating mb-3">
                                <input v-model="userForm.email" class="form-control" id="inputEmail" type="email"
                                    placeholder="name@example.com" />
                                <label for="inputEmail">Correo Electrónico</label>
                            </div>
                            <div class="input-group mb-3">
                                <div class="form-floating">
                                    <input v-model="userForm.password" type="password" class="form-control"
                                        id="inputPassword" placeholder="UsPasswordername">
                                    <label for="inputPassword">Contraseña</label>
                                </div>
                                <span v-if="show_icon" class="input-group-text" @click="toggle_input_pass"
                                    style="cursor:pointer;">
                                    <i class="fa-solid fa-eye-slash"></i>
                                </span>
                                <span v-if="!show_icon" class="input-group-text" @click="toggle_input_pass"
                                    style="cursor:pointer;">
                                    <i class="fa-solid fa-eye"></i>
                                </span>
                            </div>
                            <div class="form-check mb-3 mx-auto d-table">
                                <input class="form-check-input" id="inputRememberPassword" type="checkbox" value="" />
                                <label class="form-check-label" for="inputRememberPassword">
                                    Recordar Contraseña
                                </label>
                            </div>
                            <div class="d-flex align-items-center d-table mt-4 mb-0">
                                <button type="submit" class="btn btn-lg btn-reddy mx-auto">Iniciar</button>
                            </div>
                        </form>
                    </div>
                    <div class="card-footer text-center py-3">
                        <!-- <div class="small">
                            <a class="small" href="password.html">
                                ¿Has olvidado tu contraseña?
                            </a>
                            &nbsp;/
                            <a href="register.html">
                                ¿Necesitas una cuenta? ¡Registrate!
                            </a>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
export default {
    name: 'Login-reddy',
    setup() {

        const store = useStore()
        const router = useRouter()
        const userForm = ref({
            email: 'Estefania2218@gmail.com',
            password: 'Reddy-**'
        })
        const show_icon = ref(false)
        const toggle_input_pass = () => {
            if (document.getElementById("inputPassword").type == "password") {
                document.getElementById("inputPassword").type = "text";
                show_icon.value = true
            } else {
                document.getElementById("inputPassword").type = "password";
                show_icon.value = false
            }
        }

        const loginAdmin = async (user) => {
            const resp = await store.dispatch('auth/loginAdmin', user)
            return resp
        }

        return {
            userForm,
            toggle_input_pass,
            show_icon,
            onSubmit: async () => {
                const { ok, message } = await loginAdmin(userForm.value)
                if (!ok) console.log('Error', message, 'error')
                else router.push({ name: 'home' })
            }
        }

    }

}
</script>

<style scoped>
.card-header,
.card-footer {
    border: none;
    background-color: transparent;
}

.btn-reddy {
    background: #472599;
    color: #ffffff;
}

.btn-reddy:hover {
    background: #6741c2;
}
</style>