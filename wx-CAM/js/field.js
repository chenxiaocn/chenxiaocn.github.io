var selctedList =[];
var dataType=localStorage.getItem('dataType');//
var fieldSearchList = JSON.parse(localStorage.getItem('fieldSearchList')); //字段、销量、价格选中集合
var fieldsCellSelcteds=localStorage.getItem('fieldsCellSelcteds');//选中的
if(fieldsCellSelcteds==null||fieldsCellSelcteds==''){
	selctedList=[];
}else{
	if(fieldsCellSelcteds.indexOf(',')>-1){//多个
		selctedList=fieldsCellSelcteds.split(',');//转化成数组；
	}else{//1个
		selctedList=[fieldsCellSelcteds];
	}
}

mui.ready(function(){
	loadBodyList();
});

function loadBodyList(){
	var list='';
	var fieldsList=JSON.parse((localStorage.getItem('fieldsList')));

	if(fieldsList.length>0){
		for(var i=0;i<fieldsList.length;i++){
			var item='<div class="mui-input-row mui-checkbox">'
				+'<label>'+fieldsList[i].Name+'</label>'
				+'<input  class="field-list-checkbox" type="checkbox">'
				+'</div>';
			list+=item;
		}
		$('.field-list-form').append(list);
		setSelected(fieldsList);
		//设置全选样式
		var a=$('.field-list-checkbox').length;
		if(selctedList.length==a){
			$('.all').addClass('allSelected');
		}else{
			$('.all').removeClass('allSelected');
		}
	}
}
function setSelected(fieldsList){
	for(var i=0;i<selctedList.length;i++){
		for(var j=0;j<fieldsList.length;j++){
			if(selctedList[i]==fieldsList[j].Name){
				$($('.field-list-checkbox')[j]).attr('checked','checked');
			}
		}
	}
};

mui('.mui-input-group').on('change', 'input', function() {
	var flag=$(this).is(':checked');
	addOrdelSelected($(this),flag);
});

mui('body').on('tap','.mui-icon-left-nav,.btn-finished',function(){
	var fieldSearchListArr=JSON.stringify(fieldSearchList);

	localStorage.setItem('fieldSearchList',fieldSearchListArr);
	localStorage.setItem('fieldSelctedList',selctedList);
	localStorage.setItem('backFieldType',dataType);
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
	var value=target.prev().text();
	if(flag) {
		target.prop('checked', true);
		fieldSearchList = getSelectedList(dataType, fieldSearchList, value); //获取所有选中的查询条件
	}
	else {
		target.prop("checked",false);
		fieldSearchList = delThisValue(dataType, fieldSearchList, value); //获取所有选中的查询条件
	}
}
