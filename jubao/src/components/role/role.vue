<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 搜索 -->

      <el-form :inline="true">
        <el-form-item label="角色名称">
          <el-input
            v-model="searchRole.roleName"
            placeholder="请输入角色名称"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchRole.status" placeholder="角色状态" clearable size="small">
            <el-option
              v-for="dict in statusOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
          <el-button type="primary" icon="el-icon-plus" size="mini" @click="AddRoleDialogVisible=true">添加角色</el-button>
        </el-form-item>
      </el-form>
   
          

      <!-- 角色列表 -->
      <el-table :data="rolesList" border stripe>
        <!-- 索引列 -->
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="状态" prop="roleState">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.isRecommendTwo"
              @change="handelUpdate(scope.$index, scope.row)"
              inactive-color="#DCDFE6"
              :active-value="true"
              :inactive-value="false"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.$index,scope.row)"
            >编辑</el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeRoleById(scope.$index)"
            >删除</el-button>
            <el-button
              type="warning"
              icon="el-icon-setting"
              size="mini"
              @click="showSetRightDialog(scope.row)"
            >分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分配权限 -->
    <el-dialog
      title="分配权限"
      :visible.sync="setRightDialogVisible"
      width="50%"
      @close="setRightDialogClosed"
    >
      <el-tree
        :data="rightsList"
        :props="treeProps"
        ref="treeRef"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="defKeys"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRights">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加角色对话框 -->
    <el-dialog
      title="添加角色"
      :visible.sync="AddRoleDialogVisible"
      width="40%"
      @close="addRoleDialogClosed"
    >
      <el-form
        :model="addRoleForm"
        ref="addRoleFormRef"
        :rules="addRoleFormRules"
        label-width="100px"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addRoleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addRoleForm.roleDesc"></el-input>
        </el-form-item>
        <el-form-item label="角色状态" prop="roleStatus">
          <el-select v-model="addRoleForm.roleStatus" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="AddRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRoles">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑角色对话框 -->
    <el-dialog
      title="编辑角色"
      :visible.sync="editRoleDialogVisible"
      width="40%"
      @close="editRoleDialogClosed"
    >
      <el-form
        :model="editRoleForm"
        ref="editRoleFormRef"
        :rules="editRoleFormRules"
        label-width="100px"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editRoleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="editRoleForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRoles">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 添加弹窗角色状态
     options: [{
          value: '选项1',
          label: '正常'
        }, {
          value: '选项2',
          label: '停用'
        }],
      // 当前被选中的el-option的 value 属性值  
      value: "",
        
      // 角色状态
      statusOptions:[{
          dictValue: '选项1',
          dictLabel: '正常'
        }, {
          dictValue: '选项2',
          dictLabel: '停用'
        }],
         // 当前被选中的el-option的 value 属性值  
      dictValue: "",
       // 搜索角色表单绑定
      searchRole: {
        roleName: undefined,
        status: undefined
      },
      // 所有角色列表这是后台返回哦的，我先给个默认数据
      rolesList: [
        { id:'1', roleName: "管理员", roleDesc: "我是管理员" },
        { id:'2', roleName: "普通角色", roleDesc: "我是普通角色" }
      ],
      // 分配权限框
      setRightDialogVisible: false,
      // 权限列表
      // rightsList: [],
      rightsList: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
      //  树形控件的属性绑定值
      treeProps: {
        // label: "authName",
        label: 'label',
        children: "children"
      },
      //   默认勾选的节点的 key 的数组
      defKeys: [],
      //   添加用户对话框
      AddRoleDialogVisible: false,
      // 添加角色表单绑定
      addRoleForm: {
        roleName:'',
        roleDesc:'',
        roleStatus:''

      },
      //   添加角色表单验证
      addRoleFormRules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" }
        ],
        roleDesc: [
          { required: true, message: "请输入角色描述", trigger: "blur" }
        ],
        roleStatus: [
          { required: true, message: "请选择角色状态", trigger: "blur" }
        ]
      },
      //   编辑角色表单绑定
      editRoleForm: {},
      editRoleDialogVisible: false,
    //   编辑角色表单验证
      editRoleFormRules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" }
        ],
        roleDesc: [
          { required: true, message: "请输入角色描述", trigger: "blur" }
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
     * 获取角色列表接口
     */
    async getRolesList() {
      console.log("获取角色列表接口");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      if (!this.searchRole.roleName || !this.searchRole.status)
        this.$message.error('请填写完整');
        return;
      // this.getList();
      this.searchRole.roleName = ''
      this.searchRole.status = ''
    },
    /**
     * 切换switch状态开关这一步是要请求后台接口的
     * */
    handelUpdate(index, row) {
      // ：active-value得为true
      // ：inactive-value得为false
      let flag = row.isRecommendTwo; //保存点击之后v-modeld的值(true，false)

      row.isRecommendTwo = !row.isRecommendTwo; //保持switch点击前的状态

      this.$confirm("是否确认此操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (flag) {
            row.isRecommendTwo = true;
            // 逻辑处理
            this.$message.success("打开成功!");
          } else {
            row.isRecommendTwo = false;
            // 逻辑处理
            this.$message.success("关闭成功！");
          }
        })
        .catch(() => {
          this.$message.info("取消操作！");
        });
    },
 
    /**根据ID删除对应的角色*/ 
    async removeRoleById(index) {
      console.log(index)
      const confirmResult = await this.$confirm(
        "此操作将永久删除该角色, 是否继续?",
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
      // if (res.meta.status !== 200) return this.$message.error("删除角色失败！");
      this.$message.success("删除用户成功！");
      this.rolesList.splice(index,1)
      this.getRolesList();
    },

  
    /**添加角色对话框的关闭，清除表单校验*/ 
    addRoleDialogClosed() {
      this.$refs.addRoleFormRef.resetFields();
    },
    /**添加角色*/ 
    addRoles() {
      this.$refs.addRoleFormRef.validate(async valid => {
        if (!valid) return;
        // this.$message.error("添加角色失败！");
        this.$message.success("添加角色成功！");
        this.rolesList.push({ roleName: "管理员", roleDesc: "我是管理员" })
        this.AddRoleDialogVisible = false;
        this.getRolesList();
      });
    },
   
     // 编辑角色对话框的关闭
    editRoleDialogClosed() {
      // this.$refs.editRoleFormRef.resetFields();
    },

    /**编辑角色弹窗打开*/ 
    async showEditDialog(index,row) {
      console.log(index,row);
       // this.editRoleForm = res.data;
       this.editRoleForm = row;
      this.editRoleDialogVisible = true;
    },
    /**编辑角色提交*/
    editRoles() {
      this.$refs.editRoleFormRef.validate(async valid => {
        if (valid) {
            // 隐藏编辑角色对话框
              this.editRoleDialogVisible = false;
              this.$message.success("更新角色信息成功！");
              this.getRolesList();
          } else {
            console.log('error submit!!');
            return false;
          }
      });
    },
    
    /**当前角色权限接口*/ 
    async showSetRightDialog(role) {
      this.roleId = role.id;
      // 获取角色的所有权限接口
      console.log("获取角色的所有权限接口，把权限树赋值给rightsList数组：this.rightsList = res.data");
      //   递归获取三级节点的id
      this.getLeafkeys(role, this.defKeys);

      this.setRightDialogVisible = true;
    },

     /**
     * 通过递归 获取角色下三级权限的 id, 并保存到defKeys数组
     * */ 
    getLeafkeys(node, arr) {
      // 没有children属性，则是三级节点
      if (!node.children) {
        return arr.push(node.id);
      }
      node.children.forEach(item => this.getLeafkeys(item, arr));
    },
    /**分配权限提交*/ 
    async allotRights(roleId) {
      /**
       * 获得当前选中和半选中的Id
       * getCheckedKeys 若节点可被选择（即 show-checkbox 为 true），则返回目前被选中的节点的 key 所组成的数组
       * getHalfCheckedKeys 若节点可被选择（即 show-checkbox 为 true），则返回目前半选中的节点的 key 所组成的数组
       * */ 
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ];
      // join() 方法用于把数组中的所有元素放入一个字符串
      const idStr = keys.join(",");
      this.setRightDialogVisible = true;
      this.$message.success("分配权限成功!");
      this.getRolesList();
      this.setRightDialogVisible = false;
    },
      // 权限对话框关闭事件
    setRightDialogClosed() {
      // this.rightsList = [];
    },
  }
};
</script>

<style lang="scss" scoped>

</style>
