var selctedList =[];
var dataType=localStorage.getItem('dataType');//
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

	for(var i=0;i<fieldsList.length;i++){
		var item='<div class="mui-input-row mui-checkbox">'
			 +'<label>'+fieldsList[i].Name+'</label>'
			 +'<input  class="field-list-checkbox" type="checkbox">'
			 +'</div>';
		list+=item;
	}
	$('.field-list-form').append(list);
	setSelected(fieldsList);
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
	var value=$(this).prev().text();

	if(flag){
		selctedList.push(value);
	}else{
		for(var i=0;i<selctedList.length;i++){
			if(selctedList[i]==value){
				selctedList.splice(i,1);
			}
		}
	}
});

mui('body').on('tap','.mui-icon-left-nav',function(){
	localStorage.setItem('fieldSelctedList',selctedList);
	localStorage.setItem('backFieldType',dataType);
	window.history.go(-1);
});
