var calendarParms=JSON.parse(localStorage.getItem('calendarParms'));
var dateClickRange=[];//可选时间范围
var selectedRange=[];//选中时间范围
var endYear='';//截止时间年份

mui.ready(function() {
	getCalendarParms();
	getCalendarList();
	setSelectedAndClickable();//设置选中样式
	
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
	var beginDate=calendarParms[0].beginDate;
	var endDate=calendarParms[0].endDate;
    dateClickRange=getDateRangeList(beginDate,endDate);
    if(calendarParms[0].selectedCalendarDate.length>=1){
    	selectedRange=getSelectedRangeArr(calendarParms[0].selectedCalendarDate,'month');
    }
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

function setSelectedAndClickable(){
	 for(var i=0;i<$('li').length;i++){
	 	var liValue=$($('li')[i]).attr('value');
	 	//选中
	 	for(var j=0;j<selectedRange.length;j++){
	 		if(liValue==selectedRange[j]){
	 			$($('li')[i]).addClass('selected');
	 		}
	 	}
	 	//可选
	 	for(var k=0;k<dateClickRange.length;k++){
	 		if(liValue==dateClickRange[k]){
	 			$($('li')[i]).addClass('clickable');
	 		}
	 	}
	 }
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
//选中点击事件
mui('body').on('tap', '.clickable', function() {
	var thisValue = $(this).attr('value');
	var thisIndex,beginIndex,endIndex;
	//如果是范围
	if(calendarParms[0].dateRangeEndbled) {
		if($(this).hasClass('selected')) {
			$('.selected').removeClass('selected');
			if(selectedRange.length <= 1) {
				$(this).removeClass('selected');
				selectedRange = [];
			} else {
				
				$(this).addClass('selected');
				selectedRange = [thisValue];
			}
		} else {
			switch(selectedRange.length) {
				case 0:
					$(this).addClass('selected');
					selectedRange = [thisValue];
					break;
				case 1:
					thisIndex = getIndex($('.clickable'), thisValue);
					var selectedValue = $('.selected').attr('value');
					var selectedIndex = getIndex($('.clickable'), selectedValue);
	
					if(thisIndex < selectedIndex) {
						beginIndex = thisIndex;
						endIndex = selectedIndex;
					} else {
						beginIndex = selectedIndex;
						endIndex = thisIndex;
					}

                     selectedRange=[];
					for(var i = beginIndex; i <= endIndex; i++) {
						$($('.clickable')[i]).addClass('selected');
						selectedRange.push($($('.clickable')[i]).attr('value'));
					}
					break;
				default:
					$('.selected').removeClass('selected');
					$(this).addClass('selected');
					selectedRange = [thisValue];
					break;
			}
		}
    }
	if(calendarParms[0].single){
		if($(this).hasClass('selected')) {
			$(this).removeClass('selected');
			selectedRange=sorSplice(selectedRange,thisValue);			
		}else{
			$('.cal-ul li').removeClass('selected');//单选
			$(this).addClass('selected');
			selectedRange=[thisValue];//单选
//			selectedRange.push(thisValue);//多选
		}
	}
});

function getIndex(list, value) {
	var index;
	for(var i = 0; i < list.length; i++) {
		var liValue = $(list[i]).attr('value');
		if(liValue == value) {
			index = i;
		}
	}
	return index;
}

//返回
mui('body').on('tap', '.mui-icon-left-nav', function() {
	var length = selectedRange.length;
	var beginDateValue, endDateValue;

	if(calendarParms[0].dateRangeEndbled) {
		if(length>1){
			beginDateValue = selectedRange[0];
			endDateValue = selectedRange[length - 1];
			var range = beginDateValue + "~" + endDateValue;
			selectedRange = [range];
		}
	}
	
	var selectedRangeArr = JSON.stringify(selectedRange);
	localStorage.setItem('selectedRange', selectedRangeArr);
	localStorage.setItem('backFlag', true);
	window.history.go(-1);

});
