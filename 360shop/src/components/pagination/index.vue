/* eslint-disable vue/no-use-v-if-with-v-for */ /* eslint-disable
vue/no-use-v-if-with-v-for */
<template>
  <div class="pagination">
    <!-- 上一页按钮 -->
    <button @click="switchPage(currentPage - 1)" :disabled="currentPage == 1">
      上一页
    </button>
    <!-- 第一页 -->
    <button v-if="startEnd.start > 1" @click="switchPage(1)">1</button>

    <!-- 第一个... -->
    <button disabled v-if="startEnd.start > 2" @click="switchPage(1)">
      ...
    </button>
    <!-- 连续页面 -->
    <!-- eslint-disable-next-line vue/no-use-v-if-with-v-for -->
    <!--  eslint-disable-next-line  -->
    <button
      v-if="num >= startEnd.start"
      v-for="num in startEnd.end"
      :key="num"
      :class="{ active: num === currentPage }"
      @click="switchPage(num)"
    >
      {{ num }}
    </button>

    <!-- 第二个... -->
    <button disabled v-if="startEnd.end < lastPage - 1">...</button>
    <!-- 最后一页 -->
    <button v-if="startEnd.end !== lastPage" @click="switchPage(lastPage)">
      {{ lastPage }}
    </button>
    <!-- 下一页按钮 -->
    <button
      @click="switchPage(currentPage + 1)"
      :disabled="currentPage == lastPage"
    >
      下一页
    </button>
    <!-- 一共多少条数据 -->
    <button>共{{ pageConfig.total }}条</button>
  </div>
</template>
<script>
export default {
  name: 'Pagination',
  // 接收得数据
  props: {
    pageConfig: {
      // 设置默认数据
      default: () => ({
        total: 0, // 一共有多少条数据
        pageNo: 1, // 默认显示第一页数据
        pageSize: 3, // 默认每页显示3条数据
        showPageNo: 5, // 连续页面数为5
      }),
    },
  },
  data() {
    return {
      currentPage: this.pageConfig.pageNo, // 显示第几页数据
    }
  },
  watch: {
    'pageConfig.pageNo'(val) {
      this.currentPage = val
    },
  },
  //计算属性
  computed: {
    // 计算一共有多少页
    lastPage() {
      const { total, pageSize } = this.pageConfig
      console.log(total, pageSize)
      return Math.ceil(total / pageSize)
    },
    // 计算连续页面的开始页和起始页
    startEnd() {
      const {
        currentPage,
        pageConfig: { showPageNo },
        lastPage,
      } = this
      // 开始页
      let start = currentPage - Math.floor(showPageNo / 2)
      // 开始页小于1了就让他等于1
      if (start < 1) {
        start = 1
      }
      // 计算结束页
      let end = start + showPageNo - 1
      if (end > lastPage) {
        end = lastPage
        // 重新计算开始页
        start = end - showPageNo + 1
        if (start < 1) {
          start = 1
        }
      }
      return { start, end }
    },
  },
  methods: {
    switchPage(currentPage) {
      this.currentPage = currentPage
      this.$bus.$emit('switchPage', this.currentPage)
    },
  },
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;
    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }
    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
