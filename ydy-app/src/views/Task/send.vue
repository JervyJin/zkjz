<template>
  <div class="page">
    <van-form @submit="submit" res="form">
      <van-field
        v-model="form.areaName"
        label="区域："
        input-align="right"
        is-link
        readonly
        required
        :rules="[{ required: true, message: '请选择区域' }]"
        @click="
          show = true;
          status = 4;
        "
        placeholder="请选择"
      >
      </van-field>

      <van-field
        v-model="form.objTask"
        label="任务类型："
        input-align="right"
        is-link
        readonly
        required
        :rules="[{ required: true, message: '请选择任务类型' }]"
        @click="
          show = true;
          status = 1;
        "
        placeholder="请选择"
      >
        <!-- <span><span class="star">*</span>任务类型：</span>
        <span :class="form.taskType ? '' : 'noData'" @click="selectHandle">{{form.taskType || '请选择'}}<van-icon name="arrow" /></span>-->
      </van-field>

      <van-field
        v-model="form.objType"
        label="执法对象类型:"
        input-align="right"
        is-link
        readonly
        required
        :rules="[{ required: true, message: '请选择执法对象类型' }]"
        @click="
          show = true;
          status = 2;
        "
        placeholder="请选择"
      >
        <!-- <span><span class="star">*</span>执法对象类型：</span>
        <span :class="form.objType ? '' : 'noData'" @click="selectHandle">{{form.objType || '请选择'}}<van-icon name="arrow" /></span>-->
      </van-field>
      <van-field
        label="执法对象:"
        input-align="right"
        required
        readonly
        v-model="form.legalObjName"
        @click="focus"
        :placeholder="form.legalobjType == 1 ? '请选择' : '请输入'"
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

      <!-- <div class="item">
        <div>执法对象：</div>
        <span :class="form.taskObj ? '' : 'noData'" @click="selectHandle">{{form.taskObj || '请选择'}}<van-icon name="arrow" /></span>   
      </div>-->
      <van-field
        v-model="form.dispatchDate"
        label="派发日期:"
        input-align="right"
        is-link
        readonly
        required
        :rules="[{ required: true, message: '请选择派发日期' }]"
        @click="
          showDatePicker = true;
          selectDate = 1;
        "
        placeholder="请选择"
      ></van-field>

      <van-field
        v-model.trim="form.taskName"
        rows="1"
        autosize
        input-align="right"
        label="任务名称："
        type="textarea"
        placeholder="请输入"
        required
        :rules="[{ required: true, message: '请输入任务名称' }]"
      />

      <van-field
        v-model.trim="form.taskComment"
        rows="1"
        autosize
        input-align="right"
        label="主要内容："
        type="textarea"
        placeholder="请输入"
        required
        :rules="[{ required: true, message: '请输入主要内容' }]"
      />

      <van-field
        v-model="form.level"
        label="紧急程度："
        input-align="right"
        is-link
        readonly
        required
        :rules="[{ required: true, message: '请选择紧急程度' }]"
        @click="
          show = true;
          status = 3;
        "
        placeholder="请选择"
      ></van-field>
      <van-field
        v-model="form.caseSourceName"
        label="案件来源:"
        placeholder="请输入"
        input-align="right"
        required
        readonly
        @click="
          show = true;
          status = 7;
        "
        :rules="[{ required: true, message: '请输入' }]"
      />
      <van-field
        v-model="form.requireFinishTime"
        label="要求完成时间:"
        input-align="right"
        is-link
        readonly
        required
        :rules="[{ required: true, message: '请选择要求完成时间' }]"
        @click="
          showDatePicker = true;
          selectDate = 2;
        "
        placeholder="请选择"
      ></van-field>

      <van-field
        label="检查单位:"
        placeholder="请选择"
        input-align="right"
        readonly
        required
        @click="clickHandle('org')"
      >
        <template #input>
          <treeselect
            v-model="form.orgName"
            :options="dicts.orgs"
            :normalizer="normalizer"
            @select="onSelectOrg"
     
            placeholder="选择组织"
          />
        </template>
      </van-field>
      <!-- <van-action-sheet v-model="showOrgs">
        <TreeSelect
          :items="options"
          :active-id.sync="activeId"
          :main-active-index.sync="activeIndex"
          @click-item="onSelectOrg"
        />
      </van-action-sheet> -->
      <van-field
        v-model="form.zuban"
        label="主办人："
        input-align="right"
        is-link
        readonly
        required
        :rules="[{ required: true, message: '请选择主办人' }]"
        @click="show_zuban(5)"
        placeholder="请选择"
      ></van-field>

      <div v-for="(item, index) in form.zfrlists" :key="index">
        <p class="title">
          <span v-if="index < 1">协办人明细</span>
          <span @click="del(index)" class="del" v-if="index > 0">删除</span>
        </p>
        <van-field
          v-model="item.xieban"
          :label="
            form.zfrlists.length > 1
              ? '协办人(' + (index + 1) + ')：'
              : '协办人：'
          "
          input-align="right"
          is-link
          readonly
          required
          :rules="[{ required: true, message: '请选择协办人' }]"
          @click="
            show_zuban(6);
            zfrIndex = index;
          "
          placeholder="请选择"
        ></van-field>
      </div>
      <p class="add" @click="add">添加协办人</p>
      <!-- <autocomplete :abc="'菜单隧道灯：'" :legalObjName="form.legalObjName" :legalobjType="form.legalobjType" /> -->
      <!-- <van-field
        v-model="form.xieban"
        label="协办人："
        input-align="right"
        is-link
        readonly
        required
        :rules="[{ required: true, message: '请选择协办人' }]"
        @click="show=true;status=6;"
        placeholder="请选择"
      ></van-field> -->

      <!-- <div v-for="(item,index) in zfrlists" :key="index" class="zhifarenList">
        <p>
          <span></span>
          <span @click="del(index)" style="color:#037afc;">删除</span>
        </p>
        <van-field
        v-model="xieban"
        label="协办人："
        input-align="right"
        is-link
        readonly
        required
        :rules="[{ required: true, message: '请选择协办人' }]"
        @click="show=true;Xstatus=Xindex"
      ></van-field>
      </div>-->

      <!-- <p class="add" @click="add"><van-icon name="plus" />添加协办人</p> -->
      <!-- <div class="area">
        <div class="label">上传附件：</div>
        <uploader />
      </div> -->
      <van-button
        class="btn-submit"
        native-type="submit"
        type="primary"
        block
        color="#1890FF"
        >派发任务</van-button
      >
    </van-form>

    <van-action-sheet
      v-model="show"
      :actions="actions1"
      @select="onSelect"
      v-if="status == 1"
    />
    <van-action-sheet
      v-model="show"
      :actions="actions2"
      @select="onSelect"
      v-if="status == 2"
    />
    <van-action-sheet
      v-model="show"
      :actions="actions3"
      @select="onSelect"
      v-if="status == 3"
    />
    <van-action-sheet
      v-model="show"
      :actions="actions4"
      @select="onSelect"
      v-if="status == 4"
    />
    <van-action-sheet
      v-model="show"
      :actions="actions5"
      @select="onSelect"
      v-if="status == 5"
    />
    <van-action-sheet
      v-model="show"
      :actions="actions6"
      @select="onSelectX"
      v-if="status == 6"
    />
    <van-action-sheet
      v-model="show"
      :actions="actions7"
      @select="onSelect7"
      v-if="status == 7"
    />

    <!-- 日期组件 -->
    <van-popup
      v-model="showDatePicker"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        @confirm="confirmDatePicker"
        @cancel="cancelDatePicker"
      />
    </van-popup>
  </div>
</template>

<script>
import url from "@/service/url-config.js";
// import { TreeSelect } from "vant";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
// import uploader from '@/components/common/uploader'
// import autocomplete from '@/components/common/autocomplete'
export default {
  name: "send",
  components: {
    Treeselect,
    // uploader,
    // autocomplete
  },
  data() {
    return {
      list: [],
      showList: false,

      show: false, //主办协办人弹窗
      showOrgs: false,
      status: 0,

      selectDate: 0, // 选中第几个日期

      actions1: [],
      actions2: [],
      actions3: [],
      actions4: [],
      actions5: [],
      actions6: [],
      actions7: [],

      options: [{ text: "分组 1" }, { text: "分组 2" }],
      activeId: 1,
      activeIndex: 0,

      form: {
        areaName: "",
        areaCode: "",
        taskType: "",
        legalobjType: "",
        legalObjName: "",
        legalObjId: "",
        taskName: "",
        taskComment: "",
        urgency: "",
        sponsor: "", //主办
        cosponsor: "", //协办
        zfrlists: [{ xieban: "", cosponsor: "" }],
        dispatchDate: "",
        requireFinishTime: "",
        caseSource: "", //案件来源
        caseSourceName: "", //案件来源名称

        level: "",
        objType: "",
        objTask: "",
        zuban: "",
        xieban: "",
        orgName: null,
      },
      zfrIndex: 0, // 当前选中协办人索引
      level: "",
      objType: "",
      objTask: "",
      zuban: "",
      xieban: "",
      showPicker: false,
      // 组织树
      dicts: {
        orgs: [],
        defaultMenusProps: {
          children: "children",
          label: "name",
        },
        checkmenu: [],
        userData: [],
        resultData: [],
      },
      // 获取组织树下人员
      orgForm: {
        pageIndex: "1",
        pageSize: "10",
        orgId: "",
      },

      showDatePicker: false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
    };
  },

  methods: {
    clickHandle() {
      this.options = this.dicts.orgs;
      //   console.log(this.options)
      this.showOrgs = true;
    },
    
    onSelectOrg(v) {
      // console.log(v, 909);
      // this.form.orgName = v.name;
      // this.orgForm.orgId = v.id;
      // this.showOrgs = false;

      // 根据组织id请求组织下的人员列表。
      this.$http
        .post(url.getUserAndEnforcenumIsNotNull, this.orgForm)
        .then((res) => {
          console.log(res, "nnnnn");
          this.actions5 = res.data.list.length ? res.data.list : [];
          this.actions6 = res.data.list.length ? res.data.list : [];
        });
    },
    // 获取组织方法
    //选完组织后弹窗关闭,
    getUserData() {
      this.$http.post(url.getOrgTree, {}).then((res) => {
        console.log(res.data, "组织树");
        this.dicts.orgs = res.data;

        // this.dicts.orgs.forEach(v => {
        //   v.text = v.name;
        //   this.orgForm.orgId = v.id;
        //   if (v.children) {
        //     v.children.forEach(v => {
        //       v.text = v.name;
        //       this.orgForm.orgId = v.id;
        //     });
        //   }
        // });
        // this.activeId = this.dicts.orgs[0].id;
      });
    },
    /*******************模糊查询开始***************************/

    getLegalObjectLikeName() {
      this.$http
        .post(url.getLegalObjectLikeName, {
          objectName: this.form.legalObjName,
          objectType: this.form.legalobjType,
        })
        .then((res) => {
          console.log(res);
          this.list = res.data;
          this.showList = true;
        });
    },
    onInput(e) {
      console.log(e);
      this.form.legalObjName = e;
      this.getLegalObjectLikeName();
    },
    focus() {
      this.form.legalObjName = "";
      // this.getLegalObjectLikeName();
      this.showList = true;
    },
    getText(v) {
      let id = v.id;
      // this.form.legalObjName = v.objectName;
      this.showList = false;

      // // this.form.legalobjType = 1;
      // this.objType='企业'
      this.form.legalObjId = id;
      this.form.legalObjName = v.objectName;
    },
    /* ******************模糊查询结束******************************** */
    add() {
      let a = { xieban: "", cosponsor: "" };
      this.form.zfrlists.push(a);
    },
    del(index) {
      this.form.zfrlists.splice(index, 1);
    },

    /* 区域数据 */
    getArea() {
      this.$http.post(url.getArea, {}).then((res) => {
        if (res.success) {
          this.actions4 = res.data;
        }
      });
    },
    /* 主办 */
    // getUserData1() {
    //   this.$http.post(url.getUsers, {}).then(res => {
    //     this.actions5 = res.list.length ? res.list : [];
    //   });
    // },
    // // 协办人
    // getUserData2() {
    //   this.$http.post(url.getUsers, {}).then(res => {
    //     this.actions6 = res.list.length ? res.list : [];
    //   });
    // },

    /* 获取类型字典 */
    getTypeList(type) {
      this.$http
        .post(url.getDictOption, {
          type: type,
        })
        .then((res) => {
          if (type == 3) {
            this.actions1 = res.filter((v) => {
              return v.name != "双随机任务";
            });
          } else if (type == 4) {
            this.actions2 = res;
          } else if (type == 5) {
            this.actions3 = res;
          }
        });
    },

    // 获取案件来源
    getDictOption() {
      this.$http.post(url.getDictOption, { type: 13 }).then((res) => {
        this.actions7 = res;
      });
    },

    // 日期选择确定
    confirmDatePicker(v) {
      let d = v.getDate();
      d = d < 10 ? "0" + d : d;
      v = v.getFullYear() + "-" + (v.getMonth() + 1) + "-" + d;
      this.selectDate == 1
        ? (this.form.dispatchDate = v)
        : this.selectDate == 2
        ? (this.form.requireFinishTime = v)
        : "";
      this.showDatePicker = false;
    },
    // 日期选择取消
    cancelDatePicker() {
      this.showDatePicker = false;
    },
    selectHandle(e) {
      this.show = true;
    },
    show_zuban(index) {
      if (this.form.orgName == null) {
        this.$toast("请先选择单位！！");
        return;
      } else {
        if (index == 5) {
          this.show = true;
          this.status = 5;
        } else if (index == 6) {
          this.show = true;
          this.status = 6;
        }
      }
    },
    normalizer(node) {
      //去掉children=[]的children属性
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.id,
        label: node.name,
        children: node.children,
      };
    },
  
    
    /* 提交按钮 */
    submit() {
      let data = JSON.parse(JSON.stringify(this.form));
      data.cosponsor = data.zfrlists.map((v) => v.cosponsor).join();
      data.xieban = data.zfrlists.map((v) => v.xieban).join();
      delete data.zfrlists;
      this.$http.post(url.addTask, data).then((res) => {
        if (res.code == 200) {
          this.$toast({
            message: "派发成功！",
          });
          // this.form={}
          this.$router.push("/task/todo");
        }
      });
    },
    /* 附件 */
    // chooseFile() {

    // },
    onSelect(i) {
      this.show = false;
      if (i.typeName == "任务类型") {
        this.form.taskType = i.code;
        this.form.objTask = i.name;
      } else if (i.typeName == "执法对象类型") {
        this.form.legalobjType = i.code;
        this.form.objType = i.name;
        this.form.legalObjName = "";
        this.getLegalObjectLikeName();
      } else if (i.typeName == "紧急程度") {
        this.form.urgency = i.code;
        this.form.level = i.name;
      } else if (i.orderby) {
        this.form.areaName = i.name;
        this.form.areaCode = i.id;
      } else if (i.userName || i.username) {
        this.form.sponsor = i.id;
        this.form.zuban = i.name;
      }
    },
    onSelectX(i) {
      // this.form.xieban = i.name;
      // this.form.cosponsor = i.id;
      this.form.zfrlists[this.zfrIndex].xieban = i.name;
      this.form.zfrlists[this.zfrIndex].cosponsor = i.id;
      this.show = false;
    },
    onSelect7(i) {
      this.show = false;
      this.form.caseSourceName = i.name;
      this.form.caseSource = i.code;
    },

    onClose() {
      this.showPicker = false;
    },

    // 切换选择条件
    changeOptions(v) {
      console.log(v);
    },
  },

  created() {
    this.getUserData();

    this.getTypeList(3); //任务类型
    this.getTypeList(4); //执法对象类型
    this.getTypeList(5); //紧急程度
    this.getArea(); //区域

    // this.getUserData1(); //组办人
    // this.getUserData2();
    if (this.$route.query.legalObjId) {
      this.form.legalobjType = 1;
      this.objType = "企业";
      this.form = this.$route.query.form;
      // this.form.legalObjId = this.$route.query.legalObjId;
      // this.form.legalObjName = this.$route.query.legalObjName;
    }
    this.getDictOption();
  },
};
</script>

<style lang="less" scoped>
.page {
  height: calc(100vh - 44px);
  overflow-y: auto;
  .title {
    padding-left: 10px;
    color: #037afc;
    font-size: 15px;
  }
  .add {
    color: #037afc;
    text-align: right;
    padding: 0 10px;
    margin: 0;
    font-size: 14px;
  }
  .del {
    float: right;
    color: #f22424;
    padding-right: 15px;
  }
  .container {
    padding: 3px 15px 20px;
  }
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 13px 0;
    border-bottom: 0.5px solid #f2f2f2;
  }
  .star {
    display: inline;
    color: #f22424;
  }
  .item input {
    text-align: right;
  }
  .item .radio {
    margin-left: 40px;
  }
  .area {
    padding: 13px;
    border-bottom: 0.5px solid #f2f2f2;
  }
  .area .label {
    margin-bottom: 13px;
  }
  .area textarea {
    display: block;
    border: none;
  }
  .noData {
    color: #cccccc;
  }

  .btn-submit {
    border-radius: 2px;
    margin-top: 30px;
  }

  .zhifarenList {
    p {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 15px 0;
      color: #908f94;
      font-size: 15px;
    }
  }
  ul li {
    list-style: none;
  }
  ul li span {
    margin: 0 30px;
    line-height: 30px;
  }
}
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
/deep/ .vue-treeselect__control,
/deep/ .vue-treeselect__placeholder,
/deep/ .vue-treeselect__single-value {
  height: 30px;
  line-height: 30px;
}
</style>
