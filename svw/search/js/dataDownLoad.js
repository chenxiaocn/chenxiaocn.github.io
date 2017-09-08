var calcFieldData=[];//计算项数据
var wordFieldData=[];//字段数据
var bodySearchList=JSON.parse(localStorage.getItem('carSearchList'));
var fieldSearchList=JSON.parse(localStorage.getItem('fieldSearchList'));
var searchList = JSON.parse(localStorage.getItem('searchList')); //查询条件集合
var selectedRangeStr='';//时间

var fieldsNav=[];

mui.ready(function() {
	loadData();
	getCalendarParms(); //日历参数
	fillChooseCar();//填充选车
});



function loadData() {	
	var path='http://svw.chinaautomarket.com/api/AnalysisField';
	
	mui.ajax(path, {
//		data:'',
		dataType: 'json', //服务器返回json格式数据
		type: 'get', //HTTP请求类型
		timeout: 3000, //超时时间设置为3秒；
		headers: {
			'Content-Type': 'application/json'
		},
		success: function(data) {
			if(data.error) {
				mui.toast(data.error);
			} else {
				var fields=data.data.fields;
			    fieldsNav=getConditionList(fields,'name');
			    var fieldsNavStr=JSON.stringify(fieldsNav);
			  
			    var equipDataTmp=data.data.data;
			    equipDataTmp.splice(0,1); 
			    var equipData=arrToJson(equipDataTmp,fieldsNav);
			     
			     var equipDataArr=JSON.stringify(equipData);
			    localStorage.setItem('fieldsNav',fieldsNavStr);
			    localStorage.setItem('equipData',equipDataArr);		
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			console.log(type);
		}
	});
}

function getCalendarParms() {  
    var path="http://svw.chinaautomarket.com/api/daterange";
    mui.ajax(path, {
//		data:'',
		dataType: 'json', //服务器返回json格式数据
		type: 'get', //HTTP请求类型
		timeout: 3000, //超时时间设置为3秒；
		headers: {
			'Content-Type': 'application/json'
		},
		success: function(data) {
			if(data.error) {
				mui.toast(data.error);
			} else {
				fillCalendar(data);			
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			console.log(type);
		}
	});
}

function fillCalendar(data){
	var obj={'dateType':'month','selectedCalendarDate':[],'beginDate':data.data.beginDate,'endDate':data.data.endDate,
             'dateRangeEndbled':false,'single':true
           };

    var arry=[obj];

    var dateType=arry[0].dateType;
	//判断时间返回的值
	var backFlag=localStorage.getItem('backFlag');
	var selectedRange=JSON.parse(localStorage.getItem('selectedRange'));
	selectedRangeStr=(arry[0].selectedCalendarDate).join(',');

	if(backFlag){
		selectedCalendarDate=localStorage.getItem('selectedCalendarDate');
		
		if(selectedRange.length>0){
			selectedRange=selectedRange;
			selectedRangeStr=selectedRange.join(',')
		}else{
			selectedRange=[];
			selectedRangeStr='';
		}
		
		for(var item in arry){
			for(var key in arry[item]){
				if(key=="selectedCalendarDate"){
					arry[item][key]=selectedRange;
				}
			}
		}
	}

    $('#time').find('label').text(selectedRangeStr);
    $('#time').attr('data-value',dateType);
    
    var calendarParms=JSON.stringify(arry);
    localStorage.setItem('calendarParms',calendarParms);
}

function fillChooseCar(){
	var list='';
	for(var item in bodySearchList){
		var itemStr='';
		for(var key in bodySearchList[item]){
			var keyStr='';
			for(var cell in bodySearchList[item][key]){
				var str=bodySearchList[item][key][cell]+',';
				keyStr+=str;
				keyStr = keyStr.substr(0,keyStr.length-1);
			}
				itemStr=key+':'+keyStr+',';
		}
	list+=itemStr;
	}
	list = list.substr(0,list.length-1);
	$('.chooseCar-label').text(list);
};

//选车
mui('body').on('tap', '.choose-car-li', function(){
	var value = $(this).find('label').text();
	var url = "chooseCar.html";

	if(!value) {
		url = "newChooseCar.html";
	}

	mui.openWindow({
		url: url,
		id: url
	});
});
//查询
mui('body').on('tap', '.search-btn', function(e) {	
    $('.mui-popover').toggle();
    var chooseFlag=true;
	if(selectedRangeStr==''){
		mui.toast('请选择时间');	
	    e.stopPropagation();
	    chooseFlag=false;
	    return;
	}
	if(searchList==null||searchList.length==0){
		mui.toast('请选择条件');	
	    e.stopPropagation();
	    chooseFlag=false;
	    return;
	}
	if(chooseFlag){
		if($('.mui-popover').is(':visible')){
			var listSFG=[];
		    var listSFGCel={};
		    
		   //条件
		    for(var item in searchList){
		    	var listSF={};
		    	for(var key in searchList[item]){   		
		    		listSF={'Field':key,'Values':searchList[item][key]};
		    	}
		    	listSFGCel={'listSF':[listSF]};
		    	listSFG.push(listSFGCel);
		    }
		     
			var queryStr = {
				"SelectedSFG": {
					"listSFG": [{
						"listSFG": listSFG
					}]
				},
				"BeginDate":selectedRangeStr,
				"EndDate": selectedRangeStr
			};
			
			var query=JSON.stringify(queryStr);
		    var path="http://svw.chinaautomarket.com/api/dataquery";	
			mui.ajax(path, {
				data:query,
				dataType: 'json', //服务器返回json格式数据
				type: 'post', //HTTP请求类型
				timeout: 10000, //超时时间设置为10秒；
				headers: {
					'Content-Type': 'application/json'
				},
				success: function(data) {
					if(data.error) {
						mui.toast(data.error);
					} else {	
						var queryResult=data.data;					
						showQuery(queryResult);//查询结果
					}
				},
				error: function(xhr, type, errorThrown) {
					//异常处理；
					console.log(type);
				}
			});	
		}
	}	
});
//查询结果展示
function showQuery(data){
	mui('.mui-scroll-wrapper').scroll();
		var list='';
		if(data.length==0){//无查询结果
			list='<li class="mui-table-view-cell result-li">暂无数据</li>'	
		}else{	
			for(var item in data){
				for(var key in data[item]){
					
					var value=data[item][key];
					if(!(value==null)){
						if(!(key=='oem'||key=='model_brand')){
							if(value.toString().indexOf('.')>-1){//小数四舍五入
								value=Math.round(data[item][key]);
							}
						}
					}else{
						value=0;
					}
					
					var cell='<li class="mui-table-view-cell result-li">'
								+'<label class="result-name" for="">'+key+'</label>'
								+'<label class="mui-pull-right result-value" for="">'+value+'</label>'
								+'</li>';
					list+=cell;
				}
			}
		}
		
		$('.result-ul').html(list);

}
