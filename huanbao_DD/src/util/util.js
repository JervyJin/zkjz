function transformTree (data, options = {}) {
//   const {
//       keyField = 'id',
//       childField = 'children',
//       parentField = 'parent'
//   } = options

//   const tree = []
//   const record = {}

//   for (let i = 0, len = list.length; i < len; i++) {
//       const item = list[i]
//       const id = item[keyField]

//       if (!id) {
//           continue
//       }

//       if (record[id]) {
//           item[childField] = record[id]
//       } else {
//           item[childField] = record[id] = []
//       }

//       if (item[parentField]) {
//           const parentId = item[parentField]

//           if (!record[parentId]) {
//               record[parentId] = []
//           }

//           record[parentId].push(item)
//       } else {
//           tree.push(item)
//       }
//   }

//   return tree

    // 删除 所有 children,以防止多次调用
    data.forEach(function (item) {
        delete item.children;
    });

    // 将数据存储为 以 id 为 KEY 的 map 索引数据列
    var map = {};
    data.forEach(function (item) {
        map[item.ID] = item;
    });
    //        console.log(map);
    var val = [];
    data.forEach(function (item) {
        // 以当前遍历项，的pid,去map对象中找到索引的id
        var parent = map[item.PID];
        // 好绕啊，如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
        if (parent) {
            (parent.children || ( parent.children = [] )).push(item);
        } else {
            //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
            val.push(item);
        }
    });
    return val;

}

export {
  transformTree
}