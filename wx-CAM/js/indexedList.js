var fieldType = localStorage.getItem('fieldType');
var fieldName = localStorage.getItem('fieldName');
var searchList = JSON.parse(localStorage.getItem('searchList')); //查询条件集合
var conditionList = JSON.parse(localStorage.getItem('conditionList')); //查询条件下的结果集合
var navSearchList = JSON.parse(localStorage.getItem('navSearchList')); //表头条件集合
var bodySearchList = JSON.parse(localStorage.getItem('bodySearchList')); //表中条件集合（如品牌、厂商、车系）

var thisTypeSelcted =[];
var fieldCellSelcted=localStorage.getItem('fieldCellSelcted');//选中的
if(fieldCellSelcted==null||fieldCellSelcted==''){
	thisTypeSelcted=[];
}else{
	if(fieldCellSelcted.indexOf(',')>-1){//多个
		thisTypeSelcted=fieldCellSelcted.split(',');//转化成数组；
	}else{//1个
		thisTypeSelcted=[fieldCellSelcted];
	}
}

console.log(fieldType);
console.log(searchList);
console.log(conditionList);

mui.ready(function() {
	loadIndexedListBar();
	initBodyList();
	loadIndexedList()
});

function loadIndexedListBar(){
	var ch_big = 'A',list='';
	for(var i = 0; i < 26; i++) {
		var letterCell=String.fromCharCode(ch_big.charCodeAt(0) + i);
		var itemHtml='<a>'+letterCell+'</a>';
		list+=itemHtml;
	}
	$('.mui-indexed-list-bar').append(list);
}

function initBodyList() {
	var list = document.getElementById('list');
	list.style.height = (document.body.offsetHeight) + 'px';
	window.indexedList = new mui.IndexedList(list);
}

function loadIndexedList(){
	$('.indexed-ul').empty();

	var allJsonData = getEquipData();
	var equipData = allJsonData[1];
	var rangeList=[];

	if(fieldType=="Model"){//查询条件把自己剔除
		for(var item in searchList){
			for(var key in searchList[item]){
				if(key=="Model"){
					searchList.splice(item,1);
				}
			}
		}
		rangeList=selectedCondition(searchList,equipData);
	}else{//品牌、厂商查询条件为navSearchList
		if(navSearchList==null){
			rangeList=equipData;
		}else{
			rangeList=selectedCondition(navSearchList,equipData);
		}
	}

	var thisTypeList=getConditionList(rangeList, fieldType);//品牌集合
	var preFixList=getPreFixList(thisTypeList);//首字母集合

	var ch_big = 'A',list='';
	for(var i = 0; i < 26; i++) {
		var letterCellHtmls='';//单个大写字母下品牌集合

		var letterCell=String.fromCharCode(ch_big.charCodeAt(0) + i);

		var letterCellLiList='';
	    for(var item in preFixList){
			for(var key in preFixList[item]){
				if(preFixList[item][key]==letterCell){
					var getFullChars=pinyin.getFullChars(key);
					var typeCellFullChars=getFullChars.replace(/(^\s*)|(\s*$)/g, "");

					var indexedLi='<li data-value='+key+'  data-tags='+typeCellFullChars+'  class="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">'
						                    +'<input type="checkbox" data-value='+key+' class="field-list-checkbox" />' +key
						                    + '</li>';
					letterCellLiList+=indexedLi;
				}
			}
		}
		//该大写字母下有就填充。无，不填充，该大写也不显示
		if(letterCellLiList){
			letterCellHtmls='<li data-group='+letterCell+' class="mui-table-view-divider mui-indexed-list-group">' +letterCell
									+'</li>'
									+letterCellLiList;
		}
		list+=letterCellHtmls;
	}
	$('.indexed-ul').append(list);
	setSelected();
}

function setSelected(){
	var  listCheckboxs=$('.field-list-checkbox');
	for(var i=0;i<thisTypeSelcted.length;i++){
		for(var j=0;j<listCheckboxs.length;j++){
			var value=$(listCheckboxs[j]).attr('data-value');
			if(thisTypeSelcted[i]==value){
				$(listCheckboxs[j]).attr('checked',true);
			}
		}
	}
};


function getPreFixList(thisTypeList){
	var preFixList=[];
	for(var i=0;i<thisTypeList.length;i++){
		var getFullChars=pinyin.getFullChars(thisTypeList[i]);
		var capitallizeCell= getFullChars.replace(/(^\s*)|(\s*$)/g, "");//去空格
		      capitallizeCell=capitallizeCell.substr(0, 1);
		var obj={};
		obj[thisTypeList[i]]=capitallizeCell;
		preFixList.push(obj);
	}
	return preFixList;
}

mui('.mui-indexed-list-inner').on('change', 'input', function() {
	var flag = $(this).is(':checked');
	var value = $(this).parent().text();

	if(flag) {
		searchList = getSelectedList(fieldType, searchList, value); //获取所有选中的查询条件
		bodySearchList = getSelectedList(fieldName, bodySearchList, value);

	} else {
		searchList = delThisValue(fieldType, searchList, value); //获取所有选中的查询条件
		bodySearchList = delThisValue(fieldName, bodySearchList, value);
	}
});

mui('body').on('tap','.mui-icon-left-nav,.btn-finished',function(){
	var searchListArr=JSON.stringify(searchList);
	var bodySearchListArr=JSON.stringify(bodySearchList);
	var navSearchListArr=JSON.stringify(navSearchList);

	localStorage.setItem('searchList',searchListArr);
	localStorage.setItem('bodySearchList',bodySearchListArr);
	localStorage.setItem('navSearchList',navSearchListArr);
	window.history.go(-1);
});

//全选
mui('body').on('tap','.all',function(){
	if($(this).hasClass('allSelected')){
		$(this).removeClass('allSelected');
		//checkbox全取消
		var  listCheckboxs=$('.field-list-checkbox');
		for(var j=0;j<listCheckboxs.length;j++){
			$(listCheckboxs[j]).removeAttr('checked');
			var value=$(listCheckboxs[j]).attr('data-value');
		    searchList=delThisValue(fieldType,searchList,value);//获取所有选中的查询条件
			bodySearchList=delThisValue(fieldName,bodySearchList,value);//获取所有选中的查询条件	
		}
		
	}else{
		$(this).addClass('allSelected');
		//checkbox全选中
		var  listCheckboxs=$('.field-list-checkbox');
		for(var j=0;j<listCheckboxs.length;j++){
			$(listCheckboxs[j]).attr('checked',true);
			var value=$(listCheckboxs[j]).attr('data-value');
			searchList=getSelectedList(fieldType,searchList,value);//获取所有选中的查询条件
			bodySearchList=getSelectedList(fieldName,bodySearchList,value);//获取所有选中的查询条件				
		}
	}
});

