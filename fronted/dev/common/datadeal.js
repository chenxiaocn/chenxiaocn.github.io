import React from  'react';
import ReactDOM from 'react-dom';
import $ from "jquery";
import Ajax from "../common/ajax";
import API_URL from "../common/url";
let Datadeal = {
    //数组去重
    unique:function(arr){
        var tmp = new Array();
        for(var i in arr){
            //该元素在tmp内部不存在才允许追加
            if(tmp.indexOf(arr[i])==-1){
                tmp.push(arr[i]);
            }
        }
        return tmp;
    },
    //数组对象按大写字母排序
    sortArr(arr, sortStr) {
        // 排序函数（用以返回次序关系）
        var bySort = function() {
            return function(o, p) {  // p 是 o 的下一项
                var a = o[sortStr],
                    b = p[sortStr];
                if (isNaN(a)) {  // 非数字排序
                    return a.localeCompare(b);  // 用本地特定顺序来比较(支持中文)
                } else {
                    if (a === b) {
                        return 0;
                    } else {
                        return a > b ? 1 : -1;
                    }
                }
            }
        };
        for (var i = 0; i < arr.length; i++) {
            //console.log(arr[i][sortStr])
            arr.sort(bySort(arr[i][sortStr]));
        }
    },
    //数组对象相减
    sorSplice:function(arr1,arr2){
        for (var i = 0; i<arr1.length; i++){
            for(var j=0;j<arr2.length;j++){
                if(arr1[i].modelId==arr2[j].modelId){
                    arr1.splice(i,1);
                }
            }
        }
        return arr1;
    },
    //大写字母
    generateBig:function(){
        var ch_big = 'A';
        var str_big =[];
        for(var i=0;i<26;i++){
            str_big.push(String.fromCharCode(ch_big.charCodeAt(0)+i));
        }
        return str_big;
    },
    //车系被选中样式
    modelHasSelected:function(modelLi){
        var modelItemInnertext=[], flag=0;
        for(var i=0;i<modelLi.length;i++){
            modelItemInnertext=$($(modelLi)[i])[0].innerText;
            if($($(modelLi)[i]).hasClass('selected')){
                $($(modelLi)[i]).removeClass('selected');
                flag=0;
            }else{
                $($(modelLi)[i]).addClass('selected');
                flag=1;
            }
        }
        return flag;
    },
    //获取被选中的车系值
    getModelLiValue:function(modelLi){
        var modeLiValue=[],modelLiID=[];
        for(var i=0;i<modelLi.length;i++){
            var itemValue=$($(modelLi)[i])[0].innerText;
            var itemId=$($(modelLi)[i]).attr('id');
            modeLiValue.push({"modeValue":itemValue,"modelId":itemId}) ;
        }
        return modeLiValue;
    },
    //"取消"或"全选"
    allOrCancel:function(segTitle,target){
        segTitle=="取消"?target[0].innerText="全选":target[0].innerText="取消";
    },
    //单个车系选中
    selectedModel:function(target){
        var thisInnerText=target[0].innerText;
        var flag=0;//有
        if(target.hasClass('selected')){
            target.removeClass('selected');
            flag=0;
        }
        else{
            target.addClass('selected');
            flag=1;
        }
        return flag;
    },
    //条件多选
    selectedCondition:function(arr1,arr2,arr3,arr4,arr5,arr6,arr7,arr8,data){
        var tmpData=data;
        if(arr1.length!=0){
            tmpData= this.myFunction('HZZZ',arr1,tmpData)
        }
        if(arr2.length!=0){
            tmpData= this.myFunction('Segment',arr2,tmpData)
        }
        if(arr3.length!=0){
            tmpData= this.myFunction('BodyType',arr3,tmpData)
        }
        if(arr4.length!=0){
            tmpData= this.myFunction('Fuel',arr4,tmpData)
        }
        if(arr5.length!=0){
            tmpData= this.myFunction('SubSegment',arr5,tmpData)
        }
        if(arr6.length!=0){
            tmpData= this.myFunction('Brand',arr6,tmpData)
        }
        if(arr7.length!=0){
            tmpData= this.myFunction('OEM',arr7,tmpData)
        }
        if(arr8.length!=0){
            tmpData= this.myFunction('BrandPrefix',arr8,tmpData)
        }
        return tmpData;
    },

    myFunction:function(type,conArray,dataArray){
        var res=new Array();
        for(var item in dataArray){
            for(var item1 in conArray) {
                if (dataArray[item][type] == conArray[item1]) {
                    res.push(dataArray[item]);
                    // res.push({'HZZ':dataArray[item][type],'segment':dataArray[item].segment,'body':dataArray[item].body,'fuel':dataArray[item].fuel});
                }
            }
        }
        return res;
    },

    //删除数组指定元素
    removeByValue:function(arr, val){
        for(var i=0; i<arr.length; i++) {
            if(arr[i] == val) {
                arr.splice(i, 1);
                return arr;
                break;
            }
        }
    },

    //查询条件
    getConditions:function(){
        var conditionKey= ['性质','级别','车身','燃油'];
        var conditionValue=[['自主','合资','进口'],["A","A0","A00", "B","BUS", "C" , "D", "Pickup"],["NB","HB","SUV", "MPV","CROSS", "SW" , "C0", "CA", "BUS", "Pickup"],[ "汽油","BEV","混合动力", "插电混合动力","柴油", "汽油/CNG" , "汽油/CNG"]];
        var conditions=[conditionKey,conditionValue];
        return conditions;
    }
}
module.exports=Datadeal;