let common = {};
//common.url = "http://192.168.1.51:8008";
//common.url = "http://bms.alearning.com.cn";
let STATIC = true;

let API_URL = {
    login: '/data/login.json',
    admin: {
        list: "/data/user/adminsresult.json",
        show: "/data/user/admindetail.json"
    },
    role: {
        list: "/data/role.json",
        show: "/data/show.json"
    },
    equipment: {
        list: "/data/equip/equiplist.json",
        compareList:"/data/equip/compare.json"
    },
    table:{
        list: "/data/table/tableList.json"
    },
    index:{
        question:'/data/index/questiondistribut.json',
        course:'/data/index/courselist.json',
        student:'/data/index/studentpass.json',
        courseList:'/data/index/listcourseaverage.json'
    },
    image:{
        upload: common.url +'/api/userCenter/upload'
    },
    log:{
        list:'/data/log/list.json'
    }

};

if (!STATIC) {
    API_URL = {
        login: common.url + "/api/login"
    };
}

module.exports=API_URL;