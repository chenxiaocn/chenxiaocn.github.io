mui.ready(function() {
	getCalendarList();
});

function getCalendarList() {
	var list='',calWrap='';
	for(var i=2017;i>2014;i--){
		var monthList=getMonthList();
		calWrap='<div class="cal-wrap">'
					+'<h2>'+i+'年'+'</h2>'
	                +'<ul class="mui-row cal-ul">'	
	                + monthList
					+'</ul>'
					+'</div>';
		list+=calWrap;
	}
	$('#calendar').append(list);
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