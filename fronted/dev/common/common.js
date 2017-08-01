let Promise = require('es6-promise').Promise;
if (!window.Promise) {
    window.Promise = Promise;
}
import 'whatwg-fetch';
import API_URL from "./url.js";
import {Modal ,message} from "antd";
import $ from "jquery";
let common={
    dateYMD(str){
        return str.slice(0,10);
    },
    accuracy(float){
        return (Math.round(float*1000)/10)+"%";//百分数保留一位
    },
    saveFloat(float){
        return Math.round(float*100)/100;//四舍五入保留二位小数
    },
    loginOutTime(data){
        if(data=="login"){
            sessionStorage.clear();
            window.location.href = "/";
            localStorage.clear();
            return false;
        } else{
            return true;
        }
    },
    groupParam(param){
        let group="";
        for (let par in param){
            if(group.length!=0){
                group=group+"&"+par+"="+param[par];
            } else{
                group=group+par+"="+param[par];
            }
        }
        return group;
    }
};
common.cutString = function(str, len){
    //length属性读出来的汉字长度为1
    if(str.length*2 <= len) {
        return str;
    }
    var strlen = 0;
    var s = "";
    for(var i = 0;i < str.length; i++) {
        s = s + str.charAt(i);
        if (str.charCodeAt(i) > 128) {
            strlen = strlen + 2;
            if(strlen >= len){
                return s.substring(0,s.length-1) + "...";
            }
        } else {
            strlen = strlen + 1;
            if(strlen >= len){
                return s.substring(0,s.length-2) + "...";
            }
        }
    }
    return s;
};

$.ajaxSetup({
    statusCode: {
        403: function(){
            message.error('对不起，您没有相关权限！');
        }
    },
    dataFilter: function(data, type){
        if(data=="\"login\""||data=="login"){
            sessionStorage.clear();
            localStorage.clear();
            window.location.href = "/";
            location.reload();
        }else{
            return data;
        }
    }
});

common.formatDate = function FormatDate (strTime) {
    var date = new Date(strTime);
    var month,day;
    if(date.getMonth()+1>=10){
        month =  date.getMonth()+1;
    }else{
        month = "0"+(date.getMonth()+1);
    }
    if(date.getDate()>=10){
        day = date.getDate();
    }else{
        day =  "0"+date.getDate();
    }
    return date.getFullYear()+"-"+month+"-"+day;
};

common.formatTime = function FormatTime (strTime) {
    var date = new Date(strTime);
    var hour,minute;
    if(date.getHours()>=10){
        hour = date.getHours();
    }else{
        hour = "0"+(date.getHours());
    }
    if(date.getMinutes()>=10){
        minute = date.getMinutes();
    }else{
        minute =  "0"+ (date.getMinutes());
    }
    return hour + ":" + minute;
};

module.exports=common;