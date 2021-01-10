/* 调取6.4接口获取当前节点和下级节点     */
getCurrentNodeParams() {
    this.http
      .post("getWorkJkzfDetail", {
        userId: userinfo.userId,
        workFlowId: this.$route.query.workFlowId,
        workId: this.$route.query.workId,
        taskId: this.$route.query.taskId
      })
      .then(res => {
        console.log(res);
        this.currentNodeInfo = res.data.workDetailInfo.workFlowInfo;
        this.nextNodeInfo = res.data.workDetailInfo.actionInfoList;

        // this.nextNode();
      });
  },

  getListInfo() {
    this.http
      .post("getJkzfWorkListByCondition", {
        userId: userinfo.userId,
        userName: userinfo.userName,
        toDoFlag: 0,
        myStartFlag: 0,
        pageNum: 1,
        pageSize: 10,
        manageType: ""
      })
      .then(res => {
        console.log(res);
        res.data.workInfoList.map(item => {
          // console.log(item)
          this.workFlowId = item.workFlowId;
          this.workId = item.workId;
          this.taskId = item.taskId;
        });
        this.getCurrentNodeParams();
      });
  },