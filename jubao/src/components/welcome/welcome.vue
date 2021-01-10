<template>
  <div>
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="6">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>当前位置：</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="10">
        <marquee style="color:red;">通知：我部拟于2020年4月29日12:00至12:30，部署上线新版网络举报公众服务端，更新期间网络举报暂停使用。微信举报和“全国12369环保举报联网管理平台”系统登录使用不受影响。此次升级内容包括：①网上举报及查询功能升级，增加身份证录入项；同一实名举报人电话、微信、网络等多渠道举报信息整合，举报人可通过网上举报查询本人手机号码通过其他渠道举报的结果。②污染类型及统计报表查询优化。</marquee>
      </el-col>
      <el-col :span="6">
        <div class="textRight">
          <span>[常见问题]&nbsp&nbsp</span>
          <span>[退出]&nbsp&nbsp</span>
          <span>[个人中心]</span>
        </div>
      </el-col>
    </el-row>

    <el-container>
      <el-main>
        <div class="cardBox">
          <div class="itemBox">
            <p class="title">已超期</p>
            <p>
              共
              <span class="num">2</span>件
            </p>
            <div class="imgBox"></div>
            <div class="listBox">
              <p class="list">
                <span>超期未办理</span>
                <span class="listNum">9</span>
              </p>
              <p class="list">
                <span>超期未办理</span>
                <span class="listNum">9</span>
              </p>
              <p class="list">
                <span>超期未办理</span>
                <span class="listNum">9</span>
              </p>
            </div>
          </div>
          <div class="itemBox">
            <p class="title">即将超期</p>
            <p>
              共
              <span class="num">2</span>件
            </p>
            <div class="imgBox"></div>
            <div class="listBox">
              <p class="list">
                <span>超期未办理</span>
                <span class="listNum">9</span>
              </p>
              <p class="list">
                <span>超期未办理</span>
                <span class="listNum">9</span>
              </p>
              <p class="list">
                <span>超期未办理</span>
                <span class="listNum">9</span>
              </p>
            </div>
          </div>
          <div class="itemBox">
            <p class="title">待办事项</p>
            <p>
              共
              <span class="num">2</span>件
            </p>
            <div class="imgBox"></div>
            <div class="listBox">
              <p class="list">
                <span>超期未办理</span>
                <span class="listNum">9</span>
              </p>
              <p class="list">
                <span>超期未办理</span>
                <span class="listNum">9</span>
              </p>
              <p class="list">
                <span>超期未办理</span>
                <span class="listNum">9</span>
              </p>
            </div>
          </div>
        </div>
        <!-- 其他功能 -->
        <p class="others">其他常用功能</p>
        <div class="othersBox">
          <router-link :to="{ path: '/role' }" tag="div" class="itemBox itemBox1">督办件</router-link>
          <router-link :to="{ path: '/role' }" tag="div" class="itemBox itemBox2">抽查下级</router-link>
          <router-link :to="{ path: '/role' }" tag="div" class="itemBox itemBox3">本级</router-link>
          <router-link :to="{ path: '/role' }" tag="div" class="itemBox itemBox4">申请下级介入</router-link>
          <router-link :to="{ path: '/role' }" tag="div" class="itemBox itemBox5">申请上级介入</router-link>
          <router-link :to="{ path: '/role' }" tag="div" class="itemBox itemBox6">上级转办</router-link>
          <router-link :to="{ path: '/role' }" tag="div" class="itemBox itemBox7">草稿箱</router-link>
        </div>
      </el-main>
      <el-aside width="368px">
        <div class="userInfo">
          <p class="title">用户信息</p>
          <div class="info">
            <el-row :gutter="20" class="row_info">
              <el-col span="6">用户名</el-col>
              <el-col span="12">张三</el-col>
              <el-col span="6">
                <el-button size="medium" type="text" icon="el-icon-edit">修改</el-button>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="row_info">
              <el-col span="6">单位名</el-col>
              <el-col span="12">河南省生态环境厅</el-col>
            </el-row>
            <el-row :gutter="20" class="row_info">
              <el-col span="6">登录时间</el-col>
              <el-col span="12">2020-05-12 09:07</el-col>
            </el-row>
          </div>
        </div>
        <div class="buttons">
          <el-button type="primary">添加举报案件</el-button>
          <el-button type="primary">自助服务</el-button>
        </div>

        <div class="jubaoMode">
          <el-divider content-position="center">举报方式</el-divider>
        </div>
        <div class="modeButtons">
          <router-link :to="{ path: '/role' }" tag="span" class="modeBox weixinBtn"><img src="../../assets/img/weixin.png" alt="">微信举报</router-link>
          <router-link :to="{ path: '/role' }" tag="span" class="modeBox netBtn"><img src="../../assets/img/net.png" alt="">网络举报</router-link>
          <router-link :to="{ path: '/role' }" tag="span" class="modeBox phoneBtn"><img src="../../assets/img/net.png" alt="">电话举报</router-link>
        </div>

        <div class="notice">
          <el-divider content-position="center">系统公告</el-divider>
        </div>
        <p>尊敬的用户：</p>
        <p>欢迎参加12369环保举报系统培训学习！</p>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
export default {};
</script>

<style style lang="scss" scoped>
.row-bg {
  display: flex;
  justify-content: space-around;
  align-content: center;
  background-color: #f5f5f5;
  border-bottom: 1px solid #f5f5f5;
  padding: 0 15px;
}
.el-col {
  margin: auto;
}
.el-aside {
  padding: 20px 0;
}
.el-button--medium, .el-button--medium.is-round{
  padding: 0;
}

.textRight {
  text-align: right;
  color: #1890ff;
}

.cardBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #999;
  .itemBox {
    background: #ffffff;
    box-sizing: border-box;
    border: 1px solid #e7e7e7;
    border-radius: 4px;
    border-top: none;
    text-align: center;
    margin: auto;
    width: 352px;
    height: 338px;
    .imgBox {
      width: 224px;
      height: 83px;
      background-image: url("../../assets/img/itemBox.png");
      text-align: center;
      margin: auto;
      background-size: 100% 100%;
    }
    .title {
      background-color: #1890ff;
      color: #fff;
      padding: 7px;
      border-radius: 4px 4px 0 0;
    }
    .num {
      color: #1890ff;
      font-size: 34px;
    }
    .listBox {
      padding: 0 15px;
      .list {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #e7e7e7;
        margin-bottom: 0;
        padding: 8px 16px;
        .listNum {
          color: #1890ff;
          font-weight: bold;
        }
      }
    }
  }
}
.others {
  font-size: 18px;
  color: #999;
  margin-top: 22px;
}
.othersBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #1890ff;
  .itemBox {
    width: 100px;
    height: 100px;
    border: 1px solid #1890ff;
    border-radius: 8px;
    text-align: center;
    line-height: 100px;
    cursor: pointer;
    &:hover {
      background-color: #409eff;
      color: #fff;
    }
  }
  .itemBox1 {
    background: url("../../assets/img/itemBox1.png") no-repeat center center;
  }
  .itemBox2 {
    background: url("../../assets/img/itemBox2.png") no-repeat center center;
  }
  .itemBox3 {
    background: url("../../assets/img/itemBox3.png") no-repeat center center;
  }
  .itemBox4 {
    background: url("../../assets/img/itemBox4.png") no-repeat center center;
  }
  .itemBox5 {
    background: url("../../assets/img/itemBox5.png") no-repeat center center;
  }
  .itemBox6 {
    background: url("../../assets/img/itemBox6.png") no-repeat center center;
  }
  .itemBox7 {
    background: url("../../assets/img/itemBox7.png") no-repeat center center;
  }
}

.userInfo {
  color: #999;
  border: 1px solid #e7e7e7;
  border-top: none;
  border-radius: 4px;
  .info {
    padding: 0 15px;
    .row_info{
      padding: 18px 0;
      line-height: 1;
      border-bottom: 1px solid #e7e7e7;
      &:last-child{
        border-bottom:none;
      }
    }
  }

  .title {
    text-align: center;
    background: #1890ff;
    border-radius: 4px 4px 0 0;
    color: #fff;
    padding: 7px;
  }
}
.buttons{
  margin-top: 14px;
  margin-bottom: 30px;
  text-align: center;
}
.modeButtons{
  display: flex;
  justify-content: space-between;
  .modeBox{
    padding: 7px 14px;
    border: 1px solid #E7E7E7;
border-radius: 2px;
cursor: pointer;
// margin-right: 20px;
  }
}

</style>
