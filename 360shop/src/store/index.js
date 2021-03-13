import Vue from "vue";
import Vuex from "vuex";
import { reqUserInfo } from "../api/index";
Vue.use(Vuex);

import modules from './modules/index'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //用户信息对象
    userInfo: {}
  },
  mutations: {
    UPDATE_USERINFO(state, userInfo) {
      state.userInfo = userInfo;
    }
  },
  actions: {
    async getUserInfo({ commit }) {
      const res = await reqUserInfo();
      // console.log(res);
      commit("UPDATE_USERINFO", res.data);
    }
  },
  modules
})
