//删除取消的选中条件
function delThisValue(type,searchList,keyWord){
	for(var item in searchList){
		for(var key in searchList[item]){
			if(key==type){
				var arr=searchList[item][key];
				for(var i=0;i<arr.length;i++){
					if(arr[i]==keyWord){
						arr.splice(i,1);
						searchList[item][key]=arr;
						break;
					}
				}
			}
		}
	}
	return searchList;
}

function getSelectedList(type, selectedList, keyWord) {
	if(selectedList==null){selectedList=[]};
	var hasThisType = false,list = [];
	for(var item in selectedList) {
		for(var key in selectedList[item]) {
			if(key == type) {
				selectedList[item][key].push(keyWord);
				hasThisType = true;
				break;
			}
		}
	}

	if(hasThisType == false) {
		var value = '["' + keyWord + '"]';
		var c = eval('(' + value + ')');
		var obj = {};
		obj[type] = c;
		selectedList.push(obj);
	}
	list = selectedList;
	return list;
}

//数组去重
function unique(arr) {
	var tmp = new Array();
	for(var i in arr) {
		//该元素在tmp内部不存在才允许追加
		if(tmp.indexOf(arr[i]) == -1) {
			tmp.push(arr[i]);
		}
	}
	return tmp;
}
//数组删除指定元素
function sorSplice(list,type) {
	for(var i=0;i<list.length;i++){
		if(list[i]==type){
			list.splice(i,1);
		}
	}
	return list;
}
//单个车系选中
function targetSelectedCss(target, className) {
	if(target.hasClass(className)) {
		target.removeClass(className);
	} else {
		target.addClass(className);
	}
}

//条件多选
function selectedCondition(arr, data){
	var tmpData = data;
	for(var i = 0; i < arr.length; i++) {
		for(var key in arr[i]) {
			if(arr[i][key].length != 0) {
				tmpData = myFunction(key, arr[i][key], tmpData);
			}
		}
	}
	return tmpData;
}

function myFunction(type, conArray, dataArray) {
	var res = new Array();
	for(var item in dataArray) {
		for(var item1 in conArray) {
			if(dataArray[item][type] == conArray[item1]) {
				res.push(dataArray[item]);
			}
		}
	}
	return res;
}
//指定条件下的某指定属性
function getChildPropertyList(list, parentProperty, parentValue, childProperty) {
	var arr = [];
	for(var item in list) {
		for(var key in list[item]) {
			if(key == parentProperty) {
				if(parentValue == list[item][key]) {
					arr.push(list[item][childProperty]);
				}
			}
		}
	}
	arr = unique(arr);
	return arr;
}

//指定某个条件某个值的查询
function getPropertyVaule(list, property, propertyVaule) {
	var dataList = list;
	var arr = [];
	for(var item in list) {
		for(var key in list[item]) {
			if(key == property) {
				if(propertyVaule == dataList[item][key]) {
					arr.push(dataList[item]);
				}
			}
		}
	}
	arr = unique(arr);
	return arr;
}

//指定某个条件该条件列表的查询
function getConditionList(list, keyWord) {
	var arr = [];
	for(var item in list) {
		for(var key in list[item]) {
			if(key == keyWord) {
				arr.push(list[item][key]);
			}
		}
	}
	arr = unique(arr);
	return arr;
}

function getTypeList(list, keyWord) {
	var arr = [];
	for(var item in list) {
		for(var key in list[item]) {
			if(key == keyWord) {
				arr.push(list[item][key]);
			}
		}
	}
	return arr;
}

//指定某个条件所有查询结果
function getConditionResults(list, keyWord) {
	var arr = [];
	for(var item in list) {
		for(var key in list[item]) {
			if(key == keyWord) {
				arr.push(list[item]);
			}
		}
	}
	arr = unique(arr);
	return arr;
}
//添加或删除类
function addOrDelClass(selectedFlag, target, className) {
	//true:添加类，false:删除类
	selectedFlag == true ? target.addClass(className) : target.removeClass(className);
}

//获取时间段里所有月份
function getDateRangeList(beginDate, endDate) {
	var dateArry = [];
	var mCount = 0;
	var beginYear = parseInt(beginDate.substring(0, 4)); //截取开始年份
	var endYear = parseInt(endDate.substring(0, 4)); //截取结束年份
	var beginMonth = parseInt(beginDate.substring(beginDate.length - 2)); //截取开始月份
	var endMonth = parseInt(endDate.substring(endDate.length - 2)); //截取结束月份

	if(beginYear < endYear) {
		mCount = (endYear - beginYear) * 12 + endMonth - beginMonth + 1;
	} else {
		mCount = endMonth - beginMonth + 1;
	}
	if(mCount > 0) {
		for(var i = 0; i < mCount; i++) {
			if(beginMonth < 12) {
				dateArry[i] = beginYear.toString() + (beginMonth > 9 ? beginMonth.toString() : "0" + beginMonth.toString());
				beginMonth += 1;
			} else {
				dateArry[i] = beginYear.toString() + (beginMonth > 9 ? beginMonth.toString() : "0" + beginMonth.toString());
				beginMonth = 1;
				beginYear += 1;
			}
		}
	}
	return dateArry;
}
//获取时间段里所有季度
function getQuarterRange(beginDate, endDate) {
	var dateArry = [];
	var mCount = 0;
	var beginYear = parseInt(beginDate.substring(0, 4)); //截取开始年份
	var endYear = parseInt(endDate.substring(0, 4)); //截取结束年份
	var beginQuarter = parseInt(beginDate.substring(beginDate.length - 1)); //截取开始月份
	var endQuarter = parseInt(endDate.substring(endDate.length - 1)); //截取结束月份

	if(beginYear < endYear) {
		mCount = (endYear - beginYear) * 4 + endQuarter - beginQuarter + 1;
	} else {
		mCount = endQuarter - beginQuarter + 1;
	}
	if(mCount > 0) {
		for(var i = 0; i < mCount; i++) {
			if(beginQuarter < 4) {
				dateArry[i] = beginYear.toString() + ("0" + beginQuarter.toString());
				beginQuarter += 1;
			} else {
				dateArry[i] = beginYear.toString() + ("0" + beginQuarter.toString());
				beginQuarter = 1;
				beginYear += 1;
			}
		}
	}
	return dateArry;
}

function getRange(begin, end) {
	var dateRangeList = [];
	for(var i = parseInt(begin); i <= parseInt(end); i++) {
		dateRangeList.push(i);
	}
	return dateRangeList;
}
//获取选中时间段数组列表
function getSelectedRangeArr(selectedList, dataType) {
	var selectedArr = [];
	for(var j = 0; j < selectedList.length; j++) {
		var selectedRangeItem = selectedList[j];
		//长度大于6是个区间范围
		if(selectedList[j].length > 6) {
			var start = selectedRangeItem.split("~")[0];
			var end = selectedRangeItem.split("~")[1];
			if(dataType == 'month') {
				selectedRangeItem = getDateRangeList(start, end);
			}
			if(dataType == 'year') {
				selectedRangeItem = getRange(start, end);
			}
			if(dataType == 'quarter') {
				selectedRangeItem = getQuarterRange(start, end);
			}
			selectedRangeItem = selectedRangeItem.join(',');
		}
		selectedArr = selectedArr + selectedRangeItem + ',';
	}
	selectedArr = selectedArr.substring(0, selectedArr.length - 1);
	selectedArr = selectedArr.split(',');
	return selectedArr;
}
//判断同一厂商汽车重名
function jugeModel(list, recordsList) {
	var arry = [],
		count = 0;
	for(var i = 0; i < recordsList.length; i++) {
		var modelValue = recordsList[i].modelValue;
		var dataId = recordsList[i].dataId;
		var id = recordsList[i].id;
		var dataOem = recordsList[i].dataOem;

		count = jugeCell(list, recordsList[i].id, 'ModelID');
		if(count > 1) {
			modelValue = recordsList[i].modelValue + '(' + recordsList[i].dataOem + ')';
			arry.push({
				"modelValue": modelValue,
				"dataId": dataId,
				"id": id,
				"dataOem": dataOem
			})
		} else {
			arry.push(recordsList[i]);
		}
	}
	return arry;
}