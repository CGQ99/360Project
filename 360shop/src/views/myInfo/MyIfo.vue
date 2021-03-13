<template>
  <!--个人成长信息 -->
  <div class="moddle_border">
    <!-- 左侧 -->
    <div class="moddle_left">
      <!-- 个人中心 -->
      <div class="allStyle">
        <div class="monu_title">个人中心</div>
        <!-- <a class="monu_item" @click="goUserInfo">个人成长信息</a> -->
        <router-link class="monu_item" to="/myIfo/userinfo"
          >个人成长信息</router-link
        >
        <!-- <a class="monu_item" href="javascript">收货地址</a> -->
        <router-link class="monu_item" to="/myIfo/address"
          >收货地址</router-link
        >
      </div>
      <!-- 订单中心 -->
      <div class="allStyle">
        <div class="monu_title">订单中心</div>
        <a class="monu_item" href="javascript">我的订单</a>
      </div>
      <!-- 我的钱包 -->
      <div class="allStyle">
        <div class="monu_title">我的钱包</div>
        <a class="monu_item" href="javascript">我的优惠券</a>
        <a class="monu_item" href="javascript">我的积分</a>
      </div>

      <!-- 我的关注 -->
      <div class="allStyle">
        <div class="monu_title">我的关注</div>
        <a class="monu_item" href="javascript">我的收藏</a>
        <a class="monu_item" href="javascript">我的预约</a>
      </div>
      <!-- 售后服务 -->
      <div class="allStyle">
        <div class="monu_title">售后服务</div>
        <a class="monu_item" href="javascript">退货记录</a>
        <a class="monu_item" href="javascript">换货记录</a>
      </div>
    </div>
    <!-- 右侧 -->
    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script src="./css/iconfont.js">

export default {
  name: "MyIfo",
  methods:{
    goUserInfo(){
      this.$router.replace({
        path:'/myIfo/:name?/userinfo',
        params:{
          name:"xiaohong"
        }
      })
    }
  }
};
</script>

<style scoped>
.moddle_border {
  padding-top: 20px;
}
a {
  text-decoration: none;
}
.moddle_border > .right {
  margin-left: 20px;
  width: 1000px;
  background-color: aliceblue;
}
/* 中间 */
.moddle_border {
  width: 1240px;
  margin: 0 auto;
  display: flex;
  /* justify-content: space-between; */
}
.moddle_left {
  display: flex;
  background: rgb(255, 255, 255);
  color: rgb(51, 51, 51);
  padding: 15px;
  text-align: center;
  width: 150px;
  /* border: 1px solid #666; */
  flex-direction: column;
}
.allStyle {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border-bottom: 1px solid #666;
}
.monu_title {
  font-size: 14px;
  color: #333;
  height: 30px;
  line-height: 30px;
  font-weight: bold;
}
.monu_item {
  height: 30px;
  display: block;
  line-height: 30px;
  margin: 5px 0;
  font-size: 12px;
  color: #666;
  text-decoration: none;
}
</style>
