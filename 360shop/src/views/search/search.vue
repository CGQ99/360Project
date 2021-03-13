<template>
  <div>
    <div class="search">
      <div class="search-box">
        <div class="search-nav">
          <span style="color: #ccc"
            ><router-link to="/" style="color: #ccc">首页 ></router-link></span
          >
          <span v-if="shopData.Category3s.length === 1">
            {{ shopData.Category3s[0].name }}></span
          >
          <span @click="toSHOP"> {{ $route.params.key_word }} </span>
          <!-- 品牌 -->
          <div class="screen" v-if="shopData.Brands.length === 1">
            <span>品牌:</span>
            <span class="brans"> {{ shopData.Brands[0].name }}</span>
            <span style="color: #f40" @click="closeBrans"> X </span>
          </div>
          <!-- 价格 -->
          <div class="screen" v-if="searchData.to_price">
            <span>价格:</span>
            <span class="brans">
              {{ searchData.from_price + '-' + searchData.to_price }}</span
            >
            <span style="color: #f40" @click="closePrice"> X </span>
          </div>
        </div>
      </div>
      <!-- 分类 -->
      <div class="filter-box">
        <!-- 三级分类 -->
        <div class="filter" v-if="shopData.Category3s.length > 1">
          <div class="hint">分类:</div>
          <div class="option_box">
            <!-- a便签也遍历 -->
            <a
              href="javascript:;"
              v-for="classify in shopData.Category3s"
              :key="classify.id"
              @click="classifys(classify.id)"
            >
              {{ classify.name }}
            </a>
          </div>
        </div>
        <!-- 品牌 -->
        <div class="filter" v-if="shopData.Brands.length > 1">
          <div class="hint">品牌:</div>
          <div class="option_box">
            <!-- a便签也遍历 -->
            <a
              href="javascript:;"
              v-for="Brand in shopData.Brands"
              :key="Brand.name"
              @click="toBrand(Brand.id)"
            >
              {{ Brand.name }}
            </a>
          </div>
        </div>
        <!-- 价格排序 -->
        <div class="filter" v-if="!searchData.to_price">
          <div class="hint">价格:</div>
          <div class="option_box" v-if="shopData.price_range.length">
            <!-- a便签也遍历 -->
            <a
              href="javascript:;"
              v-for="price in shopData.price_range"
              :key="price.text"
              @click="priceCondition(price.from_price, price.to_price)"
            >
              {{ price.text }}
            </a>
          </div>
        </div>
        <!-- 积分排序 -->
        <div class="filter">
          <div class="hint">积分:</div>
          <div class="option_box" v-if="shopData.points_range.length">
            <!-- a便签也遍历 -->
            <a
              href="javascript:;"
              v-for="points in shopData.points_range"
              :key="points.text"
            >
              {{ points.text }}
            </a>
          </div>
        </div>
        <!-- 排序 -->
        <div class="filter">
          <div class="hint">排序:</div>
          <div class="option_box">
            <!-- a便签也遍历 -->
            <a
              href="javascript:;"
              :class="searchCriteria == '综合' ? 'active' : ''"
              @click="Criteria('综合')"
            >
              综合
            </a>
            <a
              href="javascript:;"
              :class="searchCriteria == '上架时间' ? 'active' : ''"
              @click="Criteria('上架时间')"
            >
              新品
            </a>
            <a
              href="javascript:;"
              :class="searchCriteria == '销量' ? 'active' : ''"
              @click="Criteria('销量')"
            >
              销量
              <i
                class="iconfont "
                :class="!sales ? 'icon-xia' : 'icon-shang'"
              ></i>
            </a>
            <a
              href="javascript:;"
              :class="searchCriteria == '价格' ? 'active' : ''"
              @click="Criteria('价格')"
            >
              价格
              <i
                class="iconfont"
                :class="!priceIcon ? 'icon-xia' : 'icon-shang'"
              ></i>
            </a>
          </div>
        </div>
      </div>
      <!-- 商品列表 -->
      <div class="list-box">
        <div class="listwrap">
          <div class="list-container">
            <ul class="list" v-if="shopData.product.length">
              <li v-for="item in shopData.product" :key="item.id">
                <img
                  v-lazy="`http://ceair.oss-cn-shanghai.aliyuncs.com/image${item.picUrl}`"
                />
                <div class="shopName">{{ item.name }}</div>
                <div class="tow">￥ {{ item.currentPrice }}</div>
                <div class="shop">
                  <a href="javascript:;">加入购物车</a>
                </div>
              </li>
            </ul>
            <ul class="unlist" v-else>
              <h1>哦豁，没找到这个商品</h1>
            </ul>
          </div>
          <div class="fenye" v-if="shopData.product.length">
            <Pagination
              :pageConfig="{
                total: total,
                showPageNo: 5,
                pageNo: searchData.page,
                pageSize: 24,
              }"
            />
          </div>
        </div>
      </div>
      <!-- 分页 -->
    </div>
  </div>
</template>
<script>
export default {
  name: 'search',
  data() {
    return {
      searchCriteria: '综合', // 排序方式
      oldData: '', // 排序方向标识
      priceIcon: false, // 价格排序
      sales: false, // 销售排序
      total: 0,
      searchData: {
        page: 1, // 第几页
        size: 24,
        from_price: 0, // 开始的价格
        to_price: 0, // 结束的价格
        brand_id: '', // 品牌Id
        key_word: '', // 搜索的内容
        nocheckkeyword: false,
        order_by: 0,
        order_key: '综合', // 排序方式
        category3_id: '', // 三级分类
      },
      shopData: {
        Brands: [], // 品牌
        Category3s: [], // 三级分类
        price_range: [], // 价格
        points_range: [], // 积分
        product: [], // 商品列表
      },
    }
  },
  async mounted() {
    const { key_word } = this.$route.params
    const { brand_id, category3_id } = this.$route.query
    // 搜索内容
    this.searchData.key_word = key_word
    this.searchData.brand_id = brand_id
    this.searchData.category3_id = category3_id

    // 发送请求获取商品列表和搜索条件数据
    await this.getSearchDatalist()
    // 到search页面就获取数据
    this.$bus.$on('switchPage', (switchPage) => {
      this.searchData.page = switchPage
      this.getSearchDatalist()
    })
  },
  methods: {
    // 获取商品列表和搜索条件数据
    async getSearchDatalist() {
      const promice = await this.$API.reqSearchList(this.searchData)
      const {
        Brands,
        Category3s,
        price_range,
        points_range,
        product,
        totalCount,
      } = promice.data.Data

      this.shopData = {
        Brands: Brands.slice(0, 8),
        Category3s: Category3s.slice(0, 8),
        price_range: price_range.slice(0, 8),
        points_range: points_range.slice(0, 8),
        product,
      }
      this.total = totalCount
    },
    // 点击分类获取对应的商品
    classifys(id) {
      // 修改发送请求中的category3_id
      this.searchData.category3_id = id
      // 发送请求
      this.getSearchDatalist()
    },
    // 点击品牌
    toBrand(id) {
      this.searchData.brand_id = id
      this.getSearchDatalist()
    },
    // 点击关闭品牌
    closeBrans() {
      this.searchData.brand_id = ''
      this.getSearchDatalist()
    },
    // 跳转到当前商品清理所有条件
    toSHOP() {
      const { params } = this.$route
      const options = {
        ...this.searchData,
        page: 1, // 第几页
        from_price: 0, // 开始的价格
        to_price: 0, // 结束的价格
        brand_id: '', // 品牌Id
        key_word: '', // 搜索的内容
        nocheckkeyword: false,
        order_by: 0,
        size: 24,
        order_key: '综合', // 排序方式
        category3_id: '', // 三级分类
        ...params,
      }
      this.searchData = options
      this.getSearchDatalist()
    },
    // 价格搜索条件
    priceCondition(from_price, to_price) {
      this.searchData.from_price = from_price
      this.searchData.to_price = to_price
      this.getSearchDatalist()
    },
    // 关闭价格搜索
    closePrice() {
      this.searchData.from_price = ''
      this.searchData.to_price = ''
      this.getSearchDatalist()
    },
    // 更改排序方式
    Criteria(a) {
      if (a == '价格' || a == '销量') {
        if (a === this.oldData) {
          this.searchData.order_by = !this.searchData.order_by * 1
        } else {
          this.searchData.order_by = 0
        }
        if (a === '价格') {
          this.priceIcon = !this.priceIcon
        }
        if (a === '销量') {
          this.sales = !this.sales
        }
        this.oldData = a
      }
      this.searchCriteria = a
      this.searchData.order_key = a
      this.getSearchDatalist()
    },
  },
  watch: {
    // 监视路由
    $route(to) {
      const { params } = to
      const options = {
        ...this.searchData,
        page: 1, // 第几页
        from_price: 0, // 开始的价格
        to_price: 0, // 结束的价格
        brand_id: '', // 品牌Id
        size: 24,
        key_word: '', // 搜索的内容
        nocheckkeyword: false,
        order_by: 0,
        order_key: '综合', // 排序方式
        category3_id: '', // 三级分类
        ...params,
      }
      this.searchData = options
      this.getSearchDatalist()
    },
  },
}
</script>
<style rel="stylesheet/less" lang="less" scoped>
/* 主题 */
.list-box {
  width: 100%;
  background-color: #f5f5f5;
  font-size: 14px;
  padding-top: 16px;
}
.list-box .listwrap {
  width: 1240px;
  margin: 0 auto;
  .fenye {
    width: 1240px;
    text-align: center;
    margin-top: 60px;
    padding-bottom: 60px;
  }
  .unlist {
    height: 520px;
    text-align: center;

    h1 {
      color: #999;
      font-size: 40px;
    }
  }
}
.list-box .listwrap .list {
  display: flex;
  flex-wrap: wrap;
}

.list-box .listwrap .list li {
  border: 1px solid #fff;
  width: 238px;
  height: 328px;
  background-color: #fff;
  margin: 5px 5px 15px;
  text-align: center;
  box-sizing: border-box;

  img {
    width: 130px;
    height: 130px;
    padding-top: 40px;
  }
  .shopName {
    margin-top: 30px;
    font-size: 12px;
  }
  .tow {
    padding-top: 17px;
    color: #fc532d;
  }
  .shop {
    display: none;
    width: 120px;
    height: 30px;
    border: 1px solid #fc532d;
    margin: 0 auto;
    margin-top: 10px;
    text-align: center;
    &:hover {
      background-color: #fc532d;
      a {
        color: #fff;
      }
    }
    a {
      line-height: 30px;
      color: #fc532d;
      &:hover {
        color: #fff !important;
      }
    }
  }
}
.list-box .listwrap .list li:hover {
  border: 1px solid #fc532d;
  box-sizing: border-box;
  .shop {
    display: block;
  }
}
.search {
  width: 100%;
}
.search .search-box {
  width: 100%;
  background-color: #fff;
  font-size: 14px;
}
.search .search-box .search-nav {
  width: 1240px;
  margin: 0 auto;
  height: 48px;
  line-height: 48px;
  color: #0e0e0e;
  border-bottom: 1px solid #e8e8e8;
  box-sizing: border-box;
  .screen {
    display: inline;
    padding: 3px 8px;
    background: #fff;
    border: 1px solid #ddd;
    margin-left: 5px;
    font-size: 12px;
    .brans {
      color: #fc532d;
    }
  }
}
.search .filter-box {
  background: #fff;
  font-size: 14px;
  width: 100%;
}
.search .filter-box .filter {
  width: 1240px;
  margin: 0 auto;
  height: 48px;
  line-height: 48px;
  color: #0e0e0e;
  border-bottom: 1px solid #e8e8e8;
}
.filter-box .filter .hint {
  display: inline-block;
  overflow: hidden;
  width: 60px;
  height: 48px;
  line-height: 48px;
  margin-top: -10px;
}
.filter-box .filter .option_box {
  /* overflow: hidden !important; */
  display: inline-block;
}
.filter-box .filter .option_box a {
  display: inline-block;
  white-space: nowrap;
  width: 100px;
  overflow: hidden;
  padding-right: 45px;
}
.filter-box .filter .option_box a:hover {
  color: #23ac38 !important;
}
.active {
  color: #23ac38 !important;
}
</style>
