<template>
  <div>
    <el-form :model="form" label-width="110px">
      <div class="title">生产状态:</div>
      <el-row>
        <el-col :span="11">
          <el-form-item label="生产状态:">
            <el-radio-group v-model="form.resource">
              <el-radio label="正常"></el-radio>
              <el-radio label="部分"></el-radio>
              <el-radio label="停产"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="上月实际产量:">
            <el-input v-model="form.products" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="title">废水排放情况:</div>
      <el-row>
        <el-col :span="11">
          <el-form-item label="废水排放口:">
            <el-select v-model="form.resource">
              <el-option label="正常" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="13">
          <el-form-item label="安装在线监控设备并联网:">
            <el-col :span="11">
              <el-select v-model="form.resource">
                <el-option label="正常" value="1"></el-option>
              </el-select>
            </el-col>
            <el-col :span="11">
              <el-input v-model="form.products" placeholder="请输入"></el-input>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="监控数据:">
            <el-select v-model="form.resource">
              <el-option label="正常" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="排放一类污染物:">
            <el-select v-model="form.resource">
              <el-option label="正常" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="建设规范:">
            <el-select v-model="form.resource">
              <el-option label="正常" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="监控数据:">
            <el-select v-model="form.resource">
              <el-option label="正常" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="title">废气排放情况:</div>
      <el-row>
        <el-col :span="11">
          <el-form-item label="工艺废气排放口:">
            <el-select v-model="form.resource">
              <el-option label="正常" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="13">
          <el-form-item label="安装在线监控设备并联网:">
            <el-col :span="11">
              <el-select v-model="form.resource">
                <el-option label="正常" value="1"></el-option>
              </el-select>
            </el-col>
            <el-col :span="11">
              <el-input v-model="form.products" placeholder="请输入"></el-input>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="监控数据:">
            <el-select v-model="form.resource">
              <el-option label="正常" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="工业锅炉、炉窖废气排放口:">
            <el-select v-model="form.resource">
              <el-option label="正常" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="建设规范:">
            <el-select v-model="form.resource">
              <el-option label="正常" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="监控数据:">
            <el-select v-model="form.resource">
              <el-option label="正常" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="厂区无组织排放管控情况:">
            <el-select v-model="form.resource">
              <el-option label="正常" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="监控数据:">
            <el-select v-model="form.resource">
              <el-option label="正常" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="涉及VOC排放:">
            <el-select v-model="form.resource">
              <el-option label="正常" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="安装VOC收集处理设施:">
            <el-select v-model="form.resource">
              <el-option label="正常" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="涉及喷漆:">
            <el-select v-model="form.resource">
              <el-option label="正常" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="建立油漆使用管理台账:">
            <el-select v-model="form.resource">
              <el-option label="正常" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row> 
      <el-row>
        <el-col :span="11">
          <el-form-item label="一般固体废物管理规范:">
            <el-select v-model="form.resource">
              <el-option label="正常" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="规范贮存和处置:">
            <el-select v-model="form.resource">
              <el-option label="正常" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="危险废物贮存场所规范:">
            <el-select v-model="form.resource">
              <el-option label="正常" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="委托有资质单位处置:">
            <el-select v-model="form.resource">
              <el-option label="正常" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="台账管理规范:">
            <el-select v-model="form.resource">
              <el-option label="正常" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="转移联单完整:">
            <el-select v-model="form.resource">
              <el-option label="正常" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="title">噪声污染控制情况:</div>
      <el-row>
        <el-col :span="11">
          <el-form-item label="厂界噪声排放管控情况:">
            <el-select v-model="form.resource">
              <el-option label="正常" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="title">污染防治设施运行情况:</div>
      <el-row>
        <el-col :span="11">
          <el-form-item label="正常运行: ">
            <el-select v-model="form.resource">
              <el-option label="正常" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="title">应急防范情况:</div>
      <el-row>
        <el-col :span="11">
          <el-form-item label="已建立环境风险应急制度:">
            <el-select v-model="form.resource">
              <el-option label="正常" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="环境应急预案已备案:">
            <el-select v-model="form.resource">
              <el-option label="正常" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="title">企业信息公开情况:</div>
      <el-row>
        <el-col :span="11">
          <el-form-item label="重点监控设备企业名单:">
            <el-select v-model="form.resource">
              <el-option label="正常" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="落实企业信息公开制度:">
            <el-select v-model="form.resource">
              <el-option label="正常" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="其他环境问题:">
            <el-input type="textarea" v-model="form.resource"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="制止环境违法行为与企业环境问题整改的要求:">
            <el-input type="textarea" v-model="form.resource"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="4">
          <el-button type="primary">暂存</el-button>
          <el-button>重置</el-button>
        </el-col>
      </el-row>
    </el-form>

  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        type: [],
        resource: '',
        products: ''
      },
      tableData: [{
        file_type: 'exc',
        file_name: '',
        file_size: ''
      }, {
        file_type: 'exc',
        file_name: '',
        file_size: ''
      }, {
        file_type: 'exc',
        file_name: '',
        file_size: ''
      }]
    }
  }
}
</script>

<style lang="less" scoped>
  .title{
    margin-top: 24px;
    font-size: 14px;
    color: #333333;
    font-weight: 700;
    line-height: 20px;
  }
  .line{
    display: flex;
    font-size: 14px;
    color: #333333;
    line-height: 20px;
    margin-top: 24px;
    .col{
      display: flex;
      margin-right: 310px;
      .label{
        width: 110px;
      }
      .val{
        min-width: 111px;
      }
    }
  }
</style>