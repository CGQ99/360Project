const state = {
  tableData: [
    {
      name: "赵三彪", //收集的姓名
      region: ["北京", "北京市", "海淀"], //所在地
      desc: "北京市海淀区", //收货地址
      tele: "13062118834", //电话
      isMoRen: true,
      id: 1
    },
    {
      name: "王二虎", //收集的姓名
      region: ["广东", "深圳", "宝安"], //所在地
      desc: "广东宝安", //收货地址
      tele: "13687956513", //电话
      isMoRen: false,
      id: 2
    }
  ]
}
const mutations = {
  addAddress(state, obj) {
    state.tableData.push(obj)
  },
  // 编辑
  updatedAddress(state, obj) {
    //为什么不能解构obj然后直接赋值给item？？？？？ 
    state.tableData.forEach((item) => {
      if (item.id === obj.id) {
        /*  for (var k in obj) {
           item[k] = obj[k];
         } */
        item = { ...obj }
      }
    })
  },
  deleAddress(state, id) {
    state.tableData = state.tableData.filter((item) => item.id !== id)
  }
}
const actions = {
  getAddress({ commit, state }, obj) {
    // console.log('obj', obj)
    if (obj.id) {
      commit('updatedAddress', obj)
      // console.log(333)
    } else {
      let id;
      if (!state.tableData.length) {
        id = 1
      } else {
        const upId = state.tableData[state.tableData.length - 1].id
        id = upId + 1

      }
      // console.log("id", id)
      obj = {
        id,
        ...obj
      }
      commit('addAddress', obj)
    }

  },
  dele({ commit }, id) {
    commit('deleAddress', id)
  }
}
const getters = {}
export default {
  state,
  mutations,
  actions,
  getters
}