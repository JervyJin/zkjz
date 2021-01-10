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
              <el-form ref="userinfoRules" :model="editUserinfo" :rules="userinfoRules" label-width="80px">
                <el-form-item label="用户昵称" prop="nickName">
                  <el-input v-model="editUserinfo.nickName"/>
                </el-form-item>
                <el-form-item label="手机号码" prop="phonenumber">
                  <el-input maxlength="11" v-model="editUserinfo.phonenumber"/>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                  <el-input maxlength="50" v-model="editUserinfo.email"/>
                </el-form-item>
                <el-form-item label="性别">
                  <el-radio-group>
                    <el-radio label="0">男</el-radio>
                    <el-radio label="1">女</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" size="mini" >保存</el-button>
                  <el-button type="danger" size="mini" >关闭</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>

            <el-tab-pane label="修改密码" name="resetPwd">
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
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
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
        activeTab:"userinfo", //默认打开第一个选项卡
       //修改资料需要传递的数据
      editUserinfo: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },  
      //修改密码需要传递的数据
       editResetPwd: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },  
      // 基本资料表单校验
      userinfoRules: {
        nickName: [
          { required: true, message: "用户昵称不能为空", trigger: "blur" }
        ],
        email: [
          { required: true, message: "邮箱地址不能为空", trigger: "blur" },
          {
            type: "email",
            message: "'请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        phonenumber: [
          { required: true, message: "手机号码不能为空", trigger: "blur" },
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ]
      },
       // 修改密码表单校验
      resetPwdRules: {
        oldPassword: [
          { required: true, message: "旧密码不能为空", trigger: "blur" }
        ],
        newPassword: [
          { required: true, message: "新密码不能为空", trigger: "blur" },
          { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
        ],
        confirmPassword: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          { required: true, validator: equalToPassword, trigger: "blur" }
        ]
      }
    };
  },
  created() {},
  methods: {}
};
</script>
<style>
.clearfix{font-size: 16px;}
</style>
