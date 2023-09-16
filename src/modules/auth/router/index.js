export default{
    name: 'auth',
    component: () => import(/*WebpackChunkName: "auth" */ '@/modules/auth/layouts/AuthLayout.vue'),
    children:[
        {
            path: '',
            name: 'login',
            component: () => import(/*wbpackChunkName: "login"*/'@/modules/auth/views/Login.vue')
        }
    ] 
}