<template>
  <div>
    <!-- <van-field
      label="执法对象:"
      is-link
      placeholder="请输入关键字"
      input-align="right"
      v-model="legalObjName"
      @input="onInput"
      @focus="focus()"
      @blur="blur()"
    ></van-field> -->
    <van-search
      autofocus
      v-model="legalObjName"
      placeholder="请输入执法对象关键字"
      @input="onInput"
      @blur="blur"
    />
    <!-- 下拉数据 -->
    <transition name="fade">
      <ul v-show="showList">
        <li v-for="item in list" :key="item.id" @click="getText(item)">{{ item.objectName }}</li>
      </ul>
    </transition>
  </div>
</template>
<script>
import url from "@/service/url-config.js";
export default {
  data() {
    return {
      legalObjName: "",
      showList: false,
      list: [],
      form: {}
    };
  },
  created() {
    this.form = this.$route.query.form;
  },
  watch: {
    legalObjName(a) {
      if ((a = "")) {
        this.list = [];
        this.showList = false;
      }
    }
  },
  methods: {
    // 模糊查询数据
    getLegalObjectLikeName() {
      this.$http
        .post(url.getLegalObjectLikeName, {
          objectName: this.legalObjName,
          objectType: 2
        })
        .then(res => {
          console.log(res);
          this.list = res.data;
          this.showList = true;
        });
    },
    onInput(e) {
      console.log(e);
      this.legalObjName = e;
      this.getLegalObjectLikeName();
    },
    focus() {
      this.getLegalObjectLikeName();
      this.showList = true;
    },

    blur() {
      // this.showList = false;
    },
    getText(v) {
      let id = v.id;
      this.legalObjName = v.objectName;
      this.showList = false;

      this.form.legalobjType = 1;
      this.objType='企业'
      this.form.legalObjId = id;
      this.form.legalObjName = v.objectName;

      // window.body.click()
      this.$router.replace({
        query: {
          legalObjId: id,
          legalObjName: this.legalObjName,
          form: this.form
        },
        path: "/task/send"
      });
    }
  }
};
</script>

<style lang="less" scoped>
ul {
  box-shadow: 0px -8px 34px 0px rgba(0, 0, 0, 0.05);
  overflow: auto;
  width: 93%;
  // border-radius: 10px;
  max-height: 248px;
  margin: auto;
  color: #969799;
  font-size: 16px;
  li {
    text-align: center;
    line-height: 30px;
    border-top: 1px solid #f4f4f4;
  }
  
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>