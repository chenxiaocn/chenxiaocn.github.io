mui.ready(function(){
	loadCondition();//条件
});

function loadCondition() {
	var conditionType=[
	{"HZZZ":"性质"},
	{"Segment":"级别"},
	{"BodyType":"车身"},
	{"Model":"派系"},
	{"Fuel":"燃油"}
	];//假数据
	
	conditionParms=JSON.stringify(conditionType);
	localStorage.setItem('conditionParms',conditionParms);
}
