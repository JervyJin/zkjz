<template>
  <div class="page">
    <van-form @submit="submit" res="form">
      <van-field
        v-model.trim="form.MEETINGNAME"
        rows="1"
        autosize
        input-align="right"
        label="会议主题："
        type="textarea"
        placeholder="请输入"
        required
        readonly
        :rules="[{ required: true, message: '请输入会议主题' }]"
      />

      <van-field
        v-model="form.MEETINGTYPE"
        label="会议类型："
        input-align="right"
        is-link
        required
  
        :rules="[{ required: true, message: '请选择任务类型' }]"
        readonly
        placeholder="请选择"
      >
      </van-field>
      <van-field
        v-model="form.openingtime"
        label="召开时间:"
        input-align="right"
        is-link
        required
        readonly
        @click="IsshowDatePicker"
        :rules="[{ required: true, message: '请选择召开时间' }]"
        
        placeholder="请选择"
      ></van-field>

      <van-field
        v-model.trim="form.MEETINGPLACE"
        rows="1"
        autosize
        input-align="right"
        label="会议地点："
        type="textarea"
        placeholder="请输入"
        required
        readonly
        :rules="[{ required: true, message: '请输入会议地点' }]"
      />

      <van-field
        v-model="form.PARTICIPANTSNAMES"
        label="参会人员："
        input-align="right"
        is-link
        readonly
        required
        :rules="[{ required: true, message: '请选择参会人员' }]"
       
        placeholder="请选择"
      ></van-field>
      <van-field
        v-model="form.MODERATORNAME"
        label="会议主持人："
        input-align="right"
        is-link
        readonly
        required
        :rules="[{ required: true, message: '请选择会议主持人' }]"
        placeholder="请选择"
      ></van-field>
      <van-field
        v-model="form.AGENDA"
        rows="1"
        autosize
        input-align="right"
        label="会议议程："
        type="textarea"
        placeholder="请输入"
        required
        readonly
        :rules="[{ required: true, message: '请输入会议议程' }]"
      />
      <van-field name="uploader" label="相关附件：">
        <template #input>
          <uploader
            :id="userid"
            :disabled="0"
            :fileUrl="fileUrl"
            :fileId="filePid"
            @showguid="toShowguid"
            :type="6101"
            :fileType="'application/msexcel,application/msword,application/pdf,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.wordprocessingml.document, text/plain'"
          />
        </template>
      </van-field>
      <van-field name="uploader" label="会议纪要：" required :rules="[{ required: true, message: '请上传会议纪要' }]" v-if="type==3">
        <template #input>
          <uploader
            :disabled="1"
            :id="userid"
            :fileId="filePid"
            :fileUrl="fileUrl2"
            @showguid="toShowguid"
            :type="6102"
            :fileType="'application/msexcel,application/msword,application/pdf,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.wordprocessingml.document, text/plain'"
          />
        </template>
      </van-field>
      <van-field name="uploader" label="现场图片：" required :rules="[{ required: true, message: '请上传现场图片' }]" v-if="type==3">
        <template #input>
          <uploader
            :disabled="1"
            :id="userid"
            :fileId="filePid"
            :fileUrl="fileUrl3"
            @showguid="toShowguid"
            :type="6103"
            :fileType="'image/*'"
          />
        </template>
      </van-field>

      <van-button style="position: fixed;
    bottom: 0;"  v-if="type==1 && formatData(form.openingtime)>newDate" class="btn-submit" native-type="submit" type="danger" block
        >保存</van-button
      >
    </van-form>

    <!-- 日期组件 -->
    <van-popup
      v-model="showDatePicker"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="datetime"
        title="选择年月日"
        @confirm="confirmDatePicker"
        @cancel="cancelDatePicker"
      />
    </van-popup>
    <!-- 会议类型组件 -->
    <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
  </div>
</template>

<script>
import dayjs from 'dayjs'
import url from "@/service/url-config.js";
import config from '@/service/config'
import * as dd from "dingtalk-jsapi"; // 此方式为整体加载，也可按需进行加载
let userinfo = JSON.parse(window.localStorage.getItem("userinfo"));
import uploader from "@/components/common/uploader";

export default {
  name: "send",
  components: {
    uploader,
  },
  computed: {
    type(){
      return this.$route.query.type;
    },
    
    userid(){
      return userinfo.userId
    }
  },
 
  data() {
    return {
      list: [],
      newDate:dayjs(new Date()).format("YYYY-MM-DD HH:mm"),
  
      show: false,
      actions: [
       
      ],
      meetingtypeName:'',
      filePid:'',
      form: {
        MEETINGNAME:'',
        MEETINGTYPE:'',
        openingtime:'',
        MEETINGPLACE:'',
        participantsids:'',//参会人员id
        PARTICIPANTSNAMES:'',//参会人员name
        moderatorid:'',//会议主持人id
        MODERATORNAME:'',//会议主持人name
        AGENDA:'',
        // FILEPID:'',
         userid:userinfo.userId || '061665335038032920',
        //  userid:'061665335038032920',
         
      },
      fileUrl:[],//已上传文件列表
      fileUrl2:[],
      fileUrl3:[],
      showDatePicker: false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
    };
  },

  methods: {
    ToText(HTML)
  {
      var input = HTML;
      return input.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi,'').replace(/<[^>]+?>/g,'').replace(/\s+/g,' ').replace(/ /g,' ').replace(/>/g,' ');  
  },
    formatData(v){
      return dayjs(v).format("YYYY-MM-DD HH:mm")
    },
    // 日期选择确定
    confirmDatePicker(v) {
      
      // let d = v.getDate();
      // d = d < 10 ? "0" + d : d;
      // let m = v.getMinutes();
      // m = m < 10 ? ('0' + m) : m;
      // v = v.getFullYear() + "-" + (v.getMonth() + 1) + "-" + d + " " + v.getHours() + ":" + m;
     v = dayjs(v).format("YYYY-MM-DD HH:mm")
      this.form.openingtime = v;
      
      this.showDatePicker = false;
    },
    // 日期选择取消
    cancelDatePicker() {
      this.showDatePicker = false;
    },
    IsshowDatePicker(){
      if (this.type ==1 && this.form.openingtime > this.newDate) this.showDatePicker = true;
      else this.showDatePicker = false;
    },
    selectHandle(e) {
      this.show = true;
    },
    onSelect(value,index) {
      // alert(JSON.stringify(value))
      this.actions[index].color = '#3686e7';
      this.form.MEETINGTYPE = value.index;
      this.meetingtypeName = value.name;
      this.show = false;
      this.getDicListByType();
    },
    // 会议类型
    getDicListByType(){
      this.$http.post(url.getDicListByType,{type:61}).then(res=>{
        
        this.actions = res.data.map((item,index)=>{
          return {name:item.NAME, index:item.CODE}
         
        })
       
      })
    },
    toShowguid(v){

      this.form.FILEPID = v;
    },

    // 钉钉选人
    chooseUser(userType) {
      let _this = this;
      dd.biz.contact.choose({
        multiple: true, //是否多选：true多选 false单选； 默认true
        users: [], //默认选中的用户列表，员工userid；成功回调中应包含该信息
        corpId: config.corpId, //企业id
        max: userType==1 ? 10 : 1, //人数限制，当multiple为true才生效，可选范围1-1500
        onSuccess: function (data) {
          console.log(data,'钉钉选人')
          var nameArr = [];
          var idArr = [];
          // datas = JSON.parse(data)
          data.forEach(v => {
            nameArr.push(v.name);
            idArr.push(v.emplId);
            if (userType==1) {
              _this.form.participantsnames = nameArr.join(",");
              console.log(idArr)
              console.log(nameArr)
            _this.form.participantsids = idArr.join(",")

            }else if (userType==2) {
              _this.form.moderatorname = v.name;
              _this.form.moderatorid = v.emplId;
            }
          });
        },
        onFail: function (err) {},
      });
      dd.error(error => {
        alert(`error: corpId=${config.corpId},appId=${config.appId}`);
        alert(`dd error: ${JSON.stringify(error)}`);
      });
    },

  //  获取会议详情
  getMeetingInfo(){
    this.$http.post(url.getMeetingInfo,{meetingId:this.$route.query.meetingId}).then(res=>{
      console.log(res)
      this.form = res.data;

      this.form.userid = userinfo.userId || '061665335038032920'

      this.form.AGENDA = this.ToText(res.data.AGENDA)
      this.fileUrl = res.data.DJHYGLHYFBFJ;
      this.fileUrl2 = res.data.DJHYGLHYJYFJ;
      this.fileUrl3 = res.data.DJHYGLXCZPFJ;
      this.filePid = res.data.filePid
      this.form.openingtime = dayjs(res.data.openingtime).format("YYYY-MM-DD HH:mm")
    })
  },

    /* 提交按钮 */
    submit() {
      this.$http.post(url.saveMeeting, this.form).then((res) => {
        if (res) {
          this.$toast({
            message: "发布成功！",
          });
          // this.form={}
          this.$router.push("/task");
        }
      });
      // this.$router.push("/task");
    },
  },

  created() {
    this.getDicListByType();
    this.getMeetingInfo();
    /* 设置导航栏标题 */
    dd.ready(() => {
      dd.biz.navigation.setTitle({
        title: "会议详情" // 控制标题文本，空字符串表示显示默认文本
      });
    });
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

  .container {
    padding: 3px 15px 20px;
  }

 
  .btn-submit {
    border-radius: 2px;
    margin-top: 30px;
  }
}
</style>
