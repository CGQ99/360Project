<template>
    <!-- 轮播图 -->
        <!-- <div class="swiper">
          <div class="btn">
            <button class="leftBtn">&lt;</button>
            <button class="rightBtn">&gt;</button>
          </div>
          <div class="list">
            <ul>
              <li class="imgItem">
                <div class="img">
                  <img src="../../static/images/2.png" alt />
                </div>
              </li>
              <li class="imgItem">
                <div class="img">
                  <img src="../../static/images/3.png" alt />
                </div>
              </li>
              <li class="imgItem">
                <div class="img">
                  <img src="../../static/images/4.png" alt />
                </div>
              </li>
              <li class="imgItem">
                <div class="img">
                  <img src="../../static/images/5.png" alt />
                </div>
              </li>
              <li class="imgItem">
                <div class="img">
                  <img src="../../static/images/6.png" alt />
                </div>
              </li>
            </ul>
          </div>
        </div> -->
        <swiper class="swiper" :options="{
                      slidesPerView:5, // 显示几个图片(每次限时几屏)
                      slidesPerGroup:1, // 每次移动几个图片 
                    // 如果需要前进后退按钮
                    navigation: {
                      nextEl: '.swiper-button-next',
                      prevEl: '.swiper-button-prev',
                      //hideOnClick: true,
                      hiddenClass: 'my-button-hidden'
                    }, 
            }"
          >
                <swiper-slide class="swiper-slide" v-for="(item,index) in shopDetail.imgContent" :key="item">
                    <img :src="item" :class="currentIndex===index?'active':''" 
                    @mousemove="changeCurrentIndex(index)" />
                </swiper-slide>
                    <div class="swiper-button-prev" slot="button-prev"></div>
                    <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
</template>
<script>
export default {
    name:'ImageList',
    props:['shopDetail'],
    data(){
      return {
        currentIndex:0
      }
    },
    methods:{
      // 获取商品图片下标
      changeCurrentIndex(currentIndex){
        this.currentIndex = currentIndex
        // console.log(this.currentIndex)
        //  通知父级组件下标
        this.$emit('changeCurrentIndex',currentIndex)
      }
    }
}
</script>
<style lang="less" scoped>
      .swiper{
        // border: 1px solid green;
        position: relative;
        .swiper-slide{
          // border: 1px solid blue;
          img{
             height: 88px;
             width: 88px;
             &.active{
              border-bottom: 4px solid #666;
             }
          }
        }
        .swiper-button-prev{
          // border: 1px solid red;
          position: absolute;
          left: 0;
          color:white;
          background: #666;
          opacity: 0.5;
        }
        .swiper-button-next{
          // border: 1px solid red;
          position: absolute;
          right: 0;
          color:white;
          background: #666;
          opacity: 0.5;
        }
        .swiper-button-disabled{
            display:none;
          }
      }
</style>