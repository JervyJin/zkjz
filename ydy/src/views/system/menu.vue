<template>
  <div class="app-container">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index/page1' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!--工具栏-->
    <el-form :inline="true" :model="query" class="user-search">
      <!-- <el-form-item label="搜索：">
        <el-input v-model="query.blurry" placeholder="输入搜索内容"></el-input>
      </el-form-item> -->
      <el-form-item>
        <!-- <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button> -->
        <el-button type="primary" icon="el-icon-plus" @click="toAdd">新增</el-button>
      </el-form-item>
    </el-form>
    <!--表单渲染-->
    <el-dialog append-to-body :close-on-click-modal="false" :visible.sync="showForm" :title="formTitle" width="580px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="菜单图标" prop="icon">
          <el-popover
            placement="bottom-start"
            width="450"
            trigger="click"
            @show="$refs['iconSelect'].reset()"
          >
            <IconSelect ref="iconSelect" @selected="selected" />
            <el-input slot="reference" v-model="form.icon" style="width: 450px;" placeholder="点击选择图标" readonly>
              <i v-if="form.icon" slot="prefix" :class="['icon', 'iconfont', form.icon]" class="el-input__icon" style="height: 32px;width: 16px;" />
              <i v-else slot="prefix" class="el-icon-search el-input__icon" />
            </el-input>
          </el-popover>
        </el-form-item>
        <el-form-item label="外链菜单" prop="isOutChain">
          <el-radio-group v-model="form.isOutChain">
            <el-radio-button label="1">是</el-radio-button>
            <el-radio-button label="2">否</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单可见" prop="isVisible">
          <el-radio-group v-model="form.isVisible">
            <el-radio-button label="1">是</el-radio-button>
            <el-radio-button label="2">否</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单标题" prop="funName">
          <el-input v-model="form.funName" placeholder="菜单标题" />
        </el-form-item>
        <el-form-item label="路由地址" prop="url">
          <el-input v-model="form.url" placeholder="路由地址" style="width: 178px;" />
        </el-form-item>
        <el-form-item label="菜单排序" prop="orderBy">
          <el-input-number v-model.number="form.orderBy" :min="0" :max="999" controls-position="right" style="width: 178px;" />
        </el-form-item>
        <el-form-item label="上级类目" prop="pid">
          <treeselect
            v-model="form.pid"
            :options="crud.data"
            :normalizer="normalizer"
            :load-options="loadMenus"
            style="width: 450px;"
            placeholder="选择上级类目"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="showForm=false">取消</el-button>
        <el-button :loading="loading" type="primary" @click="submitCU">确认</el-button>
      </div>
    </el-dialog>
    <!--表格渲染-->
    <div class="tableWrap">
      <el-table
        height="100%"
        ref="table"
        v-loading="crud.loading"
        lazy
        highlight-current-row
        border
        element-loading-text="拼命加载中"
        :data="crud.data"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        row-key="id"
        @current-change="rowClick"
        @select="selectChange"
        @select-all="selectAllChange"
        @selection-change="selectionChangeHandler"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column :show-overflow-tooltip="true" label="菜单标题" width="160px" prop="funName" />
        <el-table-column prop="icon" label="图标" align="center" width="60px">
          <template slot-scope="scope">
            <i :class="scope.row.icon ? scope.row.icon : ''" v-if="scope.row.icon && scope.row.icon.indexOf('el') >-1"></i>
            <i :class="['icon', 'iconfont', scope.row.icon ? scope.row.icon : '']" v-else></i>
          </template>
        </el-table-column>
        <el-table-column prop="orderBy" align="center" label="排序">
          <template slot-scope="scope">
            {{ scope.row.orderBy }}
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="url" label="组件路径" />
        <el-table-column prop="isOutChain" label="外链" width="75px">
          <template slot-scope="scope">
            <span v-if="scope.row.isOutChain == 1">是</span>
            <span v-else>否</span>
          </template>
        </el-table-column>
        <el-table-column prop="isVisible" label="可见" width="75px">
          <template slot-scope="scope">
            <span v-if="scope.row.isVisible == 2">否</span>
            <span v-else>是</span>
          </template>
        </el-table-column>
        <el-table-column prop="createBy" label="创建人"></el-table-column>
        <el-table-column prop="created" label="创建日期" width="140px">
          <template slot-scope="scope">
            <span>{{ scope.row.created | getDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="160px" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" plain @click="toEdit(scope.row)">编辑</el-button>
            <el-button type="danger" @click="toDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import url from '@/servers/url-config.js'
import IconSelect from '@/components/IconSelect'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { formatDateToStr } from '@/utility/utility.js'
// import { LOAD_CHILDREN_OPTIONS } from '@riophae/vue-treeselect'
export default {
  name: 'Menu',
  components: { Treeselect, IconSelect },
  data() {
    return {
      query: {
        blurry: '',
        page: 1
      },
      crud: {
        loading: false,
        data: []
      },
      showForm: false,
      formTitle: '',
      form: {
        icon: '',
        funName: '',
        isOutChain: 2,
        isVisible: 1,
        url: '',
        orderBy: 0,
        pid: ''
      },
      loading: false,
      menus: [{
        id: '0',
        label: 'a',
        children: [ {
          id: 'aa',
          label: 'aa',
        }, {
          id: 'ab',
          label: 'ab',
        } ]
      }],
      rules: {
        funName: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getdata()
  },
  filters: {
    getDate(v) {
      return formatDateToStr(v).slice(0, 10);
    }
  },
  methods: {
    // 获取数据
    getdata() {
      this.crud.loading = true;
      this.$ajax(url.getMenuTree, {}).then(res => {
        if(res.success) {
          console.log(res, '0000')
          this.crud.loading = false
          this.crud.data = res.data;
        }
        // 分页赋值
        // this.pageparm.currentPage = this.formInline.page
        // this.pageparm.pageSize = this.formInline.limit
        // this.pageparm.total = res.total
      })
    },
    normalizer(node) {
      //去掉children=[]的children属性
      if(node.children && !node.children.length){
        delete node.children;
      }
      return {
        id: node.id,
        label: node.funName,
        children:node.children
      }
    },
    toQuery() {

    },
    resetQuery() {
      this.query.blurry = ''
    },
    search() {

    },
    toAdd() {
      this.formTitle = '添加菜单';
      this.form = {
        icon: '',
        funName: '',
        isOutChain: 2,
        isVisible: 1,
        url: '',
        orderBy: 0,
        pid: this.form.pid || this.crud.data[0].id
      }
      this.showForm = true;
    },
    rowClick(row) {
      this.form.pid = row.id;
    },
    selectChange(selection, row) {

    },
    selectAllChange(selection) {

    },
    selectionChangeHandler(selection) {

    },
    // 修改菜单
    toEdit(row) {
      this.formTitle = '修改菜单';
      this.showForm = true;
      this.form = {
        icon: row.icon,
        funName: row.funName,
        isOutChain: row.isOutChain,
        isVisible: row.isVisible,
        url: row.url,
        orderBy: row.orderBy,
        pid: row.pid
      };
    },
    // 删除菜单
    toDel(row) {
      this.$confirm('确定要删除吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        this.$ajax(url.deleteMenu, {ids: row.id})
          .then(res => {
            if (res.success) {
              this.$message({
                type: 'success',
                message: '菜单已删除！'
              })
              this.getdata();
            } else {
              this.$message({
                type: 'info',
                message: res.message
              })
            }
          })
          .catch(err => {
            this.loading = false
            this.$message.error('菜单删除失败，请稍后再试！')
          })
      })
    },
    // 选择icon
    selected(v) {
      this.form.icon = v.icon
    },
    // 加载菜单
    loadMenus({ action, parentNode, callback }) {

    },
    // 提交表单
    submitCU() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true;
          let urls = url.addMenu;
          if(this.formTitle == '修改菜单') {
            urls = url.updateMenu
          }
          this.$ajax(urls, this.form).then(res => {
            if (res.success) {
              this.getdata();
              this.$message({
                type: 'success',
                message: '菜单保存成功！'
              })
            } else {
              this.$message({
                type: 'info',
                message: res.message
              })
            }
            this.showForm = false;
            this.loading = false;
          }).catch(err => {
            this.showForm = false;
            this.loading = false;
            this.$message.error(err.message)
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .app-container {
    padding-bottom: 60px;
  }
  /deep/ .head-container{
    margin-top: 20px;
  }
  /deep/ .el-input-number .el-input__inner {
    text-align: left;
  }
  /deep/ .vue-treeselect__control, /deep/ .vue-treeselect__placeholder, /deep/ .vue-treeselect__single-value {
    height: 30px;
    line-height: 30px;
  }
  .tableWrap {
    height: calc(100vh - 255px);
    overflow: auto;
  }
</style>
