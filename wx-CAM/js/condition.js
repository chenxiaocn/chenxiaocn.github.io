var allJsonData = getEquipData();
var equipData = allJsonData[1];
var lastClickConditionId = ''; //弹框上一次被打开，条件的id
var lastClickLevelIndex =-1; //弹框上一次被打开，条件的索引
var searchList=[];//查询集合。如性质、级别
var conditionList=equipData;//查询选中条件下的车
var allConditionList=[];//所有条件集合

mui.ready(function() {
	var conditionParms = JSON.parse(localStorage.getItem('conditionParms'));
	getAllConditionList(conditionParms);//或得所有条件
	getConditionNav(conditionParms);//获得几大条件类型标题
	showPopover();
});

function getAllConditionList(conditionParms){
	var list=[];
	for(var item in conditionParms){
		for(var key in conditionParms[item]){
			var res= getConditionList(equipData, key); 
			var obj = {};
		    obj[key] = res;	
		    list.push(obj);
		}
	}
	allConditionList=list;
}

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
////////////////弹框弹出///////////////////////
function showPopover() {
	mui('.mui-scroll-wrapper').scroll();
	
	mui('body').on('shown', '.mui-popover', function(e) {
		var list = '',conditionContent=[];
		var thisId = localStorage.getItem('thisId'); //条件名称 如性质
		var thisLevelIndex = localStorage.getItem('thisLevelIndex'); //该条件所属索引
		var initConditionContent=(getConditionList(allConditionList, thisId))[0]; //初始该类型下所有的集合
		var thisTypeSelectedList=(getConditionList(searchList,thisId))[0];//该类型下是否有选中的单个条件
	 
		//上下级选中，本类型下列表
	    if(parseInt(lastClickLevelIndex) < parseInt(thisLevelIndex)) {//随父集查询元素变化（把自己及子集所属下的查询条件剔除）
			var parentSearchList=getParentSelectedList(thisLevelIndex);
			var res=selectedCondition(parentSearchList,equipData);
			if(parentSearchList.length==0){
				conditionContent = getConditionList(conditionList, thisId);
			}else{
				conditionContent =getConditionList(res, thisId);
			}
        }else{//不随子集元素、弹框guanbi(=0)变化
			conditionContent = initConditionContent;
		}

        allConditionList = changeAllConditionList(thisId, conditionContent);
		//填充
		for(var i = 0; i < conditionContent.length; i++) {
			var item = '<li class="mui-table-view-cell condition-li" data-value=' + conditionContent[i] + ' data-type='+thisId+'>'
					   +'<a href="#">' + conditionContent[i] + '<img class="tick mui-pull-right" src="../image/tick.png" />'
					   +'</a>'
					   +'</li>';
			list += item;
		}
		$('.condition-ul').append(list);

		//选中样式
		 if(searchList.length>0){
		 	setSelected(thisTypeSelectedList);
		 }
	});
	mui('body').on('hidden', '.mui-popover', function(e) {
		$('.condition-ul').empty();
		lastClickConditionId = localStorage.getItem('thisId'); //条件名称 如性质		
		lastClickLevelIndex = localStorage.getItem('thisLevelIndex'); //条件索引	
	});
}

function getParentSelectedList(thisLevelIndex){
	var uiNav=$("#ui-nav a");
	var list=[];
	for(var i=0;i<parseInt(thisLevelIndex);i++){
		var parentCellId=$(uiNav[i]).attr('id');
		var cell=getConditionResults(searchList, parentCellId);
		if(cell.length>0){
			list.push(cell[0]);
		}
	}
	return list;
}

function changeAllConditionList(thisId, conditionContent) {
	var res = [];
	for(var item in allConditionList) {
		for(var key in allConditionList[item]) {
			if(key == thisId) {
				allConditionList[item][key] = conditionContent;
			}
		}
	}
	res = allConditionList;
	return res;
}

function setSelected(thisTypeSelectedList){
	if(!(thisTypeSelectedList==undefined)){
		for(var i=0;i<$('.condition-li').length;i++){
			var liValue=$($('.condition-li')[i]).attr('data-value');
			//选中
			for(var j=0;j<thisTypeSelectedList.length;j++){
				if(liValue==thisTypeSelectedList[j]){
					$($('.condition-li')[i]).addClass('selected');
					$($('.condition-li')[i]).find('.tick').show();
				}
			}
		}
	}
}

function delThisValue(type,searchList,keyWord){
	for(var item in searchList){
		for(var key in searchList[item]){
			if(key==type){
				var arr=searchList[item][key];
				for(var i=0;i<arr.length;i++){
					if(arr[i]==keyWord){
						arr.splice(i,1);
						searchList[item][key]=arr;
						break;
					}
				}
			}
		}
	}
	return searchList;
}

////////////点击某个条件，如合资/////////////
mui('body').on('tap', '.condition-li', function() {
	var dataValue=$(this).attr('data-value');
	var thisType=$(this).attr('data-type');
	
	//该项被选中样式
	$(this).find('.tick').toggle();
	var tickVisible = $(this).find('.tick').is(':visible');
	if(tickVisible){
		$(this).addClass('selected');
		searchList=getSelectedList(thisType,searchList,dataValue);//获取所有选中的查询条件
	} else {
		$(this).removeClass('selected');
		searchList=delThisValue(thisType,searchList,dataValue);//获取所有选中的查询条件
	}
    conditionList=selectedCondition(searchList,equipData);//查询选中条件下的车
});
///////////////////点击性质、级别、、、、、、
mui('body').on('tap', '#ui-nav .ui-flex-item a', function() {
	var thisId = $(this).attr('id');
	var thisLevelIndex=$(this).parent().index();
	localStorage.setItem('thisId', thisId);
	localStorage.setItem('thisLevelIndex', thisLevelIndex);
});