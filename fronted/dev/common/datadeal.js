import React from  'react';
import ReactDOM from 'react-dom';
import $ from "jquery";
import EquipDetail from "../equipment/equipDetail.js";

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
        if(segTitle=="取消"){
            target[0].innerText="全选";
        }
        if(segTitle=="全选"){
            target[0].innerText="取消";
        }
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
    //模糊查询
    fuzzySearch:function(list,keyWord){
        var arr = [];
        for(var i=0;i<list.length;i++){
            if((list[i].Model.indexOf(keyWord))>=0){
                arr.push(list[i]);
            }
        }
        return arr;
    },

    //获取指定级别下的子级别
    getSubSegList:function(list,seg){
        var subSegList=[];
        for(var i=0;i<list.length;i++){
            if(list[i].Segment == seg){
                subSegList.push(list[i].SubSegment);
            }
        }
        subSegList=this.unique(subSegList);
        return subSegList;
    },

    //指定类
    getId:function(content){
        var arr='';
        switch (content){
            case "性质":arr='HZZType';
                break;
            case "级别":arr='segType';
                break;
            case "车身":arr='bodyType';
                break;
            case "燃油":arr='fuelype';
                break;
        }
        return arr;
    },
    //获取各种查询条件列表
    getConditionList:function(list,keyWord){
        var arr=[];
        for(var item in list){
            for(var key in list[item]){
                if(key==keyWord){
                    arr.push(list[item][key]);
                }
            }
        }
        arr=this.unique(arr);
        return arr;
    },

    //添加或删除类
    addOrDelClass:function(selectedFlag,target,className){
        //true:添加类，false:删除类
        selectedFlag==true?target.addClass(className):target.removeClass(className);
    }
    //添加或删除类
    //deal:function(liText,clickType,conditionTypeInnerText){
    //    //true:添加类，false:删除类
    //    EquipDetail.selectedCellCondition(liText,clickType,conditionTypeInnerText);
    //}
};
module.exports=Datadeal;