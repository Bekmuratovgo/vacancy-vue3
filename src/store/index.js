import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import valuteStore from './store-valute'

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      valuteStore
    },
    strict: process.env.DEBUGGING
  })

  return Store
})
