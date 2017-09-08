///////////页面跳转//////////
mui('.mui-content').on('tap', '.go-next', function(e) {
	var thisValue = $(this).attr('data-value');
	var url ='';
	switch(thisValue) {
		case "month":
			url = '../public/calendar/calendarMonth.html';
			break;
	}
	mui.openWindow({
		url: url,
		id: url
	});
});