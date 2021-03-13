<template>
  <div class="rightlan">
    <div class="lan_center">
      <a href="javascript:;" class="iconfont icon-xiaoxi">
        <strong>意见反馈</strong>
      </a>
      <a href="javascript:;" class="iconfont icon-weixin">
        <div>
          <img src="./images/ewm.png" alt="" />
          <strong>关注公众号</strong>
        </div>
      </a>
      <a href="javascript:;" class="iconfont icon-kefu">
        <strong>在线客服</strong>
      </a>
    </div>
    <div class="lan_bottom">
      <a href="javascript:;" class="iconfont icon-erweima"></a>
      <a
        href="javascript:;"
        class="iconfont icon-fanhuidingbu"
        @click="goTop"
        :style="{ display: type }"
      >
        <strong>回到顶部</strong></a
      >
    </div>
  </div>
</template>
<script>
export default {
  name: "RightLan",
  data() {
    return {
      type: "none"
    };
  },
  methods: {
    goTop() {
      document.documentElement.scrollTop = 0;
    }
  },
  mounted() {
    window.addEventListener("scroll", () => {
      let scroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (scroll >= 800) {
        this.type = "block";
      } else {
        this.type = "none";
      }
    });
  }
};
</script>
<style scoped>
.rightlan {
  position: fixed;
  right: 0;
  top: 0;
  height: 100%;
  width: 39px;
  background-color: #fff;
  border: 1px solid #e7e7e7;
  z-index: 998;
  color: red;
}
.rightlan .lan_center {
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  transform: translate(-50%, -50%);
  flex-direction: column;
}
.rightlan .lan_center a {
  font-size: 22px;
  margin: 5px 0;
}
.rightlan .lan_center a:first-child {
  position: relative;
}
.rightlan .lan_center a:first-child strong {
  background-color: #fff;
  position: absolute;
  width: 80px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  box-shadow: 0 0 4px 0 rgb(0 0 0 / 50%);
  left: -90px;
  font-size: 12px;
  display: none;
}
.rightlan .lan_center a:first-child:hover strong {
  display: inline-block;
  color: #000;
}
.rightlan .lan_center a:nth-of-type(2) {
  position: relative;
}
.rightlan .lan_center a:nth-of-type(2) div {
  position: absolute;
  width: 110px;
  left: -120px;
  top: -80px;
  background-color: #fff;
  text-align: center;
  display: flex;
  box-shadow: 0 0 4px 0 rgb(0 0 0 / 50%);
  flex-direction: column;
  display: none;
}
.rightlan .lan_center a:nth-of-type(2):hover div {
  display: inline-block;
  color: #000;
  font-size: 12px;
}
.rightlan .lan_center a:nth-of-type(3) {
  position: relative;
}
.rightlan .lan_center a:nth-of-type(3) strong {
  background-color: #fff;
  position: absolute;
  width: 80px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  box-shadow: 0 0 4px 0 rgb(0 0 0 / 50%);
  left: -90px;
  font-size: 12px;
  display: none;
}
.rightlan .lan_center a:nth-of-type(3):hover strong {
  display: inline-block;
  color: #000;
}
.rightlan .lan_bottom a:nth-of-type(2) {
  position: relative;
}
.rightlan .lan_bottom a:nth-of-type(2) strong {
  background-color: #fff;
  position: absolute;
  width: 80px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  box-shadow: 0 0 4px 0 rgb(0 0 0 / 50%);
  left: -90px;
  font-size: 12px;
  display: none;
}
.rightlan .lan_bottom a:nth-of-type(2):hover strong {
  display: inline-block;
  color: #000;
}
/* .rightlan .lan_center a:hover strong {
  display: ;
} */
.rightlan .lan_bottom {
  position: absolute;
  bottom: 10%;
  left: 50%;
  display: flex;
  transform: translate(-50%, -50%);
  flex-direction: column;
}
.rightlan .lan_bottom a {
  font-size: 22px;
  margin: 5px 0;
}
</style>
