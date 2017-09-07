///////////全选或无线开关//////////
mui.init({
	swipeBack: true //启用右滑关闭功能
});
mui('.mui-switch').each(function() { //循环所有toggle
	var switchName = localStorage.getItem('switchName');
	//toggle.classList.contains('mui-active') 可识别该toggle的开关状态
	this.parentNode.querySelector('span').innerText = switchName;
	/**
	 * toggle 事件监听
	 */
	//		this.addEventListener('toggle', function(event) {
	//			//event.detail.isActive 可直接获取当前状态
	////			this.parentNode.querySelector('span').innerText = '状态';
	//		});
});

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