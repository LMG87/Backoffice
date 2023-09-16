import { ref } from 'vue'
import { useStore } from 'vuex'

const useAliados = (session) => {

    const store = useStore()

    const total_aliados = ref(0)
    const loading = ref(false)
    const chart_aliados = ref({
        options: {
            plotOptions: {
                bar: {
                    borderRadius: 10,
                    distributed: true,
                },
            },
            legend: {
                show: false,
            },
            xaxis: {
                categories: ["Interesados", "Pendientes", "Exitosas", "Completas"],
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
            },
            colors: ["#6296FE", "#FF4D4D", "#FFC100", "#39BB00"],
        },
        series: [
            {
                name: "Aliados",
                data: [0, 0, 0, 0],
            },
        ],
    })

    const get_resumen_aliados = async (params) => {
        loading.value = true
        const resp = await store.dispatch('dashboard/getResumenAliados', [params, session.token])
        total_aliados.value = resp.data.data.total;
        chart_aliados.value.series[0].data = resp.data.data.chart;
        loading.value = false;
    }

    const get_chart_data = async () => {
        loading.value = true
        const resp = await store.dispatch('dashboard/get_chart_data',  session.token)
        loading.value = false;
        return resp
    }

    const get_chart_mes_data = async (params) => {
        loading.value = true
        const resp = await store.dispatch('dashboard/get_chart_mes_data', [params, session.token])
        loading.value = false;
        return resp
    }

    const get_aliado = async (id) => {
        loading.value = true
        const resp = await store.dispatch('dashboard/get_aliado', [id, session.token])
        loading.value = false;
        return resp
    }

    const get_aliado_anexos = async (id) => {
        loading.value = true
        const resp = await store.dispatch('dashboard/get_aliado_anexos', [id, session.token])
        loading.value = false;
        return resp
    }

    const get_tipos_alianzas = async () => {
        const resp = await store.dispatch('dashboard/getTiposAlianzas', session.token)
        return resp
    }

    const get_sucursales = async () => {
        const resp = await store.dispatch('dashboard/getSucursales', session.token)
        return resp
    }

    const get_tipos_descuentos = async () => {
        const resp = await store.dispatch('dashboard/getTiposDescuentos', session.token)
        return resp
    }

    const get_categorias = async () => {
        const resp = await store.dispatch('dashboard/getCategorias', session.token)
        return resp
    }

    const get_agentes = async () => {
        const resp = await store.dispatch('dashboard/getAgentes', session.token)
        return resp
    }

    return {
        chart_aliados,
        get_resumen_aliados,
        get_aliado,
        get_aliado_anexos,
        get_agentes,
        get_chart_mes_data,
        get_chart_data,
        get_categorias,
        get_sucursales,
        get_tipos_alianzas,
        get_tipos_descuentos,
        loading,
        total_aliados,
    }
}

export default useAliados