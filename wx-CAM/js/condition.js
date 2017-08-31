var allJsonData = getEquipData();
var equipData = allJsonData[1];
var lastClickConditionId = ''; //弹框上一次被打开，条件的id
var searchList=[];//查询集合。如性质、级别
var conditionList=[]//单个类型的集合。如性质下所有的集合

console.log(equipData);

mui.ready(function() {
	var conditionParms = JSON.parse(localStorage.getItem('conditionParms'));
	getConditionNav(conditionParms);
	showPopover();
});

function getConditionNav(conditionType) {
	var list = '';
	for(var key in conditionType) {
		var item = '';
		for(var cell in conditionType[key]) {
			var href = "#popover";
			if(cell == "Segment") {
				href = "#tabPopover"
			}
			item = '<div class="ui-flex-item">' +
				'<a class="mui-btn mui-btn-primary mui-btn-block mui-btn-outlined" href=' + href + ' id=' + cell + '>' + conditionType[key][cell] + '</a>' +
				'</div>';
			list += item;
		}
	}
	$('#ui-nav').append(list);
}

///////////////////点击性质、级别、、、、、、
mui('body').on('tap', '#ui-nav .ui-flex-item a', function() {
	var thisId = $(this).attr('id');
	localStorage.setItem('thisId', thisId);

//	if(thisId == 'Segment') {
//		$(this).attr('href', '#tabPopover');
//	} else {
//		$(this).attr('href', '#popover');
//	}
});

////////////////弹框弹出///////////////////////
function showPopover() {
	mui('.mui-scroll-wrapper').scroll();
	mui('body').on('shown', '.mui-popover', function(e) {
		var list = '';
		var thisId = localStorage.getItem('thisId'); //条件名称 如性质
		var conditionContent = getConditionList(equipData, thisId); //性质下的所有条件。自主、合资、

		if(!(lastClickConditionId == thisId)) {//上次与这次条件名称不相同，重加载
			$('.condition-ul').empty();

			for(var i = 0; i < conditionContent.length; i++) {
				var item = '<li class="mui-table-view-cell condition-li" data-value=' + conditionContent[i] + ' data-type='+thisId+'>' 
				           +'<a href="#">' + conditionContent[i] + '<img class="tick mui-pull-right" src="../image/tick.png" />' 
				           +'</a>' 
				           +'</li>';
				list += item;
			}
			$('.condition-ul').append(list);
		}
	});
	mui('body').on('hidden', '.mui-popover', function(e) {
		lastClickConditionId = localStorage.getItem('thisId'); //条件名称 如性质			
	});
	//
	mui('#segmentedControls').on('tap', '.mui-control-item', function(e) {
		var dataIndex = this.getAttribute('data-index');
	});
}
////////////点击某个条件，如合资/////////////
mui('body').on('tap', '.condition-li', function() {
	var dataValue=$(this).attr('data-value');
	var thisType=$(this).attr('data-type');
	
	//该项被选中样式
	$(this).find('.tick').toggle();
	var tickVisible = $(this).find('.tick').is(':visible');
	if(tickVisible) {
		$(this).addClass('selected');
	} else {
		$(this).removeClass('selected');
	}
	
	searchList=getSelectedList(thisType,searchList,dataValue);//获取所有选中的查询条件
    conditionList=selectedCondition(searchList,equipData);//查询选中条件下的车
    
    
    
});