var types=[];//条件
//var goFlag=localStorage.getItem('goFlag');//上一页跳过来的标志
var editList=JSON.parse(localStorage.getItem('editList'));//上一页跳过来的选中结果

mui.ready(function(){
	loadCondition();//条件
//	if(goFlag=='false'){
//
//	}else{
//		fillField();//返回回来的字段选中内容填充；
//	}
	fillField();//返回回来的字段选中内容填充；
});

function loadCondition() {
	var conditionType=[
	{"HZZZ":"性质"},
	{"Segment":"级别"},
	{"BodyType":"车身"},
	{"Model":"派系"},
	{"Fuel":"燃油"}
	];//假数据
	
	conditionParms=JSON.stringify(conditionType);
	localStorage.setItem('conditionParms',conditionParms);
}

function fillField(){
	var thisTypeSelcted=localStorage.getItem('thisTypeSelcted');
	var thisBackType=localStorage.getItem('thisBackType');
	var bodySearchList=JSON.parse(localStorage.getItem('bodySearchList'));

//	types=JSON.parse(localStorage.getItem('allTypesSelected'));
//	if(types==null){types=[];}
//
//	var obj = {};
//	obj[thisBackType] =thisTypeSelcted;
//	//判断是否有返回的类，有，改变改类下的选中数组。无，添加
//	var flag=false;
//	for(var item in types){
//		for(var key in types[item]){
//			if(key==thisBackType){
//				flag=true;
//			}
//		}
//	}
//
//	if(flag){
//		for(var item in types){
//			for(var key in types[item]){
//				if(key==thisBackType){
//					types[item][key]=thisTypeSelcted;
//				}
//			}
//		}
//	}else{
//		types.push(obj);
//	}
//
//	var allTypesSelected=JSON.stringify(types);
//	localStorage.setItem('allTypesSelected',allTypesSelected);

	var fieldLi=$('.field-li');
	for(var i=0;i<fieldLi.length;i++){
		var dataTypeCell=$($(fieldLi[i])).attr('data-type');
		var dataTypeName=$($(fieldLi[i])).attr('data-name');

		for(var item in bodySearchList){
			for(var key in bodySearchList[item]){
				if(key==dataTypeCell){
					var fieldItemKey=(bodySearchList[item][key]).join(',');
					if(fieldItemKey){
						$(fieldLi[i]).find('label').text(dataTypeName+":"+fieldItemKey);
					}
				}
			}
		}
	}
}

//返回、完成
mui('body').on('tap','.mui-icon-left-nav,.btn-finished',function(){
var  fieldLi=$('.field-li');

	var list=[];
	for(var i=0;i<fieldLi.length;i++){
		var dataType=$(fieldLi[i]).attr('data-type');
		var dataName=$(fieldLi[i]).attr('data-name');
		var dataValue=$(fieldLi[i]).find('label').text();
		var dataValueArr=[];

		if(dataValue){
			var reg = /[^:]*:([^:]*)/;	//去冒号
			dataValue=dataValue.replace(reg,"$1");
			dataValueArr=dataValue.split(',');

			for(var j=0;j<dataValueArr.length;j++){
				var obj={};
				var cell=dataName+':'+dataValueArr[j];
				obj[dataType]=cell;
				list.push(obj);
			}
		}
	}
	var chooseList=JSON.stringify(list);

	localStorage.setItem('goFlag',false);//上一页跳过来的标志
	localStorage.setItem('chooseList',chooseList);
	window.history.go(-1);
});