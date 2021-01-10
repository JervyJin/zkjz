<template>
  <div>
    <van-form @submit="save">
      <van-field
        :value="form.registerDate"
        label="立案时间:"
        placeholder="请输入"
        input-align="right"
        readonly
        required
        :rules="[{ required: true, message: '请选择立案时间' }]"
        @click="clickTime(1);selectDate=1;"
        :disabled="true"
      />
      <van-field
        :value="form.finishDate"
        label="办结时间:"
        placeholder="请输入"
        input-align="right"
        readonly
        required
        :rules="[{ required: true, message: '请选择办结时间' }]"
        @click="clickTime(2);selectDate=2;"
        :disabled="isDone"
      />

      <!-- 日期组件 -->
      <van-popup v-model="showDatePicker" position="bottom" :style="{ height: '40%' }">
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          title="选择年月日"
          @confirm="confirmDatePicker"
          @cancel="cancelDatePicker"
        />
      </van-popup>

      <van-field
        label="处罚结论:"
        v-model.trim="form.conclusion"
        placeholder="请输入"
        input-align="right"
        required
        :rules="[{ required: true, message: '请输入处罚结论' }]"
        :disabled="isDone"
      ></van-field>

      <!-- 附件 -->
            <div class="area">
              <div class="label">附件列表：</div>
              案件结果检测报告<uploader
                :id="form.taskId"
                :fileUrl="fileUrl4"
                :isDone="isDone"
                :type="4"
                :fileType="'application/msexcel,application/msword,application/pdf,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.wordprocessingml.document, text/plain'"
              />
              案件调查终结报告<uploader
                :id="form.taskId"
                :fileUrl="fileUrl5"
                :type="5"
                :isDone="isDone"
                :fileType="'application/msexcel,application/msword,application/pdf,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.wordprocessingml.document, text/plain'"
              />
              行政处罚相关报告<uploader
                :id="form.taskId"
                :fileUrl="fileUrl6"
                :type="6"
                :isDone="isDone"
                :fileType="'application/msexcel,application/msword,application/pdf,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.wordprocessingml.document, text/plain'"
              />
              缴费通知报告<uploader
                :id="form.taskId"
                :fileUrl="fileUrl7"
                :type="7"
                :isDone="isDone"
                :fileType="'application/msexcel,application/msword,application/pdf,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.wordprocessingml.document, text/plain'"
              />
            </div>

    

      <div class="btns-change" v-if="!isDone">
        <van-button class="prev" type="default" @click="toPrev">上一项</van-button>
        <van-button class="next" type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>

  </div>
</template>

<script>
import url from "@/service/url-config.js";
import uploader from "@/components/common/uploader";
export default {
components: {
    uploader,
  },
  props: ["isDone","xzcfId"],
  computed: {

    isYb() {
      return this.$route.path.indexOf("ybrw") > -1;
    }
  },


  data() {
    return {
 
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      showDatePicker: false, //日期弹窗
      date: "", //日历区间
   
      form:{
        registerDate:'',
        finishDate:'',
        conclusion:'',
        taskId:this.xzcfId
      },
      editForm:{
        id:'',
      },
      fileUrl4: [],
      fileUrl5: [],
      fileUrl6: [],
      fileUrl7: [],
    };
  },
  created() {
    // this.form.taskId = this.selectRow.id;
    this.getResult()
  },
  methods: {
 

    
    clickTime(v) {
      if(this.isDone) return;
      this.showDatePicker = true;
      // this.selectDate = v;
    },
    // 日期选择确定
    confirmDatePicker(v) {
      let d = v.getDate();
      d = d < 10 ? ('0' + d) : d;
      let m = v.getMinutes();
      m = m < 10 ? ('0' + m) : m;
      v = v.getFullYear() + "-" + (v.getMonth() + 1) + "-" + d + " " + v.getHours() + ":" + m;
      this.selectDate == 1
        ? (this.form.registerDate = v)
        : this.selectDate == 2
        ? (this.form.finishDate = v)
        : "";
      this.showDatePicker = false;
    },
    // 日期选择取消
    cancelDatePicker() {
      this.showDatePicker = false;
    },
 
    toPrev() {
      this.$emit("toPrev");
    },

    // 案件结果回显
    getResult() {
      this.$http.post(url.getResult, {taskId: this.xzcfId}).then(res => {
        if(res.success) {
          if (res.data) {
            this.form=res.data;
            this.editForm.id = res.data.taskId;
            // 获取附件列表
            this.$http.post(url.selectFileListByPidAndType, {pid: this.editForm.id,fileType:4}).then(res => {
              console.log(res);
              this.fileUrl4 = res.data;
            })
            this.$http.post(url.selectFileListByPidAndType, {pid: this.editForm.id,fileType:5}).then(res => {
              console.log(res);
              this.fileUrl5 = res.data;
            })
            this.$http.post(url.selectFileListByPidAndType, {pid: this.editForm.id,fileType:6}).then(res => {
              console.log(res);
              this.fileUrl6 = res.data;
            })
            this.$http.post(url.selectFileListByPidAndType, {pid: this.editForm.id,fileType:7}).then(res => {
              console.log(res);
              this.fileUrl7 = res.data;
            })
          }
        }
      })
    },

    // 保存
    save() {
      this.$http.post(url.saveResult, this.form).then(res => {
        console.log(res);
        if (res.success) {
           this.$router.push("/task/done")
          this.$toast({
            type: "success",
            message: res.message
          });
        } else {
          this.$toast({
            type: "info",
            message: res.message
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.btns-change {
  margin-top: 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.btns-change .prev {
  width: 100px;
}
.btns-change .next {
  width: 100px;
}
.area {
    padding: 13px 15px;
    border-bottom: 0.5px solid #f2f2f2;
    font-size: 14px;
    color: #646566;
  }
  .area .label {
    margin-bottom: 13px;
  }
  .area textarea {
    display: block;
    border: none;
  }

  .area .checkboxs {
    display: flex;
    justify-content: space-between;
  }
</style>