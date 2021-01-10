<template>
  <div class="detailPage" ref="page">
    <!-- title：案件详情 -->
    <!-- {{this.$route.query.id}} -->
    <!-- {{$route.query.type}} -->
    <!-- {{this.$route.query.nodeName}} -->
    <!-- 所有记录详情 -->
    <van-tabs v-model="active" swipeable @change="handleChange">
      <van-tab title="案件详情">
       
          <van-cell-group>
            <van-cell title="企业信息" icon="bookmark-o" style="color:#177bf5;"/>
            <van-cell title="企业名称：" :value="detail.QYMC" />
            <van-cell title="所属区域：" :value="detail.XZQY" />
            <van-cell title="企业类型：" :value="detail.QYLX" />
            <van-cell title="污染类型：" :value="detail.WRLX" />
          </van-cell-group>
       

        <div class="zhifa" v-if="this.$route.query.type=='1'">
          <van-cell-group>
            <van-cell title="执法信息" icon="notes-o" style="color:#177bf5;" />
            <van-cell title="执法人员：" :value="detail.zfrList" />
            <!-- <van-cell title="检查情况：" :value="detail.JCQK" style="display:inline-block;"      type="textarea"/> -->
            <van-field
              class="field_flort"
              readonly
              v-model="detail.JCQK"
              rows="1"
              autosize
              label="检查情况："
              label-width="200"
              type="textarea"
              input-align="left"
              style="display: inline-block;"
            />
            <van-cell title="附件：" />
            <div class="files">
              <van-uploader
          @click-preview="click_preview"
          :max-size="10 * 1024*1024"
          @oversize="onOversize" @close-preview="closePrevew" v-model="detail.ZXFXFJ" disabled :deletable="false" :max-count="detail.ZXFXFJ.length"/>
            </div>
          </van-cell-group>
        </div>

        
        <div class="zhifa" v-else-if="this.$route.query.type=='2'">
          <van-cell-group>
            <van-cell title="领导批示信息" icon="friends-o" style="color:#177bf5;"/>
            <!-- <p class="title">企业信息</p> -->
            <!-- <van-cell title="异常现象描述：" :value="detail.YCXXMS" /> -->
            <van-field
              class="field_flort"
              readonly
              v-model="detail.YCXXMS"
              rows="1"
              autosize
              label="异常现象描述："
              label-width="200"
              type="textarea"
              
              input-align="left"
              style="display: inline-block;"
            />
            <van-cell title="接收科室：" :value="detail.zfdwList" />
            <van-cell
              title="执法期限："
              :value="detail.ZFQX | getDate"
            />
            
            <!-- :value="new Date(this.detail.ZFQX).toLocaleString().replace(/:\d{1,2}$/,' ')" -->
            <van-cell title="批示意见：" :value="detail.PSYJ" />
          </van-cell-group>
        </div>

        
        <!-- 领导派发====调查取证 -->
        <div class="diaocha" v-if="this.detail.DCQZTYPE=='1'&&this.$route.query.type=='2'">
          <van-cell title="调查取证" icon="bar-chart-o" style="color:#177bf5;"/>
          <!-- <p class="title">企业信息</p> -->
          <van-cell
            title="检查日期："
            :value="dcqzDetail.JCRQ | getDate"
          />
          <van-field
              class="field_flort"
              readonly
              v-model="dcqzDetail.JCQK"
              rows="1"
              autosize
              label="检查情况："
              label-width="200"
              type="textarea"          
              input-align="left"
              style="display: inline-block;"
            />
          <van-cell title="违法行为：" :value="dcqzDetail.WFXWNAME" />
          <!-- <van-cell title="勘察笔录：" :value="dcqzDetail.KCBLFJ" /> -->
          <van-cell title="勘察笔录："/>
          <div class="files">
              <van-uploader
          @click-preview="click_preview"
          :max-size="10 * 1024*1024"
          @oversize="onOversize" @close-preview="closePrevew" v-model="dcqzDetail.KCBLFJ" disabled :deletable="false" :max-count="dcqzDetail.KCBLFJ.length"/>
          </div>
          <van-cell title="询问笔录："/>
          <div class="files">
              <van-uploader
          @click-preview="click_preview"
          :max-size="10 * 1024*1024"
          @oversize="onOversize" @close-preview="closePrevew" v-model="dcqzDetail.XWBLFJ" disabled :deletable="false" :max-count="dcqzDetail.XWBLFJ.length"/>
          </div>
          <div>
            <van-cell title="调查终结报告："/>
            <div class="files">
              <van-uploader
          @click-preview="click_preview"
          :max-size="10 * 1024*1024"
          @oversize="onOversize" @close-preview="closePrevew" v-model="dcqzDetail.DCZJBG" disabled :deletable="false" :max-count="dcqzDetail.DCZJBG.length"/>
            </div>
          </div>
          <div>
            <van-cell title="其他附件："/>
            <div class="files">
              <van-uploader
          @click-preview="click_preview"
          :max-size="10 * 1024*1024"
          @oversize="onOversize" @close-preview="closePrevew" v-model="dcqzDetail.DCQZQTFJ" disabled :deletable="false" :max-count="dcqzDetail.DCQZQTFJ.length"/>
            </div>
          </div>
        </div>

        <!-- 自行发现====调查取证 -->
        <div class="diaocha" v-if="this.detail.DCQZTYPE=='1'&&this.$route.query.type=='1'">
          <van-cell-group>
            <van-cell title="调查取证" icon="bar-chart-o" style="color:#177bf5;"/>
            <!-- <p class="title">企业信息</p> -->
             <van-cell title="涉嫌违法信息：" :value="this.dcqzDetail.WFXWNAME" />
            <van-cell title="勘察笔录："/>
            <div class="files">
                <van-uploader  @click-preview="click_preview"
          :max-size="10 * 1024*1024"
          @oversize="onOversize" @close-preview="closePrevew" v-model="dcqzDetail.KCBLFJ" disabled :deletable="false" :max-count="dcqzDetail.KCBLFJ.length"/>
            </div>
              <van-cell title="询问笔录："/>
            <div class="files">
                <van-uploader  @click-preview="click_preview"
          :max-size="10 * 1024*1024"
          @oversize="onOversize" @close-preview="closePrevew" v-model="dcqzDetail.XWBLFJ" disabled  :deletable="false" :max-count="dcqzDetail.XWBLFJ.length"/>
            </div>
            <div>
              <van-cell title="调查终结报告："/>
              <div class="files">
                <van-uploader  @click-preview="click_preview"
          :max-size="10 * 1024*1024"
          @oversize="onOversize" @close-preview="closePrevew" v-model="dcqzDetail.DCZJBG" disabled :deletable="false" :max-count="dcqzDetail.DCZJBG.length"/>
              </div>
            </div>
            <div>
              <van-cell title="其他附件："/>
              <div class="files">
               <van-uploader  @click-preview="click_preview"
          :max-size="10 * 1024*1024"
          @oversize="onOversize" @close-preview="closePrevew" v-model="dcqzDetail.DCQZQTFJ" disabled  :deletable="false" :max-count="dcqzDetail.DCQZQTFJ.length"/>
              </div>
            </div>
          </van-cell-group>
        </div>

        <div class="anjian" v-if="detail.AJDDTYPE=='1'">
          <van-cell-group>
            <van-cell title="案件调度" icon="records" style="color:#177bf5;"/>
            <!-- <p class="title">企业信息</p> -->
            <van-cell title="处罚类型：" :value="value" />
          </van-cell-group>
          <van-cell-group v-if="detail.AJDD.indexOf('0')>-1">
            <p class="title1">
              行政处罚明细:
            </p>
            <van-cell title="行政处罚告知书下达日期：" :value="ajdfDetail && ajdfDetail.xzcf && ajdfDetail.xzcf.xzcfgzstime" />
            <van-cell title="行政处罚决定书下达日期：" :value="ajdfDetail.xzcf.xzcfjdstime" />
            <van-cell title="处罚金额（万元）：" :value="ajdfDetail.xzcf.cfje" />
            <!-- <van-cell title="附件：" value /> -->
            <div>
              <van-cell title="处罚决定书附件："/>
              <div class="files">
                <van-uploader  @click-preview="click_preview"
          :max-size="10 * 1024*1024"
          @oversize="onOversize" @close-preview="closePrevew" v-model="ajdfDetail.XZCFJDS" disabled :deletable="false" :max-count="ajdfDetail.XZCFJDS.length"/>
              </div>
            </div>
          </van-cell-group>
          <van-cell-group v-if="detail.AJDD.indexOf('1')>-1">
            <p class="title1">行政拘留明细:</p>
            <van-cell title="移交公安机关日期：" :value="ajdfDetail.xzjl.yjgatime" />
            <van-cell title="公安机关：" :value="ajdfDetail.xzjl.gajg" />
            <van-cell title="行政拘留告知书下达日期：" :value="ajdfDetail.xzjl.xzjljdstime_" />
            <!-- <van-cell title="行政拘留决定书：" value /> -->
            <div>
              <van-cell title="拘留决定书附件："/>
              <div class="files">
                 <van-uploader  @click-preview="click_preview"
          :max-size="10 * 1024*1024"
          @oversize="onOversize" @close-preview="closePrevew" v-model="ajdfDetail.XZJLJDS" disabled :deletable="false" :max-count="ajdfDetail.XZJLJDS.length"/>
              </div>
            </div>
            <van-cell title="涉案人员明细:" v-if="ajdfDetail.xzjl.saryList.length>0" class="bac_gray" />
            <van-cell-group v-for="(saryItem,index) in this.ajdfDetail.xzjl.saryList" :key="index">
              <van-cell title="涉案人员：" :value="saryItem.saryname" />
              <van-cell title="职务：" :value="saryItem.zw" />
              <van-cell title="单位：" :value="saryItem.dw" />
              <van-cell title="拘留天数：" :value="saryItem.jlts" />
            </van-cell-group>
          </van-cell-group>
          <van-cell-group v-if="this.detail.AJDD.indexOf('2')>-1">
            <p class="title1">
              刑事处罚明细:
            </p>
            <van-cell title="移交公安日期：" :value="this.ajdfDetail.xscf.yjgatime" />
            <van-cell title="公安机关：" :value="this.ajdfDetail.xscf.gajg" />

            <van-cell title="刑事拘留证下达日期：" :value="this.ajdfDetail.xscf.xsjlztime" />
            <div>
              <van-cell title="刑事拘留证："/>
              <div class="files">
                <van-uploader  @click-preview="click_preview"
          :max-size="10 * 1024*1024"
          @oversize="onOversize" @close-preview="closePrevew" v-model="ajdfDetail.XSJLZ" disabled :deletable="false" :max-count="ajdfDetail.XSJLZ.length"/>
              </div>
            </div>

            <van-cell title="刑事拘留明细：" v-if="this.ajdfDetail.xscf.fzxyrList.length>0" class="bac_gray" />
            <van-cell-group v-for="(v,index) in this.ajdfDetail.xscf.fzxyrList" :key="index">
              <van-cell title="犯罪嫌疑人：" :value="v.fzxyrname" />
              <van-cell title="单位：" :value="v.dw" />
              <van-cell title="职务：" :value="v.zw" />
            </van-cell-group>
            <!-- <van-cell
              title="犯罪嫌疑人"
              v-if="this.ajdfDetail.xscf.fzxyrList.length>0"
              class="bac_gray"
            /> -->

            <van-cell title="检察机关：" :value="this.ajdfDetail.xscf.jcjg" />
            <van-cell title="批准逮捕日期：" :value="this.ajdfDetail.xscf.pzdprq" />
            <div>
              <van-cell title="逮捕证："/>
              <div class="files">
                <van-uploader  @click-preview="click_preview"
          :max-size="10 * 1024*1024"
          @oversize="onOversize" @close-preview="closePrevew" v-model="ajdfDetail.DBZ" disabled :deletable="false" :max-count="ajdfDetail.DBZ.length"/>
              </div>
            </div>
            <van-cell title="审判机关：" :value="this.ajdfDetail.xscf.spjg" />
            <van-cell title="审判日期：" :value="this.ajdfDetail.xscf.sprq" />
            <!-- <van-cell title="刑事判决书" :value="this.ajdfDetail.xscf.xzcfjdstime" /> -->
            <div>
              <van-cell title="刑事判决书："/>
              <div class="files">
                <van-uploader  @click-preview="click_preview"
          :max-size="10 * 1024*1024"
          @oversize="onOversize" @close-preview="closePrevew" v-model="ajdfDetail.XSPJS" disabled :deletable="false" :max-count="ajdfDetail.XSPJS.length"/>
              </div>
            </div>
            <van-cell title="犯罪分子明细" v-if="this.ajdfDetail.xscf.fzfzList.length>0" class="bac_gray" />
            <van-cell-group v-for="(fzfzItem,index) in this.ajdfDetail.xscf.fzfzList" :key="index">
              <van-cell title="犯罪分子：" :value="fzfzItem.fzfzname" />
              <van-cell title="审判详情：" :value="fzfzItem.pjxq" />
            </van-cell-group>
            <!-- <van-cell
              title="犯罪嫌疑人"
              v-if="this.ajdfDetail.xscf.fzxyrList.length>0"
              class="bac_gray"
            />
            <van-cell-group v-for="(fzfzItem,index) in this.ajdfDetail.xscf.fzxyrList" :key="index">
              <van-cell title="犯罪嫌疑人：" :value="fzfzItem.fzxyrname" />
              <van-cell title="单位：" :value="fzfzItem.dw" />
              <van-cell title="职务：" :value="fzfzItem.zw" />
            </van-cell-group> -->
          </van-cell-group>
        </div>

        <!-- 办理 -->
        <div v-if="$route.query.taskId">
          <van-button
            block
            type="info"
            native-type="button"
            @click="nextNode()"
            style="position: fixed;
    bottom: 0;"
            
          >办理</van-button>
        </div>
      </van-tab>
      <van-tab title="流转记录">
        <div class="wrap">
          <!-- <van-row gutter="10" v-for="(item,i) in hisList" :key="i">
            <van-col span="2">
              {{i+1}}
              <div class="one">2222</div>
            </van-col>
            <van-col span="20">
              <p class="title">
                <span>{{item.action}}</span>
                <span>{{item.userName}}</span>
              </p>
              <div class="mainBox">
                <p>办理时间：{{item.actiontime}}</p>
                <p>办理时长：{{item.remaintime}}</p>
                <p>下一环节：{{item.nextName}}</p>
                <p>接收人：{{item.nextUserName}}</p>
                <p>意见：{{item.comments}}</p>
              </div>
            </van-col>
          </van-row>-->

          <van-steps direction="vertical" v-for="(item,i) in hisList" :key="i">
            <van-step>
              <p class="title">
                <!-- <span>{{item.stepName}}</span> -->
                <span>{{item.action}}</span>
                <span>{{item.userName}}</span>
              </p>
              <p>办理时间：{{item.actiontime}}</p>
              <p>办理时长：{{item.remaintime}}</p>
              <p>下一办理环节：{{item.nextName}}</p>
              <p>接收人：{{item.nextUserName}}</p>
              <p>意见：{{item.comments}}</p>
            </van-step>
          </van-steps>
        </div>

    
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import dayjs from "dayjs";
import * as dd from "dingtalk-jsapi"; // 此方式为整体加载，也可按需进行加载
// import history from '../daiban/components/liuzhuan'
let userinfo = JSON.parse(window.localStorage.getItem("userinfo"));

export default {
  // components: {
  //   history
  // },
  data() {
    return {
      scrollTop: 0,
      value: "",
      detail: {},
      active: "",
      ajdfDetail: {},
      dcqzDetail: {},
      workId: this.$route.query.workId,
      workFlowId: this.$route.query.workFlowId,
      hisList: []
    };
  },
  methods: {
    // 点击预览事件
    click_preview(file) {
      console.log(file);
      this.scrollTop = this.$refs.page.scrollTop
      if (file.fileType != 1) {
        window.location.href = file.url;
      }
    },
    // 文件超过大小
    onOversize(file) {
      console.log(file);
      this.$toast("文件大小不能超过 10M");
    },
    
    closePrevew() {
      this.$refs.page.scrollTop = this.scrollTop;
    },
    // 获取案件详情
    getDetail() {
      this.http
        .post("getCompanyDetiles", {
          id: this.$route.query.id
        })
        .then(res => {
          console.log("详情");
          console.log(JSON.stringify(res));
          console.log(res.data,'起了类型。。')


          this.detail = res.data;
          this.detail.ZXFXFJ && this.detail.ZXFXFJ.length && (this.detail.ZXFXFJ.forEach(v =>  {
            if(v.fileType==1) {
              v.isImage = true
            }
          }))
          console.log(this.detail);
          if (this.detail.DCQZTYPE == "1") {
            this.getDcqzDetail();
          }
          if (this.detail.AJDDTYPE == "1") {
            this.getAjddDetail();
            if (this.detail.AJDD.indexOf("0") > -1) {
              this.value += "行政处罚  ";
            }
            if (this.detail.AJDD.indexOf("1") > -1) {
              this.value += "行政拘留  ";
            }
            if (this.detail.AJDD.indexOf("2") > -1) {
              this.value += "刑事处罚  ";
            }
          }
        });
    },

    handleChange() {
      if (this.active == 0) {
        this.getDetail();
      } else if (this.active == 1) {
        this.getHis();
      }
    },
    //案件调度
    getAjddDetail() {
      this.http
        .post("getAjddInfo", {
          comid: this.$route.query.id
        })
        .then(res => {
          console.log("案件调度");
          console.log(res.data);
          let data = res.data;
          if(data.DBZ && data.DBZ.length) {
            data.DBZ.forEach(v =>  {
              if(v.fileType==1) {
                v.isImage = true
              }
          })
          }
          if(data.XSJLZ && data.XSJLZ.length) {
            data.XSJLZ.forEach(v =>  {
              if(v.fileType==1) {
                v.isImage = true
              }
          })
          }
          if(data.XSPJS && data.XSPJS.length) {
            data.XSPJS.forEach(v =>  {
              if(v.fileType==1) {
                v.isImage = true
              }
          })
          }
          if(data.XZCFJDS && data.XZCFJDS.length) {
            data.XZCFJDS.forEach(v =>  {
              if(v.fileType==1) {
                v.isImage = true
              }
          })
          }
          if(data.XZJLJDS && data.XZJLJDS.length) {
            data.XZJLJDS.forEach(v =>  {
              if(v.fileType==1) {
                v.isImage = true
              }
          })
          }
          this.ajdfDetail = data;
        });
    },
    //调查取证
    getDcqzDetail() {
      this.http
        .post("getDcqzInfo", {
          comid: this.$route.query.id
        })
        .then(res => {
          console.log("调查取证");
          console.log(JSON.stringify(res));
          let data = res.data;
          data.KCBLFJ.forEach(v => {
            if(v.fileType==1) {
              v.isImage = true
            }
          })
          data.XWBLFJ.forEach(v => {
            if(v.fileType==1) {
              v.isImage = true
            }
          })
          data.DCZJBG.forEach(v => {
            if(v.fileType==1) {
              v.isImage = true
            }
          })
          data.DCQZQTFJ.forEach(v => {
            if(v.fileType==1) {
              v.isImage = true
            }
          })
          this.dcqzDetail = data;
        });
    },
    //获取流转记录
    getHis() {
      this.http
        .post("getJkzfWorkFlowHistory", {
          userId: userinfo.userId,
          workId: this.workId,
          workFlowId: this.workFlowId
        })
        .then(res => {
          console.log(res);
          this.hisList = res.data.stepInfoList;
        });
    },
    /**
     * 办理按钮，6.7去展示下一个节点
     */

    nextNode() {
      let actId = this.$route.query.nodeName;
      if (actId === "P1" || actId === "P2") {
        // 主任|主管
        this.$router.push({
          path: "/zuGuan",
          query: {
            workFlowId: this.$route.query.workFlowId,
            workId: this.$route.query.workId,
            taskId: this.$route.query.taskId,
            actId: actId,
            bizid: this.$route.query.id,
            orgId: this.$route.query.orgId
          }
        });
      }else {
        if (this.$route.query.workFlowId == "ANPFLC") {
          if (actId === "N2" || actId === "N4") {
            // 调查取证
            this.$router.push({
              path: "/paifaDiaocha",
              query: {
                workFlowId: this.$route.query.workFlowId,
                workId: this.$route.query.workId,
                taskId: this.$route.query.taskId,
                actId: actId,
                bizid: this.$route.query.id,
                isZF: false  // 
              }
            });
          } else if (actId === "N3") {
            this.$router.push({
              path: "/fenxi",
              query: {
                workFlowId: this.$route.query.workFlowId,
                workId: this.$route.query.workId,
                taskId: this.$route.query.taskId,
                actId: this.$route.query.nodeName,
                bizid: this.$route.query.id
              }
            });
          } else if (actId === "N5") {
            this.$router.push({
              // path: "/lixingzifa",
              path: "/diaodu",
              query: {
                workFlowId: this.$route.query.workFlowId,
                workId: this.$route.query.workId,
                taskId: this.$route.query.taskId,
                actId: actId,
                bizid: this.$route.query.id
              }
            });
          } else if (actId === "N6") {
            this.$router.push({
              // path: "/lixingzifa",
              path: "/fenxi",
              query: {
                workFlowId: this.$route.query.workFlowId,
                workId: this.$route.query.workId,
                taskId: this.$route.query.taskId,
                actId: actId,
                bizid: this.$route.query.id
              }
            });
          }
        } else {
          if (actId === "N1") {
            this.$router.push({
              path: "/LeaderReview",
              query: {
                workFlowId: this.$route.query.workFlowId,
                workId: this.$route.query.workId,
                taskId: this.$route.query.taskId,
                actId: actId,
                bizid: this.$route.query.id
              }
            });
          }
          if (actId === "N2") {
            this.$router.push({
              // path: "/diaoCha",
              path: '/paifaDiaocha',
              query: {
                workFlowId: this.$route.query.workFlowId,
                workId: this.$route.query.workId,
                taskId: this.$route.query.taskId,
                actId: actId,
                bizid: this.$route.query.id,
                isZF: true  // 
              }
            });
          } else if (actId === "N3") {
            this.$router.push({
              path: "/diaoDu",
              query: {
                workFlowId: this.$route.query.workFlowId,
                workId: this.$route.query.workId,
                taskId: this.$route.query.taskId,
                actId: actId,
                bizid: this.$route.query.id
              }
            });
          } else if (actId === "N4") {
            this.$router.push({
              // path: "/fenXi",
              path: "/LeaderReview",
              query: {
                workFlowId: this.$route.query.workFlowId,
                workId: this.$route.query.workId,
                taskId: this.$route.query.taskId,
                actId: actId,
                bizid: this.$route.query.id
              }
            });
          } else if (actId === "end" || actId === "end2") {
            this.$router.push({
              // path: "/lixingzifa",
              path: "/daiban",
              query: {
                workFlowId: this.$route.query.workFlowId,
                workId: this.$route.query.workId,
                taskId: this.$route.query.taskId,
                actId: this.$route.query.actId,
                bizid: this.$route.query.id
              }
            });
          }
        }
      }
    }
  },
  filters: {
    getDate(v) {
      return dayjs(v).format("YYYY-MM-DD")
    }
  },
  created() {
    this.getDetail();
    dd.ready(() => {
      dd.biz.navigation.setTitle({
        title: "案件详情" // 控制标题文本，空字符串表示显示默认文本
      });
    });
  }
};
</script>

<style lang="scss" scoped>
.detailPage{
  height: 100vh;
  overflow-y: auto;
  padding-bottom: 50px;
  .files{
    padding-left: 10px;
  }
}
.field_flort{padding-left: 15px;}
// @import "../../assets/css/lib/vant-reset.css";
/deep/.van-tab--active {
  color: #177bf5!important;
}
 /deep/ .van-step__icon {
  color: #177bf5!important;
  font-size: 20px!important;
}

/deep/.van-tabs__line {
  background-color: #177bf5!important;
}
/deep/ .van-step--vertical .van-step__line{
  width: 1PX;
  background-color: transparent;
  border-left: 1px dashed #177bf5;
}

.bac_gray {
  background-color: #f3f3f3;
}

/deep/.van-tabs__content {
  margin-top: 8px;
}

.iconfont {
  color: #335ad0;
  font-size: 17px;
  margin-right: 10px;
}

.wrap {
  padding: 10px 20px;
  font-size: 17px;

 
  /deep/.van-step__icon{color: #333;}
  /deep/.van-step__title--active {
    color: #333;
  }
  .title {
    display: flex;
    justify-content: space-between;
  }

  // .van-col--2 {
  //   width: 18px;
  //   height: 18px;
  //   line-height: 18px;
  //   margin-top: 8px;
  //   text-align: center;
  //   border-radius: 50%;
  //   background: #1890ff;
  //   color: #fff;
  // }

  // .van-col--2 .one {
  //   // clear: both;
  //   // content: "";
  //   height: 170px;
  //   position: absolute;
  //   top: 86px;
  //   border-left: 2px dashed #1890ff;
  //   left: 29px;
  //   display: block;
  // }

  // .van-col--2 .two {
  //   height: 170px;
  //   position: absolute;
  //   border-left: 2px dashed #1890ff;
  //   left: 29px;
  //   display: block;
  // }
/deep/.van-step__title{
      padding: 20px;
    background: #F6F6F6;
    border-radius: 10px;
}
  .mainBox {
    background: #fff;
    padding: 5px 10px;
    line-height: 30px;
    font-size: 16px;

    .yijian {
      text-align: center;
      font-size: 13px;
      color: #333;
    }
  }
}

  .title1{
    padding: 10px 0 10px 15px;
    font-size: 16px;
    color: #52AAF8;
    background: #f2f2f2;
  }
</style>