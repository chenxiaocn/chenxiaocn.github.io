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

    $('#time').attr('data-value',dateType);
    $('#time').find('label').text(selectedCalendarDate);
    
    var calendarParms=JSON.stringify(arry);
    localStorage.setItem('calendarParms',calendarParms);
}