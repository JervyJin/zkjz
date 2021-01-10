<template>
  <div>
    <van-field
      :label="abc"
      input-align="right"
      required
      
      v-model="legalObjName"
      @click="focus"
      placeholder="请选择"
      @input="onInput"
    ></van-field>
    <!-- 下拉数据 -->
    <transition name="fade">
      <ul v-show="showList">
        <li v-for="item in list" :key="item.id" @click="getText(item)">
          {{ item.objectName }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
import url from "@/service/url-config.js";
export default {
  props: {abc:String, 
  legalObjName:String,
  legalobjType:String
  },
  watch: {
    abc: {
      deep: true,
      immediate: true,
      handler(val) {
        this.abc = val;
      }
    },
    legalObjName: {
      deep: true,
      immediate: true,
      handler(val) {
        this.legalObjName = val;
      }
    }
  },
  data() {
    return {list: [],showList: false,};
  },
  methods: {
    getLegalObjectLikeName() {
      this.$http
        .post(url.getLegalObjectLikeName, {
          objectName: this.legalObjName,
          objectType: this.legalobjType,
        })
        .then((res) => {
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
      this.legalObjName = "";
      // this.getLegalObjectLikeName();
      this.showList = true;
    },
    getText(v) {
    //   let id = v.id;
    //   this.legalObjId = id;
      // this.legalObjName = v.objectName;
      this.showList = false;

    
      this.legalObjName = v.objectName;
    },
    // 选项变更 传递给父元素
    // changeOptions(v) {
    //   this.$emit("changeOptions", v);
    // },
  },
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
    list-style: none;
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