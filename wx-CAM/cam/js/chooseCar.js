mui.ready(function(){
	loadChooseList();
});

function loadChooseList(){
 var chooseList=JSON.parse(localStorage.getItem('chooseList'));
	if(chooseList){
		var list='';
		for(var item in chooseList ){
			for(var key in chooseList[item]){
				var cell='<li class="mui-table-view-cell  choose-li"  data-type='+key+'>'
							+'<div class="mui-slider-right mui-disabled">'
							+'<a class="mui-btn mui-btn-red">删除</a>'
							+'</div>'
							+'<div class="mui-slider-handle mui-navigate-right">'
							+chooseList[item][key]
							+'</div>'
							+'</li>';
				list+=cell;
			}
		}
		$('.choose-ul').append(list);
	}
}
///////////////删除////////////////
	(function($) {
		var btnArray = ['确认', '取消'];

		$('.sliderLeftDel').on('tap', '.mui-btn', function(event) {
			var elem = this;
			var li = elem.parentNode.parentNode;
			mui.confirm('', '确认删除该条记录？', btnArray, function(e) {
				if(e.index == 0) {
					li.parentNode.removeChild(li);
				} else {
					setTimeout(function() {
						$.swipeoutClose(li);
					}, 0);
				}
			});
		});
	})(mui);

	////////////////新增、编辑/////////////////
	mui('.mui-content').on('tap', '.plus,.choose-li', function(e) {
		var chooseLi=$('.choose-li');
		var list=[];
		for(var i=0;i<chooseLi.length;i++){
			var dataType=$(chooseLi[i]).attr('data-type');
			var dataValue=$(chooseLi[i]).find('.mui-slider-handle').text();
			var reg = /[^:]*:([^:]*)/;	//去冒号
			dataValue=dataValue.replace(reg,"$1");
			var obj={};
			obj[dataType]=dataValue;
			list.push(obj);
		}
		var goFlag=true;//向后一页
		var listArr=JSON.stringify(list);
		localStorage.setItem('goFlag',goFlag);
		localStorage.setItem('editList',listArr);


		mui.openWindow({
			url: 'newChooseCar.html',
			id: 'newChooseCar.html'
		});
	});