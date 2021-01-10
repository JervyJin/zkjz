<template>
  <div class="page">
    <div class="container">
      <van-form @submit="save">
        <!-- <van-cell class="stepName" value="询问笔录基本信息:" /> -->
        <van-field
          v-model="form.askTimeStart"
          label="询问开始时间:"
          placeholder="请输入"
          input-align="right"
          readonly
          required
          @click="clickTime(1)"
          :rules="[{ required: true, message: '请输入询问开始时间' }]"
          :disabled="isDone"
        />
        <van-field
          v-model="form.askTimeEnd"
          label="询问结束时间:"
          placeholder="请输入"
          input-align="right"
          readonly
          @click="clickTime(2)"
          required
          :rules="[{ required: true, message: '请输入询问结束时间' }]"
          :disabled="isDone"
        />
        <van-field
          v-model.trim="form.askAddress"
          label="询问地点:"
          placeholder="请输入"
          input-align="right"
          required
          :rules="[{ required: true, message: '请输入询问地点' }]"
          :disabled="isDone"
        />
        <van-field
          v-model="form.askerName"
          label="询问人："
          placeholder="请输入"
          input-align="right"
          readonly
          @click="clickHandle('user1')"
          required
          :rules="[{ required: true, message: '请输入询问人' }]"
          :disabled="isDone"
        />
        <van-field
          v-model="form.askLegalNum"
          label="执法证号："
          placeholder="请输入"
          input-align="right"
          required
          :rules="[{ required: true, message: '请输入执法证号' }]"
          :disabled="isDone"
        />
        <van-field
          v-model="form.recorder"
          label="记录人："
          placeholder="请输入"
          input-align="right"
          readonly
          @click="clickHandle('user2')"
          required
          :rules="[{ required: true, message: '请输入记录人' }]"
          :disabled="isDone"
        />
        <van-field
          v-model="form.recorderLegalNum"
          label="执法证号："
          placeholder="请输入"
          input-align="right"
          required
          :rules="[{ required: true, message: '请输入执法证号' }]"
          :disabled="isDone"
        />
        <van-field
          v-model.trim="form.checkedPersonName"
          label="被检查人姓名："
          placeholder="请输入"
          input-align="right"
          required
          :rules="[{ required: true, message: '请输入被检查人姓名' }]"
          :disabled="isDone"
        />
        <van-field
          v-model.trim="form.checkedIdcard"
          label="身份证号:"
          placeholder="请输入"
          input-align="right"
          required
          name="pattern"
          :rules="[{ required: true, message: '请输入身份证号',pattern }]"
          :disabled="isDone"
        />
        <van-field
          v-model.trim="form.askedAdress "
          label="住址:"
          placeholder="请输入"
          input-align="right"
          required
          :rules="[{ required: true, message: '请输入住址' }]"
          :disabled="isDone"
        />
        <van-field
          v-model="form.genderName"
          label="性别:"
          placeholder="请输入"
          input-align="right"
          readonly
          @click="clickHandle('gender')"
          required
          :rules="[{ required: true, message: '请输入性别' }]"
          :disabled="isDone"
        />
        <van-field
          v-model="form.nationName"
          label="民族:"
          placeholder="请输入"
          input-align="right"
          readonly
          @click="clickHandle('nation')"
          required
          :rules="[{ required: true, message: '请输入民族' }]"
          :disabled="isDone"
        />
        <van-field
          v-model.trim="form.askedPhone"
          label="电话:"
          placeholder="请输入"
          input-align="right"
          required
          type="number"
          :rules="[{ required: true, message: '请输入电话' }]"
          :disabled="isDone"
        />

        <van-field
          v-model.trim="form.askedCaseRelation"
          label="与本案关系:"
          placeholder="请输入"
          input-align="right"
          required
          :rules="[{ required: true, message: '请输入与本案关系' }]"
          :disabled="isDone"
        />
        <van-field
          v-model="form.sponsorName"
          label="案件主办人:"
          placeholder="请输入"
          input-align="right"
          readonly
        />
        <van-field
          v-model="form.sponsorNum"
          label="执法证号:"
          placeholder="请输入"
          input-align="right"
          readonly
        />
        <van-field
          v-model="form.cosponsorName"
          label="案件协办人:"
          placeholder="请输入"
          input-align="right"
          readonly
        />
        <van-field
          v-model="form.cosponsorNum"
          label="执法证号:"
          placeholder="请输入"
          input-align="right"
          readonly
        />

        
        <van-field
          v-model="form.recordType"
          label="询问内容:"
          placeholder="请输入"
          input-align="right"
        >
          <template #input>
            <van-radio-group v-model="form.recordType" direction="horizontal"
              :disabled="isDone">
              <van-radio name="2">问答形式</van-radio>
              <van-radio name="1">总结形式</van-radio>
            </van-radio-group>
          </template>
        </van-field>

        <template v-if="form.recordType==2">
          <!-- <div class="info">
            我们是 <span class="box">{{form.askOrgName}}</span>
            的执法人员： <span class="box">{{form.askerName}}<em v-if="form.askerName && form.recorder">、</em>{{form.recorder}}</span>
            ，这是我们的执法证件，号码是： <span class="box">{{form.askLegalNum}}<em v-if="form.askLegalNum && form.recorder">、</em>{{form.recorder}}{{form.recorderLegalNum}}</span>
            请确认（出示证件）。
          </div> -->
          <template v-for="(v,i) in form.askResponseFixList">
            <div class="ask" :key="i">问({{i+1}}):
              {{v.questionName}}
              
              <div class="btns" v-if="!isDone && i == 0">
                <span class="btn" @click="addAsk(1)">追加固定问题</span>
                <span class="btn" @click="addAsk(2)">追加不固定问题</span>
              </div>
              <div class="del"><span v-if="!isDone && i > 0" @click="delQuestion(i, 1)">删除</span></div>
            </div>
            <div class="ans" :key="i">
              <div class="ans-ask">
                <span class="title">答：</span>
                <div class="changeBtn" :class="v.mediaId ? 'changeBtn1' : ''">
                  <template v-if="v.mediaId">
                    <i :class="['recorder', showQs[i] ? 'play' : 'pause']" @click="playVideo(v.mediaId, 0)"></i>
                    <i class="recorder voice"></i>
                    <i class="recorder del" @click="delVideo('askResponseFixList', i)"></i>
                    <i class="recorder transform" @click="transformVideo('askResponseFixList', i)"></i>
                  </template>
                  <template v-else>
                     <!-- :class="isTalking ? 'isTalking' : ''" -->
                    <span v-if="showQs[i]" class="btn startRecord" @click="startRecord('askResponseFixList', i, $event)">点击说话</span>
                    <i class="recorder" @click="selectQ(i)"></i>
                  </template>
                </div>
              </div>
              <textarea name="" id="" rows="4" v-model="v.response" placeholder="请输入" :disabled="isDone"></textarea>
            </div>
          </template>
          <template v-for="(v, i) in form.askResponseNoFixList" >
            <div class="ask ans" :key="i">
              <div class="ans-ask">
              <span class="title">问({{Number(i + 1) + Number(form.askResponseFixList.length)}}):</span>
               <!-- :class="isTalking ? 'isTalking' : ''" -->
                <!-- <span class="btn startRecord" @click="startRecord('askResponseNoFixList', i, $event)">点击说话</span> -->
                <div class="changeBtn changeBtn2" :class="v.mediaId2 ? 'changeBtn1' : ''">
                  <template v-if="v.mediaId2">
                    <i :class="['recorder', showQs2[i] ? 'play' : 'pause']" @click="playVideo(v.mediaId2, 2)"></i>
                    <i class="recorder voice"></i>
                    <i class="recorder del" @click="delVideo('askResponseNoFixList', i)"></i>
                    <i class="recorder transform" @click="transformVideo('askResponseNoFixList', i)"></i>
                  </template>
                  <template v-else>
                     <!-- :class="isTalking ? 'isTalking' : ''" -->
                    <span v-if="showQs2[i]" class="btn startRecord" @click="startRecord('askInfo', i, $event)">点击说话</span>
                    <i class="recorder" @click="selectQ2(i)"></i>
                  </template>
                </div>
              </div>
              <textarea name="" id="" rows="4" v-model="v.askInfo" placeholder="请输入" :disabled="isDone"></textarea>
              <i class="recorder say" @click="startRecord('askInfo', i)"></i>
            </div>
            <div class="del" :key="i"><span v-if="!isDone" @click="delQuestion(i, 2)">删除</span></div>
            <div class="ans" :key="i">
              <div class="ans-ask">
                <span class="title">答：</span>
                <!-- @click="startRecord" -->
                <!-- <span class="btn startRecord" @click="startRecord('askResponseNoFixList', i, $event)">点击说话</span> -->
                <div class="changeBtn" :class="v.mediaId1 ? 'changeBtn1' : ''">
                  <template v-if="v.mediaId1">
                    <i :class="['recorder', showQs1[i] ? 'play' : 'pause']" @click="playVideo(v.mediaId1, 1)"></i>
                    <i class="recorder voice"></i>
                    <i class="recorder del" @click="delVideo('askResponseNoFixList', i)"></i>
                    <i class="recorder transform" @click="transformVideo('askResponseNoFixList', i)"></i>
                  </template>
                  <template v-else>
                     <!-- :class="isTalking ? 'isTalking' : ''" -->
                    <span v-if="showQs1[i]" class="btn startRecord" @click="startRecord('askResponseNoFixList', i, $event)">点击说话</span>
                    <i class="recorder" @click="selectQ1(i)"></i>
                  </template>
                </div>
              </div>
              <textarea name="" id="" rows="4" v-model="v.responseInfo" placeholder="请输入" :disabled="isDone"></textarea>
            </div>
          </template>
        </template>

        <template v-if="form.recordType==1">
          <textarea class="textarea" name="" id="" rows="4" v-model="form.recordInfo" placeholder="请输入" :disabled="isDone"></textarea>
        </template>
        
        
        <div class="btns-change" v-if="!isDone">
          <van-button class="prev" type="default" @click="toPrev">上一项</van-button>
          <van-button class="next" type="info" native-type="submit">提交</van-button>
        </div>
      </van-form>

    </div>
    <van-action-sheet v-model="showOptions" :actions="options" @select="onSelect" v-if="showOptions"/>

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

    <questions @ensure="ensureQuestion" v-if="showQuestions"/>
  </div>
</template>

<script>
import { Toast } from "vant";
import { startRecord, endRecord, translateVoice, downloadRecord, playRecord } from '@/utility/record.js';
import url from "@/service/url-config.js";
import questions from './questions';
import { HZRecorder } from '@/utility/HZRecorder.js'
export default {
  name: "xwbl",
  components: {
    questions
  },
  props: ['isDone'],
  data() {
    return {
      // 身份证校验
      pattern:/(^\d{15}$)|(^\d{17}(\d|X|x)$)/,
      showQuestions: false,
      show: false,
      options: [{ name: "选项一" }, { name: "选项二" }, { name: "选项三" }],
      form: {
        taskId: "",
        askTimeStart: "",
        askTimeEnd: "",
        askAddress: "",
        askerId: "",
        askerName: "",
        askLegalNum: "",
        recorderId: "",
        recorder: "",
        recorderLegalNum: "",
        checkedPersonName: "",
        checkedIdcard: "",
        askedAdress: "",
        gender: "",
        genderName: "",
        nation: "",
        nationName: "",
        askedPhone: "",
        askedCaseRelation: "",
        askOrgId: "1175f0d584cd4a15bba12860aec1dce3",
        askOrgName: "郑州市生态环境局",
        sponsorId: "",
        sponsorName: "",
        sponsorNum: "",
        cosponsorId: "",
        cosponsorName: "",
        cosponsorNum: "",
        recordType: '',
        askResponseFixList: [],
        askResponseNoFixList: [],
        recordInfo: ""
      },
      dicts: {
        loading: false,
        orgs: [],
        defaultMenusProps: {
          children: 'children',
          label: 'name'
        },
        checkmenu: [],
        userData: [],
        nations: []
      },
      
      showDatePicker: false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),

      selectType: '',
      showOptions: false,

      isTalking: false,

      recorder: null,

      currentQ: -1,
      currentQ1: -1,
      currentQ2: -1,
      showQs: [],
      showQs1: [],
      showQs2: []
    };
  },
  computed: {
    selectRow() {
      return this.$store.state.task.selectRow;
    }
  },
  created() {
    if(this.selectRow) {
      this.form.taskId = this.selectRow.id;
      this.form.sponsorId = this.selectRow.sponsor;
      this.form.sponsorName = this.selectRow.sponsorName;
      this.form.cosponsorId = this.selectRow.cosponsor;
      this.form.cosponsorName = this.selectRow.cosponsorName;
      this.getEnforcenum(this.form.sponsorId, 'sponsorNum');
      this.getEnforcenum(this.form.cosponsorId, 'cosponsorNum');
      this.form.recordType = 2;
    }
    
    this.getUserData();
    this.getDictData(7, 'nations')

    this.getPreInfo();
  },
  watch: {
    'form.recordType'(v) {
      if(v == 2) {
        this.getListDisplay();
      }
    }
  },
  methods: {
    // 回显数据
    getPreInfo() {
      this.$http.post(url.queryAskRecord, {taskId: this.selectRow.id}).then(res => {
        if(res.success) {
          let data = res.data;
          if(!data.askTimeStart) return;
          data.askResponseFixList = data.askResponseFixList && JSON.parse(data.askResponseFixList) || '';
          data.askResponseNoFixList = data.askResponseNoFixList && JSON.parse(data.askResponseNoFixList) || '';
          data.checkTime = [data.askTimeStart, data.askTimeEnd]
          this.form = data;
          data.genderName==0 ? this.form.genderName='男':this.form.genderName='女'
        }
      })
    },
    // 获取执法证号
    getEnforcenum(userId, k) {
      this.$http.post(url.getEnforcenum, {userId}).then(res => {
        if(res.success) {
          this.form[k] = res.data;
        }
      })
    },
    // 获取字典树
    getDictData(type, arr) {
      this.$http.post(url.getDictOption, {
        type: type
      }).then(res => {
        this.dicts[arr] = res;
      })
    },
    // 获取数据方法
    getUserData() {
      this.$http.post(url.getOrgTree, {}).then(res => {
        this.dicts.orgs = res.data;
      })
      this.$http.post(url.getUsers, {taskId:this.$route.query.id}).then(res => {
        this.dicts.userData = res.data.length ? res.data : [];
      })
    },
    // 获取固定展示问题
    getListDisplay() {
      this.$http.post(url.getListDisplay, {}).then(res => {
        if(res.success) {
          this.form.askResponseFixList = res.data.map(v => {
            return {
              questionName: v.question,
              questionId: v.id,
              response: "",
              mediaId: ''
            }
          })
          this.showQs = res.data.map(_ => {return false;})
          this.$forceUpdate();
          // this.$nextTick(_ => {
          //   console.log(document.querySelectorAll('.startRecord'))
          //   if(document.querySelectorAll('.startRecord').length) {
          //     this.addPress()
          //   }
          // })
        }
      })
    },
    // 获取不固定展示问题
    getListNoDisplay() {
      this.questions.loading = true;
      this.$http.post(url.getListNoDisplay, {}).then(res => {
        // this.questions.loading = false;
        // if(res.success) {
        //   this.questions.questionsAll = res.data;
        // }
      })
    },
    // addPress() {
    //   let btn = document.querySelector('.startRecord');
    //   btn.addEventListener('contextmenu', (e) => {
    //     e.prevevtDefault()
    //   })
    //   // Create an instance of Hammer with the reference.
    //   let Hammer = window.Hammer;
    //   let manager = new Hammer.Manager(btn);
    //   // Subscribe to a quick start event: press, tap, or doubletap.
    //   // For a full list of quick start events, read the documentation.
    //   var Press = new Hammer.Press({
    //     time: 500
    //   });

    //   // Add the recognizer to the manager
    //   manager.add(Press);

    //   // Subscribe to desired event
    //   manager.on('press', function(e) {
    //     this.isTalking = true;
    //     startRecord();
    //   });
    //   manager.on('pressup', function(e) {
    //     alert("松开");
    //     this.isTalking = false;
    //     endRecord();
    //   });
    // },
    clickTime(v) {
      if(this.isDone) return;
      this.showDatePicker = true;
      this.selectDate = v;
    },
    // 点击某一项
    clickHandle(v) {
      if(this.isDone) return;
      this.selectType = v;
      if(v == 'user1' || v == 'user2') {
        this.options = this.dicts.userData || []
      }
      if(v == 'gender') {
        this.options = [{
          name: '男',
          value: 0
        },{
          name: '女',
          value: 1
        }]
      }
      if(v == 'nation') {
        this.options = this.dicts.nations || []
      }
      this.showOptions = true;
    },
    onSelect(v, index) {
      if(this.selectType == 'user1') {
        this.form.askerId = v.id;
        this.form.askerName = v.name;
        this.getEnforcenum(this.form.askerId, 'askLegalNum');
      } 
      if(this.selectType == 'user2') {
        this.form.recorderId = v.id;
        this.form.recorder = v.name;
        this.getEnforcenum(this.form.recorderId, 'recorderLegalNum');
      }
      if(this.selectType == 'gender') {
        this.form.gender = v.value;
        this.form.genderName = v.name;
      }
      if(this.selectType == 'nation') {
        this.form.nation = v.code;
        this.form.nationName = v.name;
      }
      this.showOptions = false;
    },
    // 日期选择确定
    confirmDatePicker(v) {
      let d = v.getDate();
      d = d < 10 ? ('0' + d) : d;
      let m = v.getMinutes();
      m = m < 10 ? ('0' + m) : m;
      v = v.getFullYear() + "-" + (v.getMonth() + 1) + "-" + d + " " + v.getHours() + ":" + m;
      if(this.selectDate == 1) {
        this.form.askTimeStart = v;
      }
      if(this.selectDate == 2) {
        this.form.askTimeEnd = v;
      }
      this.showDatePicker = false;
    },
    // 日期选择取消
    cancelDatePicker() {
      this.showDatePicker = false;
    },
    // 选中的问题
    ensureQuestion(arr) {
      let a = arr.map(v => ({
        questionId: v.id,
        questionName: v.question,
        response: '',
        mediaId: ''
      }))
      this.form.askResponseFixList = [...this.form.askResponseFixList, ...a];
      
      this.showQs = this.form.askResponseFixList.map(_ => {return false;})
      this.showQuestions = false;
    },
    // 添加问题
    addAsk(v) {
      if(v == 1) {
        // this.form.askResponseFixList.push({
        //   questionId: '',
        //   questionName: '11111',
        //   response: ''
        // })
        // this.questionsVisible = true;
        // this.getListNoDisplay();
        // this.$router.push('/task/questions')
        this.showQuestions = true;
      }
      if(v == 2) {
        this.form.askResponseNoFixList.push({
          mediaId1: '', // 答案语音id
          mediaId2: '', // 问题语音id
          askInfo: "",
          responseInfo: ""
        })
        this.showQs1 = this.form.askResponseNoFixList.map(_ => {return false;})
        this.showQs2 = this.form.askResponseNoFixList.map(_ => {return false;})
      }
    },
    // 删除问题
    delQuestion(i, v) {
      if(v == 2) {
        this.form.askResponseNoFixList.splice(i, 1);
        this.showQs1.splice(i, 1);
        this.showQs2.splice(i, 1);
      }
      if(v == 1) {
        this.form.askResponseFixList.splice(i, 1);
        this.showQs.splice(i, 1);
      }
    },
    // 添加笔录
    toPrev() {
      // 勘查笔录
      this.$emit('toPrev');
    },
    save(e) {
      let form = JSON.parse(JSON.stringify(this.form));
      if(form.recordType == 1) {
        delete form.askResponseFixList;
        delete form.askResponseNoFixList;
      } else {
        delete form.askInfo;
        form.askResponseFixList = JSON.stringify(form.askResponseFixList)
        form.askResponseNoFixList = JSON.stringify(form.askResponseNoFixList)
      }
      this.$http.post(url.saveAskRecord, form).then(res => {
        if(res.success) {
          // this.$router.push("/task/done");
          this.$emit('toNext');
        }
      })
    },
    selectQ(i) {
      this.currentQ = i;
      this.showQs.splice(i, 1, !this.showQs[i]);
    },
    selectQ1(i) {
      this.currentQ1 = i;
      this.showQs1.splice(i, 1, !this.showQs1[i]);
    },
    selectQ2(i) {
      this.currentQ2 = i;
      this.showQs2.splice(i, 1, !this.showQs2[i]);
    },
    // 开始录音
    startRecord(key, i, ev) {
      // this.isTalking = !this.isTalking;
      ev.target.classList.toggle('isTalking');
      if(ev.target.classList.contains('isTalking')) {
        ev.target.innerText = '点击暂停';
        // if(this.isTalking) {
        startRecord();

        // HZRecorder.get(function (rec) {
        //   this.recorder = rec;
        //   this.recorder.start();
        // });
      } else {
        ev.target.innerText = '点击说话'
        endRecord().then(result => {
          if(result) {
            let mediaId = result.mediaId;
            if(key === 'askResponseFixList') {
              this.form[key][i].mediaId = mediaId;
            }
            if(key === 'askResponseNoFixList') {
              this.form[key][i].mediaId1 = mediaId;
            }
            if(key === 'askInfo') {
              this.form.askResponseNoFixList[i].mediaId2 = mediaId;
            }
            
            return;
            this.$http.post(url.audioDownload, {mediaId: mediaId}).then(res => {
              console.log(res, 'audioDownload')
              if(res.success) {
                if(key === 'askResponseFixList') {
                  this.form[key][i].response = res.data;
                }
                if(key === 'askResponseNoFixList') {
                  this.form[key][i].responseInfo = res.data;
                }
                if(key === 'askInfo') {
                  this.form.askResponseNoFixList[i].askInfo = res.data;
                }
              }
            })
            // downloadRecord(mediaId).then(res => {
            //   console.log(res.localAudioId, '---这是下载到本地的localAudioId')
            //   playRecord(res.localAudioId).then(code => {
            //     console.log(code, '---这是播放音频返回的code')
            //   })
            // })
            // translateVoice(mediaId).then(res => {
            //   let text  = res.content;
            //   this.form[key][i].response = text;
            // })
          }
        });

        // this.recorder.stop();
      }
    },
    // 播放录音
    playVideo(mediaId, i) {
      console.log(mediaId, i, '000')
      if(i == 0) {
        this.currentQ = i;
      }
      if(i == 1) {
        this.currentQ1 = i;
      }
      if(i == 2) {
        this.currentQ2 = i;
      }
      downloadRecord(mediaId).then(res => {
        console.log(res.localAudioId, '---这是下载到本地的localAudioId')
        playRecord(res.localAudioId).then(code => {
          console.log(code, '---这是播放音频返回的code')
        })
      })
    },
    delVideo(key, i) {
      if(key === 'askResponseFixList') {
        this.form[key][i].mediaId = '';
      }
      if(key === 'askResponseNoFixList') {
        this.form[key][i].mediaId1 = '';
      }
      if(key === 'askInfo') {
        this.form.askResponseNoFixList[i].mediaId2 = '';
      }
    },
    // 转换文字
    transformVideo(key, i) {
      let mediaId = '';
      if(key === 'askResponseFixList') {
        mediaId = this.form[key][i].mediaId;
        if(this.form[key][i].response) {
          Toast('已转');
          return;
        }
      }
      if(key === 'askResponseNoFixList') {
        mediaId = this.form[key][i].mediaId1;
        if(this.form[key][i].responseInfo) {
          Toast('已转');
          return;
        }
      }
      if(key === 'askInfo') {
        mediaId = this.form.askResponseNoFixList[i].mediaId2;
        if(this.form.askResponseNoFixList[i].askInfo) {
          Toast('已转');
          return;
        }
      }
      if(!mediaId) return;
      this.$http.post(url.audioDownload, {mediaId: mediaId}).then(res => {
        console.log(res, 'audioDownload')
        if(res.success) {
          if(key === 'askResponseFixList') {
            this.form[key][i].response = res.data;
          }
          if(key === 'askResponseNoFixList') {
            this.form[key][i].responseInfo = res.data;
          }
          if(key === 'askInfo') {
            this.form.askResponseNoFixList[i].askInfo = res.data;
          }
        }
      })
    },
    // // 上传录音
    // uploadAudio() {
    //   this.recorder.upload("UploadVideoServlet.do", function (state, e) {
    //     switch (state) {
    //       case 'uploading':
    //         //var percentComplete = Math.round(e.loaded * 100 / e.total) + '%';
    //         break;
    //       case 'ok':
    //         //alert(e.target.responseText);
    //         //alert("上传成功");
    //         window.location.href="VideoSearchServlet.do";
    //         break;
    //       case 'error':
    //         alert("上传失败");
    //         break;
    //       case 'cancel':
    //         alert("上传被取消");
    //         break;
    //     }
    // });
    // }
  }
};
</script>

<style lang="less" scoped>
/deep/ .van-field__control:disabled,/deep/ .van-field--disabled .van-field__label{
  color: #333;
}
.page {
  height: calc(100vh - 44px);
  overflow-y: auto;
  .container {
  //  padding: 0 15px 20px;
  .van-cell__value--alone {
    color: #28a1ff;
    font-size: 18px;
  }
  .stepName {
    margin-top: 20px;
    font-size: 18px;
    color: #28a1ff;
  }
  .stepName1 {
    margin-top: 50px;
  }
}
  .del {
    text-align: right;
    span{
      color: #F22424;
      font-size: 14px;
    }
  }
  

 
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

  // /deep/ .van-icon-arrow {
  //   color: #ccc;
  //   vertical-align: middle;
  // }

    .ask {
      margin-top: 25px;
      font-size: 14px;
      color: #999999;
      .btns {
        font-size: 12px;
        text-align: right;
        color: #28a1ff;
        .btn {
          margin-left: 15px;
        }
      }
    }
    .ask1{
      display: flex;
      textarea {
        width: 315px;
        border: 0.5px solid #cccccc;
        border-radius: 1px;
        padding: 4px 8px;
        box-sizing: border-box;
      }
    }
    .changeBtn{
      width: 90%;
      display: flex;
      justify-content: flex-end;
      &.changeBtn2{
        width: 85%;
      }
      &.changeBtn1{
        width: 80%;
        justify-content: space-between;
      }
      .recorder {
        display: inline-block;
        margin-left: 5px;
        width: 24px;
        height: 24px;
        background: url('~@/assets/img/recorder.png') no-repeat;
        background-size: contain;
        &.play {
          background: url('~@/assets/img/play.png') no-repeat;
          background-size: contain;
        }
        &.voice {
          width: 120px;
          background: url('~@/assets/img/voice.png') no-repeat;
          background-size: contain;
        }
        &.del {
          background: url('~@/assets/img/del.png') no-repeat;
          background-size: contain;
        }
        &.transform {
          background: url('~@/assets/img/transform.png') no-repeat;
          background-size: contain;
        }
      }
    }
    .ans {
      margin-top: 10px;
      margin-bottom: 5px;
      width: 100%;
      .ans-ask {
        display: flex;
        justify-content: space-between;
        width: 98%;
        .title {
          
        }
        .btn {
          flex-grow: 1;
          border: 0.5px solid #28a1ff;
          color: #28a1ff;
          text-align: center;
          font-size: 12px;
          padding-top: 2px;

          -webkit-touch-callout:none;
          -webkit-user-select:none;
          -khtml-user-select:none;
          -moz-user-select:none;
          -ms-user-select:none;
          user-select:none;

          &.isTalking{
            background: #ccc;
          }
        }
      }
      textarea {
        margin-top: 5px;
        display: block;
        width: 98%;
        border: 0.5px solid #cccccc;
        border-radius: 1px;
        padding: 4px 8px;
        box-sizing: border-box;
      }
    }
    .textarea {
      display: block;
      width: calc(98% - 30px);
      margin: 5px auto 0;
      border: 0.5px solid #cccccc;
      border-radius: 1px;
      padding: 4px 8px;
      box-sizing: border-box;
      font-size: 14px;
    }
}
</style>
