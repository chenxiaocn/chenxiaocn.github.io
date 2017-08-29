//数组去重
function unique(arr){
        var tmp = new Array();
        for(var i in arr){
            //该元素在tmp内部不存在才允许追加
            if(tmp.indexOf(arr[i])==-1){
                tmp.push(arr[i]);
            }
        }
        return tmp;
    }
    //数组对象按大写字母排序
function sortArr(arr, sortStr) {
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
    }
    //数组对象相减
function sorSplice(arr1,arr2){
        for (var i = 0; i<arr1.length; i++){
            for(var j=0;j<arr2.length;j++){
                if(arr1[i].dataId==arr2[j].dataId){
                    arr1.splice(i,1);
                }
            }
        }
        return arr1;
    }
    //数组相减
function sortMinus(b,c){
        var a = {};
        for(var i = 0;i< b.length; i++){
            if(!a[b[i]]){
                a[b[i]] = true;
            }
        }

        for(var i = 0;i< c.length; i++){
            if(a[c[i]]){
                c.splice(i,1);   /*从一个数组中第i位移除一个或多个元素*/
                i--;
            }
        }
        return c;
    }
   //车系被选中样式
function  modelHasSelected(modelLi,flag,className){
        for(var i=0;i<modelLi.length;i++){
            flag?$($(modelLi)[i]).addClass(className): $($(modelLi)[i]).removeClass(className);
        }
    }
    //获取被选中的车系值
function getModelLiValue(modelLi){
        var modeLiValue=[],modelLiID=[];
        for(var i=0;i<modelLi.length;i++){
            var modelLiCell=modelSelected($($(modelLi)[i]));
            modeLiValue.push(modelLiCell) ;
        }
        return modeLiValue;
    }
    //"取消"或"全选"
function allOrCancel(segTitle,target){
        var flag=0;
        if(segTitle=="取消"){
            target.text("全选");
        }
        if(segTitle=="全选"){
            flag=1;
            target.text("取消");
        }
        return flag;
    }
    //单个车系选中
function selectedModel(target,className){
        var flag=0;
        if(target.hasClass(className)){
            target.removeClass(className);
        }else{
            target.addClass(className);
            flag=1
        }
        return flag;
    }
    //条件多选
function selectedCondition(arr1,arr2,arr3,arr4,arr5,arr6,arr7,arr8,data){
        var tmpData=data;
        if(arr1.length!=0){
            tmpData= myFunction('HZZZ',arr1,tmpData)
        }
        if(arr2.length!=0){
            tmpData=myFunction('Segment',arr2,tmpData)
        }
        if(arr3.length!=0){
            tmpData=myFunction('BodyType',arr3,tmpData)
        }
        if(arr4.length!=0){
            tmpData=myFunction('Fuel',arr4,tmpData)
        }
        if(arr5.length!=0){
            tmpData=myFunction('SubSegment',arr5,tmpData)
        }
        if(arr6.length!=0){
            tmpData=myFunction('Brand',arr6,tmpData)
        }
        if(arr7.length!=0){
            tmpData=myFunction('OEM',arr7,tmpData)
        }
        if(arr8.length!=0){
            tmpData=myFunction('BrandPrefix',arr8,tmpData)
        }
        return tmpData;
    }

function myFunction(type,conArray,dataArray){
        var res=new Array();
        for(var item in dataArray){
            for(var item1 in conArray) {
                if (dataArray[item][type] == conArray[item1]) {
                    res.push(dataArray[item]);
                }
            }
        }
        return res;
    }
    //删除数组指定元素
function removeByValue(arr, val){
        for(var i=0; i<arr.length; i++) {
            if(arr[i] == val) {
                arr.splice(i, 1);
                return arr;
                break;
            }
        }
    }
    //模糊查询
function fuzzySearch(list,keyWord){
        var arr = [];
        for(var i=0;i<list.length;i++){
            if((list[i].Model.indexOf(keyWord))>=0){
                arr.push(list[i]);
            }
        }
        return arr;
    }
    //指定条件下的某指定属性
 function getChildPropertyList(list,parentProperty,parentValue,childProperty){
        var arr=[];
        for(var item in list){
            for(var key in list[item]){
                if(key==parentProperty){
                    if(parentValue==list[item][key]){
                        arr.push(list[item][childProperty]);
                    }
                }
            }
        }
        arr=unique(arr);
        return arr;
    }

    //指定某个条件某个值的查询
function getPropertyVaule(list,property,propertyVaule){
        var dataList=list;
        var arr=[];
        for(var item in list){
            for(var key in list[item]){
                if(key==property){
                    if(propertyVaule==dataList[item][key]){
                        arr.push(dataList[item]);
                    }
                }
            }
        }
        arr=unique(arr);
        return arr;
    }

    //指定类
function getId(content){
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
    }
    //指定某个条件该条件列表的查询
function getConditionList(list,keyWord){
        var arr=[];
        for(var item in list){
            for(var key in list[item]){
                if(key==keyWord){
                    arr.push(list[item][key]);
                }
            }
        }
        arr=unique(arr);
        return arr;
    }
    //指定某个条件所有查询结果
function getConditionResults(list,keyWord){
        var arr=[];
        for(var item in list){
            for(var key in list[item]){
                if(key==keyWord){
                    arr.push(list[item]);
                }
            }
        }
        arr=unique(arr);
        return arr;
    }
    //添加或删除类
function addOrDelClass(selectedFlag,target,className){
        //true:添加类，false:删除类
        selectedFlag==true?target.addClass(className):target.removeClass(className);
    }
function circleValue(value){
        var arr=[];
        for(var i=0;i<value;i++){
            arr.push(i+1);
        }
        return arr;
    }
    //获取时间段里所有月份
function getDateRangeList(beginDate,endDate){
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
    }
    //获取时间段里所有季度
function getQuarterRange(beginDate,endDate){
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
    }
function getRange(begin,end){
        var dateRangeList=[];
        for(var i=parseInt(begin);i<=parseInt(end);i++){
            dateRangeList.push(i);
        }
        return dateRangeList;
    }
    //获取选中时间段数组列表
function getSelectedRangeArr(selectedList,dataType){
        var selectedArr=[];
        for(var j=0;j<selectedList.length;j++){
            var selectedRangeItem=selectedList[j];
            //长度大于6是个区间范围
            if(selectedList[j].length>6){
                var start=selectedRangeItem.split("~")[0];
                var end=selectedRangeItem.split("~")[1];
                if(dataType=='month'){
                    selectedRangeItem=getDateRangeList(start,end);
                }
                if(dataType=='year'){
                    selectedRangeItem=getRange(start,end);
                }
                if(dataType=='quarter'){
                    selectedRangeItem=getQuarterRange(start,end);
                }
                selectedRangeItem=selectedRangeItem.join(',');
            }
            selectedArr=selectedArr+selectedRangeItem+',';
        }
        selectedArr=selectedArr.substring(0,selectedArr.length-1);
        selectedArr=selectedArr.split(',');
        return selectedArr;
    }
    //判断同一厂商汽车重名
function jugeModel(list,recordsList){
        var arry=[],count=0;
        for(var i=0;i<recordsList.length;i++){
            var modelValue=recordsList[i].modelValue;
            var dataId=recordsList[i].dataId;
            var id=recordsList[i].id;
            var dataOem=recordsList[i].dataOem;

            count=jugeCell(list,recordsList[i].id,'ModelID');
            if(count>1){
                modelValue=recordsList[i].modelValue+'('+recordsList[i].dataOem+')';
                arry.push({"modelValue":modelValue,"dataId":dataId,"id":id,"dataOem":dataOem})
            }else{
                arry.push(recordsList[i]);
            }
        }
        return arry;
    }
function jugeCell(list,modelId,keyWord){
        var count=0;
        for(var item in list){
            for(var key in list[item]){
                if(key==keyWord){
                    if(modelId==list[item][key]){
                        count++;
                    }
                }
            }
        }
        return count;
    }

    /////////////////////条件选车 全选/////////////////
function allSelected(target){
        var thisInnertext=$(target).text();
        var leftLi=$(target).parent().next().find('.ant-col-2');
        var modelLi= $(target).parent().next().find('.model-li');//该级别下的所有model
        var flag=allOrCancel(thisInnertext,$(target));//全选或取消.选中1，取消0
        this.modelHasSelected(modelLi,flag,'selected');
        this.modelHasSelected(leftLi,flag,'selectedSub');//选中1，取消0

        var ModelLiArry=getModelLiValue(modelLi);
        getSelectedModelLiArr(ModelLiArry,flag);

    }
function getSelectedModelLiArr(ModelLiArry,flag){
        var equipListConditions = store.getState().allEquipJsonDataState ;
        var dataList=equipListConditions.equipList;
        var modelLiArry=jugeModel(dataList,ModelLiArry);//判断重名
        var conditions = {selectedList : modelLiArry,selectedOrCancelflag:flag};
        store.dispatch(allEquipJsonData(conditions));//存到store
    }
    /////////////////////条件选车 单选/////////////////
function modelSelected(target){
        var itemValue=target.text();
        var id=target.attr('id');
        var dataId=target.attr('data-id');
        var dataOem=target.attr('data-oem');
        var ModelLiArry={"modelValue":itemValue,"dataId":dataId,"id":id,"dataOem":dataOem};
        return ModelLiArry;
    }
    /////////////////////左部、单个车子选中或取消  全选的样式/////////////////
function modelSelctedAllCss(selectedList,modelLis,allNode){
        selectedList.length==modelLis.length? allNode.text('取消'): allNode.text('全选');
    }