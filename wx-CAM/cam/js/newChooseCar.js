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

	var fieldLi=$('.field-li');
	for(var i=0;i<fieldLi.length;i++){
		var dataTypeCell=$($(fieldLi[i])).attr('data-type');
		var dataTypeName=$($(fieldLi[i])).attr('data-name');

		for(var item in bodySearchList){
			for(var key in bodySearchList[item]){
				if(key==dataTypeName){
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
	localStorage.setItem('goFlag',false);//上一页跳过来的标志
	window.history.go(-1);
});