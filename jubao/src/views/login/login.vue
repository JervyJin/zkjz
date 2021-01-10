<template>
  <div class="login_container">
    <div class="container_box">
      <div class="login_box">
        <div class="avatar_box">
          <!-- <img src="../../assets/img/logo.png" alt="avatar" /> -->
        </div>

        <!-- <el-container>
          <el-aside width="200px">
            <img src="../../assets/img/data.png" alt />
          </el-aside>
          <el-main>
            <el-form
              ref="loginFormRef"
              :model="loginForm"
              :rules="loginFormRules"
              label-width="70px"
              class="login_form"
            >
              <el-form-item label="账号" prop="username">
                <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input
                  v-model="loginForm.password"
                  type="password"
                  prefix-icon="iconfont icon-3702mima"
                ></el-input>
              </el-form-item>
              <el-form-item label="验证码" prop="code">
                <el-col :span="16">
                  <el-input
                    v-model="loginForm.code"
                    type
                    prefix-icon="iconfont icon-3702mima"
                    width
                  ></el-input>
                </el-col>
                <el-col :span="8">
                  <div class="coderight" @click="refreshCode">
                    <SIdentify :identifyCode="identifyCode"></SIdentify>
                  </div>
                </el-col>
              </el-form-item>
            </el-form>
          </el-main>
        </el-container> -->
        <div class="container">
          <div class="left">
            <img src="../../assets/img/data.png" alt />
          </div>
          <div class="right">
            <el-form
              ref="loginFormRef"
              :model="loginForm"
              :rules="loginFormRules"
              label-width="70px"
              class="login_form"
            >
              <el-form-item label="账号" prop="username">
                <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input
                  v-model="loginForm.password"
                  type="password"
                  prefix-icon="iconfont icon-3702mima"
                ></el-input>
              </el-form-item>
              <el-form-item label="验证码" prop="code">
                  <el-input
                    v-model="loginForm.code"
                    type
                    prefix-icon="iconfont icon-3702mima"
                    class="code"
                  ></el-input>
                  <div class="coderight" @click="refreshCode">
                    <SIdentify :identifyCode="identifyCode"></SIdentify>
                  </div>
              </el-form-item>
            </el-form>
          </div>
         </div>
        <div class="btn">
          <el-button class="btns" type="primary" @click="login">登录</el-button>
        </div>

        <!-- <el-button class="btns" type="primary" @click="login">登录</el-button> -->
        <!-- <el-button type="info" @click="resetLoginForm">重置</el-button> -->
      </div>
      <div class="copyright">
        <span>技术支持 中科九洲网络科技有限公司</span>
        <span>河南省生态环境厅环境投诉受理中心 拥有最终解释权</span>
      </div>
    </div>
  </div>
</template>

<script>
import SIdentify from "../../components/common/Identify/identify";
export default {
  components: {
    SIdentify: SIdentify
  },
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123456",
        code: ""
      },
      // 表单验证
      loginFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入用户密码", trigger: "blur" },
          { min: 6, max: 18, message: "长度在 6 到 18 个字符", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "长度在 4位数字", trigger: "blur" }
        ]
      },

      identifyCodes: "1234567890",
      identifyCode: ""
    };
  },
  methods: {
    // 表单重置按钮
    resetLoginForm() {
      // console.log(this)
      // resetFields：element-ui提供的表单方法
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      // 表单预验证
      // valid：bool类型
      this.$refs.loginFormRef.validate(async valid => {
        // console.log(valid)
        if (!valid) return false;
        this.$router.push("/index");

        // this.http.post("login", this.loginForm).then(res => {
        //   // console.log(res)
        //   if (res.meta.status !== 200) return this.$message.error("登录失败");
        //   this.$message.success("登录成功");
        //   // 1、将登陆成功之后的token, 保存到客户端的sessionStorage中; localStorage中是持久化的保存
        //   //   1.1 项目中出现了登录之外的其他API接口，必须在登陆之后才能访问
        //   //   1.2 token 只应在当前网站打开期间生效，所以将token保存在sessionStorage中
        //   window.sessionStorage.setItem("token", res.data.token);
        //   // 2、通过编程式导航跳转到后台主页, 路由地址为：/home
        //   this.$router.push("/index");
        // });
      });
    },

    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
      console.log(this.identifyCode);
    }
  },
  mounted() {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  }
};
</script>

<style lang="scss" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.container_box {
  background: #2b4b6b;
  width: 500px;
  height: 360px;
  border-radius: 3px;
  position: relative;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
}
.copyright {
  position: absolute;
  display: flex;
  justify-content: space-between;
  width: 600px;
  color: #fff;
  left: 50%;
  bottom: -38px;
  -webkit-transform: translate(-50%, -50%);
}

.login_box {
  width: 500px;
  // height: 360px;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  background-color: #fff;
  .avatar_box {
    width: 100%;
    height: 64px;
    padding: 10px;
    // box-shadow: 0 0 10px #ddd;
    background-image: url("../../assets/img/logo.png");
    background-size: cover;
  }
  .container{
    display: flex;
    height: 182px;
    .left{
      width: 175px;
      text-align: center;
      padding-top: 15px;
      
    }
    .right {
      width: 325px;
    }
  }
}
.login_form {
  // position: absolute;
  // bottom: 10px;
  padding: 20px 0;
  box-sizing: border-box;
  .el-form-item{
    margin-bottom: 16px;
  }
  .el-input{
    width: 186px;
    &.code{
      width: 114px;
    }
  }
  .el-input__inner {
    height: 28px;
  }
  .coderight{
    float: right;
    margin-right: 28px;
  }

}
.btn{
  height: 80px;
  background: #1890FF;
  border-radius: 4px 4px 0 0;
  border-radius: 4px 4px 0px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btns {
  display: flex;
  justify-content: center;
  margin-bottom: 0;
  /deep/.el-form-item__content {
    margin-left: 0 !important;
  }
}
.info {
  font-size: 13px;
  margin: 10px 15px;
}
</style>
