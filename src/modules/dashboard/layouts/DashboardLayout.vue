<template>
    <div class="sb-nav-fixed" :class="{ 'sb-sidenav-toggled': isToggleMenu }">
        <nav class="sb-topnav navbar navbar-expand"
            :class="{ 'navbar-dark bg-dark': darkTheme || darkTheme == 'true', 'navbar-dark bg-primary': !darkTheme || darkTheme == 'false' }">
            <!-- Navbar Brand-->
            <a class="navbar-brand ps-3" href="index.html">
                <img src="assets/img//logo-sm.png" alt="">
            </a>
            <!-- Sidebar Toggle-->
            <button class="btn btn-link btn-sm order-0 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"
                @click="isToggleMenu = !isToggleMenu"><i class="fas fa-bars"></i></button>
            <!-- Navbar Search-->
            <!-- <form class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                <div class="input-group">
                    <input class="form-control" type="text" placeholder="Search for..." aria-label="Search for..."
                        aria-describedby="btnNavbarSearch" />
                    <button class="btn btn-primary" id="btnNavbarSearch" type="button"><i
                            class="fas fa-search"></i></button>
                </div>
            </form> -->
            <!-- Navbar-->
            <ul class="navbar-nav ms-auto me-3 me-lg-4">
                <li class="d-flex me-5" style="align-items:center;">
                    <label class="form-check-label me-2" for="flexSwitchCheckDefault">
                        <i class="fa-solid fa-sun" style="color:#ffffff;"></i>
                    </label>
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"
                            v-model="darkTheme" @change="changeColor">
                    </div>
                    <label class="form-check-label" for="flexSwitchCheckDefault">
                        <i class="fa-regular fa-moon" style="color:#ffffff;"></i>
                    </label>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        {{ usuario.nombres }} {{ usuario.apellidos }}
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li><a class="dropdown-item" href="#!">Settings</a></li>
                        <li><a class="dropdown-item" href="#!">Activity Log</a></li>
                        <li>
                            <hr class="dropdown-divider" />
                        </li>
                        <li><a class="dropdown-item" href="#!">Logout</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
        <div id="layoutSidenav">
            <div id="layoutSidenav_nav">
                <nav class="sb-sidenav accordion"
                    :class="{ 'sb-sidenav-dark': darkTheme || darkTheme == 'true', 'sb-sidenav-primary': !darkTheme || darkTheme == 'false' }"
                    id="sidenavAccordion">
                    <div class="sb-sidenav-menu">
                        <div class="nav">
                            <div class="sb-sidenav-menu-heading">
                                MENU
                            </div>
                            <router-link class="nav-link" :to="{ name: 'home' }" active-class="active">
                                <div class="sb-nav-link-icon">
                                    <i class="fas fa-solid fa-chalkboard"></i>
                                </div>
                                Dashboard
                            </router-link>
                            <router-link class="nav-link" :to="{ name: 'aliados-main' }" active-class="active">
                                <div class="sb-nav-link-icon">
                                    <i class="fas fa-solid fa-store"></i>
                                </div>
                                Aliados
                            </router-link>
                            <router-link class="nav-link" :to="{ name: 'marketing-main' }" active-class="active">
                                <div class="sb-nav-link-icon">
                                    <i class="fas fa-solid fa-bullhorn"></i>
                                </div>
                                Marketing
                            </router-link>
                            <router-link class="nav-link" :to="{ name: 'usuarios-main' }" active-class="active">
                                <div class="sb-nav-link-icon">
                                    <i class="fas fa-solid fa-users"></i>
                                </div>
                                Usuarios
                            </router-link>
                            <router-link class="nav-link" :to="{ name: 'codigos-main' }" active-class="active">
                                <div class="sb-nav-link-icon">
                                    <i class="fas fa-solid fa-tags"></i>
                                </div>
                                Codigos
                            </router-link>
                            <router-link class="nav-link" :to="{ name: 'agentes-main' }" active-class="active">
                                <div class="sb-nav-link-icon">
                                    <i class="fas fa-solid fa-universal-access"></i>
                                </div>
                                Agentes
                            </router-link>
                            <hr>
                            <router-link class="nav-link" :to="{ name: 'aliados' }" active-class="active">
                                <div class="sb-nav-link-icon">
                                    <i class="fas fa-solid fa-gear"></i>
                                </div>
                                Ajustes
                            </router-link>
                            <router-link class="nav-link" :to="{ name: 'aliados' }">
                                <div class="sb-nav-link-icon">
                                    <i class="fas fa-solid fa-right-from-bracket"></i>
                                </div>
                                Salir
                            </router-link>
                        </div>
                    </div>
                    <div class="sb-sidenav-footer">
                        <div class="small">Conectado como:</div>
                        {{ usuario.nombres }} {{ usuario.apellidos }}
                    </div>
                </nav>
            </div>
            <div id="layoutSidenav_content">
                <main>
                    <div class="container-fluid px-4">
                        <router-view :session="session" />
                    </div>
                </main>
                <footer class="py-4 bg-light mt-auto">
                    <div class="container-fluid px-4">
                        <div class="d-flex align-items-center justify-content-between small">
                            <div class="text-muted">Copyright &copy; Your Website 2023</div>
                            <div>
                                <a href="#">Privacy Policy</a>
                                &middot;
                                <a href="#">Terms &amp; Conditions</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
export default {
    name: 'Dashboard-layout',
    setup() {

        const route = useRoute()
        const session = ref(null)
        const usuario = ref(null)
        const isToggleMenu = ref(false)
        const darkTheme = ref(true)


        const setSession = () => {
            session.value = localStorage.getItem("session_back");
            if (session.value != undefined) {
                session.value = JSON.parse(session.value);
                usuario.value = session.value.usuario
            }
        }

        if (localStorage.getItem('colorTheme')) {
            darkTheme.value = localStorage.getItem('colorTheme')
        }

        const changeColor = () => {
            localStorage.setItem('colorTheme', darkTheme.value)
        }

        setSession()

        watch(
            () => route.name,
            () => setSession(),
        )

        watch(
            () => darkTheme.value,
            () => changeColor()
        )

        return {
            isToggleMenu,
            session,
            usuario,
            darkTheme,
            changeColor
        }

    }
}
</script>

<style scoped>
.sb-sidenav-menu .nav-link {
    color: #ffffff;
}

.sb-sidenav-menu .nav-link .sb-nav-link-icon {
    color: rgba(255, 255, 255, 0.25);
}

.sb-sidenav-menu .nav-link.active .sb-nav-link-icon {
    color: #ffffff;
}

.sb-sidenav-dark a.active.router-link-exact-active {
    border-left: 2px solid #ff6700;
}

.sb-sidenav-primary a.active.router-link-exact-active {
    border-left: 2px solid #ff6700;
}

.sb-sidenav-dark a.active {
    border-left: 2px solid #422A92;
    opacity: 1;
    color: #ffffff;
    font-weight: 600;
}

.sb-sidenav-primary a.active {
    border-left: 2px solid #ffffff;
    opacity: 1;
    color: #ffffff;
    font-weight: 600;
}

.sb-sidenav-dark {
    background-color: #000000;
    color: rgba(255, 255, 255, 0.8);
}

.sb-sidenav-primary {
    background-color: #422A92;
    color: rgba(255, 255, 255, 0.8);
}

.sb-sidenav-dark .sb-sidenav-footer {
    background-color: #000000;
}

.sb-sidenav-primary .sb-sidenav-footer {
    background-color: #422A92;
}

.navbar-dark.bg-dark {
    background-color: #000000 !important;
}

.navbar-dark.bg-primary {
    background-color: #422A92 !important;
    color: #ffffff !important;
}

.sb-sidenav-dark .sb-sidenav-menu-heading,
.sb-sidenav-dark .sb-sidenav-menu .nav-link {
    color: rgba(255, 255, 255, 0.8);
}

.sb-sidenav-dark .sb-sidenav-menu .nav-link.active {
    opacity: 1;
    color: #ffffff;
    font-weight: 600;
}
</style>