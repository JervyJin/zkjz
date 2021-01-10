<template>
  <div>
    <div v-if="!selectDict.type">
      <div class="my-code">点击字典查看详情</div>
    </div>
    <div v-else>
      <!--表单组件-->
      <el-dialog append-to-body :visible.sync="showAdd" :title="title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="所属字典">
            <el-input v-model="form.type" style="width: 370px;" readonly/>
          </el-form-item>
          <el-form-item label="字典名称">
            <el-input v-model="form.typeName" style="width: 370px;" readonly/>
          </el-form-item>
          <el-form-item label="编码" prop="code">
            <el-input-number v-model.number="form.code" :min="0" :max="999" controls-position="right" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="字典选项" prop="name">
            <el-input v-model="form.name" style="width: 370px;"/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="default" @click="showAdd=false;">取消</el-button>
          <el-button type="primary" @click="submitCU">确认</el-button>
        </div>
      </el-dialog>
      <!--表格渲染-->
      <div class="tableWrap">
        <el-table ref="table" border v-loading="crud.loading" :data="crud.data" highlight-current-row height="100%" @selection-change="selectionChangeHandler">
          <el-table-column type="selection" width="40" align="center"></el-table-column>
          <el-table-column type="index" label="序号" align="center"></el-table-column>
          <el-table-column label="所属字典" prop="typeName" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="字典标签" prop="type" align="center"></el-table-column>
          <el-table-column prop="name" label="字典选项" align="center" />
          <el-table-column prop="code" label="编码" align="center" />
          <!--<el-table-column prop="isActive" label="是否可用">
            <template slot-scope="scope">
              {{scope.row.isActive == "Y" ? '是' : '否'}}
            </template>
          </el-table-column>-->
          <el-table-column prop="updated" label="上次更新时间" show-overflow-tooltip align="center" />
          <el-table-column prop="updateBy" label="上次更新人" align="center" show-overflow-tooltip/>
          <el-table-column label="操作" width="160" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button type="primary" plain @click="edit(scope.row)">编辑</el-button>
              <el-button type="danger" @click="del(scope.row, scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import url from '@/servers/url-config.js'
export default {
  props: ['selectDict', 'showDictDetail'],
  data() {
    return {
      showAdd: false,
      // query: {
      //   dictId: 1,
      //   dictName: 'job_status'
      // },
      rules: {
        name: [
          { required: true, message: '请输入字典标签', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请输入字典值', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入编码', trigger: 'blur', type: 'number' }
        ]
      },
      title: '添加选项',
      form:{
        id: '',
        type: '',
        typeName: '',
        name: '',
        code: ''
      },
      crud:{
        loading: false,
        data: []
      },
      selectRows: []
    }
  },
  watch: {
    showDictDetail(v) {
      console.log(this.form, '0000')
      this.showAdd = true;
      this.title = '添加选项';
      this.form.name = '';
      this.form.code = '';
      this.form.id = '';
    },
    selectDict: {
      deep: true,
      immediate: true,
      handler(v) {
        if(!v.type) return;
        this.form.type = v.type;
        this.form.typeName = v.typeName;
        this.getData();
      }
    }
  },
  methods: {
    getData() {
      this.$ajax(url.getDictOption, {
        type: this.form.type
      }).then(res => {
        this.crud.data = res
      })
    },
    selectionChangeHandler(rows) {
      this.selectRows = rows;
    },
    submitCU() {
      this.$refs.form.validate(valid => {
        if(valid) {
          this.showAdd = false;
          let urls = this.title == '修改选项' ? url.updateDict : url.addDict
          this.$ajax(urls, this.form).then(res => {
            if(res.success) {
              this.$message({
                type: 'success',
                message: this.title == '修改选项' ? '修改成功！' : '添加成功！'
              })
              this.form.name = '',
              this.form.code = ''
              this.getData();
            }
          })
        }
      })
    },
    // 修改选项值
    edit(row) {
      this.form.id = row.id;
      this.form.name = row.name;
      this.form.code = row.code;
      this.title = '修改选项';
      this.showAdd = true;
    },
    // 删除选项值
    del(row, index) {
      this.$confirm('确定要删除吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        this.$ajax(url.deleteDict, {ids: row.id}).then(res => {
          this.getData();
        })
      })
    },
    delectIds() {
      if(!this.selectRows.length) {
        return;
      }
      this.$confirm('确定要全部删除吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        let ids = this.selectRows.map(v => v.id).join();
        this.$ajax(url.deleteDict, {ids}).then(res => {
          this.getData();
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .my-code {
    position: relative;
    line-height: 20px;
    color: rgb(51, 51, 51);
    font-family: "Courier New", serif;
    font-size: 12px;
    padding: 15px;
    border-left: 5px solid rgb(221, 221, 221);
  }
  /deep/ .el-input-number .el-input__inner {
    text-align: left;
  }
  .tableWrap {
    height: calc(100vh - 265px);
    /*overflow: auto;*/
  }
</style>
