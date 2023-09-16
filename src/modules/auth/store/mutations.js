// export const myMutation = (state) => {

// }

export const loginUser = (state, { usuario, token }) => {

    if (token) {
        state.token = token
        var session = {
            token,
            usuario
        };
        localStorage.removeItem('session_back')
        localStorage.setItem("session_back", JSON.stringify(session));
    }
    state.user = usuario
    state.status = 'authenticated'
}

export const logout = (state) => {
    state.user = null
    state.token = null
    state.status = 'not-authenticated'

    localStorage.clear
}