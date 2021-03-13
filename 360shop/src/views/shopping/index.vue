<template>
  <div class="cart">
    <ul class="cart_top">
      <li class="cart1">
        <input type="checkbox" name="running" v-model="isCheckedAll" />
        <strong>全选</strong>
      </li>
      <li class="cart2">
        <strong>商品</strong>
      </li>
      <li class="cart3">
        <strong>属性</strong>
      </li>
      <li class="cart4">
        <strong>单价</strong>
      </li>
      <li class="cart5">
        <strong>数量</strong>
      </li>
      <li class="cart6">
        <strong>小计</strong>
      </li>
      <li class="cart7">
        <strong>操作</strong>
      </li>
    </ul>
    <p class="cart_p">360商城自营</p>
    <ul class="cart_center" v-for="item in productList" :key="item.id">
      <li class="cartCenter1">
        <input
          type="checkbox"
          :checked="item.selected"
          @click="changeSelectOne(!item.selected, item.id)"
        />
      </li>
      <li class="cartCenter2">
        <img :src="item.itemInfo.picture" />
        <a href="javascript:;">{{ item.itemInfo.title }}</a>
      </li>
      <li class="cartCenter3">
        <strong
          >分类：{{
            item.itemInfo.skuSpecificationValues[0].values[0].value
          }}</strong
        >
      </li>
      <li class="cartCenter4">
        <strong>￥{{ item.itemInfo.priceSale }}</strong>
      </li>
      <li class="cartCenter5">
        <button @click="changeNum(item.id, 1)" style="outline: none">+</button>
        <input type="text" :value="item.count" />
        <button
          @click="changeNum(item.id, -1, item.count + 1)"
          :disabled="item.count === 1"
          :class="item.count === 1 ? 'no' : ''"
          style="outline: none"
        >
          -
        </button>
      </li>
      <li class="cartCenter6">
        <strong>￥{{ item.itemInfo.priceSale * item.count }}</strong>
      </li>
      <li class="cartCenter7">
        <el-popconfirm
          title="这是一段内容确定删除吗？"
          @confirm="deleteOne(item.id)"
        >
          <el-button slot="reference">删除</el-button>
        </el-popconfirm>
        <!-- <strong @click="deleteOne(item.id)">删除</strong> -->
      </li>
    </ul>

    <ul class="cart_bottom">
      <li class="cartBottom1">
        <input type="checkbox" name="running" v-model="isCheckedAll" />
        <strong>全选</strong>
      </li>
      <li class="cartBottom2">
        <a href="javascript:;" @click="deleteCheckedAll">删除选中商品</a>
      </li>
      <li class="cartBottom3">
        <p>
          <span
            >已选<a class="num">{{ checkedNum }}</a
            >件商品</span
          >
          <span>合计：¥{{ totalPrice }}</span>
        </p>
        <p>已优惠：¥0</p>
      </li>
      <li class="cartBottom4">
        <a href="javascript:;">去结算</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ShopCart',
  data() {
    return {
      //总价格
      totalPrice: null,
      //商品总数
      totalNum: null,
      //购物车商品列表数据
      productList: [],
    }
  },
  async mounted() {
    this.getShopCart()
  },
  methods: {
    // 获取购物车列表数据
    async getShopCart() {
      const res = await this.$API.reqShopCart()
      // console.log(res);
      const { total, cartNum, carts } = res.data.data
      //保存相关数据
      this.totalPrice = total
      this.totalNum = cartNum
      this.productList = carts.itemInfos
    },
    //修改当个商品选中状态
    async changeSelectOne(falg, id) {
      const num = falg ? 1 : 0
      const obj = {
        [id]: {
          action: num,
          num: '1',
        },
      }
      this.$API
        .reqCheckedOne('select', JSON.stringify(obj))
        .then(() => {
          this.getShopCart()
        })
        .catch(() => {
          this.getShopCart()
        })
    },
    //删除当个商品
    async deleteOne(id) {
      const obj = {
        [id]: {
          action: -1,
          num: 1,
          promotionId: '',
        },
      }
      this.$API
        .reqDeleteOne('delete', JSON.stringify(obj))
        .then(() => {
          // console.log(res);
          this.getShopCart()
        })
        .catch(() => {
          this.getShopCart()
          // console.log(err);
          this.$message({
            type: 'success',
            message: '删除成功!',
          })
        })
    },

    //加减商品数量
    async changeNum(id, type, num) {
      const items = {
        [id]: {
          action: type,
          num: num + type,
          promotionId: '',
        },
      }
      this.$API
        .reqChangeProductNum('add', JSON.stringify(items))
        .then(() => {
          this.getShopCart()
        })
        .catch(() => {
          this.getShopCart()
        })
    },
    // 删除选中商品
    async deleteCheckedAll() {
      let obj = {
        null: {
          action: -1,
          num: null,
          promotionId: '',
        },
      }
      this.productList.forEach((item) => {
        if (item.selected) {
          obj[item.id] = { action: -1, num: 2, promotionId: '' }
        }
      })
      this.$API
        .reqDeleteOne('delete', JSON.stringify(obj))
        .then(() => {
          this.getShopCart()
        })
        .catch(() => {
          this.getShopCart()
          this.$message.success('删除成功')
        })
    },
  },
  computed: {
    //全选按钮
    isCheckedAll: {
      async set(val) {
        await this.$API.reqCheckedAll(val ? 'select_all' : 'cancel_all')
        this.getShopCart()
      },
      get() {
        console.log(this.productList)
        return this.productList.every((item) => item.selected)
      },
    },
    //已选商品数量
    checkedNum() {
      return this.productList.reduce((num, item) => {
        if (item.selected) {
          num += item.count
        }
        return num
      }, 0)
    },
  },
}
</script>

<style lang="less" scoped>
.cart {
  width: 1020px;
  margin: 20px auto;

  .cart_top {
    width: 100%;
    text-align: center;
    line-height: 50px;
    font-size: 14px;
    background-color: #fff;
    li {
      display: inline-block;
      strong {
        font-weight: 700;
      }
    }
    .cart1 {
      width: 5%;
      input {
        vertical-align: middle;
      }
      strong {
        vertical-align: middle;
      }
    }
    .cart2 {
      width: 35%;
    }
    .cart3 {
      width: 20%;
    }
    .cart4 {
      width: 10%;
    }
    .cart5 {
      width: 10%;
    }
    .cart6 {
      width: 10%;
    }
    .cart7 {
      width: 10%;
    }
  }
  .cart_p {
    font-size: 14px;
    font-weight: 700;
    padding: 10px 0 20px 30px;
  }
  .cart_center {
    width: 100%;
    height: 106px;
    font-size: 14px;
    background-color: #fff;
    display: flex;
    align-items: center;
    // text-align: center;
    border-bottom: 1px solid #ccc;
    .cartCenter1 {
      width: 5%;
      text-align: center;
      position: relative;
      ::before {
        content: '';
        width: 100%;
        height: 1px;
        background-color: #fff;
        position: absolute;
        bottom: -45px;
        left: 0;
      }
    }
    .cartCenter2 {
      width: 35%;
      overflow: hidden;
      img {
        width: 70px;
        height: 70px;
        float: left;
      }
      a {
        height: 70px;
        float: left;
        margin-left: 10px;
      }
    }
    .cartCenter3 {
      width: 20%;
      text-align: center;
    }
    .cartCenter4 {
      width: 10%;
      text-align: center;
    }
    .cartCenter5 {
      width: 10%;
      button {
        display: inline-block;
        width: 32px;
        height: 24px;
        border: 1px solid rgba(221, 221, 221, 1);
        vertical-align: middle;
        text-align: center;
        background-color: #fff;
        &.no {
          cursor: no-drop;
        }
      }
      input {
        width: 32px;
        height: 22px;
        border-top: 1px solid rgba(221, 221, 221, 1);
        border-bottom: 1px solid rgba(221, 221, 221, 1);
        border-right: 0;
        border-left: 0;
        vertical-align: middle;
        text-align: center;
      }
    }
    .cartCenter6 {
      width: 10%;
      text-align: center;
      color: red;
    }
    .cartCenter7 {
      width: 10%;
      text-align: center;
    }
  }
  .cart_bottom {
    width: 100%;
    text-align: center;
    line-height: 50px;
    font-size: 14px;
    background-color: #fff;
    margin-top: 20px;
    height: 70px;
    display: flex;
    align-items: center;
    position: relative;
    &::after {
      content: '';
      height: 2px;
      width: 100%;
      background-color: #fff;
      position: absolute;
      top: -22px;
      left: 0;
    }
    .cartBottom1 {
      width: 10%;
      text-align: left;
      padding-left: 20px;
      box-sizing: border-box;
      input {
        vertical-align: middle;
      }
      strong {
        vertical-align: middle;
        font-weight: 700;
      }
    }
    .cartBottom2 {
      width: 40%;
      text-align: left;
    }
    .cartBottom3 {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 30%;
      p:first-child {
        height: 20px;
        line-height: 20px;
        text-align: right;
        a {
          color: red;
        }
        span:last-child {
          color: red;
        }
      }
      p:last-child {
        height: 20px;
        line-height: 20px;
        text-align: right;
        color: #999;
        font-size: 12px;
      }
    }
    .cartBottom4 {
      width: 20%;
      a {
        display: inline-block;
        width: 160px;
        height: 50px;
        border-radius: 6px;
        line-height: 50px;
        font-size: 20px;
        color: #fff;
        box-sizing: border-box;
        background: linear-gradient(
          180deg,
          rgba(255, 51, 51, 1) 0,
          rgba(255, 102, 51, 1) 100%
        );
      }
    }
  }
}
</style>
