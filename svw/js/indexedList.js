var fieldType = localStorage.getItem('fieldType');
var equipData =JSON.parse(localStorage.getItem('equipData'));
var searchList = JSON.parse(localStorage.getItem('searchList')); //查询条件集合
var parentSearchList = JSON.parse(localStorage.getItem('parentSearchList')); //父查询条件集合
var bodySearchList = JSON.parse(localStorage.getItem('bodySearchList')); //表中条件集合（如品牌、厂商、车系）

var thisTypeSelcted =[];
var fieldCellSelcted=localStorage.getItem('fieldCellSelcted');//选中的
if(fieldCellSelcted){
	thisTypeSelcted=fieldCellSelcted.split(',');//转化成数组；
}

console.log(fieldType);
console.log(searchList);

mui.ready(function() {
	loadIndexedListBar();
	initBodyList();
	loadIndexedList();
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
	var rangeList=selectedCondition(parentSearchList,equipData);
	
   //加载列表
   if(rangeList.length>0){//有数据，加载列表
   		$('.no-data').hide();
   		$('.mui-indexed-list-bar').show();
   		
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
		setSelected();//设置选中的样式
		//设置全选样式
	   var a=$('.field-list-checkbox').length;
		if(thisTypeSelcted.length==a){
			$('.all').addClass('allSelected');
	    }else{
			$('.all').removeClass('allSelected');
	    }
   }
   else{//无数据，给提示
	   	$('.no-data').show();
	   	$('.mui-indexed-list-bar').hide();
   }
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
	addOrdelSelected( $(this),flag);
});

mui('body').on('tap','.mui-icon-left-nav,.btn-finished',function(){
	var searchListArr=JSON.stringify(searchList);
	var bodySearchListArr=JSON.stringify(bodySearchList);
	
	localStorage.setItem('searchList',searchListArr);
	localStorage.setItem('bodySearchList',bodySearchListArr);
	window.history.go(-1);
});

//全选
mui('body').on('tap','.all',function(){
	var flag=false;
	if($(this).hasClass('allSelected')){
		$(this).removeClass('allSelected');	
	}else{
		$(this).addClass('allSelected');
		flag=true;		
	}

	var listCheckboxs = $('.field-list-checkbox');
	for(var j = 0; j < listCheckboxs.length; j++) {
		addOrdelSelected( $(listCheckboxs[j]),flag);
	}
});

function addOrdelSelected(target,flag) {
	//checkbox全选中
		var value = target.attr('data-value');
		if(flag) {
			target.prop('checked', true);
			searchList = getSelectedList(fieldType, searchList, value); //获取所有选中的查询条件
			bodySearchList = getSelectedList(fieldType, bodySearchList, value); //获取所有选中的查询条件
		} 
		else {
			target.prop("checked",false);
			searchList = delThisValue(fieldType, searchList, value); //获取所有选中的查询条件
			bodySearchList = delThisValue(fieldType, bodySearchList, value); //获取所有选中的查询条件
		}
}
