<template>
  <div class="app-container">
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>菜单列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-form :inline="true">
        <el-form-item label="菜单名称">
          <el-input
            v-model="searchMenu.menuName"
            placeholder="请输入菜单名称"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="status" placeholder="菜单状态" clearable size="small">
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
          <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>


      <!-- 表格部分 -->
      <el-table
        :data="menuList"
        stripe
        row-key="id"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column prop="menuName" label="菜单名称"></el-table-column>
        <el-table-column prop="orderNum" label="排序"></el-table-column>
        <el-table-column label="状态" prop="status"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleUpdate(scope.row)"
            >修改</el-button>
            <el-button size="mini" type="text" icon="el-icon-plus" @click="handleAdd(scope.row)">新增</el-button>
            <el-button
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>




    <!-- 添加或修改菜单对话框 -->
    <el-dialog @close="formDialogClosed" :title="title" :visible.sync="open" width="600px" append-to-body>
      <el-form ref="form" :model="menuForm" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="上级菜单">
              <el-select
                v-model="menuForm.value"
                clearable
                size="medium"
                style="width:100%"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="菜单类型">
              <el-radio-group v-model="menuForm.menuRadio">
                <el-radio label="M">目录</el-radio>
                <el-radio label="C">菜单</el-radio>
                <el-radio label="F">子菜单</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24" style="padding-top:10px;padding-bottom:20px;">
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单名称" prop="menuName">
              <el-input v-model="menuForm.menuName" placeholder="请输入菜单名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示排序" prop="orderNum">
              <el-input-number v-model="menuForm.orderNum" controls-position="right" :min="0" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item  label="显示状态" prop="visible">
              <el-radio-group v-model="menuForm.visible">
                <el-radio label="1">显示</el-radio>
                <el-radio label="2">隐藏</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          
          <el-col :span="12">
            <el-form-item label="路由地址">
              <el-input v-model="menuForm.path" placeholder="请输入路由地址" />
            </el-form-item>
          </el-col>
          
          <!-- <el-col :span="12">
            <el-form-item v-if="form.menuType != 'F'" label="菜单状态">
              <el-radio-group v-model="menuForm.status">
                <el-radio
                  v-for="dict in statusOptions"
                  :key="dict.dictValue"
                  :label="dict.dictValue"
                >{{dict.dictLabel}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>-->
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Menu",
  data() {
    return {
      // 显示状态默认值
      menuRadio: "",
      // 遮罩层
      loading: true,
      //   下拉菜单数据
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",

      // 菜单表格树数据
      menuList: [
        {
          id: 1,
          menuName: "系统管理",
          orderNum: "1",
          status: "显示",
          children: [
            {
              id: 31,
              menuName: "用户管理",
              orderNum: "1-1",
              status: "显示",
              children: [
                {
                  id: 41,
                  menuName: "添加用户",
                  orderNum: "1-1-1",
                  status: "显示"
                }
              ]
            },
            {
              id: 32,
              menuName: "角色管理",
              orderNum: "1-2",
              status: "显示"
            }
          ]
        },
        {
          id: 2,
          menuName: "任务管理",
          orderNum: "2",
          status: "显示",
          children: [
            {
              id: 21,
              menuName: "任务发布",
              orderNum: "1-1",
              status: "显示"
            },
            {
              id: 22,
              menuName: "任务监控",
              orderNum: "1-2",
              status: "显示"
            }
          ]
        }
      ],
      // 二级菜单表格树数据
      //   menuList2: [
      //     { menuName: "系统管理", orderNum: "1", status: "显示" },
      //     { menuName: "任务管理", orderNum: "2", status: "显示" }
      //   ],
      // 菜单树选项
      menuOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 显示状态数据字典
      visibleOptions: [],
      // 菜单状态下拉数据
      statusOptions: [
        {
          dictValue: '选项1',
          dictLabel: '显示'
        }, {
          dictValue: '选项2',
          dictLabel: '隐藏'
        }
      ],
      status:'',
      // 搜索菜单表单绑定
      searchMenu: {
        menuName: undefined,
        visible: undefined
      },
      // 初始化表单绑定
      menuForm: {},
      // 表单校验
      rules: {
        menuName: [
          { required: true, message: "菜单名称不能为空", trigger: "blur" }
        ],
        orderNum: [
          { required: true, message: "菜单顺序不能为空", trigger: "blur" }
        ],
        visible: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询菜单列表接口 */
    getList() {},
    /** 转换菜单数据结构 */
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.id,
        label: node.menuName,
        children: node.children
      };
    },
    /** 查询菜单下拉树结构请求 */
    getTreeselect() {
      console.log('查询弹窗菜单上级菜单')
    },
    // 显示状态字典翻译
    visibleFormat(row, column) {
      if (row) {
        return "";
      }
      return this.selectDictLabel(this.visibleOptions, row.visible);
    },
    // 菜单状态字典翻译
    statusFormat(row, column) {
      if (row) {
        return "";
      }
      return this.selectDictLabel(this.statusOptions, row.status);
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    
    // dialog关闭，表单验证重置
    formDialogClosed(){
      this.$refs.form.resetFields()

    },
    // 表单数据重置方法
    reset() {
      this.menuForm = {
        menuId: undefined,
        value:undefined,
        menuName: undefined,
        // menuType: "M",
        orderNum: undefined,
        menuRadio:'M',
        visible: "1",
        status: "1"
      };
      //   this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.getList();
    },
    /** 新增按钮操作 */
    handleAdd(row) {
      this.reset();
      this.getTreeselect();
      console.log('新增按钮弹窗数据')
      console.log(row);
      this.open = true;
      this.title = "添加菜单";
      // this.menuList = row;
      // if (row!=null) {
        
        
      // }
      // this.menuList.children.push({
      //         id: 12,
      //         menuName: "用户管理",
      //         orderNum: "1-1",
      //         status: "显示",
      //       },)
    },
    /** 修改按钮操作
     * ①请求接口获取当前数据 把数据赋值给dialog里的form
     * ②在请求回调中打开弹窗并修改title
     */
    handleUpdate(row) {
      console.log(row)
      console.log('修改按钮操作!!')
      //把表单列表赋值给editUserForm实现双向绑定
       // this.editUserForm = res.data;
       this.menuForm = row; 
      // this.reset();
      this.getTreeselect();
      this.open = true;
      this.title = "修改菜单";
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(async valid => {
        if (!valid) return;
        this.$message.success("添加角色成功！");
        this.menuList.push({
          id: 3,
          menuName: "其他管理",
          orderNum: "2",
          status: "显示",
          children: [
            {
              id: 51,
              menuName: "任务发布",
              orderNum: "1-1",
              status: "显示"
            },
          ]
        })
        this.open = false;

      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      this.$confirm(
        '是否确认删除名称为"' + row.menuName + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(function() {
          return delMenu(row.menuId);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
        .catch(function() {});
    }
  }
};
</script>
<style lang="scss" scoped>

</style>