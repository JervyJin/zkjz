// mock/index.js
import Mock from "mockjs"; // 引入mockjs

const Random = Mock.Random; // Mock.Random 是一个工具类，用于生成各种随机数据

const getQuery = (parasName, url ,defValue) => {
  const arrObj = url.split('?');
  if(arrObj.length > 1) {
    const arrPara = arrObj[1].split('&');
    let arr;
    for(let i = 0;i < arrPara.length; i++) {
      arr = arrPara[i].split('=');
      if(arr != null && arr[0] == parasName) {
        return arr[1];
      }
    }
  }
  return defValue;
}

const todoList = function(params) {
  let data = [];
  for(let i = 0; i < 6; i++) {
    let template = {
      id: i,
      taskName: '这是任务名称'+i,
      taskType: '临时任务',
      finishTime: Random.date(),
      desc: Random.cparagraph(1), // 随机生成一段中文
      level: Random.natural(0, 2)
    }
    data.push(template);
  }
  return {
    code: 0,
    msg: '响应成功',
    data: data
  }
}

const getDetail = config => {
  const id = getQuery('id', config.url, 0);
  let list = Mock.mock(todoList).data;
  const data = list.filter(todo => {
    return id === todo.id;
  })
  return {
    code: 0,
    msg: '响应成功',
    data: data[0]
  }
}

Mock.setup({
  timeout: 1000
})

export default {
  data: Mock.mock("/task/todoList", "get", todoList), // 根据数据模板生成模拟数据, 待办列表
  detail: Mock.mock("/task/getDetail", "post", getDetail),  // 获取某一条详情
}
