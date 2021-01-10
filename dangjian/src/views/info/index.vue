<template>
  <div class="info">
    <!-- 党组织人员信息 -->
    <van-collapse v-model="activeNames" accordion style="display: none">
      <van-collapse-item
        :title="item.NAME"
        v-for="(item, index) in orglist"
        :key="index"
      >
        <van-collapse v-model="active" accordion>
          <van-collapse-item
            @click="goDetail(v.TYPE, v.ID)"
            :title="v.NAME"
            v-for="(v, index) in item.children"
            :key="index"
          >
            <div v-if="v.TYPE == 2">
              <router-link
                tag="span"
                :to="{ name: 'infoDetail', query: { id: v.ID } }"
                >{{ v.NAME }}</router-link
              >
            </div>
            <div class="content" v-for="(v, i) in v.children" :key="i">
              <router-link
                tag="span"
                :to="{ name: 'infoDetail', query: { id: v.ID } }"
                >{{ v.NAME }}</router-link
              >
            </div>
          </van-collapse-item>
        </van-collapse>
      </van-collapse-item>
    </van-collapse>

    <div style="background: #fff; padding: 10px 20px">
      <div
        :class="['active','wrap']"
        v-for="(v, i) in orglist1"
        :key="i"
        @click="getcur(v.ID, i,v.TYPE)"
      >
        {{ v.NAME }}<van-icon name="arrow" style="float: right;"/>

        <div class="content">
          <div
            v-for="(item, index) of orglist2"
            :key="index"
            class="flexcontent"
            v-show="cur == i"
            @click="getNextcur(item.ID, index, item.TYPE)"
          >
           
            {{ item.NAME }}<van-icon name="arrow" class="arrow"/>
          </div>
          

        </div>
      </div>

      <div v-for="(item, index) of orglist3" :key="index" class="content2">
        <span class="road">{{
          item.NAME.substring(item.NAME.length - 2)
        }}</span>
        <router-link :to="{ name: 'infoDetail', query: { id: item.ID } }">{{
          item.NAME
        }}</router-link>
      </div>
    </div>
    <!-- <div class="filter">
      <div
            v-for="(item, index) of orglist6"
            :key="index"
            class=""
           @click="getcur(v.ID, i,item.TYPE)"
           
          >
           <span class="road">{{
          item.NAME.substring(item.NAME.length - 2)
        }}</span>
            {{ item.NAME }}<van-icon name="arrow" class="arrow"/>
          </div>
    </div> -->
  </div>
</template>

<script>
import url from "@/service/url-config.js";
import Treeselect from "@riophae/vue-treeselect";
import * as dd from "dingtalk-jsapi";
export default {
  name: "index",
  components: { Treeselect },
  data() {
    return {
      activeNames: ["1"],
      active: ["1"],
      orglist1: [], //一级组织
      orglist2: [], //二级组织
      orglist3: [], //三级组织
      orglist6: [],
      cur: 0,
      orglist: [
        {
          name: "监控中心党支部",
          children: [
            {
              name: "一组",
              children: [{ name: "张三" }, { name: "李四" }],
            },
            {
              name: "二组",
              children: [{ name: "王五" }, { name: "赵六" }],
            },
            {
              name: "三组",
              children: [{ name: "李七" }, { name: "张八" }],
            },
          ],
        },
        {
          name: "执法中心党支部",
        },
      ],
    };
  },
  created() {
    
    // this.getOrgUserTree();
    this.getTopPartyOrgList();
    /* 设置导航栏标题 */
    dd.ready(() => {
      dd.biz.navigation.setTitle({
        title: "党组织结构", // 控制标题文本，空字符串表示显示默认文本
      });
    });
  },
  methods: {
    getTopPartyOrgList() {
     
      this.$http.post(url.getTopPartyOrgList).then((res) => {
        this.orglist1 = res.data.orglist;
      });
    },
    getcur(id, index,filter) {
      this.cur = index;
      this.orglist3 = [];
      this.$http.post(url.getLowerPartyOrgListById, { id: id }).then((res) => {
        this.orglist2 = res.data.orglist;
        console.log(res.data.orglist,'vvvvv');
          // if(filter==2){
          //   this.orglist6 = res.data.orglist.filter(item =>{
          //     return item.TYPE!='2';
          //   })
          // }else if(filter==1){
          //   this.orglist2 = res.data.orglist.filter(item =>{
          //     return item.TYPE!='1';
          //   })
          // }
      });
    },
    getNextcur(id, index, type) {
      this.$http
        .post(url.getLowerPartyUserListByOrgId, { id: id })
        .then((res) => {
          this.orglist3 = res.data.partyUserlist;
          
        });
      if (type == 2)
        this.$router.push({ name: "infoDetail", query: { id: id } });
    },

    // getOrgUserTree() {
    //   this.$http.post(url.getOrgUserTree).then((res) => {
    //     this.orglist = res.data.orglist;
    //   });
    // },

    goDetail(type, id) {
      if (type == 2)
        this.$router.push({
          name: "infoDetail",
          query: { id: id },
        });
    },
  },
};
</script>

<style lang="less" scoped>
.wrap{
     
          padding: 15px 0;
    border-bottom: 1px solid #ccc;
    &:last-child{
      border-bottom: none;
    }
    }
.info {
  /deep/.van-cell {
    font-size: 15px;
  }
  /deep/.van-collapse-item__content {
    color: #4f4f4f;
  }
  .content {
    padding-left: 15px;
    .flexcontent{
      display: flex;
      justify-content: space-between;
          padding: 15px 0;
    border-bottom: 1px solid #ccc;
    &:last-child{border-bottom:none;padding-bottom: 0;}
    }
  }
  .road {
      display: inline-block;
      width: 48px;
      height: 40px;
      background: skyblue;
      color: snow;
      font-size: 13px;
      border-radius: 50%;
      text-align: center;
      line-height: 40px;
    }
  .content2 {
    box-sizing: border-box;
    display: flex;
    // justify-content: space-between;
    align-items: center;
    
    a{
      display: inline-block;
      color: #333;
    width: 100%;
    padding: 15px;
    border-bottom: 1px solid #ccc;
    }
  }
}
</style>
