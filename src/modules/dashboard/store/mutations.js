// export const myMutation = (state) => {

// }

export const setAliados = (state, aliados) => {
    state.aliados = [ ...aliados ]
}

export const setAliado = (state, aliado) => {
    state.aliado = aliado
}

export const setAlianza = (state, alianza) => {
    state.alianza = alianza
}

export const setAliadoAnexos = (state, aliadoAnexos) => {
    state.aliadoAnexos = aliadoAnexos
}

export const setAgentes = (state, agentes) => {
    state.agentes = [ ...agentes ]
}

export const setTiposAlianzas = (state, tipos_alianzas) => {
    state.tipos_alianzas = [ ...tipos_alianzas ]
}

export const setTiposDescuentos = (state, tipos_descuentos) => {
    state.tipos_descuentos = [ ...tipos_descuentos ]
}

export const setCategorias = (state, categorias) => {
    state.categorias = [ ...categorias ]
}

export const setSucursales = (state, sucursales) => {
    state.sucursales = [ ...sucursales ]
}