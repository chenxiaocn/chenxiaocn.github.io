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
                if(arr1[i].dataId==arr2[j].dataId){
                    arr1.splice(i,1);
                }
            }
        }
        return arr1;
    },

    //数组相减
    sortMinus:function(b,c){
        var a = {};
        for(let i = 0;i< b.length; i++){
            if(!a[b[i]]){
                a[b[i]] = true;
            }
        }

        for(let i = 0;i< c.length; i++){
            if(a[c[i]]){
                c.splice(i,1);   /*从一个数组中第i位移除一个或多个元素*/
                i--;
            }
        }
        return c;
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
            let itemId=$($(modelLi)[i]).attr('data-id');
            let id=$($(modelLi)[i]).attr('id');
            modeLiValue.push({"modelValue":itemValue,"dataId":itemId,"id":id}) ;
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
    },
    //添加或删除类
    //deal:function(liText,clickType,conditionTypeInnerText){
    //    //true:添加类，false:删除类
    //    EquipDetail.selectedCellCondition(liText,clickType,conditionTypeInnerText);
    //}
    circleValue:function(value){
        var arr=[];
        for(var i=0;i<value;i++){
            arr.push(i+1);
        }
        return arr;
    },
    //获取时间段里所有月份
    getDateRangeList:function(beginDate,endDate){
        var dateArry =[];
        var mCount = 0;
        var beginYear=parseInt(beginDate.substring(0,4));//截取开始年份
        var endYear=parseInt(endDate.substring(0,4));//截取结束年份
        var beginMonth=parseInt(beginDate.substring(beginDate.length-2));//截取开始月份
        var endMonth=parseInt(endDate.substring(endDate.length-2));//截取结束月份

        if(beginYear<endYear){
            mCount = (endYear - beginYear) * 12 + endMonth - beginMonth+1;
        }else{
            mCount = endMonth - beginMonth+1;
        }
        if (mCount > 0) {
            for (var i = 0; i < mCount; i++) {
                if (beginMonth < 12) {
                    dateArry[i] = beginYear.toString() + (beginMonth>9 ? beginMonth.toString() : "0" + beginMonth.toString());
                    beginMonth += 1;
                } else {
                    dateArry[i] = beginYear.toString() + (beginMonth > 9 ? beginMonth.toString() : "0" + beginMonth.toString());
                    beginMonth = 1;
                    beginYear += 1;
                }
            }
        }
        return  dateArry;
    },
    //获取时间段里所有季度
    getQuarterRange:function(beginDate,endDate){
        var dateArry =[];
        var mCount = 0;
        var beginYear=parseInt(beginDate.substring(0,4));//截取开始年份
        var endYear=parseInt(endDate.substring(0,4));//截取结束年份
        var beginQuarter=parseInt(beginDate.substring(beginDate.length-1));//截取开始月份
        var endQuarter=parseInt(endDate.substring(endDate.length-1));//截取结束月份

        if(beginYear<endYear){
            mCount = (endYear - beginYear) * 4 + endQuarter - beginQuarter+1;
        }else{
            mCount = endQuarter - beginQuarter+1;
        }
        if (mCount > 0) {
            for (var i = 0; i < mCount; i++) {
                if (beginQuarter <4) {
                    dateArry[i] = beginYear.toString() + ("0" + beginQuarter.toString());
                    beginQuarter += 1;
                } else {
                    dateArry[i] = beginYear.toString() + ("0" + beginQuarter.toString());
                    beginQuarter = 1;
                    beginYear += 1;
                }
            }
        }
        return  dateArry;
    },
    getRange:function(begin,end){
        let dateRangeList=[];
        for(let i=parseInt(begin);i<=parseInt(end);i++){
            dateRangeList.push(i);
        }
        return dateRangeList;
    },

    //获取选中时间段数组列表
    getSelectedRangeArr:function(selectedList,dataType){
        let selectedArr=[];
        for(var j=0;j<selectedList.length;j++){
            let selectedRangeItem=selectedList[j];
            //长度大于6是个区间范围
            if(selectedList[j].length>6){
                var start=selectedRangeItem.split("~")[0];
                var end=selectedRangeItem.split("~")[1];
                if(dataType=='month'){
                    selectedRangeItem=this.getDateRangeList(start,end);
                }
                if(dataType=='year'){
                    selectedRangeItem=this.getRange(start,end);
                }
                if(dataType=='quarter'){
                    selectedRangeItem=this.getQuarterRange(start,end);
                }
                selectedRangeItem=selectedRangeItem.join(',');
            }
            selectedArr=selectedArr+selectedRangeItem+',';
        }
        selectedArr=selectedArr.substring(0,selectedArr.length-1);
        selectedArr=selectedArr.split(',');
        return selectedArr;
    }

};
module.exports=Datadeal;