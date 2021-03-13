<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3 style="display:inline-block">收获地址</h3>
        <el-button
          style="font-size:12px; margin-left:10px"
          @click="openAdd"
          type="text"
          >新建地址</el-button
        >
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" fixed label="收货人" width>
        </el-table-column>
        <el-table-column prop="tele" label="电话" width> </el-table-column>
        <el-table-column prop="region" label="所在地" width> </el-table-column>
        <el-table-column prop="desc" label="收货地址" width> </el-table-column>
        <el-table-column class-name="caozuo" fixed="right" label="操作" width>
          <template slot-scope="scope">
            <div class="tag">
              <el-button
                @click="handleMoRen(scope)"
                v-if="!scope.row.isMoRen"
                type="text"
                size="small"
                >设置为默认</el-button
              >
              <div v-else class="changeMoren">
                默认
              </div>
            </div>
            <el-button @click="handleClick(scope)" type="text" size="small"
              >编辑</el-button
            >
            <el-button type="text" @click="handleDel(scope.row)" size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加地址表单 -->
    <AddressAlert :ruleForm="ruleForm" :changeAddress="changeAddress" />
    <!--   <el-dialog
      custom-class="dialog"
      :visible.sync="dialogFormVisible"
      width="438px"
      show-close
      center
    >
      <div class="dialog_title">
        收货地址
        <button class="close_title" @click="dialogFormVisible = false">
          x
        </button>
      </div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        size="mini"
      >
        <el-form-item label="收货人" prop="name">
          <el-input
            v-model="ruleForm.name"
            placeholder="请输入收货人姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="地  址" prop="region">
          <el-select
            v-model="ruleForm.region[0]"
            placeholder="请选择活动区域"
            class="elect"
          >
            <el-option label="北京" value="北京"></el-option>
            <el-option label="广东" value="广东"></el-option>
          </el-select>
          <el-select class="elect_2" v-model="ruleForm.region[1]">
            <el-option label="北京市" value="北京市"></el-option>
            <el-option label="深圳" value="深圳"></el-option>
          </el-select>
          <el-select class="elect_3" v-model="ruleForm.region[2]">
            <el-option label="海淀" value="海淀"></el-option>
            <el-option label="保安" value="保安"></el-option>
          </el-select>
          <el-input
            type="textarea"
            placeholder="请输入详细信息"
            v-model="ruleForm.desc"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="name">
          <el-input
            v-model="ruleForm.tele"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handelAdd('ruleForm')"
          >保 存</el-button
        >
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({ tableData: state => state.address.tableData })
  },
  methods: {
    // 设置默认
    handleMoRen(scope) {
      const {
        row: { id }
      } = scope;
      // console.log(this);
      this.tableData.forEach(item => {
        item.isMoRen = false;
        if (item.id === id) {
          item.isMoRen = true;
        }
      });
    },
    // 编辑
    handleClick(scope) {
      this.changeAddress = true;
      this.$bus.$emit("open", true);
      const { name, region, desc, tele, isMoRen, id } = scope.row;
      // console.log(scope.row);
      this.ruleForm = {
        name,
        region,
        desc,
        tele,
        isMoRen,
        id
      };
    },
    // 删除
    handleDel(row) {
      console.log(row);
      this.$store.dispatch("dele", row.id);
    },
    // 点击新建地址
    openAdd() {
      this.$bus.$emit("open", true);
      this.ruleForm = {
        name: "", //收集的姓名
        region: [], //选择地址
        desc: "", //详细地址
        tele: "" //电话
      };
    }
  },
  data() {
    return {
      changeAddress: false, // 点击编辑按钮
      dialogTableVisible: false, //保单是否显示
      // 每一项数据的具体信息再点击新建的时候展示的
      dialogFormVisible: false,
      ruleForm: {
        isMoRen: false,
        name: "", //收集的姓名
        region: [], //选择地址
        desc: "", //详细地址
        tele: "" //电话
      }
      // 表单验证
      /*  rules: {
          name: [
            { required: true, message: "请输入活动名称", trigger: "blur" },
            { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
          ],
          region: [
            { required: true, message: "请选择活动区域", trigger: "blur" },
            { required: true, message: "请选择活动区域", trigger: "blur" },
            { required: true, message: "请选择活动区域", trigger: "blur" }
          ],
          desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
          tele: []
        } */
    };
  }
};
</script>

<style>
.tag {
  display: inline-block;
  height: 20px;
  width: 60px;
  text-align: center;
  margin-right: 5px;
}

.changeMoren {
  height: 20px;
  width: 60px;
  border-radius: 20px;
  display: inline-block;
  background-color: #f63;
}

/* 添加地址 */
.elect {
  background-color: springgreen;
  width: 288px;
}

.elect_2 {
  width: 130px;
  display: inline-block;
}

.elect_3 {
  margin-left: 28px;
  width: 130px;
  display: inline-block;
}

.dialog {
  position: relative;
  font-size: 16px;
  border-radius: 5px;
}

.dialog_title {
  width: 438px;
  height: 40px;
  position: absolute;
  background-color: #d7d7d7;
  top: 0px;
  left: 0;
  line-height: 40px;
  padding-left: 10px;
  box-sizing: border-box;
  border-radius: 5px 5px 0 0;
}

.close_title {
  position: absolute;
  right: 15px;
  line-height: 40px;
  border: none;
  background-color: transparent;
  outline: none;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
  border: 1px solid #eee;
  box-shadow: 0 0 2px 1px #eee;
}
</style>
