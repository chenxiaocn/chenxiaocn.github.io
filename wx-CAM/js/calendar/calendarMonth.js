mui.ready(function() {
	getCalendarList();
	
	//上拉加载，下拉刷新
	mui.init({
		pullRefresh: {
			container: '#pullrefresh',
			down: {
				callback: pulldownRefresh
			},
			up: {
				contentrefresh: '正在加载...',
				callback: pullupRefresh
			}
		}
	});
});

function getCalendarList() {
	var list='',calWrap='';
	for(var i=2017-2;i<=2017;i++){
		calWrap=getCalWrapCell(i);
		list+=calWrap;
	}
	$('#calendar').append(list);
}

function getCalWrapCell(i){
	var calWrapCell='';
	var monthList=getMonthList();
		calWrapCell='<div class="cal-wrap" data-id='+i+'>'
					+'<h2>'+i+'年'+'</h2>'
	                +'<ul class="mui-row cal-ul">'	
	                + monthList
					+'</ul>'
					+'</div>';
		return calWrapCell;
}

function getMonthList(){
	var list='',item='';
	for(var i=0;i<12;i++){
		item='<li class="mui-col-sm-3 mui-col-xs-3 selected">'
			   +(i+1)+'月'
			   +'</li>';			   
		list+=item;
	}
	return list;
}

/** 下拉刷新具体业务实现*/
function pulldownRefresh() {
	setTimeout(function() {
		var firstChild=$($(".cal-wrap")[0]);
		var firstChildId=firstChild.attr('data-id');
		var downCell=getCalWrapCell(firstChildId-1);
		$('#calendar').prepend(downCell);//下拉刷新，新纪录插到最前面；
		mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); 
	}, 300);
}

/*** 上拉加载具体业务实现*/
function pullupRefresh() {
	var count = 0;
	setTimeout(function() {
		mui('#pullrefresh').pullRefresh().endPullupToRefresh((++count > 2)); //参数为true代表没有更多数据了。
		var length=$(".cal-wrap").length;
		var lastChild=$($(".cal-wrap")[length-1]);
		var lastChildId=lastChild.attr('data-id');
		var upCell=getCalWrapCell(parseInt(lastChildId)+1);
		$('#calendar').append(upCell);
	}, 300);
}