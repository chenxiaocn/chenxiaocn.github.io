var equipData =JSON.parse(localStorage.getItem('equipData'));
var lastClickConditionId = ''; //弹框上一次被打开，条件的id
var lastClickLevelIndex =-1; //弹框上一次被打开，条件的索引
var searchList=JSON.parse(localStorage.getItem('searchList'));//查询集合。如性质、级别
var conditionList=equipData;//查询选中条件下的车
var allConditionList=[];//所有条件集合
var navSearchList=JSON.parse(localStorage.getItem('navSearchList'));//表头的五种选中条件集合

mui.ready(function() {
	var fieldsNav = JSON.parse(localStorage.getItem('fieldsNav'));
	getAllConditionList(fieldsNav);//获取所有条件
	getConditionNav(fieldsNav);//获得几大条件类型标题
	showPopover();
});

function getAllConditionList(conditionParms){
	var list=[];
	for(var i=0;i<conditionParms.length-4;i++){
		var res= getConditionList(equipData, conditionParms[i]); 
		var obj = {};
	    obj[conditionParms[i]] = res;	
	    list.push(obj);
	}
	allConditionList=list;
}

function getConditionNav(conditionType) {
	var list = '';
	for(var i=0;i<conditionType.length-4;i++) {
		var href = "#popover";
		var item = '<div class="mui-col-sm-3 mui-col-xs-3 flex-item">' +
			'<a class="mui-btn mui-btn-primary mui-btn-block mui-btn-outlined" href="#popover" id='+ conditionType[i] + '>' + conditionType[i] + '</a>' +
			'</div>';
		list += item;
	}
	$('#ui-nav').append(list);
}
////////////////弹框弹出///////////////////////
function showPopover() {
	mui('.mui-scroll-wrapper').scroll();
	
	mui('body').on('shown', '.mui-popover', function(e) {
		var conditionContent=[];
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
        
        loadPopover(thisId,conditionContent,thisTypeSelectedList);
   });
   
    mui('body').on('hidden', '.mui-popover', function(e) {
		$('.condition-ul').empty();
		lastClickConditionId = localStorage.getItem('thisId'); //条件名称 如性质		
		lastClickLevelIndex = localStorage.getItem('thisLevelIndex'); //条件索引	
	});
}

function loadPopover(thisId, conditionContent, thisTypeSelectedList) {
	var list = '';
	//填充
	for(var i = 0; i < conditionContent.length; i++) {
		var item = '<li class="mui-table-view-cell condition-li" data-value=' + conditionContent[i] + ' data-type=' + thisId + '>' 
                    + conditionContent[i] 
                    + '<img class="tick mui-pull-right" src="../image/tick.png" />'
                    +'</li>';
		list += item;
	}
	$('.condition-ul').append(list);

	//选中样式
	if(thisTypeSelectedList) {
		setSelected(thisTypeSelectedList);
	}

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

function addOrDelSelected(target, flag) {
	var dataValue = target.attr('data-value');
	var thisType = target.attr('data-type');

	target.find('.tick').toggle();

	if(flag) {
		target.addClass('selected');
		searchList = getSelectedList(thisType, searchList, dataValue); //获取所有选中的查询条件
		navSearchList = getSelectedList(thisType, navSearchList, dataValue); //
	} else {
		target.removeClass('selected');
		searchList = delThisValue(thisType, searchList, dataValue); //获取所有选中的查询条件
		navSearchList = delThisValue(thisType, navSearchList, dataValue); //
	}
};

////////////点击某个条件，如合资/////////////
mui('body').on('tap', '.condition-li', function() {
	//该项被选中样式
	var tickVisible = $(this).find('.tick').is(':visible');
	addOrDelSelected($(this),!tickVisible) ;
    conditionList=selectedCondition(searchList,equipData);//查询选中条件下的车
});
///////////////////点击性质、级别、、、、、、
mui('body').on('tap', '#ui-nav .flex-item a', function() {
	var thisId = $(this).attr('id');
	var thisLevelIndex=$(this).parent().index();
	localStorage.setItem('thisId', thisId);
	localStorage.setItem('thisLevelIndex', thisLevelIndex);
});

/////////////////////品牌、厂商、车系 //////////
mui('.field-ul').on('tap','.field-li',function(){
	var thisType=$(this).attr('data-type');
	var thisName=$(this).attr('data-name');
	var thisValue=$(this).find('label').text();
	//去冒号
	var reg = /[^:]*:([^:]*)/;
	thisValue=thisValue.replace(reg,"$1");

	var searchListArr=JSON.stringify(searchList);
	var conditionListArr=JSON.stringify(conditionList);
	var navSearchListArr=JSON.stringify(navSearchList);
	
	localStorage.setItem('fieldType',thisType);
	localStorage.setItem('fieldName',thisName);
	localStorage.setItem('searchList', searchListArr);
	localStorage.setItem('conditionList',conditionListArr);
	localStorage.setItem('fieldCellSelcted',thisValue);
	localStorage.setItem('navSearchList',navSearchListArr);

	mui.openWindow({
		url: 'indexedList.html',
		id: 'indexedList.html'
	});
});


