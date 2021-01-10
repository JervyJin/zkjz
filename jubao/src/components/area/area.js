export default {
    areaList:[
        {
            id: 1,
            menuName: '北京市',
            orderNum: "1",
            status: "显示",
        },
        {
            id: 2,
            menuName: "天津市",
            orderNum: "2",
            status: "显示",
        },

        {
            id: 3,
            menuName: "河北省",
            orderNum: "3",
            status: "显示",
            children: [
                {
                    id: 31,
                    menuName: "石家庄市",
                    orderNum: "3-1",
                    status: "显示",
                    children: [
                        {
                            id: 41,
                            menuName: "客服中心",
                            orderNum: "1-1-1",
                            status: "显示"
                        }
                    ]
                },
                {
                    id: 32,
                    menuName: "其他",
                    orderNum: "1-2",
                    status: "显示"
                }
            ]
        },
    ]
};