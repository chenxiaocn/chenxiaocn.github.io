var fieldType = localStorage.getItem('fieldType');
var searchList = JSON.parse(localStorage.getItem('searchList')); //查询条件集合
var conditionList = JSON.parse(localStorage.getItem('conditionList')); //查询条件下的结果集合

console.log(fieldType);
console.log(searchList);
console.log(conditionList);

mui.ready(function() {
	loadIndexedListBar();
	initBodyList();
});

function loadIndexedListBar(){
	var ch_big = 'A',list='';
	for(var i = 0; i < 26; i++) {
		var letterCell=String.fromCharCode(ch_big.charCodeAt(0) + i);
		var itemHtml='<a>'+letterCell+'</a>';
		list+=itemHtml;
	}
	$('.mui-indexed-list-bar').append(list);
}

function initBodyList() {
	var list = document.getElementById('list');
	list.style.height = (document.body.offsetHeight) + 'px';
	window.indexedList = new mui.IndexedList(list);
}

//大写字母
function capitalLetter() {
	var ch_big = 'A';
	var str_big = [];
	for(var i = 0; i < 26; i++) {
		str_big.push(String.fromCharCode(ch_big.charCodeAt(0) + i));
	}
	return str_big;
}

mui('.mui-indexed-list-inner').on('change', 'input', function() {
	var count = list.querySelectorAll('input[type="checkbox"]:checked').length;
});