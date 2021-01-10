<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :xs="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span>基本资料</span>
          </div>
          <el-tabs v-model="activeTab">
            <el-tab-pane label="修改资料" name="userinfo">
              <el-form
                ref="userinfoRules"
                :model="editUserinfo"
                :rules="userinfoRules"
                label-width="80px"
                class="userInfoForm"
              >
                <el-form-item label="账户名:" prop="userName">
                  <el-input v-model="editUserinfo.name" readonly placeholder="请输入账户名"/>
                </el-form-item>
                <el-form-item label="用户姓名:" prop="name">
                  <el-input v-model="editUserinfo.userName" readonly placeholder="请输入用户姓名" />
                </el-form-item>
                <el-form-item label="性别:" prop="gender">
                  <el-radio-group v-model="editUserinfo.gender">
                    <el-radio label="1">男</el-radio>
                    <el-radio label="2">女</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="职务:" prop="duty">
                  <el-input v-model="editUserinfo.duty" placeholder="请输入职务"/>
                </el-form-item>
                <el-form-item label="出生年月:" prop="birthDay">
                  <!--<el-input v-model="editUserinfo.birthDay" />-->
                  <el-date-picker type="date" placeholder="选择日期" v-model="editUserinfo.birthDay"
                                  format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="执法证号:" prop="enforceNum">
                  <el-input v-model="editUserinfo.enforceNum" placeholder="请输入执法证号" />
                </el-form-item>
                <el-form-item label="发证日期:" prop="issueDate">
                  <!--<el-input v-model="editUserinfo.issueDate" />-->
                  <el-date-picker type="date" placeholder="选择日期" v-model="editUserinfo.issueDate"
                                  format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="邮箱:" prop="email">
                  <el-input maxlength="50" v-model="editUserinfo.email" placeholder="请输入邮箱"/>
                </el-form-item>
                <el-form-item label="工作联系方式:" prop="workTelphone">
                  <el-input v-model="editUserinfo.workTelphone" placeholder="请输入工作联系方式" />
                </el-form-item>
                <el-form-item label="个人联系方式:" prop="telPhone">
                  <el-input v-model="editUserinfo.telPhone" placeholder="请输入个人联系方式" />
                </el-form-item>
                <el-form-item label="有效日期至:" prop="expiryDate">
                  <!--<el-input v-model="editUserinfo.expiryDate" />-->
                  <el-date-picker type="date" placeholder="选择日期" v-model="editUserinfo.expiryDate"
                                  format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <!--<el-form-item label="执法区域" prop="enforceAreacode">
                  <el-input v-model="editUserinfo.enforceAreacode" placeholder="请输入执法区域" />
                </el-form-item>-->
                <el-form-item label="执法区域:" prop="enforceAreacode">
                  <el-select v-model="editUserinfo.enforceAreacode" placeholder="请选择执法区域">
                    <el-option :label="v.name" :value="v.id" v-for="v in areaOptions" :key="v.id"></el-option>
                  </el-select>
                </el-form-item>
                <!--<el-form-item label="用户所属区域" prop="areaCode">
                  <el-input v-model="editUserinfo.areaCode" placeholder="请输入用户所属区域" />
                </el-form-item>-->
                <el-form-item label="用户所属区域:" prop="areaCode">
                  <el-select v-model="editUserinfo.areaCode" placeholder="请选择用户所属区域">
                    <el-option :label="v.name" :value="v.id" v-for="v in areaOptions" :key="v.id"></el-option>
                  </el-select>
                </el-form-item>
                <div class="upload-style">
                  <el-form-item label="图片:">
                    <upload
                      :id="id"
                      :type="'3'"
                      :limit="1"
                      :fileUrl="fileUrl3"
                      @loadSuccess="loadSuccess"
                      @delSuccess="delSuccess"
                    />
                  </el-form-item>
                </div>
                <el-form-item>
                  <div class="user-info-button">
                    <el-button type="primary" @click="saveInfo()">保存</el-button>
                    <el-button type="danger" @click="closeInfo()">关闭</el-button>
                  </div>
                </el-form-item>
              </el-form>
            </el-tab-pane>

            <!-- <el-tab-pane label="修改密码" name="resetPwd">
              <el-form ref="resetPwdRules" :model="editResetPwd" :rules="resetPwdRules" label-width="80px">
                <el-form-item label="旧密码" prop="oldPassword">
                  <el-input  placeholder="请输入旧密码" type="password" v-model="editResetPwd.oldPassword"/>
                </el-form-item>
                <el-form-item label="新密码" prop="newPassword">
                  <el-input  placeholder="请输入新密码" type="password" v-model="editResetPwd.newPassword"/>
                </el-form-item>
                <el-form-item label="确认密码" prop="confirmPassword">
                  <el-input  placeholder="请确认密码" type="password" v-model="editResetPwd.confirmPassword"/>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" size="mini" >保存</el-button>
                  <el-button type="danger" size="mini" >关闭</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>-->
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import url from "@/servers/url-config.js";
import upload from '@/components/upload.vue';
import {validEmptySpace, validPhone} from '@/utility/limitFrom';

export default {
  components: {
    upload
    // Pagination
  },
  name: "Profile",
  data() {
    const equalToPassword = (rule, value, callback) => {
      if (this.user.newPassword !== value) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    return {
      activeTab: "userinfo", //默认打开第一个选项卡
      id: '',
      // 修改资料需要传递的数据
      editUserinfo: {
        name: '',
        userName: '',
        gender: '',
        duty: '',
        birthDay: '',
        enforceNum: '',
        issueDate: '',
        email: '',
        workTelphone: '',
        telPhone: '',
        expiryDate: '',
        enforceAreacode: '',
        areaCode: '',
        fileList: []
      },
      //修改密码需要传递的数据
      //    editResetPwd: {
      //     username: '',
      //     password: '',
      //     email: '',
      //     mobile: ''
      //   },
      // 基本资料表单校验
      userinfoRules: {
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' },
        ],
        duty: [
          { required: true, message: '请输入职务', trigger: 'change' },
          { validator: validEmptySpace, trigger: 'change' },
        ],
        birthDay: [
          { required: true, message: '请选择出生年月', trigger: 'change' },
        ],
        enforceNum: [
          { required: true, message: '请输入执法证号', trigger: 'change' },
          { validator: validEmptySpace, trigger: 'change' },
        ],
        issueDate: [
          { required: true, message: '请选择发证日期', trigger: 'change' },
        ],
        email: [
          // { validator: validEmptySpace, trigger: 'change' },
        ],
        telPhone: [
          { required: true, message: '请输入联系电话', trigger: 'change' },
          { validator: validEmptySpace, trigger: 'change' },
          { validator: validPhone, trigger: 'change' }
        ],
        expiryDate: [
          { required: true, message: '请选择有效日期', trigger: 'change' },
        ],
        enforceAreacode: [
          { required: true, message: '请选择执法区域', trigger: 'change' },
        ],
        areaCode: [
          { required: true, message: '请选择用户所属区域', trigger: 'change' },
        ],
      },
      // userId: '',
      areaOptions: [],
      fileObj: {},
      fileUrl3: [],
      // 修改密码表单校验
      //   resetPwdRules: {
      //     oldPassword: [
      //       { required: true, message: "旧密码不能为空", trigger: "blur" }
      //     ],
      //     newPassword: [
      //       { required: true, message: "新密码不能为空", trigger: "blur" },
      //       { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
      //     ],
      //     confirmPassword: [
      //       { required: true, message: "确认密码不能为空", trigger: "blur" },
      //       { required: true, validator: equalToPassword, trigger: "blur" }
      //     ]
      //   }
    };
  },
  watch: {
    userId () {
      this.getuserinfo();
    }
  },
  computed: {
    userId () {
      if (this.$store.state.users) {
        return this.$store.state.users.user.id
      } else {
        return '';
      }
    }
  },
  created () {
    /*if (this.$store.state.users) {
      this.userId = this.$store.state.users.user.id
    }*/
    this.getuserinfo();
    // 获取区域集合
    this.getArea();
  },
  methods: {
    // 拿到区域
    getArea () {
      this.$ajax(url.getArea, {}).then(res => {
        if (res.success) {
          this.areaOptions = res.data;
        }
      })
    },
    /* 获取个人信息 */
    getuserinfo () {
      if (this.userId) {
        this.$ajax(url.getUserinfo, { userId: this.userId }).then(res => {
          if (res.success) {
            this.editUserinfo = {
              name: res.data.name || '',
              userName: res.data.userName || '',
              gender: res.data.gender || '',
              duty: res.data.duty || '',
              birthDay: res.data.birthDay || '',
              enforceNum: res.data.enforceNum || '',
              issueDate: res.data.issueDate || '',
              email: res.data.email || '',
              workTelphone: res.data.workTelphone || '',
              telPhone: res.data.telPhone || '',
              expiryDate: res.data.expiryDate || '',
              enforceAreacode: res.data.enforceAreacode || '',
              areaCode: res.data.areaCode || ''
            };
            this.id = res.data.id || '';
            this.$ajax(url.selectFileListByPidAndType, {pid: this.id, fileType: 3}).then(res => {
              this.fileUrl3 = res.data;
            })
          }
        });
      }
      // console.log();
    },
    closeInfo () {
      history.go(-1);
    },
    // 上传成功获取参数 v: {fileid, id}
    loadSuccess(v) {
      console.log(v,8888)
      this.fileObj = v;
      // this.editForm.id = v.id;
    },
    delSuccess(v) {
      this.fileObj = null
    },
    saveInfo () {
      this.$refs['userinfoRules'].validate(valid => {
        if (valid) {
          let queryParam = {
            id: this.id,
            userId: this.userId,
            gender: this.editUserinfo.gender || '',
            duty: this.editUserinfo.duty || '',
            birthDay: this.editUserinfo.birthDay || '',
            enforceNum: this.editUserinfo.enforceNum || '',
            issueDate: this.editUserinfo.issueDate || '',
            email: this.editUserinfo.email || '',
            workTelphone: this.editUserinfo.workTelphone || '',
            telPhone: this.editUserinfo.telPhone || '',
            expiryDate: this.editUserinfo.expiryDate || '',
            enforceAreacode: this.editUserinfo.enforceAreacode || '',
            areaCode: this.editUserinfo.areaCode || ''
          };
          this.$ajax(url.insertUserinfo, queryParam).then(res => {
            this.$message({
              type: 'success',
              message: '保存成功！'
            })
            this.$ajax(url.userIsWh, { userId: this.userId }).then(res => {
              this.$store.commit('set_isWh', res.data || false)
            });
            this.getuserinfo();
          });
        } else {
          return false;
        }
      })
    },
  }
};
</script>
<style lang="less" scoped>
.app-container {
  height: 100%;
  overflow: auto;
  /deep/ .el-tab-pane {
    display: flex;
    justify-content: center;
  }
}
.userInfoForm {
  width: 45%;
  /deep/ .el-form-item__label {
    width: 15% !important;
    text-align: left;
  }
  /deep/ .el-form-item__content {
    margin-left: 15% !important;
  }
}
.user-info-button {
  margin-bottom: 40px;
}
.clearfix {
  font-size: 16px;
}
.upload-style {
  font-style: normal;
  min-height: 120px;
}
</style>
