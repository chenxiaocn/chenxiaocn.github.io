mui.ready(function(){
	loadPopover();
	getConditionNav();
});

function loadPopover() {
	mui('.mui-scroll-wrapper').scroll();
	mui('body').on('shown', '.mui-popover', function(e) {
		var thisId=localStorage.getItem('thisId');
		alert(thisId);
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

function getConditionNav(){
	var conditionType=[
	{"HZZZ":"性质"},
	{"Segment":"级别"},
	{"BodyType":"车身"},
	{"Model":"派系"},
	{"Fuel":"燃油"}
	];//假数据
	
	var list='';
	
	for(var key in conditionType){
		var item='';
		for(var cell in conditionType[key]){
			var href="#popover";
			if(cell=="Segment"){
				href="#tabPopover"
				}
			
			item ='<div class="ui-flex-item">'
				      +'<a class="mui-btn mui-btn-primary mui-btn-block mui-btn-outlined" href='+href+' id='+cell+'>'+conditionType[key][cell]+'</a>'
				      +'</div>';
		    list+=item;
		}	
	}
	
	$('#ui-nav').append(list);
	
}


mui('body').on('tap', '#ui-nav .ui-flex-item a', function() {
	var thisId = $(this).attr('id');
	localStorage.setItem('thisId', thisId);
	
	var left = $(this)[0].offsetLeft + 10 + 'px'; //小箭头偏移
	localStorage.setItem('left', left);

	if(thisId == 'Segment') {
		$('#tabPopover').load('../public/tabPopover.html');
	} else {
		$('#popover').load('../public/popover.html');
	}

});
