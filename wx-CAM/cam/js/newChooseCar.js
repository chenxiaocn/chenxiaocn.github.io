mui.ready(function(){
	loadPopover();
});

function loadPopover(){
	$('#popover').load('../public/popover.html');
			$('#tabPopover').load('../public/tabPopover.html');
			mui('.mui-scroll-wrapper').scroll();
			mui('body').on('shown', '.mui-popover', function(e) {
				//console.log('shown', e.detail.id);//detail为当前popover元素
			});
			mui('body').on('hidden', '.mui-popover', function(e) {
				//console.log('hidden', e.detail.id);//detail为当前popover元素
			});

			//
			mui('#segmentedControls').on('tap', '.mui-control-item', function(e) {
				var dataIndex = this.getAttribute('data-index');
			});
}
