 var bodySearchList=JSON.parse(localStorage.getItem('bodySearchList'));
 var searchList=JSON.parse(localStorage.getItem('searchList'));
var conditionType=[];

mui.ready(function(){
	loadChooseList();	
});

function loadChooseList(){
	if(bodySearchList){
		var list='';
		if(bodySearchList){
			for(var item in bodySearchList ){
				for(var key in bodySearchList[item]){
					for(var cell in bodySearchList[item][key]){
							var cell='<li class="mui-table-view-cell  choose-li"  data-type='+key+'>'
								+'<div class="mui-slider-right mui-disabled">'
								+'<a class="mui-btn mui-btn-red" data-value='+bodySearchList[item][key][cell]+' data-type='+key+'>删除</a>'
								+'</div>'
								+'<div class="mui-slider-handle mui-navigate-right">'
								+key+':'+bodySearchList[item][key][cell]
								+'</div>'
								+'</li>';
					list+=cell;
					}			
				}
		    }  
		}
		$('.choose-ul').append(list);
	}
}
///////////////删除////////////////
mui('body').on('tap', '.mui-btn', function(event) {
	var btnArray = ['确认', '取消'];
	var elem = this;
	var li = elem.parentNode.parentNode;
	var dataType = $(elem).attr('data-type');
	var dataValue = $(elem).attr('data-value');

	mui.confirm('', '确认删除该条记录？', btnArray, function(e) {
		if(e.index == 0) {
			li.parentNode.removeChild(li);
			bodySearchList = delThisValue(dataType, bodySearchList, dataValue);					
			searchList = delThisValue(dataType, searchList, dataValue);
		} else {
			setTimeout(function() {
				mui.swipeoutClose(li);
			}, 0);
		}
	});
});

	////////////////新增、编辑/////////////////
mui('.mui-content').on('tap', '.plus,.choose-li', function(e) {
    var bodySearchListArr=JSON.stringify(bodySearchList);
    var searchListArr=JSON.stringify(searchList);
    
	localStorage.setItem('bodySearchList', bodySearchListArr);
	localStorage.setItem('searchList', searchListArr);
	
	mui.openWindow({
		url: 'newChooseCar.html',
		id: 'newChooseCar.html'
	});
});

   /////////////////返回////////////////
mui('body').on('tap','.mui-icon-left-nav', function() {
	var carSearchList=JSON.stringify(bodySearchList);
	localStorage.setItem('carSearchList', carSearchList);
	
	mui.openWindow({
		url:'dataDownLoad.html',
		id: 'dataDownLoad.html',
	});
// 	window.history.go(-1);
});