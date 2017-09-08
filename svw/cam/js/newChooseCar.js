var bodySearchList=JSON.parse(localStorage.getItem('bodySearchList'));

mui.ready(function(){
	fillField();//返回回来的字段选中内容填充；
});

function fillField(){
	var fieldLi=$('.field-li');
	for(var i=0;i<fieldLi.length;i++){
		var dataTypeType=$($(fieldLi[i])).attr('data-type');
		for(var item in bodySearchList){
			for(var key in bodySearchList[item]){
				if(key==dataTypeType){
					var fieldItemKey=(bodySearchList[item][key]).join(',');
					if(fieldItemKey){
						$(fieldLi[i]).find('label').text(fieldItemKey);
					}
				}
			}
		}
	}
}

//返回、完成
mui('body').on('tap','.mui-icon-left-nav,.btn-finished',function(){
//	localStorage.setItem('goFlag',false);//上一页跳过来的标志
	
	mui.openWindow({
		url:'chooseCar.html',
		id: 'chooseCar.html',
	});
});