<template>
  <div class="allContainer">
    <!-- <TypeNav /> -->
    <!-- 商品详情页 -->
    <div class="shopContainer">
      <!-- 左侧 -->
      <div class="leftContainer">
        <!-- 放大镜区域 -->
        <div class="Magnifier" ref="Magnifier">
          <div class="event" @mousemove="handleMove"></div>
          <div class="smallImg" v-if="shopDetail.imgContent">
            <img alt :src="shopDetail.imgContent[currentIndex]" />
          </div>
          <div class="zoom" ref="zoom"></div>
          <div class="bigImg" v-if="shopDetail.imgContent">
            <img ref="bigImg" :src="shopDetail.imgContent[currentIndex]" alt />
          </div>
        </div>
        <!-- 轮播图 -->
        <ImageList
          :shopDetail="shopDetail"
          @changeCurrentIndex="changeCurrentIndex"
        />
        <!-- 底部详情 -->
        <div class="detail">
          <ul>
            <li v-for="item in shopDetail.itemServiceInfo" :key="item.id">
              <img src="https://p1.ssl.qhimg.com/t014f3c7cc8304a06c2.png" alt />
              <span>{{ item.text }}</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- 右侧 -->
      <div class="rightContainer">
        <div class="product-info">
          <!-- 标题区域 -->
          <div class="info-title">{{ shopDetail.title }}</div>
          <div class="info-subTitle">
            <a v-html="shopDetail.summary"></a>
          </div>
          <!-- 价格、促销区域 -->
          <div class="info-wrap">
            <!-- 分割线 -->
            <div class="divider"></div>
            <div class="info-price-content">
              <!-- 价格 -->
              <div class="info-price">
                <span class="price">价 格</span>
                <div class="info-price-detail">
                  <strong class="nowPrice"
                    >￥{{ shopDetail.priceSale * skuNum }}</strong
                  >
                  <i class="oldPrice">￥{{ shopDetail.priceMarket }}</i>
                </div>
              </div>
              <!-- 促销 -->
              <div class="info-promotion">
                <span class="promotion">促 销</span>
                <div class="info-promotion-detail">
                  <div class="info-box" v-if="priceData.current">
                    <i class="info-box-title">直降</i>
                    <span>{{ priceData.current.text }}</span>
                  </div>
                  <div class="info-box" v-if="detailList.gifts">
                    <i class="info-box-title">赠品</i>
                    <span>{{ detailList.gifs[0].item[0].title }}</span>
                  </div>
                </div>
              </div>
              <!-- 喇叭 -->
              <div class="notice-bar" v-if="notice">{{ notice.msg }}</div>
              <!-- 底部分类、数量、加入购物车 -->
              <div class="info-bottom">
                <div class="inf-bottom-content">
                  <!-- 分类 -->
                  <div class="cate">
                    <div class="cate-label">分 类</div>
                    <ul class="cate-list">
                      <template v-if="categoryList">
                        <li
                          class="cate-item"
                          v-for="(category, index) in categoryList"
                          @click.once="changeChoose(index)"
                          :class="
                            category.ctitle === defaultSelected[0].ctitle
                              ? 'active'
                              : ''
                          "
                          :key="category.ctitle"
                        >
                          {{ category.ctitle }}
                        </li>
                      </template>
                    </ul>
                  </div>
                  <!-- 数量 -->
                  <div class="info-count">
                    <div class="cate-label">数 量</div>
                    <div class="info-count-btn">
                      <div
                        class="reduce"
                        :style="skuNum >= 1 ? 'background-color:#F6F6F6' : ''"
                        @click="handleChange(-1)"
                      >
                        -
                      </div>
                      <input
                        type="text"
                        v-model="skuNum"
                        ref="inputreadonly"
                        style="outline:none"
                      />
                      <div class="add" @click="handleChange(1)">+</div>
                    </div>
                  </div>
                  <!-- 加入购物车 -->
                  <div class="buy">
                    <button class="buyNow">
                      <a href="javascript:;">立即购买</a>
                    </button>
                    <button class="addCart" @click="addShopCart">
                      <a href="javascript:;">加入购物车</a>
                    </button>
                    <a href="javascript:;" class="icon-btn" @click="addheart">
                      <i class="icon-heart" :class="isFavo ? 'active' : ''"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 下侧商品详细信息展示 -->
    <div class="shop-detail-container">
      <!-- 详情 -->
      <div class="detail-box">
        <a href="javascript:;">
          <img src="../../static/images/7.jpg" alt />
        </a>
        <a href="javascript:;">
          <img src="../../static/images/8.jpg" alt />
        </a>
      </div>
      <!-- 产品参数 -->
      <div class="info-tab-wrap" :class="isShow ? 'show' : ''">
        <div class="info-tab">
          <div class="info-tab-content">
            <!-- 列表 -->
            <div class="info-tab-list">
              <a href="javascript:;" class="info-tab-item on">
                <span class="info-tab-inner active">产品详情</span>
              </a>
              <a href="javascript:;" class="info-tab-item">
                <span class="info-tab-inner">规格参数</span>
              </a>
              <a href="javascript:;" class="info-tab-item info-tab-lastInner">
                <span class="info-tab-inner">常见问题</span>
              </a>
            </div>
            <!-- 加入购物车 -->
            <div class="buy">
              <button class="buyNow">
                <a href="javascript:;">立即购买</a>
              </button>
              <button class="addCart">
                <a href="javascript:;">加入购物车</a>
              </button>
              <a href="javascript:;" class="icon-btn">
                <i class="icon-heart"></i>
              </a>
            </div>
            <!-- 二维码 -->
            <a
              href="javascript:;"
              class="info-tab-code"
              @mouseenter="showCode"
              @mouseleave="hideCode"
            >
              APP购买
              <div class="code-hover" ref="code">
                <img
                  src="https://p4.ssl.qhimg.com/t01912e4fcc88786eca.png"
                  alt
                />
              </div>
            </a>
          </div>
        </div>
      </div>
      <!-- 图片、表格介绍 -->
      <div class="info-content">
        <!-- 图片 -->
        <div class="info-content-image">
          <p v-for="item in shopDetail.imgContent" :key="item">
            <img v-lazy="item" alt />
          </p>
          <div
            style="color:#999;text-align:left;padding:1rem;line-height: 1.6rem;margin-top:20px;"
          >
            <h3 style="text-align: center;">价格说明</h3>
            未划线价：
            <br />商品的实时标价，具体成交价格根据商品参加活动或使用优惠券、积分等发生变化，最终以订单结算页价格为准。
            <br />划线价：
            <br />商品展示的划横线价格为参考价，并非原价，该价格可能是品牌专柜标价、商品吊牌价或由品牌供应商提供的正品零售价（如厂商指导价、建议零售价等）或该商品在360商城上曾经展示过的销售价；由于地区、时间的差异性和市场行情波动，品牌专柜标价、商品吊牌价等可能会与您购物时展示的不一致，该价格仅供您参考。
            <br />异常问题：
            <br />商品促销信息以商品详情页“促销”栏中的信息为准；商品的具体售价以订单结算页价格为准；如您发现活动商品售价或促销信息有异常，建议购买前先联系销售商咨询。
            <br />*此价格说明仅在有价格对比时有效。
          </div>
        </div>
        <!-- 表格 -->
        <div class="info-content-table">
          <div class="gTit">规格参数</div>
          <div class="gCon">
            <div class="gArg"></div>
            <table class="col">
              <tbody>
                <tr>
                  <td class="wd207">尺寸</td>
                  <td>包装尺寸（长*宽*高） 341*364*79（mm）</td>
                </tr>

                <tr>
                  <td class="wd207">商品颜色</td>
                  <td>黑色+红色</td>
                </tr>

                <tr>
                  <td class="wd207">材质</td>
                  <td>塑料</td>
                </tr>

                <tr>
                  <td class="wd207">产品外观</td>
                  <td>长方形</td>
                </tr>

                <tr>
                  <td class="wd207">重量</td>
                  <td>单台净重0.6kg</td>
                </tr>

                <tr>
                  <td class="wd207">传输标准</td>
                  <td>
                    "IEEE802.11a IEEE802.11b IEEE802.11g IEEE802.11n
                    IEEE802.11ac IEEE802.3 IEEE802.3u IEEE802.3ab"
                  </td>
                </tr>

                <tr>
                  <td class="wd207">包装体积</td>
                  <td>9806（立方厘米）</td>
                </tr>

                <tr>
                  <td class="wd207">天线</td>
                  <td>4根单频+2根双频</td>
                </tr>

                <tr>
                  <td class="wd207">Wan口数量（无线路由）</td>
                  <td>1个千兆网口</td>
                </tr>

                <tr>
                  <td class="wd207">天线增益</td>
                  <td>"单频2. 4G 5dbi，5G 6dbi 双频天线每根5dbi"</td>
                </tr>

                <tr>
                  <td class="wd207">传输频段</td>
                  <td>2.4GHz&amp;5GHz</td>
                </tr>

                <tr>
                  <td class="wd207">Lan口数量（无线路由）</td>
                  <td>4个千兆网口</td>
                </tr>

                <tr>
                  <td class="wd207">主频</td>
                  <td>880MHz</td>
                </tr>

                <tr>
                  <td class="wd207">内存</td>
                  <td>128</td>
                </tr>

                <tr>
                  <td class="wd207">路由芯片</td>
                  <td>MT7621AT+MT7615N+MT7615N</td>
                </tr>

                <tr>
                  <td class="wd207">FLASH</td>
                  <td>256</td>
                </tr>

                <tr>
                  <td class="wd207">传输速率</td>
                  <td>2600M</td>
                </tr>

                <tr>
                  <td class="wd207">适用面积</td>
                  <td>200㎡以下</td>
                </tr>

                <tr>
                  <td class="wd207">网络协议</td>
                  <td>
                    "IEEE802.11a IEEE802.11b IEEE802.11g IEEE802.11n
                    IEEE802.11ac IEEE802.3 IEEE802.3u IEEE802.3ab"
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- 常见问题 -->
        <div class="info-common">
          <div class="gTit">常见问题</div>
          <div class="gCon">
            <dl class="consult">
              <dt>
                <big>1、</big>
                <i></i>订单提交成功后还可以修改收货信息吗？
              </dt>
              <dd>
                <i></i
                >订单付款之前，您可以进入“我的订单”，在订单详情页内修改收货信息。付款之后将不可修改收货信息。
              </dd>
            </dl>

            <dl class="consult">
              <dt>
                <big>2、</big>
                <i></i>支付完成后还能取消订单吗？如何取消？
              </dt>
              <dd>
                <i></i
                >支付完成后，配货之前可以取消订单，您可以进入“我的订单”，直接点击订单后面取消按钮。
              </dd>
            </dl>

            <dl class="consult">
              <dt>
                <big>3、</big>
                <i></i>订单取消后还能恢复吗？
              </dt>
              <dd><i></i>订单一旦取消将无法恢复，请您慎重操作。</dd>
            </dl>

            <dl class="consult">
              <dt>
                <big>4、</big>
                <i></i>订单取消成功后退款如何返还？
              </dt>
              <dd>
                <i></i
                >订单取消后，退款会按照您购买时的支付方式原路返回到您的银行卡。
              </dd>
            </dl>

            <dl class="consult">
              <dt>
                <big>5、</big>
                <i></i>对商品不满意可以申请退换货吗？如何操作？
              </dt>
              <dd>
                <i></i
                >在确认收货后，7天之内可以申请退货。15天之内可以进行换货，具体操作如下:
                <br />退货：进入“我的订单”，在操作区域中点击申请退货，填写问题描述，提交服务单即可申请退货。
                <br />换货：请拨打我们的客服热线400-1555-360，在客服的指导下完成换货。
              </dd>
            </dl>

            <dl class="consult">
              <dt>
                <big>6、</big>
                <i></i>为什么我的订单总是无法提交成功？
              </dt>
              <dd>
                <i></i>可能存在以下几种情况： <br />（1）订单信息填写不完整；
                <br />（2）订单商品库存不足或者库存无货；
                <br />（3）网络延时及以上各种情况都会在页面中弹出提示信息，可以通过修改订单信息（提示信息）或者稍后再试，即可成功提交订单。
              </dd>
            </dl>

            <dl class="consult">
              <dt>
                <big>7、</big>
                <i></i>订单已提交成功，如何付款？
              </dt>
              <dd>
                <i></i
                >您好，360商城目前支持的支付方式分为支付宝和微信。请在订单提交后30分钟内完成付款。
              </dd>
            </dl>

            <dl class="consult">
              <dt>
                <big>8、</big>
                <i></i>订单已支付成功，什么时候可以发货？
              </dt>
              <dd>
                <i></i
                >您好，360商城会在48小时内安排发货。物流信息您可进入“我的订单”实时查看。
              </dd>
            </dl>

            <dl class="consult">
              <dt>
                <big>9、</big>
                <i></i>订单发货后，还可以改送到其他地方吗？
              </dt>
              <dd>
                <i></i>您好，订单发货后无法修改。请在提交订单前仔细检查核对。
              </dd>
            </dl>

            <dl class="consult">
              <dt>
                <big>10、</big>
                <i></i>我的地址比较偏僻，你们能送到吗？
              </dt>
              <dd><i></i>EMS能够到达的区域我们都提供配送服务。</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
    <!--  -->
  </div>
</template>
<script>
import ImageList from './ImageList'
import { mapState } from 'vuex'
export default {
  name: 'Shop',
  components: {
    ImageList,
  },
  data() {
    return {
      skuNum: 1,
      shopDetail: {},
      currentIndex: 0,
      priceData: {},
      notice: '',
      categoryList: [],
      detailList: {},
      isFavo: 0,
      isShow: false,
      defaultSelected: {},
    }
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.userInfo,
    }),
  },
  async mounted() {
    const loading = this.$loading({
      text: '正在加载中。。。',
      background: 'rgba(255, 255, 255,0.8)',
      target: document.querySelector('.shopContainer'),
    })
    // 获取商品详情数据
    await this.getShopDetail()
    loading.close()

    // 获取商品价格、优惠数据
    const priceData = await this.detailList.promotion
    // console.log(priceData,priceData.current.tag)
    this.priceData = priceData

    // 获取通知消息数据
    const { notice } = this.detailList
    this.notice = notice

    // 获取商品分类数据
    const categoryList = await this.detailList.subItems
    this.categoryList = categoryList
    // console.log(categoryList)
    // 分类中华默认选中的选项
    this.getShopSelected()

    // 监听系统滚动条高度
    document.addEventListener('scroll', () => {
      let scrollTop = document.documentElement.scrollTop
      // console.log(scrollTop)
      if (scrollTop > 1384) {
        this.isShow = true
      } else {
        this.isShow = false
      }
    })
  },

  methods: {
    // 放大镜功能
    handleMove(e) {
      // console.log(e,this)
      // 获取遮挡层对象
      const zoom = this.$refs.zoom
      // 获取大图对象
      const bigImg = this.$refs.bigImg
      // 获取鼠标的位置
      let { offsetX, offsetY } = e
      // 获取遮挡蹭对象的宽度
      const zoomWidth = zoom.clientWidth / 2
      // 设置鼠标在遮挡层对象的中心
      let left = offsetX - zoomWidth / 2
      let top = offsetY - zoomWidth / 2
      // 限制边界
      const Magnifier = this.$refs.Magnifier
      const magnifierWidth = Magnifier.clientWidth
      // console.log(magnifierWidth)
      let overWidth = magnifierWidth - zoomWidth * 2
      // console.log(overWidth)
      left = left < 0 ? 0 : left > overWidth ? overWidth : left
      top = top < 0 ? 0 : top > overWidth ? overWidth : top
      // 设置遮挡层坐标
      zoom.style.left = left + 'px'
      zoom.style.top = top + 'px'

      // 设置大图显示
      if (bigImg) {
        bigImg.style.left = -left * 2 + 'px'
        bigImg.style.top = -top * 2 + 'px'
      }
    },
    // 数量操作
    handleChange(skuNum) {
      this.skuNum += skuNum
      if (this.skuNum <= 1) {
        this.skuNum = 1
      }
    },
    // 改变下标
    changeCurrentIndex(index) {
      this.currentIndex = index
    },
    // 显示二维码
    showCode() {
      this.$refs.code.className = 'active code-hover'
    },
    // 隐藏二维码
    hideCode() {
      this.$refs.code.className = 'code-hover'
    },
    // 添加心愿单
    addheart() {
      this.isFavo = !this.isFavo
      // this.detailList.isFavo = !this.detailList.isFavo
      // console.log(this.detailList)
    },
    // 切换分类
    async changeChoose(currentIndex) {
      this.currentIndex = currentIndex
      const itemId = this.detailList.subItems[currentIndex].itemId
      // if (this.$route.query.itemId === itemId) return
      this.$router.push({ name: 'shop', query: { itemId } })
      const loading = this.$loading({
        text: '正在加载中。。。',
        background: 'rgba(255, 255, 255,0.5)',
        target: document.querySelector('.shopContainer'),
      })

      loading.close()

      // const shopDetail =  this.detailList.itemInfo
      // this.shopDetail = shopDetail
      this.skuNum = 1
    },
    // 获取商品详情数据和商品信息数据
    async getShopDetail() {
      const { itemId } = this.$route.query
      const result = await this.$API.reqShopDetail(itemId)
      // 商品详情数据
      const detailList = result.data.data
      this.detailList = detailList
      // console.log(detailList)、
      // 商品信息数据
      const shopDetail = await this.detailList.itemInfo
      this.shopDetail = shopDetail
      this.currentIndex = 0
    },
    // 获取默认选中的商品分类
    getShopSelected() {
      const defaultSelected = this.categoryList.filter((item) => {
        if (item.itemId === this.detailList.itemId) {
          return item
        }
      })
      this.defaultSelected = defaultSelected
    },
    //加入购物车
    async addShopCart() {
      if (!this.userInfo.username) {
        this.$bus.$emit('showLogin')
        this.$message.error('请先登录')
        return
      }
      const res = await this.$API.reqAddShopCart(this.$route.query.itemId)
      if (res.data.errmsg == '添加购物车成功') {
        this.$message.success('添加购物车成功')
      }
    },
  },
  watch: {
    async $route() {
      await this.getShopDetail()
      this.getShopSelected()
    },
  },
}
</script>
<style lang="less" scoped>
.allContainer {
  background: #fff;
  padding-top: 40px;
  .shopContainer {
    width: 1240px;
    margin: 0 auto;
    // border: 1px solid red;
    overflow: hidden;
    // box-sizing: border-box;
    // 左侧
    .leftContainer {
      float: left;
      margin-right: 80px;
      width: 482px;
      // 放大镜
      .Magnifier {
        // border: 1px solid green;
        height: 480px;
        margin: 0 auto;
        position: relative;
        border: 1px solid transparent;
        &:hover ~ {
          border: 1px solid #999;
        }
        .smallImg {
          width: 100%;
          height: 480px;
          z-index: 999;
        }
        .zoom {
          width: 300px;
          height: 300px;
          position: absolute;
          top: 0;
          left: 0;
          background: yellow;
          opacity: 0.4;
          display: none;
        }
        .event {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 998;
          &:hover ~ .zoom,
          &:hover ~ .bigImg {
            display: block;
          }
        }
        .bigImg {
          width: 510px;
          height: 510px;
          display: none;
          // border: 1px solid green;
          position: absolute;
          top: 0;
          left: 490px;
          border: 1px solid #999;
          overflow: hidden;
          background: white;
          img {
            width: 900px;
            max-width: 900px;
            height: 960px;
            position: absolute;
            left: 0;
            top: 0;
          }
        }
      }
      // 详情
      .detail {
        background: #fafafa;
        font-size: 14px;
        line-height: 20px;
        margin-top: 24px;
        padding: 10px 35px;
        ul {
          list-style-type: none;
          margin: -20px 0 0 -30px;
          li {
            display: inline-block;
            margin: 20px 0 0 30px;
            white-space: nowrap;
            img {
              height: 16px;
              margin-right: 8px;
            }
          }
        }
      }
    }
    // 右侧
    .rightContainer {
      font-size: 14px;
      padding-top: 12px;
      float: right;
      width: 678px;
      .product-info {
        .info-title {
          font-size: 18px;
          font-weight: 400;
          line-height: 25px;
        }
        .info-subTitle {
          color: #f33;
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
          margin-top: 7px;
          a {
            color: #f33;
            margin-right: 5px;
            // text-decoration: underline;
          }
        }
        .info-wrap {
          background: #fafafa;
          margin-top: 11px;
          // 切割线
          .divider {
            background: #f0f0f0;
            height: 5px;
            width: 678px;
          }
          .info-price-content {
            padding-top: 15px;
            // 价格
            .info-price {
              line-height: 24px;
              padding: 0 20px 16px 15px;
              .price {
                // border: 1px solid pink;
                padding: 0 15px;
              }
              .info-price-detail {
                display: inline-block;
                // overflow: hidden;
                font-size: 24px;
                margin-bottom: 4px;
                .nowPrice {
                  color: #fa5437;
                  font-weight: 600;
                }
                .oldPrice {
                  font-size: 12px;
                  font-weight: normal;
                  margin-right: 3px;
                  text-decoration: line-through;
                }
              }
            }
            // 促销
            .info-promotion {
              line-height: 24px;
              padding: 0 20px 16px 15px;
              .promotion {
                // border: 1px solid pink;
                padding: 0 15px;
              }
              .info-promotion-detail {
                margin-bottom: -8px;
                display: inline-block;
                vertical-align: top;
                .info-box {
                  margin-bottom: 0;
                  .info-box-title {
                    font-style: normal;
                    background: #ffebe9;
                    border-radius: 15px;
                    color: #f33;
                    display: inline-block;
                    font-size: 12px;
                    font-weight: 400;
                    line-height: 18px;
                    padding: 0 8px;
                  }
                  span {
                    margin-bottom: -8px;
                  }
                }
              }
            }
            // 喇叭
            .notice-bar {
              background: url(https://p.ssl.qhimg.com/t0162338fb79bf00d67.png)
                #ffebc6 no-repeat 8px center;
              background-size: 19px 19px;
              // padding-left: 35px;
              font-size: 12px;
              color: #f33;
              margin: 10px 0;
              max-height: 28px;
              padding: 8px 8px 8px 35px;
            }
            // 底部分类、数量、加入购物车
            .info-bottom {
              .inf-bottom-content {
                padding-top: 15px;
                // 分类
                .cate {
                  line-height: 24px;
                  padding: 0 20px 16px 15px;
                  // border: 1px solid red;
                  display: flex;
                  // display: inline-block;
                  .cate-label {
                    width: 45px;
                    text-align: center;
                    // overflow: hidden;
                  }
                  .cate-list {
                    list-style-type: none;
                    margin-left: 10px;
                    display: inline-block;
                    display: flex;
                    flex-flow: wrap;
                    .cate-item {
                      height: 26px;
                      border: 1px solid #ddd;
                      padding: 0 20px;
                      color: #333;
                      border-radius: 4px;
                      cursor: pointer;
                      margin: 0 10px 10px;
                      &.active {
                        border: 1px solid #f33;
                        background: #ffebe9;
                      }
                    }
                  }
                }
                // 数量
                .info-count {
                  line-height: 24px;
                  padding: 0 20px 16px 15px;
                  .cate-label {
                    width: 45px;
                    // border: 1px solid pink;
                    display: inline-block;
                    text-align: center;
                  }
                  .info-count-btn {
                    display: inline-block;
                    margin-left: 10px;
                    .reduce,
                    .add {
                      width: 26px;
                      height: 26px;
                      line-height: 26px;
                      border: 1px solid #ddd;
                      text-align: center;
                      display: inline-block;
                      vertical-align: middle;
                      cursor: pointer;
                    }
                    .reduce {
                      background: #fff;
                      color: #ddd;
                    }
                    .add {
                      background: #f6f6f6;
                    }
                    input {
                      border: 1px solid #ddd;
                      height: 26px;
                      line-height: 26px;
                      vertical-align: middle;
                      text-align: center;
                      width: 40px;
                    }
                  }
                }
                // 加入购物车
                .buy {
                  button {
                    width: 200px;
                    font-size: 20px;
                    font-weight: 400;
                    line-height: 38px;
                    border-radius: 6px;
                    border: 1px solid #f33;
                    // pointer-events: none;
                    outline: none;
                    cursor: pointer;
                  }
                  .buyNow {
                    background-color: #ffebe9;
                    a {
                      color: #f33;
                      text-decoration: none;
                      &:hover {
                        color: #f33 !important;
                      }
                    }
                  }
                  .addCart {
                    background-color: #f63;
                    margin-left: 20px;
                    a {
                      color: #fff;
                      text-decoration: none;
                      &:hover {
                        color: #fff !important;
                      }
                    }
                  }
                  // 添加心愿
                  .icon-btn {
                    background: #fafafa;
                    border-radius: 6px;
                    border: 1px solid #e7e7e7;
                    line-height: 38px;
                    width: 80px;
                    display: inline-block;
                    vertical-align: top;
                    margin-left: 16px;
                    text-align: center;
                    .icon-heart {
                      display: inline-block;
                      background-image: url(https://p.ssl.qhimg.com/t0141ce2282c77fd367.png);
                      background-position: 0 -56px;
                      background-repeat: no-repeat;
                      height: 18px;
                      width: 22px;
                      vertical-align: middle;
                      &.active {
                        background-position: 0 -84px;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  // 下侧商品详细信息展示
  .shop-detail-container {
    width: 1000px;
    background: #fff;
    margin: 0 auto;
    // border: 1px solid blue;
    .detail-box {
      a {
        img {
          vertical-align: top;
          width: 100%;
          margin-bottom: 5px;
        }
      }
    }
    // 产品参数
    .info-tab-wrap {
      height: 50px;
      position: relative;
      &.show {
        position: fixed;
        top: 40px;
        right: 557px;
      }
      // top: 50px;
      .info-tab {
        line-height: 36px;
        .info-tab-content {
          background: #fff;
          border: 1px solid #ddd;
          box-sizing: border-box;
          margin: 0 auto;
          padding: 7px 0;
          display: flex;
          width: 1000px;
          // 参数列表
          .info-tab-list {
            .info-tab-item {
              border-right: 1px solid #333;
              font-size: 14px;
              line-height: 14px;
              padding: 0 30px;
              text-decoration: none;
              color: #666 !important;
              &:hover {
                color: #333 !important;
              }
            }
            .info-tab-lastInner {
              border: 0;
            }
            .info-tab-item.on {
              color: #333 !important;
              .active {
                border-bottom: 5px solid #f33;
                // opacity:0.6
              }
            }
          }
          // 加入购物车
          .buy {
            margin-left: 100px;
            button {
              width: 200px;
              font-size: 20px;
              font-weight: 400;
              line-height: 38px;
              border-radius: 6px;
              border: 1px solid #f33;
              outline: none;
              cursor: pointer;
            }
            .buyNow {
              background-color: #ffebe9;
              a {
                color: #f33;
                text-decoration: none;
                &:hover {
                  color: #f33 !important;
                }
              }
            }
            .addCart {
              background-color: #f63;
              margin-left: 10px;
              a {
                color: #fff;
                text-decoration: none;
                &:hover {
                  color: #fff !important;
                }
              }
            }
          }
          // 二维码
          .info-tab-code {
            font-size: 14px;
            color: #666;
            line-height: 50px;
            text-decoration: none;
            position: absolute;
            top: 0;
            right: 0;
            padding-right: 55px;
            background: url(https://p.ssl.qhimg.com/t010f96e0652b822fea.png)
              center right no-repeat;
            &:hover {
              color: black !important;
            }
            .code-hover {
              left: auto;
              margin-top: 0;
              margin-left: 0;
              right: -4px;
              height: 120px;
              width: 108px;
              position: absolute;
              top: 100%;
              padding: 15px 10px 0;
              display: none;
              &.active {
                display: block;
                transition: all 0.2s;
              }
              img {
                width: 110px;
              }
            }
          }
        }
      }
    }
    // 产品图片介绍
    .info-content {
      border: 1px solid #ddd;
      margin-top: -1px;
      margin-bottom: 10pxs;
      .info-content-image {
        background: #fff;
        margin: 0 auto;
        padding: 20px 0;
        text-align: center;
        p {
          font-size: 14px;
          line-height: 1.8em;
          img {
            height: auto;
            margin: 0 auto;
            vertical-align: middle;
            width: 100%;
          }
        }
      }
    }
    // 产品表格介绍
    .info-content-table {
      .gTit {
        background: #f0f0f0;
        border-top: 1px solid #ddd;
        color: #333;
        font-size: 14px;
        font-weight: 600;
        line-height: 38px;
        margin-top: -1px;
        padding: 0 30px;
      }
      .gCon {
        padding: 0 60px;
        .gArg {
          border: 1px solid #ccc;
          font-size: 16px;
          height: 40px;
          line-height: 40px;
          text-align: left;
          text-indent: 15px;
        }
        td.wd207 {
          border-right: 1px solid #ccc;
          color: #333;
          text-align: center !important;
          width: 207px;
        }
        .col td {
          border-bottom: 1px solid #ccc;
          font-size: 16px;
          height: 40px;
          line-height: 2.4;
          padding: 0 16px;
        }
      }
    }
    // 常见问题
    .info-common {
      .gTit {
        background: #f0f0f0;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        color: #333;
        font-size: 14px;
        font-weight: 600;
        line-height: 38px;
        margin-top: -1px;
        padding: 0 30px;
      }
      .gCon {
        padding: 20px 60px;
        background: #fff;
        margin: 0 auto;
        text-align: center;
        .consult {
          font-size: 13px;
          text-align: left;
          dt {
            color: #333;
            display: block;
            line-height: 30px;
            margin-bottom: 15px;
            big {
              display: inline-block;
              font-size: 18px;
              width: 35px;
            }
            i {
              background: url(//p.ssl.qhmsg.com/t0147bb66948b7f6357.png) left
                top no-repeat;
              display: inline-block;
              height: 30px;
              margin-right: 5px;
              vertical-align: middle;
              width: 35px;
            }
          }
          dd {
            background-position: 0 45px;
            color: #666;
            margin-bottom: 20px;
            padding: 0 0 15px 35px;
            i {
              background-position: 0 -45px;
            }
          }
        }
      }
    }
  }
}
</style>
