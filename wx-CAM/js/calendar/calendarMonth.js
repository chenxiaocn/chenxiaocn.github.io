var dateClickRange=[];//可选时间范围
var selectedRange=[];//选中时间范围
var endYear='';//截止时间年份

mui.ready(function() {
	getCalendarParms();
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

function  getCalendarParms(){
	var calendarParms=JSON.parse(localStorage.getItem('calendarParms'));
	var beginDate=calendarParms[0].beginDate;
	var endDate=calendarParms[0].endDate;
    dateClickRange=getDateRangeList(beginDate,endDate);
    selectedRange=getSelectedRangeArr(calendarParms[0].selectedCalendarDate,'month');
    
    endYear=endDate.substring(0,4);//截取截止日期年份
    endYear=parseInt(endYear);
}

function getCalendarList() {
	var list='',calWrap='';
	for(var i=endYear-2;i<=endYear;i++){
		calWrap=getCalWrapCell(i);
		list+=calWrap;
	}
	$('#calendar').append(list);
}

function getCalWrapCell(year){
	var calWrapCell='';
	var monthList=getMonthList(year);
		calWrapCell='<div class="cal-wrap" data-id='+year+'>'
					+'<h2>'+year+'年'+'</h2>'
	                +'<ul class="mui-row cal-ul">'	
	                + monthList
					+'</ul>'
					+'</div>';
		return calWrapCell;
}

function getMonthList(year){
	var list='',item='';
	for(var i=1;i<13;i++){
		var  itemValue;
        i<10?itemValue='0'+ i.toString():itemValue=i.toString();
		var value=year+itemValue;
		item='<li class="mui-col-sm-3 mui-col-xs-3" value='+value+'>'
			   +i+'月'
			   +'</li>';			   
		list+=item;
	}
	return list;
}

/** 下拉刷新具体业务实现*/
function pulldownRefresh() {
	alert('aa');
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