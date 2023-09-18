// export const myAction = async ({commit}) => {

// }
import reddyApi from "@/api/reddyApi"
const api_key = 'c628a195-14c7-4876-a678-0811cef53830'

export const getResumenAliados = async(_,[params,token]) =>{
    const headers = {
        "Content-Type": "application/json",
        "x-api-key": api_key,
        token: token,
    };
    let config = {
        headers,
        params
    };
    try {
        const { data } = await reddyApi.get('/aliados/resumen_aliados', config , { headers })
        return { ok:true, data: data}
    } catch (error) {
        return { ok: false, message: error.message}
    }
}

export const get_chart_data = async(_,token) => {
    const headers = {
        "Content-Type": "application/json",
        "x-api-key": api_key,
        token: token,
    };
    let config = {
        headers,
        params: {
        }
    };
    try {
        const { data } = await reddyApi.get('/aliados/chart_aliados_agentes', config , { headers })
        return { ok:true, data: data}
    } catch (error) {
        return { ok: false, message: error.message}
    }
}
export const get_chart_mes_data = async(_,[params,token]) => {
    const headers = {
        "Content-Type": "application/json",
        "x-api-key": api_key,
        token: token,
    };
    let config = {
        headers,
        params
    };
    try {
        const { data } = await reddyApi.get('/aliados/chart_aliados_agentes_mes', config , { headers })
        return { ok:true, data: data}
    } catch (error) {
        return { ok: false, message: error.message}
    }
}

export const getAliados = async({commit}, [params,token]) => {
    const headers = {
        "Content-Type": "application/json",
        "x-api-key": api_key,
        token: token,
    };
    let config = {
        headers,
        params
    };
    
    try {
        const { data } = await reddyApi.get('/aliados/aliados', config , { headers })
        const { aliados } = data.data
        commit('setAliados', aliados)
        return { ok:true, data: data}
    } catch (error) {
        commit('setAliados', [])
        return { ok: false, message: error.message}
    }
}

export const get_aliado = async ({commit}, [id, token]) => {
    const headers = {
        "Content-Type": "application/json",
        "x-api-key": api_key,
        token: token,
    };
    let config = {
        headers: headers,
    };
    try {
        const { data } = await reddyApi.get('/aliados/aliado/'+id, config , { headers })
        const aliado = data.data
        commit('setAliado', aliado)
        if (aliado.alianza != null) {
            commit('setAlianza', aliado.alianza)
        }else{
            commit('setAlianza', [])
        }
        return { ok:true, data: data}
    } catch (error) {
        commit('setAliado', [])
        commit('setAlianza', [])
        return { ok: false, message: error.message}
    }
}

export const get_aliado_anexos = async ({commit}, [id, token]) => {
    const headers = {
        "Content-Type": "application/json",
        "x-api-key": api_key,
        token: token,
    };
    let config = {
        headers: headers,
    };
    try {
        const { data } = await reddyApi.get('/aliados/anexos_ficha/'+id, config , { headers })
        const { anexos } = data.data
        commit('setAliadoAnexos', anexos)
        return { ok:true, data: data}
    } catch (error) {
        commit('setAliadoAnexos', [])
        return { ok: false, message: error.message}
    }
}

export const getAliadosImp = async(_, [params,token]) => {
    const headers = {
        "Content-Type": "application/json",
        "x-api-key": api_key,
        token: token,
    };
    let config = {
        headers,
        params
    };
    
    try {
        const { data } = await reddyApi.get('/aliados/aliados', config , { headers })
        return { ok:true, data: data}
    } catch (error) {
        return { ok: false, message: error.message}
    }
}

export const getTiposAlianzas = async({commit}, token) =>{
    const headers = {
        "Content-Type": "application/json",
        "x-api-key": api_key,
        token: token,
    };
    let config = {
        headers: headers,
    };
    try {
        const { data } = await reddyApi.get("admin/tipos_alianzas", config, {headers})
        const {tipos_alianzas} = data.data
        commit('setTiposAlianzas', tipos_alianzas)
        return { ok:true, data: tipos_alianzas}
    } catch (error) {
        commit('setTiposAlianzas', [])
        return { ok: false, message: error.message}
    }
}

export const getTiposDescuentos = async({commit}, token) =>{
    const headers = {
        "Content-Type": "application/json",
        "x-api-key": api_key,
        token: token,
    };
    let config = {
        headers: headers,
    };
    try {
        const { data } = await reddyApi.get("admin/tipos_descuentos", config, {headers})
        const {tipos_descuento} = data.data
        commit('setTiposDescuentos', tipos_descuento)
        return { ok:true, data: tipos_descuento}
    } catch (error) {
        commit('setTiposDescuentos', [])
        return { ok: false, message: error.message}
    }
} 

export const getSucursales = async({commit}, token) =>{
    const headers = {
        "Content-Type": "application/json",
        "x-api-key": api_key,
        token: token,
    };
    let config = {
        headers: headers,
    };
    try {
        const { data } = await reddyApi.get("admin/sucursales", config, {headers})
        const {sucursales} = data.data
        commit('setSucursales', sucursales)
        return { ok:true, data: sucursales}
    } catch (error) {
        commit('setSucursales', [])
        return { ok: false, message: error.message}
    }
}

export const getCategorias = async({commit}, token) =>{
    const headers = {
        "Content-Type": "application/json",
        "x-api-key": api_key,
        token: token,
    };
    let config = {
        headers: headers,
    };
    try {
        const { data } = await reddyApi.get("admin/categorias", config, {headers})
        const {categorias} = data.data
        commit('setCategorias', categorias)
        return { ok:true, data: categorias}
    } catch (error) {
        commit('setCategorias', [])
        return { ok: false, message: error.message}
    }
}

export const getAgentes = async({commit}, token) => {
    const headers = {
        "Content-Type": "application/json",
        "x-api-key": api_key,
        token: token,
    };
    let config = {
        headers: headers,
        params:{
            agentes: 1
        }
    };
    try {
        const { data } = await reddyApi.get("admin/usuarios", config, {headers})
        const {usuarios} = data.data
        commit('setAgentes', usuarios)
        return { ok:true, data: usuarios}
    } catch (error) {
        commit('setAgentes', [])
        return { ok: false, message: error.message}
    }
} 