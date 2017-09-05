var calcFieldData=[];//计算项数据
var wordFieldData=[];//字段数据
var bodySearchList=JSON.parse(localStorage.getItem('carSearchList'));
var fieldSearchList=JSON.parse(localStorage.getItem('fieldSearchList'));

mui.ready(function() {
	getCalendarParms(); //日历参数
	getCalcField();//计算项参数
	getWordField();//字段参数
	loadCalcField();//加载计算项目;
	fillField();//返回回来的字段选中内容填充；
	fillChooseCar();//填充选车
});

function getCalendarParms() {
	var arry = [
	{
		dateType: 'month',
//		selectedCalendarDate: ['201501','201503'],
		selectedCalendarDate: ['201501~201503'],
		beginDate: '201302',
		endDate: '201703',
		dateRangeEndbled: true,
		single: false
	 }
    ];
    var selectedCalendarDate=(arry[0].selectedCalendarDate).join(',');
    var dateType=arry[0].dateType;
	//判断时间返回的值
	var backFlag=localStorage.getItem('backFlag');
	var selectedRange=JSON.parse(localStorage.getItem('selectedRange'));

	if(backFlag){
		selectedCalendarDate=localStorage.getItem('selectedCalendarDate');
		
		if(selectedCalendarDate){
			selectedRange=selectedRange;
		}else{
			selectedRange=[];
		}
		
		for(var item in arry){
			for(var key in arry[item]){
				if(key=="selectedCalendarDate"){
					arry[item][key]=selectedRange;
				}
			}
		}
	}

    $('#time').find('label').text(selectedCalendarDate);
    $('#time').attr('data-value',dateType);
    
    var calendarParms=JSON.stringify(arry);
    localStorage.setItem('calendarParms',calendarParms);
}

function getCalcField(){
    calcFieldData=[
        {
            "Name": "销量",
            "Fields": [
                {
                    "ID": 2,
                    "Name": "CAM CPCA",
                    "FormatType": 10
                }
            ]
        },
        {
            "Name": "价格", 
            "Fields": [
                {
                    "ID": 0,
                    "Name": "MSRP",
                    "FormatType": 9
                },
                {
                    "ID": 0,
                    "Name": "TP",
                    "FormatType": 9
                },
                {
                    "ID": 0,
                    "Name": "最小MSRP",
                    "FormatType": 9
                },
                {
                    "ID": 0,
                    "Name": "最小TP",
                    "FormatType": 9
                },
                {
                    "ID": 0,
                    "Name": "最大MSRP",
                    "FormatType": 9
                },
                {
                    "ID": 0,
                    "Name": "最大TP",
                    "FormatType": 9
                }
            ]
        }
    ]
}

function getWordField(){
	wordFieldData= [
	{
			"FieldID": 2433,
			"Name": "合资自主"
		},
		{
			"FieldID": 48,
			"Name": "车身形式"
		},
		{
			"FieldID": 7,
			"Name": "车型级别"
		},
		{
			"FieldID": 50,
			"Name": "车型子级别"
		},
		{
			"FieldID": 1,
			"Name": "制造商"
		},
		{
			"FieldID": 2,
			"Name": "品牌"
		},
		{
			"FieldID": 3,
			"Name": "车系"
		},
		{
			"FieldID": 12,
			"Name": "车型派系"
		},
		{
			"FieldID": 384,
			"Name": "燃油种类"
		},
		{
			"FieldID": 47,
			"Name": "排量"
		},
		{
			"FieldID": 898,
			"Name": "变速箱形式"
		},
		{
			"FieldID": 44,
			"Name": "型号/车型名称"
		},
		{
			"FieldID": 45,
			"Name": "车型编号"
		}
	]
}

function loadCalcField(){
	var list=[];
	var calNameList=getConditionList(calcFieldData,'Name');
	
	for(var i=0;i<calcFieldData.length;i++){
		var itemHtml='<li class="mui-table-view-cell field-li" data-type='+calNameList[i]+'>'
					 +'<a class="mui-navigate-right" href="#">'+calNameList[i]
					 +'<label class="mui-pull-right text-overflow" for=""></label>'
					 +'</a>'
					 +'</li>';
			list+=itemHtml;
	}
	$('.calcField-ul').append(list);
}

function fillField(){
	var fieldLi=$('.field-li');
	for(var i=0;i<fieldLi.length;i++){
		var dataTypeCell=$($(fieldLi[i])).attr('data-type');

		for(var item in fieldSearchList){
			for(var key in fieldSearchList[item]){
				if(key==dataTypeCell){
					var fieldItemKey=(fieldSearchList[item][key]).join(',');
					if(fieldItemKey){
						$(fieldLi[i]).find('label').text(fieldItemKey);
					}
				}
			}
		}
	}
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
	list = list.substr(0,list.length-1);
	}
	$('.chooseCar-label').text(list);
};

mui('body').on('tap', '.field-li', function() {
	var dataType = $(this).attr('data-type');
	var thisValue=$(this).find('label').text();

	var fieldsList=[];
	if(dataType=="字段"){
		fieldsList=wordFieldData;
	}
	else{
		fieldsList=(getChildPropertyList(calcFieldData, "Name", dataType, 'Fields'))[0];
	}
	
	fieldsList=JSON.stringify(fieldsList);

	localStorage.setItem('dataType',dataType);
	localStorage.setItem('fieldsList',fieldsList);
	localStorage.setItem('fieldsCellSelcteds',thisValue);

	mui.openWindow({
		url: 'field.html',
		id: 'field.html'
	});
});

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