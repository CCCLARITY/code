var index = 0;
app.get('/hello', function(req, res) {
	var attr = [];
	for(var i=3;i<100;i++){
		attr.push('内容' + i);
	}
	var resData = [];
	for(var j=index;j<index+6;j++){
		resData[j-index] = attr[j];
	}
	index+=6;
	res.send(resData);
});
