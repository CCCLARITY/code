var http = require('http')
var fs = require('fs')
var url = require('url')

//console.log(Object.keys(http))
var port = process.env.PORT || 8888;

var server = http.createServer(function(request, response){

	var temp = url.parse(request.url, true)
	var path = temp.pathname
	var query = temp.query
	var method = request.method

	//从这里开始看，上面不要看
 	if(path === '/index'){
 		response.setHeader('Content-Type','text/html;charset="utf-8"')
 		// var string = fs.readFileSync('./index.html','utf-8')
 		response.end(`
 			<!DOCTYPE html>
			<html>
			<head>
				<title></title>
			</head>
			<body>
				
				<ul>
					<li>内容1</li>
					<li>内容2</li>
				</ul>
				<div class="btn">
					<button id="btn">加载更多</button>
				</div>
				<link rel="stylesheet" href="/style">
				
				<script src="/taskmain12"></script>
			</body>
			</html>
 		`)
 	}else if(path === '/style'){
 		response.setHeader('Content-Type','text/css')
 		// var cssString = fs.readFileSync('./style.css','utf-8')
 		response.end(`
 			ul li{
				list-style: none;
				line-height: 30px;
				margin-bottom: 10px;
				border: 1px solid #ccc;
				cursor:pointer;
			}
			.btn{
				line-height: 50px;
				text-align: center;
			}
			#btn{
				border: 1px solid #E27272;
				color: #E27272;
				border-radius: 3px;
				padding: 10px 20px;
				cursor: pointer;
			}
			.hover{
			  background: green;
			  color: #fff;
			}
 		`)
 	}else if(path === '/taskmain12'){
 		response.setHeader('Content-Type','text/javascript')
 		// var jsString = fs.readFileSync('./taskmain12.js','utf-8')
 		response.end(`
 			var b = document.getElementById('btn')
			var ul = document.getElementsByTagName('ul')[0]
			var page = 4
			b.onclick = function(){
				ajaxGet('/page-' + page, function(result){
					var liList = document.getElementsByTagName('li')
			 		var liLength = liList.length + 1
			 		for(var i = 0; i<5; i++){
			 			var li = document.createElement('li')
			 			var number = liLength + i
						li.textContent = '内容' + number
						ul.appendChild(li)
			 		}
				},function(xhr){
					console.log('fail')
					console.log(xhr)
				})
			}
			function ajaxGet(path, successFn, errorFn){
				var httpRequest = new XMLHttpRequest()
				httpRequest.open('GET', path)
				httpRequest.onreadystatechange = function(){
					if(httpRequest.readyState === XMLHttpRequest.DONE){
						if(httpRequest.status === 200){
							successFn()
						}else{
							errorFn(httpRequest)
						}
					}
				}
				httpRequest.send()
				return httpRequest
			}
 		`)
 	}else if(path === '/page-4'){
 		response.setHeader('Content-Type', 'text/javascript;charset="utf-8"')
 		response.end(`
 			var liList = document.getElementsByTagName('li')
 			console.log(liList.length)
 		`)
 		
 	}else{
 		response.statusCode = 404
 		response.end('Nothing')
 	}


	// 代码结束，下面不要看
	console.log(method + ' ' + request.url)
})

server.listen(port)
console.log('监听 ' + port + ' 成功，请打开 http://localhost:' + port)
