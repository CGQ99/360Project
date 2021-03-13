<template>
  <div class="moddle_right">
    <div class="right_herder">
      <!-- 头像 -->
      <div class="userInfo">
        <div class="user_img">
          <img src="./images/title.jpg" alt="" />
        </div>

        <div class="user_zuan_name">
          <svg class="icon ">
            <use xlink:href="#icon-vip1"></use>
          </svg>
          <div><span>青铜</span></div>
          <!-- <img class="user_zuan" src="./images/zuan.png" alt="" /> -->
        </div>
        <div>360游客</div>

        <div class="user_privilege">
          <div class="user_show_privilege">
            <p class="p1">360黑金会员</p>
            <p class="p2">尊享特权</p>
          </div>
          <a class="open_vip" href="javascript">立即开通</a>
        </div>
      </div>
      <!-- vip等级 -->
      <div class="vip_grade">
        <div class="red_line">
          <div class="circle">
            <div class="circle_heard"></div>
          </div>
        </div>
        <div class="top">
          <div class="top_span">
            <span>当前成长值：<i>100</i></span>
          </div>
          <div class="num ">
            <span>距离升级还需要900成长值</span>
          </div>
        </div>
        <div class="moddle">
          <svg class="icon ">
            <use xlink:href="#icon-vip1"></use>
          </svg>
          <svg class="icon ">
            <use xlink:href="#icon-vip2"></use>
          </svg>
          <svg class="icon ">
            <use xlink:href="#icon-vip3"></use>
          </svg>
          <svg class="icon ">
            <use xlink:href="#icon-vip4"></use>
          </svg>
        </div>
        <div class="bottom">
          <div>
            <p>青铜</p>
            <p>0</p>
          </div>
          <div>
            <p>白银</p>
            <p>1000</p>
          </div>
          <div>
            <p>黄金</p>
            <p>8000</p>
          </div>
          <div>
            <p>钻石</p>
            <p>20000</p>
          </div>
        </div>
      </div>
    </div>
    <div class="right_bottom">
      <div class=" right_bottom_left">
        <h3>什么是成长值？</h3>
        <div>
          <p>
            成长值为360会员等级升级的依据，成长值越高会员等级越高，可享受的会员权益越大。成长值有效期永久有效
            。
          </p>
          <p>
            消费、APP下载登录、参与活动、完成任务等均可获得成长值，并加速360会员等级升级。会员可跨级升级，钻石360会员为最高等级，不再升级。
          </p>
          <p>
            会员升级判定日为每天24点，判定成长值的周期为用户注册日开始判定；
          </p>
          <p>
            互动类任务，如分享收益、分享有礼、下载并登陆APP、参与抽奖、领券等活动，成长值实时发放。
          </p>
          <p>
            消费类任务，如购物奖励、拼团、秒杀、限时购、砍价等活动，成长值在确认收货7天后发放
          </p>
        </div>
        <h3>会员等级说明及权益对比</h3>
        <div class="grow_table">
          <table>
            <tbody>
              <tr>
                <th style="width: 24%">&nbsp;</th>
                <th>
                  <svg class="icon ">
                    <use xlink:href="#icon-vip1"></use>
                  </svg>
                  <br />
                  青铜
                </th>
                <th>
                  <svg class="icon ">
                    <use xlink:href="#icon-vip2"></use>
                  </svg>
                  <br />
                  青铜
                </th>
                <th>
                  <svg class="icon ">
                    <use xlink:href="#icon-vip3"></use>
                  </svg>
                  <br />
                  青铜
                </th>
                <th>
                  <svg class="icon ">
                    <use xlink:href="#icon-vip4"></use>
                  </svg>
                  <br />
                  青铜
                </th>
              </tr>
              <tr>
                <td style="width: 24%">成长值</td>
                <td>0~999</td>
                <td>1000~7999</td>
                <td>8000~19999</td>
                <td>20000以上</td>
              </tr>
              <tr>
                <td style="width: 24%">活动短信推荐</td>
                <td>
                  <img
                    src="https://p0.ssl.qhimg.com/t01476a8c8aee51ab3c.png"
                    alt=""
                  />
                </td>
                <td>
                  <img
                    src="https://p0.ssl.qhimg.com/t01476a8c8aee51ab3c.png"
                    alt=""
                  />
                </td>
                <td>
                  <img
                    src="https://p0.ssl.qhimg.com/t01476a8c8aee51ab3c.png"
                    alt=""
                  />
                </td>
                <td>
                  <img
                    src="https://p0.ssl.qhimg.com/t01476a8c8aee51ab3c.png"
                    alt=""
                  />
                </td>
              </tr>
              <tr>
                <td style="width: 24%">新品推送</td>
                <td>
                  <img
                    src="https://p5.ssl.qhimg.com/t01b14852a3d92254cb.png"
                    alt=""
                  />
                </td>
                <td>
                  <img
                    src="https://p0.ssl.qhimg.com/t01476a8c8aee51ab3c.png"
                    alt=""
                  />
                </td>
                <td>
                  <img
                    src="https://p0.ssl.qhimg.com/t01476a8c8aee51ab3c.png"
                    alt=""
                  />
                </td>
                <td>
                  <img
                    src="https://p0.ssl.qhimg.com/t01476a8c8aee51ab3c.png"
                    alt=""
                  />
                </td>
              </tr>
              <tr>
                <td style="width: 24%">新品发布会邀约</td>
                <td>
                  <img
                    src="https://p5.ssl.qhimg.com/t01b14852a3d92254cb.png"
                    alt=""
                  />
                </td>
                <td>
                  <img
                    src="https://p5.ssl.qhimg.com/t01b14852a3d92254cb.png"
                    alt=""
                  />
                </td>
                <td>
                  <img
                    src="https://p5.ssl.qhimg.com/t01b14852a3d92254cb.png"
                    alt=""
                  />
                </td>
                <td>
                  <img
                    src="https://p5.ssl.qhimg.com/t01b14852a3d92254cb.png"
                    alt=""
                  />
                </td>
              </tr>
              <tr>
                <td style="width: 24%">积分奖励倍率</td>
                <td>1</td>
                <td>1.2</td>
                <td>1.5</td>
                <td>2</td>
              </tr>
              <tr>
                <td style="width: 24%">商品包邮</td>
                <td>满99包邮</td>
                <td>满99包邮</td>
                <td>满99包邮</td>
                <td>包邮(每月2次)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class=" right_bottom_right">
        <h3>如何提升成长值？</h3>
        <ul>
          <li>
            <p>
              购物奖励
              <span>去购物 <a href="javascript">></a></span>
            </p>
            <span>订单实付金额，1元+1成长值</span>
          </li>
          <li>
            <p>
              领优惠券
              <span>去领券<a href="javascript">></a></span>
            </p>
            <span>+10成长值，每天限1次</span>
          </li>
          <li>
            <p>参与抽奖活动</p>
            <span>+10成长值，每天限1次</span>
          </li>
          <li>
            <p>分享商品或活动</p>
            <span>+10成长值，每天限1次</span>
          </li>
          <li>
            <p>首次登录APP奖励</p>
            <span>+100成长值，限新用户首次登录APP</span>
          </li>
          <li>
            <p>参与拼团活动</p>
            <span>+10成长值，每天限1次</span>
          </li>
          <li>
            <p>参与限时购活动</p>
            <span>+10成长值，每天限1次</span>
          </li>
          <li>
            <p>参与砍价活动</p>
            <span>+10成长值，每天限1次</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfo"
};
</script>

<style scoped>
a {
  text-decoration: none;
}

.moddle_right .right_bottom {
  display: flex;
  margin-top: 20px;
}
.right_bottom_right {
  width: 325px;
  height: 595px;
  padding: 20px;
  background-color: #fff;
  margin-left: 10px;
}
ul li {
  padding: 0;
  margin: 0;
  list-style: none;
  border-bottom: 1px solid #eeecec;
  clear: both;
  padding: 0.8rem 0;
  position: relative;
}
ul li p > span {
  position: absolute;
  right: 0;
}
ul li p {
  color: #666666;
  font-size: 14px;
}
ul li span {
  color: #999999;
  font-size: 12px;
}
.right_bottom_left {
  width: 630px;
  height: 690px;
  padding: 10px;
  background-color: #fff;
}
.right_bottom_left p {
  font-size: 14px;
  color: #666;
  padding: 3px 0 6px 18px;
}
td {
  border: 1px solid #fff;
}
.grow_table {
  font-size: 12px;
  text-align: center;
  padding: 10px 0 20px;
}
.right_bottom_left table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #fff;
  color: #666;
}
.grow_table th {
  height: 44px;
  border: 1px solid #fff;
}

tr {
  width: 24%;
  height: 38px;
}
tr:nth-of-type(odd) {
  background-color: #d7d7d7;
}
.right_bottom_left table td img {
  width: 13px;
  height: 13px;
}
.right_bottom_left table td {
  color: #666;
  font-size: 12px;
}
h3 {
  margin: 1rem 1rem;
  font-size: 16px;
  font-weight: normal;
  position: relative;
  padding-left: 18px;
}
.right_bottom h3::after {
  position: absolute;
  top: 6px;
  left: 0;
  content: "";
  display: block;
  width: 15px;
  height: 15px;
  background: url(https://p2.ssl.qhimg.com/t017349c9e85b12b9a3.png) no-repeat;
  background-size: 100%;
}
/* 等级 */
.vip_grade {
  position: relative;
  width: 700px;
  height: 180px;
  box-sizing: border-box;
  background-color: aliceblue;
  border-top: 10px solid #f2f2f2;
  border-bottom: 10px solid #f2f2f2;
  border-left: 20px solid #d7d7d7;
}
.vip_grade .red_line {
  position: relative;
  border-top: 5px solid #a9a9a9;
  width: 100%;
  box-sizing: border-box;
  top: 79px;
}
.vip_grade .red_line .circle {
  position: relative;
  border-top: 5px solid #ff6a6a;
  width: 150px;
  top: -5px;
  z-index: 8;
}
.vip_grade .red_line .circle .circle_heard {
  border: 5px solid #e64b72;
  border-radius: 50%;
  position: absolute;
  right: 0;
  top: -7px;
  z-index: 6;
}
.vip_grade .top {
  display: flex;
  height: 40px;
  margin-left: 20px;
  margin-top: 20px;
}
.vip_grade .top .top_span {
  text-align: center;
}
.top_span i {
  font-size: 16px;
  color: #333;
}
.vip_grade .top .num {
  box-sizing: border-box;
  height: 24px;
  margin-left: 20px;
  line-height: 24px;
  text-align: center;
  background-color: #d19f56;
  border-radius: 20px;
}
.vip_grade .top .num span {
  padding: 12.8px;
}
.vip_grade .moddle {
  display: flex;
  position: relative;
  z-index: 10;
  justify-content: space-around;
  height: 29px;
}

.vip_grade .bottom {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}
.vip_grade .bottom p {
  width: 100px;
  text-align: center;
}

/* 头像 */
.user_privilege {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 280px;
  height: 50px;
  margin-top: 10px;
  background-color: #44364b;
}
.user_show_privilege {
  display: flex;
  flex-direction: column;
  margin-left: 15px;
}
p {
  margin: 0;
  padding: 0;
}
.p1 {
  font-size: 15px;
  font-weight: bold;
  padding-top: 8px;
  color: #d19f56;
}
.p2 {
  font-size: 12px;
  color: #9093b9;
}
.open_vip {
  display: block;
  border-radius: 25px;
  padding: 2px 10px;
  color: aliceblue;
  text-decoration: none;
  margin-right: 10px;
  background-color: #e2b063;
}
.userInfo {
  display: flex;
  font-size: 14px;
  flex-direction: column;
  align-items: center;
  height: 180px;

  background-color: aliceblue;
  width: 280px;
}
.user_img {
  margin-top: 8px;
  width: 66px;
  height: 66px;
  border-radius: 50%;
  padding: 2px;
  border: 1px solid #666;
}
img {
  border-radius: 50%;
  height: 100%;
  width: 100%;
}

.user_name {
  display: flex;
  flex-direction: column;
  height: 24px;
}
.user_zuan_name {
  display: flex;
  align-items: center;
  position: relative;
}
.user_zuan_name > div {
  position: relative;
  background-color: #979797;
  width: 32px;
  padding-left: 5px;

  z-index: 66;
}
.user_zuan_name > div span {
  color: #fff;
  font-style: italic;
  position: relative;
  z-index: 88;
}
.user_zuan {
  height: 24px;
  width: 20px;
}
/* 右侧头部 */
.right_herder {
  display: flex;
}
.icon {
  width: 28.5px;
  height: 25.6px;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  font-size: 12px;
}
</style>
