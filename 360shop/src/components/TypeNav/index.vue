<template>
  <div class="container_top">
    <div class="testNav" @mouseleave="noEnterClick">
      <div class="typeNav">
        <div class="typeNav_top">
          <a class="iconfont icon-fenlei" href="javascript:;">全部...</a>
        </div>
        <ul class="typeNav_list">
          <li
            @mouseenter="enterClick(-1)"
            :class="enterIndex === -1 ? 'active_li' : ''"
          >
            <a href="javascript:;">手机</a>
          </li>
          <li
            v-for="(nav, index) in typeNavInfo.category"
            :key="nav.id"
            @mouseenter="enterClick(index, nav.id)"
            :class="enterIndex === index ? 'active_li' : ''"
          >
            <a href="javascript:;">{{ nav.name }}</a>
          </li>
        </ul>
      </div>
      <div
        class="typeNav_right"
        :class="isShowRight ? 'showRight' : ''"
        v-if="enterIndex === -1"
      >
        <div class="typeNav_cen">
          <div class="type_list">
            <a href="javascript:;" class="typeList_title">手机</a>
            <div class="typeList_item">
              <a href="javascript:;" @click="searchIphone(1)">
                <img src="./images/iphone.jpg" alt="" />
                <strong>苹果手机</strong>
              </a>
              <a href="javascript:;" @click="searchIphone(0)">
                <img src="./images/mi.jpg" alt="" />
                <strong>小米手机</strong>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="typeNav_right" :class="isShowRight ? 'showRight' : ''" v-else>
        <div class="typeNav_cen">
          <div v-if="isShowLoadin" class="load">
            <strong>加载中...</strong>
          </div>
          <div
            v-else
            class="type_list"
            v-for="type in categoryInfo.secondary"
            :key="type.name"
          >
            <a href="javascript:;" class="typeList_title">{{ type.name }}</a>
            <div class="typeList_item">
              <a
                href="javascript:;"
                v-for="typeItem in type.item"
                :key="typeItem.name"
              >
                <img :src="typeItem.pic" alt="" @click="toShop(typeItem)" />
                <strong>{{ typeItem.name }}</strong>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TypeNav",
  data() {
    return {
      isShowRight: false,
      //分类数据
      typeNavInfo: {},
      //分类移入是否显示样式,数组下标
      enterIndex: -2,
      //相关分类详细数据
      categoryInfo: {},
      //保存上一次请求的分类id
      preId: null,
      isShowLoadin: true
    };
  },
  async mounted() {
    //获取分类数据
    const result = await this.$API.reqPrimaryCategory();
    this.typeNavInfo = result.data.data;
    // console.log(result);

    const resIndexContainer = await this.$API.reqIndexContainer();
    // console.log(resIndexContainer);
    //保存banner图数据
    this.IndexContainer = resIndexContainer.data.data;
  },
  methods: {
    //分类移入事件
    async enterClick(index, id) {
      //改变下标，切换选中状态
      this.enterIndex = index;
      //右边是否显示
      this.isShowRight = true;
      // 判断是否还是移入的前一个
      if (id === this.preId) return;
      //根据分类id获取分类详细数据
      this.isShowLoadin = true;
      const result = await this.$API.reqSecondaryCategory(
        this.typeNavInfo.type,
        id
      );
      this.categoryInfo = result.data.data;
      this.isShowLoadin = false;
      this.preId = id;
    },
    noEnterClick() {
      this.isShowRight = false;
      //改变下标，切换选中状态
      this.enterIndex = -2;
    },
    searchIphone(id) {
      if (id) {
        this.$router.push({
          path: "/search",
          query: { brand_id: 14, category3_id: 166 }
        });
      } else {
        this.$router.push({
          path: "/search",
          query: { brand_id: 309, category3_id: 166 }
        });
      }
    },
    // 点击去往商品详情界面
    toShop(typeItem) {
      // console.log(typeItem)
      //.item[0].url.split('=')[1]
      let result = typeItem.url
      // console.log(this.categoryInfo.secondary)
      let itemId = result.split('=')[1]
      // console.log(itemId)
      // let result= this.categoryInfo.secondary
      // console.log(result)
      this.$router.replace({ name: 'shop', query: { itemId } })
    },
  },
}
</script>
<style scoped>
.container_top {
  width: 1180px;
  margin: 0 auto;
}
.testNav {
  height: 530px;
  width: 1180px;
  position: absolute;
  margin: 0 auto;
  z-index: 99;
}
.typeNav {
  width: 230px;
  height: 530px;
  background-color: rgba(51, 51, 51, 0.7);
}
.typeNav .typeNav_top {
  background-color: rgba(51, 51, 51, 0.6);
  height: 50px;
  line-height: 50px;
  text-align: center;
}
.typeNav .typeNav_top a {
  font-size: 16px;
  color: white;
}

.typeNav .typeNav_list li {
  height: 48px;
  line-height: 48px;
  text-align: center;
}
.typeNav .typeNav_list li.active_li {
  background-color: rgba(51, 51, 51, 0.6);
}
.typeNav .typeNav_list li a {
  font-size: 14px;
  color: white;
}

.typeNav_right {
  display: none;
  width: 950px;
  height: 530px;
  background-color: #fff;
  position: absolute;
  top: 0;
  left: 230px;
  z-index: 99;
  padding: 0 80px 80px 0;
  box-sizing: border-box;
}
.typeNav_right.showRight {
  display: block;
}
.typeNav_right .typeNav_cen {
  height: 530px;
  overflow-y: auto;
}
.typeNav_right .typeNav_cen .load {
  text-align: center;
  line-height: 530px;
}
.typeNav_right .typeNav_cen .load strong {
  font-size: 20px;
}
.typeNav_right .typeNav_cen .type_list {
  position: relative;
}
.typeNav_right .typeNav_cen .type_list .typeList_title {
  display: inline-block;
  width: 60px;
  height: 30px;
  border-right: 1px solid #000;
  color: #666;
  font-weight: bold;
  font-size: 14px;
  position: absolute;
  top: 20px;
  left: 50px;
  line-height: 30px;
  text-align: center;
}

.typeNav_right .typeNav_cen .type_list .typeList_item {
  padding-left: 120px;
  font-size: 14px;
  margin: 30px 0;
}

.typeNav_right .typeNav_cen .type_list .typeList_item a {
  display: inline-block;
  width: 230px;
  height: 65px;
}

.typeNav_right .typeNav_cen .type_list .typeList_item a img {
  width: 65px;
  height: 65px;
  vertical-align: middle;
}

.typeNav_right .typeNav_cen .type_list .typeList_item a strong {
  height: 65px;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
