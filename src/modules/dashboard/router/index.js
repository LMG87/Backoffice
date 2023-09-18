export default{
    name: 'dashboard',
    component: () => import(/*WebpackChunkName: "dashboard" */ '@/modules/dashboard/layouts/DashboardLayout.vue'),
    children:[
        { 
            path: '/', 
            redirect: { name: 'home' } 
        },
        {
            path: '/inicio',
            name: 'home',
            component: () => import(/*wbpackChunkName: "home"*/'@/modules/dashboard/views/Home.vue')
        },
        {
            path: 'aliados',
            name: 'aliados',
            component: () => import(/*wbpackChunkName: "aliados"*/'@/modules/dashboard/layouts/GeneralLayout.vue'),
            children:[
                {
                    path: '',
                    name: 'aliados-main',
                    component: () => import(/*wbpackChunkName: "panel_aliados"*/'@/modules/dashboard/views/aliados/Aliados.vue')
                },
                {
                    path: '/panel_aliados',
                    name: 'panel_aliados',
                    component: () => import(/*wbpackChunkName: "panel_aliados"*/'@/modules/dashboard/views/aliados/Panel_aliados.vue')
                },
                {
                    path: '/panel_agentes',
                    name: 'panel_agentes',
                    component: () => import(/*wbpackChunkName: "panel_agentes"*/'@/modules/dashboard/views/aliados/Panel_agentes.vue')
                }
                ,
                {
                    path: '/beneficios',
                    name: 'beneficios',
                    component: () => import(/*wbpackChunkName: "beneficios"*/'@/modules/dashboard/views/aliados/beneficios/Beneficios.vue')
                }
                ,
                {
                    path: '/top_aliados',
                    name: 'top_aliados',
                    component: () => import(/*wbpackChunkName: "top_aliados"*/'@/modules/dashboard/views/aliados/Top_aliados.vue')
                },
                {
                    path: '/aliado/:id',
                    name: 'aliado',
                    component: () => import(/*wbpackChunkName: "aliado"*/'@/modules/dashboard/views/aliados/Aliado.vue')
                },
                {
                    path: '/aliado/ficha/:id',
                    name: 'ficha_aliado',
                    component: () => import(/*wbpackChunkName: "ficha_aliado"*/'@/modules/dashboard/views/aliados/Ficha.vue')
                },
                {
                    path: '/aliado/info_basica/:id',
                    name: 'info_basica_aliado',
                    component: () => import(/*wbpackChunkName: "info_basica_aliado"*/'@/modules/dashboard/views/aliados/Info_basica.vue')
                },
                {
                    path: '/aliado/info_secundaria/:id',
                    name: 'info_secundaria_aliado',
                    component: () => import(/*wbpackChunkName: "info_secundaria_aliado"*/'@/modules/dashboard/views/aliados/Info_secundaria.vue')
                }
            ]
        },
        {
            path: 'usuarios',
            name: 'usuarios',
            component: () => import(/*wbpackChunkName: "aliados"*/'@/modules/dashboard/layouts/GeneralLayout.vue'),
            children:[
                {
                    path: '',
                    name: 'usuarios-main',
                    component: () => import(/*wbpackChunkName: "panel_aliados"*/'@/modules/dashboard/views/usuarios/Usuarios.vue')
                },
                {
                    path: '/panel_usuarios',
                    name: 'panel_usuarios',
                    component: () => import(/*wbpackChunkName: "panel_aliados"*/'@/modules/dashboard/views/usuarios/Panel_usuarios.vue')
                },
                {
                    path: '/panel_agentes_usuarios',
                    name: 'panel_agentes_usuarios',
                    component: () => import(/*wbpackChunkName: "panel_aliados"*/'@/modules/dashboard/views/usuarios/Panel_agentes.vue')
                },
                {
                    path: '/beneficios_usuarios',
                    name: 'beneficios_usuarios',
                    component: () => import(/*wbpackChunkName: "panel_aliados"*/'@/modules/dashboard/views/usuarios/beneficios/Beneficios.vue')
                },
                {
                    path: '/rutas',
                    name: 'rutas',
                    component: () => import(/*wbpackChunkName: "panel_aliados"*/'@/modules/dashboard/views/usuarios/Rutas.vue')
                }
            ]
        },
        {
            path: 'marketing',
            name: 'marketing',
            component: () => import(/*wbpackChunkName: "aliados"*/'@/modules/dashboard/layouts/GeneralLayout.vue'),
            children:[
                {
                    path: '',
                    name: 'marketing-main',
                    component: () => import(/*wbpackChunkName: "panel_aliados"*/'@/modules/dashboard/views/marketing/Marketing.vue')
                },
                {
                    path: '/impresos',
                    name: 'impresos',
                    component: () => import(/*wbpackChunkName: "panel_aliados"*/'@/modules/dashboard/views/marketing/Impresos.vue')
                },
                {
                    path: '/redes',
                    name: 'redes',
                    component: () => import(/*wbpackChunkName: "panel_aliados"*/'@/modules/dashboard/views/marketing/Redes.vue')
                },
            ]
        },
        {
            path: 'agentes',
            name: 'agentes',
            component: () => import(/*wbpackChunkName: "aliados"*/'@/modules/dashboard/layouts/GeneralLayout.vue'),
            children:[
                {
                    path: '',
                    name: 'agentes-main',
                    component: () => import(/*wbpackChunkName: "panel_aliados"*/'@/modules/dashboard/views/agentes/Agentes.vue')
                },
            ]
        },
        {
            path: 'codigos',
            name: 'codigos',
            component: () => import(/*wbpackChunkName: "codigos"*/'@/modules/dashboard/layouts/GeneralLayout.vue'),
            children:[
                {
                    path: '',
                    name: 'codigos-main',
                    component: () => import(/*wbpackChunkName: "codigo-main"*/'@/modules/dashboard/views/codigos/Codigos.vue')
                },
            ]
        }
    ] 
}