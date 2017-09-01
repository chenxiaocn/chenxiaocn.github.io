mui.ready(function(){
	loadAll();
	loadBodyList();
	
});

function loadAll(){
	localStorage.setItem('switchName', '全选');
	$('.all-li').load('../public/switch.html');
}

function loadBodyList(){
	var list='';
//	var dataType=localStorage.getItem('dataType');
	var fieldsList=JSON.parse((localStorage.getItem('fieldsList')));

	for(var i=0;i<fieldsList.length;i++){
		var item='<div class="mui-input-row mui-checkbox">'
			 +'<label>'+fieldsList[i].Name+'</label>'
			 +'<input name="checkbox1" value="Item 3" type="checkbox" checked="checked">'
			 +'</div>';
		list+=item;
	}
	$('.field-list-form').append(list);
}
