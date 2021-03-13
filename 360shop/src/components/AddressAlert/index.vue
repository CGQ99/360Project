<template>
  <el-dialog
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
      ref="rulesForm"
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
          <el-option label="宝安" value="宝安"></el-option>
        </el-select>
        <el-input
          type="textarea"
          placeholder="请输入详细信息"
          v-model="ruleForm.desc"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="name">
        <el-input v-model="ruleForm.tele" placeholder="请输入手机号"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handelAdd('ruleForm')">保 存</el-button>
      <el-button @click="dialogFormVisible = false">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "",
  props: {
    ruleForm: Object, //传入的弹出框的值
    changeAddress: Boolean //是否是点击编辑进入的
  },
  data() {
    return {
      dialogFormVisible: false,
      rules: {
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
      }
    };
  },
  mounted() {
    this.$bus.$on("open", obj => {
      this.dialogFormVisible = obj;
    });
  },
  methods: {
    handelAdd(formName) {
      // 点击的是编辑进入的
      if (this.changeAddress) {
        // this.changeAddress = false;
        console.log(this.changeAddress, "new");
        this.$bus.$on("bianji", data => {
          console.log(data, "new");
          const { name, region, desc, tele, isMoRen, id } = data;
          this.ruleForm = {
            name,
            region,
            desc,
            tele,
            isMoRen,
            id
          };
          this.$store.dispatch("getAddress", this.ruleForm);
        });
        // console.log(this.ruleForm);
      } else {
        // 获取到新添加的地址的数据
        this.ruleForm = {
          name: "", //收集的姓名
          region: [], //选择地址
          desc: "", //详细地址
          tele: "" //电话
        };
        const newAdd = this.$refs[formName].model;
        const { name, region, desc, tele } = newAdd;
        this.ruleForm = {
          name,
          region,
          desc,
          tele,
          isMoRen: false
        };
      }

      this.dialogFormVisible = false;
      this.$store.dispatch("getAddress", this.ruleForm);
    }
  }
};
</script>

<style></style>
