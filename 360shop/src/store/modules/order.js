import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const state = {
  userAddressList: [
    {
      id: 1,
      name: "张三",
      phone: "13000000000",
      address: "星星小区6号楼",
      detail: "广东省 北京市 东城区 "
    },
    {
      id: 2,
      name: "李四",
      phone: "13788886666",
      province: 440000,
      address: "西部硅谷大厦",
      detail: "广东省 深圳市 宝安区 "
    }
  ]
};
const mutations = {
  RECEIVE_ADD(state, obj) {
    state.userAddressList.push(obj);
  },
  updateAdd(state, obj) {
    //为什么不能解构obj然后直接赋值给item？？？？？
    state.userAddressList = state.userAddressList.map(item => {
      if (item.id == obj.id) {
        item = obj;
      }
      return item;
    });
  },
  deleAddress(state, id) {
    state.userAddressList = state.userAddressList.filter(
      item => item.id !== id
    );
  }
};
const actions = {
  getAdd({ commit, state }, obj) {
    if (obj.id) {
      commit("updateAdd", obj);
    } else {
      let id;
      if (!state.userAddressList.length) {
        id = 1;
      } else {
        const upId = state.userAddressList[state.userAddressList.length - 1].id;
        id = upId + 1;
      }
      obj = {
        id,
        ...obj
      };
      commit("RECEIVE_ADD", obj);
    }
  },
  dele({ commit }, id) {
    commit("deleAddress", id);
  }
};
// const mutations = {
//   addAddress(state, obj) {
//     state.tableData.push(obj)
//   },
//   updatedAddress(state, obj) {
//     //为什么不能解构obj然后直接赋值给item？？？？？
//     state.tableData.forEach((item) => {
//       console.log(state.tableData, 1)
//       if (item.id === obj.id) {
//         for (var k in obj) {
//           item[k] = obj[k];
//         }
//       }
//     })
//   },
//   deleAddress(state, id) {
//     state.tableData = state.tableData.filter((item) => item.id !== id)
//   }
// }
// const actions = {
//   getAddress({ commit, state }, obj) {
//     // console.log('obj', obj)
//     if (obj.id) {
//       commit('updatedAddress', obj)
//       // console.log(333)
//     } else {
//       let id;
//       if (!state.tableData.length) {
//         id = 1
//       } else {
//         const upId = state.tableData[state.tableData.length - 1].id
//         id = upId + 1

//       }
//       // console.log("id", id)
//       obj = {
//         id,
//         ...obj
//       }
//       commit('addAddress', obj)
//     }

//   },
//   dele({ commit }, id) {
//     commit('deleAddress', id)
//   }
// }
export default {
  state,
  mutations,
  actions
};
