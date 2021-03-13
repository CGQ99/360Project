<template>
  <div>
    <div class="header">
      <div class="topheight"></div>
      <div class="top">
        <div class="top-top">
          <div class="top-left">
            <span>帮助中心</span>
            <span>收藏</span>
            <span>360官网</span>
            <span>360智慧生活</span>
          </div>
          <div class="top-right">
            <!-- <span> 注册</span> -->
            <!-- 登录 -->
            <span v-if="!userInfo.username && !userInfoList.username">
              <el-button
                style="margin-right: 28px;color:#fff"
                type="text"
                @click="dialogFormVisible = true"
                >登录</el-button
              >
              <el-dialog
                title="登录"
                :visible.sync="dialogFormVisible"
                :append-to-body="true"
                custom-class="dialog"
              >
                <el-form :model="form">
                  <el-form-item label="登录方式">
                    <el-radio-group v-model="form.resource" size="medium">
                      <el-radio border label="密码登录"></el-radio>
                      <el-radio border label="验证码登录"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <div v-if="form.resource == '密码登录'">
                    <el-form-item :label-width="formLabelWidth">
                      <el-input
                        placeholder="手机号/用户名/邮箱"
                        v-model="form.username"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item>
                    <el-form-item :label-width="formLabelWidth">
                      <el-input
                        placeholder="密码"
                        v-model="form.password"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item>
                  </div>
                  <div v-else>
                    <el-form-item :label-width="formLabelWidth">
                      <el-input
                        placeholder="手机号/用户名/邮箱"
                        v-model="form.username"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item>
                    <el-form-item
                      :label-width="formLabelWidth"
                      class="codeclass"
                    >
                      <el-input
                        placeholder="验证码"
                        v-model="form.password"
                        autocomplete="off"
                      ></el-input>
                      <a
                        href="javascript:;"
                        class="getcode"
                        @click="getCode"
                        v-if="time === 60"
                        >获取验证码</a
                      >
                      <a href="javascript:;" class="getcode" v-else
                        >({{ time }})秒后发送</a
                      >
                    </el-form-item>
                  </div>
                  <el-button type="primary" @click="codeLogin">登录</el-button>
                </el-form>
              </el-dialog>

              <el-button
                type="text"
                @click="dialogFormRegister = true"
                style="color:#fff"
                >注册</el-button
              >
              <el-dialog
                title="手机号注册"
                :visible.sync="dialogFormRegister"
                :append-to-body="true"
                custom-class="dialog"
              >
                <el-form :model="formRegister">
                  <el-form-item :label-width="formLabelWidth">
                    <el-input
                      placeholder="手机号"
                      v-model="formRegister.username"
                      autocomplete="off"
                    ></el-input>
                  </el-form-item>
                  <el-form-item :label-width="formLabelWidth">
                    <el-input
                      placeholder="密码"
                      v-model="formRegister.password"
                      autocomplete="off"
                    ></el-input>
                  </el-form-item>
                  <el-button type="primary" @click="submitRegister"
                    >注册</el-button
                  >
                </el-form>
              </el-dialog>
            </span>

            <span v-else class="loginpull-down"
              >{{ userInfoList.username }}
              <div class="down">
                <div class="name">{{ userInfoList.username }}</div>
                <div>我的会员</div>
                <div>
                  <router-link to="/myIfo" style="outline: none"
                    >我的订单</router-link
                  >
                </div>
                <div>我的优惠券</div>
                <div>我的收藏</div>
                <div>我的积分</div>
                <div>我的预约</div>
                <div>收货地址</div>
                <div>帐号设置</div>
                <div @click="logOut">退出登录</div>
              </div>
            </span>
            <span>360手机商城</span>
            <span
              ><img src="./image/shop.jpg" alt="" @click="toShopCart"
            /></span>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="bottom-bottom">
          <div class="bottom-left">
            <span>
              <router-link to="/"
                ><img
                  src="https://p.ssl.qhimg.com/t0102789b8d00c3dfce.png"
                  alt=""
              /></router-link>
            </span>
            <span>新品推荐</span>
            <span>热卖</span>
            <span>社区</span>
          </div>
          <div class="bottom-right">
            <div class="search-bar">
              <input
                type="text"
                class="ipt"
                v-model="key_word"
                @keyup.enter="toSearch"
              />
              <i class="iconfont icon-sousuo" @click="toSearch()"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Heater",
  data() {
    return {
      key_word: "",
      dialogFormVisible: false,
      dialogFormRegister: false,
      form: {
        username: "",
        password: "",
        resource: "密码登录"
      },
      formRegister: {
        username: "",
        password: ""
      },
      formLabelWidth: "0",
      userInfo: {},
      //倒计时时间
      time: 60
    };
  },
  created() {
    this.$parent.msg = 456;
  },
  mounted() {
    this.$bus.$on("showLogin", () => {
      this.dialogFormVisible = true;
    });
  },
  computed: {
    ...mapState({
      userInfoList: state => state.userInfo
    })
  },
  methods: {
    // 跳转到搜索页面
    toSearch() {
      this.$router.push({
        name: "search",
        params: { key_word: this.key_word }
      });
    },
    //登录
    async submitLogin() {
      this.dialogFormVisible = false;
      const { username, password } = this.form;
      const res = await this.$API.reqLogin(username, password);
      if (res.data.code === 200) {
        this.$message.success("恭喜你登录成功");
        this.userInfo = res.data;
        this.$store.dispatch("getUserInfo");
      } else {
        this.$message.error(res.data.msg);
      }
    },
    //注册
    async submitRegister() {
      this.dialogFormRegister = false;
      const { username, password } = this.formRegister;
      const res = await this.$API.reqRegister(username, password);
      if (res.data.code === 200) {
        this.$message("恭喜你注册成功");
      }
    },
    // 点击退出登录
    logOut() {
      this.delCookie("T");
      this.delCookie("Q");
      location.reload();
    },

    toShopCart() {
      if (this.userInfoList.username) {
        this.$router.push("/shopCart");
      } else {
        this.dialogFormVisible = true;
      }
    },
    //获取验证码
    async getCode() {
      // console.log(1);
      //获取验证码
      const res = await this.$API.reqCode(this.form.username);
      console.log(res);
      if (res.data.code === 200) {
        this.$message.success("验证码发送成功");
      }
      //开启定时器
      this.timeId = setInterval(() => {
        this.time--;
        if (this.time === 1) {
          clearInterval(this.timeId);
          this.time = 60;
        }
      }, 1000);
    },
    //验证码登录
    async codeLogin() {
      const res = await this.$API.reqCodeLogin(
        this.form.username,
        this.form.password
      );
      console.log(res);
      if (res.data.code === 200) {
        this.$message.success("登录成功");
        this.dialogFormVisible = false;
        this.userInfo = res.data;
        this.$store.dispatch("getUserInfo");
      } else if (res.data.code === 400) {
        this.$message.error("验证码错误，请重新输入");
      } else {
        this.$message.error("登录失败，请重新登录");
        this.dialogFormVisible = false;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.header {
  width: 100%;
  .topheight {
    height: 40px;
    background-color: #333;
  }
  .bottom {
    width: 100%;
    background-color: #fff;
    font-size: 14px;
    color: #000;
    border-bottom: 1px solid;
    .bottom-bottom {
      height: 100px;
      margin: 0 auto;
      max-width: 1240px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .bottom-right {
        width: 420px;
        height: 36px;
        border: 1px solid #ccc;
        border-radius: 18px;
        .search-bar {
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          padding: 5px 30px;
          position: relative;
          .iconfont {
            font-size: 20px;
          }
          .ipt {
            background: transparent;
            height: 24px;
            outline: none;
            padding: 0;
            width: 340px;
            border: 0;
          }
        }
      }
      .bottom-left {
        width: 515px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 18px;
        img {
          width: 180px;
        }
      }
    }
  }
  .top {
    position: fixed;
    width: 100%;
    background-color: #333;
    font-size: 14px;
    color: #fff;
    top: 0;
    right: 0;
    margin-bottom: 40px;
    z-index: 999;
    .top-top {
      font-size: 12px;
      height: 40px;
      margin: 0 auto;
      max-width: 1240px;
      display: flex;
      justify-content: space-between;
      .top-left {
        width: 280px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .top-right {
        width: 240px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .loginpull-down {
          position: relative;
          &:hover {
            .down {
              display: flex;
            }
          }
          .down {
            width: 120px;
            height: 300px;
            top: -8px;
            left: -43px;
            border: 1px solid #fff;
            border-radius: 5px;
            position: absolute;
            background-color: #fff;
            display: none;
            font-size: 12px;
            flex-direction: column;
            align-items: center;
            color: rgb(102, 102, 102);
            justify-content: space-around;
            div {
              cursor: pointer;
            }
            .name {
              color: #999;
              font-weight: 700;
            }
          }
        }
      }
    }
  }
}
</style>
