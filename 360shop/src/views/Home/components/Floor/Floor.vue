<template>
  <div class="floor">
    <div class="floor_text">
      <span>家庭安防</span>
      <a href="javascript:;">全部>></a>
    </div>

    <div class="floor_bottom" v-if="floors[1].data.poster">
      <a href="javascript:;">
        <img :src="floors[1].data.poster.pic" alt="" />
      </a>
      <a
        href="javascript:;"
        v-for="item in floors[1].data.list"
        :key="item.itemId"
        @click="toShopDetail(item.itemId)"
      >
        <img :src="item.pic" alt="" />
        <p class="p_top">{{ item.title }}</p>
        <p class="p_bottom">{{ item.desc ? item.desc : item.title }}</p>
        <strong class="floor_price">￥{{ item.currentPrice }}</strong>
        <strong class="floor_noPrice">￥{{ item.originPrice }}</strong>
      </a>
    </div>

    <div v-if="floors[0].data">
      <img :src="floors[0].data.pic" alt="" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'Floor',
  props: ['floors'],
  methods: {
    //前往商品详情
    async toShopDetail(itemId) {
      this.$router.push({ path: '/shop', query: { itemId } })
    },
  },
}
</script>
<style scoped>
/* 家庭安防 */
.floor {
  width: 1180px;
  margin: 0 auto;
}
.floor .floor_text {
  height: 24px;
  margin: 20px 0;
}
.floor .floor_text span {
  line-height: 24px;
  font-size: 20px;
}
.floor .floor_text a {
  font-size: 14px;
  color: #666;
  margin-left: 10px;
}
.floor .floor_bottom a {
  display: inline-block;
  background-color: #fff;
}
.floor .floor_bottom a:hover {
  box-shadow: 0 15px 30px rgb(0 0 0 / 20%);
  transform: translateY(-2px);
  transition: 0.2s all ease-out;
}
.floor .floor_bottom a:first-child {
  width: 580px;
  height: 460px;
  padding: 0;
  float: left;
  overflow: hidden;
}
.floor .floor_bottom a:last-child {
  margin: 0;
}
.floor .floor_bottom a:nth-of-type(3) {
  margin: 0;
}
.floor .floor_bottom a {
  width: 280px;
  padding: 30px 20px;
  height: 460px;
  box-sizing: border-box;
  margin-right: 20px;
  margin-bottom: 20px;
  border-radius: 4px;
  text-align: center;
}
.floor .floor_bottom a img {
  width: 100%;
  vertical-align: top;
  margin-bottom: 30px;
}
.floor .floor_bottom a .p_top {
  font-size: 18px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.floor .floor_bottom a .p_bottom {
  color: #999;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 14px;
  /* line-height: 24px; */
  margin-top: 5px;
}
.floor .floor_bottom a .floor_price {
  font-size: 20px;
  color: #dd0e00;
  margin-top: 10px;
}
.floor .floor_bottom a .floor_noPrice {
  font-size: 14px;
  color: #999;
  text-decoration: line-through;
  line-height: 65px;
}
</style>
