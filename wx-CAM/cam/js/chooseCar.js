	///////////////删除////////////////
	mui.init();
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

	////////////////新增////////////////
	mui('.mui-content').on('tap', '.plus', function(e) {
		mui.openWindow({
			url: 'newChooseCar.html',
			id: 'newChooseCar.html'
		});
	});