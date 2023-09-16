// export const myAction = async ({commit}) => {

// }
import reddyApi from "@/api/reddyApi"
const api_key = 'c628a195-14c7-4876-a678-0811cef53830'

export const loginAdmin = async({commit}, user) =>{

    const headers = {
        "Content-Type": "application/json",
        "x-api-key": api_key,
    };
    try {
        const resp = await reddyApi.post('/auth/login_admin', user, { headers })
        const { data } = resp.data
        const { usuario, token } = data
        commit('loginUser', { usuario, token })
        return { ok:true }
    } catch (error) {
        console.log(error)
        return {ok:false, message: error}
    }
}

export const checkAuthentication = async ({commit}) => {
    let session = localStorage.getItem('session_back');
    session = JSON.parse(session);
    let token = null
    if (session != null){
        token = session.token;
    }
    if(token == null){
        commit('logout')
        return { ok: false, message: 'No hay token'}
    }

    const headers = {
        "Content-Type": "application/json",
        "x-api-key": api_key,
        token: token
    };
    let params = {
            token
    };

    try {
        const { data } = await reddyApi.post('/auth/login_admin_verify', params , { headers })
        const  { usuario } = data

        commit('loginUser', { usuario, token})

        return { ok:true }

    } catch (error) {
        commit('logout')
        return { ok: false, message: error.message}
    }
}