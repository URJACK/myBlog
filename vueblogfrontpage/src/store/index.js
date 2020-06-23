import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//针对userInfo变量的处理，如果userInfo不能被JSON对象化，也不会使得整个页面无法展现
let userInfoJsonObject = null;
try {
  userInfoJsonObject = JSON.parse(sessionStorage.getItem("userInfo"));
} catch (error) {
  console.log(error);
}

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token"),
    userInfo: userInfoJsonObject
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      localStorage.setItem("token", token);
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
      sessionStorage.setItem("userInfo", JSON.stringify(userInfo))
    },
    REMOVE_INFO: (state, token) => {
      state.token = ''
      state.userInfo = {}
      localStorage.removeItem("token")
      sessionStorage.removeItem("userInfo")
    }
  },
  getters: {
    getUser: state => {
      return state.userInfo
    }
  },
  actions: {
  },
  modules: {
  }
})
