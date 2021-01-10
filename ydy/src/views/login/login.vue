<template>
  <div class="page">
    <div class="login-main">
      <h3 class="login-title">
        <img :src="logoSrc" alt="logo" class="logo" />郑州移动源综合管控平台
      </h3>
      <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" status-icon>
        <el-form-item prop="userName">
          <el-input v-model="dataForm.userName" placeholder="帐号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="dataForm.password" type="password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn-submit" type="primary" @click="dataFormSubmit()">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import logoSrc from "@/assets/image/logo.png";

  export default {
    data () {
      return {
        logoSrc,
        dataForm: {
          userName: 'admin',
          password: '123456'
        },
        dataRule: {
          userName: [
            { required: true, message: '帐号不能为空', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' }
          ]
        },
        captchaPath: ''
      }
    },
    computed: {
      user() {
        return this.$store.state.users.user || JSON.parse(sessionStorage.getItem('user'));
      }
    },
    watch: {
      user: {
        immediate: true,
        deep: true,
        handler() {
          this.$router.replace({name: 'page1' })
        }
      }
    },
    methods: {
      // 提交表单
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            // this.$ajax(
            //   '/login',
            //   this.dataForm
            // ).then(({data}) => {
            //   if (data && data.code === 0) {
              if(this.dataForm.userName=='admin' && this.dataForm.password=='123456') {
                this.$router.replace({name: 'page1' })
              } else {
                this.$message.error(data.msg)
              }
            // })
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .page {
    height: 100vh;
    overflow: hidden;
    background-image: linear-gradient(0deg, #3396FF 2%, #04D298 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    .login-main {
      padding: 40px;
      border: 1px solid #f2f2f2;
      // width: 295px;
      background-color: #fff;
      border-radius: 8px;
    }
    .login-title {
      font-size: 28px;
      margin-bottom: 80px;
      color: #006b66;
      .logo {
        width: 50px;
        margin-right: 20px;
      }
    }
    .login-btn-submit {
      width: 100%;
      margin-top: 38px;
      font-size: 20px;
      color: #FFFFFF;
      letter-spacing: 0.62px;
      background-image: linear-gradient(270deg, #3396FF 2%, #04D298 100%);
    }
  }
</style>
