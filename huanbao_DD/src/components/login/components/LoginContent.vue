<template>
  <div class="content">
    <!-- <input type="text" placeholder="请输入账号" v-model="phone">
    <input type="password" placeholder="请输入密码" v-model="password">-->
    <div class="landing">
      <span>手机号</span>
      <input type="text" placeholder="请输入账号" v-model="phone">
    </div>
    <div class="landing">
      <span>密码</span>
      <input type="password" placeholder="请输入密码" v-model="password">
    </div>
    <div class="login" @click="login">登录</div>
    <div class="problem">
      <router-link tag="span" to="/register">注册会员</router-link>
      <router-link tag="span" to="/retrieve">找回密码</router-link>
    </div>
  </div>
</template>

<script>
import router from "@/router";
export default {
  data() {
    return {
      phone: "",
      password: ""
    };
  },
  methods: {
    async login() {
      if (!this.phone || !this.password) {
        this.$toasted.error("请输入完善信息", { icon: "error" }).goAway(2000);
        return;
      }
      try {
        // await等待一个异步返回的结果 如果没有await 会报user is undefined 获取不到
        let res = await this.http.post("/api/login", {
          username: this.phone,
          password: this.password
        });
        if (res.code == 200) {
          this.$store.commit("loginbanner", res.data.banners);
          this.$store.dispatch("login", res.data.user);
          this.$toasted.success("登录成功").goAway(1500);
          this.$router.replace({ name: "home" });
        } else {
          this.$toasted.error(res.message, { icon: "error" }).goAway(2000);
        }
      } catch (error) {
        this.$toasted.error(error.message, { icon: "error" }).goAway(2000);
      }
    }
  }
};
</script>

<style scoped>
.content {
  width: 100%;
  padding-left: 0.6rem;
  padding-right: 0.6rem;
}
.landing {
  width: 100%;
  height: 0.9rem;
  border-bottom: 2px solid #ccc;
}
.landing > span {
  line-height: 0.9rem;
  color: #1e853c;
  font-weight: 500;
  display: inline-block;
  width: 1.36rem;
  font-size: 14px;
}
input {
       font-size: 14px;
    }
.login {
  width: 100%;
  height: 0.8rem;
  border-radius: 0.4rem;
  background: #1e853c;
  margin-top: 1.23rem;
  text-align: center;
  line-height: 0.8rem;
  font-size: 0.3rem;
  color: #ffffff;
  margin-bottom: 0.2rem;
}
.problem {
  display: flex;
  justify-content: space-between;
}
.problem span {
  text-align: center;
  font-size: 0.24rem;
  color: #1e853c;
}
</style>