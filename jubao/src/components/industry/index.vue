<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>行业管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 搜索 -->
      <el-form :inline="true">
        <el-form-item label="行业名称">
          <el-input
            v-model="searchRole.roleName"
            placeholder="请输入..."
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="执法对象类型">
          <el-select v-model="searchRole.type" clearable size="small">
            <el-option
              v-for="dict in typeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="是否可用">
          <el-select v-model="searchRole.status" clearable size="small">
            <el-option
              v-for="dict in statusOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">查询</el-button>
          <el-button type="primary" icon="el-icon-refresh" size="mini" @click="clearQuery">重置</el-button>
        </el-form-item>
      </el-form>
   
      
      <div class="clearfix" style="border-top: 1px solid #dedede;padding-top: 20px;">
        <span>行业列表</span>
        <el-button style="float: right;" size="mini" @click="showEditDialog(1)">新增</el-button>
      </div>    

      <!-- 行业列表 -->
      <el-table :data="rolesList" border stripe>
        <!-- 索引列 -->
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="行业名称" prop="roleName"></el-table-column>
        <el-table-column label="执法对象类型" prop="type"></el-table-column>
        <el-table-column label="是否可用" prop="status">
          <template slot-scope="scope">
            {{scope.row.status == 1 ? '是' : '否'}}
          </template>
        </el-table-column>
        <el-table-column label="排序" prop="rank"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-button
              type="warning"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row)"
            >修改</el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeRoleById(scope.$index)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加行业对话框 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="addRoleDialogVisible"
      width="40%"
      @close="addRoleDialogClosed"
    >
      <el-form
        :model="addRoleForm"
        ref="addRoleFormRef"
        :rules="addRoleFormRules"
        label-width="120px"
      >
        <el-form-item label="行业名称" prop="roleName">
          <el-input v-model="addRoleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="行业代码" prop="code">
          <el-input v-model="addRoleForm.code"></el-input>
        </el-form-item>
        <el-form-item label="执法对象类型" prop="type">
          <el-select v-model="addRoleForm.type" clearable size="small">
            <el-option
              v-for="dict in typeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="排序" prop="rank">
          <el-select v-model="addRoleForm.rank" clearable size="small">
            <el-option
              v-for="dict in statusOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="是否有效" prop="status">
          <el-radio v-model="addRoleForm.status" placeholder="请选择">
          </el-radio>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addRoleDialogVisible = false">重 置</el-button>
        <el-button type="primary" @click="addRoles">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 添加弹窗行业状态
      options: [{
          value: '选项1',
          label: '正常'
        }, {
          value: '选项2',
          label: '停用'
        }],
      // 当前被选中的el-option的 value 属性值  
      value: "",

      // 行业状态
      typeOptions:[{
        dictValue: '自然保护区',
        dictLabel: '自然保护区'
      }, {
        dictValue: '饮用水源地',
        dictLabel: '饮用水源地'
      }, {
        dictValue: '工业污染源',
        dictLabel: '工业污染源'
      }, {
        dictValue: '建设项目',
        dictLabel: '建设项目'
      }, {
        dictValue: '其他',
        dictLabel: '其他'
      }, {
        dictValue: '航天游乐设备',
        dictLabel: '航天游乐设备'
      }],  
      // 行业状态
      statusOptions:[{
        dictValue: 1,
        dictLabel: '是'
      }, {
        dictValue: 0,
        dictLabel: '否'
      }],
        // 当前被选中的el-option的 value 属性值  
      dictValue: "",
      // 搜索行业表单绑定
      searchRole: {
        roleName: undefined,
        type: '',
        status: 1
      },
      // 所有行业列表这是后台返回哦的，我先给个默认数据
      rolesList: [
        { id:'1', roleName: "通用", type: "饮用水源地", status: 1, rank: 1 },
        { id:'2', roleName: "建设项目", type: "建设项目", status: 1, rank: 0 }
      ],
      //   添加用户对话框
      dialogTitle: '新建行业',
      addRoleDialogVisible: false,
      // 添加行业表单绑定
      addRoleForm: {
        roleName:'',
        code:'',
        type:'',
        status: 1,
        rank: ''
      },
      //   添加行业表单验证
      addRoleFormRules: {
        roleName: [
          { required: true, message: "请输入行业名称", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入行业代码", trigger: "blur" }
        ],
        type: [
          { required: true, message: "请选择执法对象类型", trigger: "blur" }
        ],
        status: [
          { required: true, message: "请选择排序", trigger: "blur" }
        ],
        rank: [
          { required: true, message: "请选择行业状态", trigger: "blur" }
        ]
      },
      //   当前即将分配权限的Id
      roleId: 0
    };
  },
  created() {
    this.getRolesList();
  },
  methods: {
       /**
     * 获取行业列表接口
     */
    async getRolesList() {
      console.log("获取行业列表接口");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      if (this.searchRole.roleName || this.searchRole.type || this.searchRole.status !== undefined) {
        this.getRolesList();
      } else {
        this.$message('输入查询条件');
      }
    },
    /**
     * 重置
     * */
    clearQuery() {
      this.searchRole.roleName = '';
      this.searchRole.type = '';
      this.searchRole.status = 1;
      this.getRolesList();
    },
 
    /**根据ID删除对应的行业*/ 
    async removeRoleById(index) {
      console.log(index)
      const confirmResult = await this.$confirm(
        "此操作将永久删除该行业, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => err);
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除");
      }
      // const { data: res } = await this.$http.delete("roles/" + id);
      // if (res.meta.status !== 200) return this.$message.error("删除行业失败！");
      this.$message.success("删除用户成功！");
      this.rolesList.splice(index,1)
      this.getRolesList();
    },

  
    /**添加行业对话框的关闭，清除表单校验*/ 
    addRoleDialogClosed() {
      this.$refs.addRoleFormRef.resetFields();
    },
    /**添加行业*/ 
    addRoles() {
      this.$refs.addRoleFormRef.validate(async valid => {
        if (!valid) return;
        // this.$message.error("添加行业失败！");
        this.$message.success("添加行业成功！");
        this.rolesList.push({ roleName: "管理员", roleDesc: "我是管理员" })
        this.addRoleDialogVisible = false;
        this.getRolesList();
      });
    },
   
     // 编辑行业对话框的关闭
    editRoleDialogClosed() {
      // this.$refs.editRoleFormRef.resetFields();
    },

    /**编辑行业弹窗打开*/ 
    showEditDialog(row) {
      if(typeof row == 'number' && row === 1) {
        this.dialogTitle = '新增行业';
        this.addRoleForm = {
          roleName:'',
          code:'',
          type:'',
          status: 1,
          rank: ''
        };
        this.addRoleDialogVisible = true;
        return;
      }

      this.dialogTitle = '编辑行业'
       // this.editRoleForm = res.data;
      this.addRoleForm = row;
      this.addRoleDialogVisible = true;
    },
    /**编辑行业提交*/
    editRoles() {
      this.$refs.editRoleFormRef.validate(async valid => {
        if (valid) {
            // 隐藏编辑行业对话框
              this.editRoleDialogVisible = false;
              this.$message.success("更新行业信息成功！");
              this.getRolesList();
          } else {
            console.log('error submit!!');
            return false;
          }
      });
    },
  }
};
</script>

<style lang="scss" scoped>
.el-tag {
  margin: 7px;
}
.bdtop {
  border-top: 1px solid #eee;
}
.bdbottom {
  border-bottom: 1px solid #eee;
}
.vcenter {
  display: flex;
  align-items: center;
}

</style>
