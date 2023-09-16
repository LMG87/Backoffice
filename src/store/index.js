import { createStore } from 'vuex'
import dashboard from '@/modules/dashboard/store'
import auth from '@/modules/auth/store'

const store = createStore({
  modules: {
    dashboard,
    auth
  }
})
export default store