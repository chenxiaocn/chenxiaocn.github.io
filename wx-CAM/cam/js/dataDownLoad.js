mui.ready(function() {
	getCalendarParms(); //日历参数
});

function getCalendarParms() {
	var arry = [
	{
		dateType: 'month',
		selectedCalendarDate: ['201501~201503'],
		beginDate: '201302',
		endDate: '201703',
		dateRangeEndbled: true,
		single: false
	 }
    ];
    var selectedCalendarDate=(arry[0].selectedCalendarDate).join(',');
    var dateType=arry[0].dateType;
	//判断时间返回的值
	var backFlag=localStorage.getItem('backFlag');

	if(backFlag){
		selectedCalendarDate=localStorage.getItem('selectedCalendarDate');
		arry = [
			{
				dateType: 'month',
				selectedCalendarDate:[selectedCalendarDate],
				beginDate: '201302',
				endDate: '201703',
				dateRangeEndbled: true,
				single: false
			}
		]
	}


	$('#time').find('label').text(selectedCalendarDate);
    $('#time').attr('data-value',dateType);
    
    var calendarParms=JSON.stringify(arry);
    localStorage.setItem('calendarParms',calendarParms);
}