/* tools.js */
/* create 2016 | update 2017-03-01 | Author xzhang*/
/* 随机序列、数 */
	// 字母数字随机序列
	function serialStr(n){
		var randomArray=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",0,1,2,3,4,5,6,7,8,9],randomStr='';
		for(var i = 0;i < n;i++){
			randomStr += !!Math.round(Math.random())?(randomArray[Math.floor(Math.random()*34)]).toString().toUpperCase():randomArray[Math.floor(Math.random()*34)];	
		}	
		return randomStr;
	}
	//某范围内不重N个随机数
	function randNum (n) {
		var mins=2,maxs=32;
	    var arr = [],resArr = [];
	    if(!n || n > 31 || n < 1 || typeof n != "number") return false;
	    for(var j = mins ;j <= maxs; j++){
	        arr.push(j);
	    }   
	    for(var i = 0 ;i < n; i++){
	        resArr.push(arr.splice(Math.floor(Math.random()*(maxs-mins-i)),1)[0]);
	    }
	    return resArr;
	}
/* cookie相关 */
	function getCookie(name){//有参数获取单个cookie,无参数获取所有cookie数组
		var members = document.cookie.split(";"),trimArr = [];
		for(var i = 0;i < members.length;i++){
			trimArr.push(members[i].replace(/^\s*|\s*$/g,''));
		}
		if(name){
			for(var j = 0;j < trimArr.length;j++){
				if(name ===  trimArr[j].split("=")[0]) return trimArr[j].split("=")[1]
			}
        }else {
			return trimArr;
		}
	}
	function delCookie(name,domain,path){//有name删除单个值，无参数删除当前域名下多有cookie
		var date = new Date(),
			cval = getCookie(name),
			domain = domain || document.domain,
			path = path || "/";
		date.setTime(date.getTime()-10000);
		if(name){
			document.cookie = name + "=" + cval + "; expires="+ date.toGMTString()+"; domain="+domain+"; path="+path+";";
		}else{
			for(var i =0;i < cval.length;i++){
				document.cookie = cval[i]+"; expires="+ date.toGMTString()+"; domain="+domain+"; path="+path+";";
			}
		}	
	}
	function setCookie(name,val,exp,domain,path){//exp过期时间单位为天
		if(!name) return false;
		var date = new Date(),
			domain = domain || document.domain,
			exp = exp || 10000;
			path = path || "/",
			val = val || "";
		date.setTime(date.getTime()+exp*24*3600*1000);
		document.cookie = name+"="+val+"; expires="+date.toGMTString()+"; domain="+domain+"; path="+path+";"
	}
/* 含中文限制字数 规则：2Ch+En <=num */
	function limitCutter(str,num){
		var tnum = str.replace(/[^\x00-\xff]/g, '__').length,//中英文长度 中文算两个
	 	arrs = str.split(""),
	 	account = 0,realen = 0;
	 	if(tnum <= num) {return str;}
 		for(var i = 0;i < arrs.length;i++){
	 		if(account <= num){
	 			if((/[\u4e00-\u9fa5]/g).test(arrs[i])){
		 			account = account+2;
		 		}else{
		 			account++;
		 		}
                realen++;
	 		}
	 	}
 		return str.substring(0,realen-1)+"...";
	}
/* toast计时框 */
	// 	#box_toast{
	// 	width: 200px;
	// 	height: 45px;
	// 	line-height: 45px;
	// 	position: absolute;
	// 	top: 50%;
	// 	left: 50%;
	// 	z-index: 9999;
	// 	text-align: center;
	// 	background: rgba(0, 0, 0, 0.7);
	// 	color: #fff;
	// }
	function toast(conts,timer,boxId){
		var box_div = document.createElement("div"),box_parent;
		if(boxId){box_parent = document.getElementById(boxId);}else{ box_parent = document.getElementsByTagName("body")[0];}
		box_parent.style.position = "relative";
		box_div.innerHTML = conts;
		box_div.id = "box_toast";
		prependChild(box_div,box_parent);
		box_div.style.marginLeft = -box_div.offsetWidth/2+"px";
		box_div.style.marginTop =  -box_div.offsetHeight/2+"px";
		setTimeout(function(){
			box_parent.removeChild(box_div);
		}, timer);
	}

/* 原生工具延伸函数 */
	function prependChild(o,s){ 
		if(s.hasChildNodes()){ 
			s.insertBefore(o,s.firstChild); 
		}else{ 
			s.appendChild(o); 
		} 
	}
	function insertAfter(o,s){ 
		if(s.nextSibling!=null){ 
			s.parentNode.insertBefore(o,s.nextSibling); 
		}else{ 
			s.parentNode.appendChild(o); 
		} 
	}
	//扩展，去除前后空格
	String.prototype.trim=function() {
	    return this.replace(/(^\s*)|(\s*$)/g,'');
	}
/*  浏览器回退添加事件 */
	// 在IE中必须得有这两行
	// window.history.pushState('forward', null, '#'); 
	// window.history.forward(1);
	function backEvent(callback){//回退事件监听 
		if (window.history && window.history.pushState) {
			pushHistory(); 
			window.addEventListener("popstate", function(e) { 
				callback();
				window.history.go(-1);
			}, false); 
		}
		function pushHistory() { 
			window.history.pushState({ 
				title: "title", 
				url: "#"
			}, "title", "#"); 
		} 
	}

//动态加载JS文件
function loadScript(src, callback) {
	//生成新script
	var newScript = document.createElement('script');
	newScript.type = 'text/javascript';
	newScript.src = src;
	document.getElementsByTagName('head')[0].appendChild(newScript);
	//判断是否加载完成
	if (callback && typeof callback === 'function') {
		if (window.attachEvent) {//ie
			newScript.onreadystatechange = function () {
				if (newScript && (newScript.readyState == "loaded" || newScript.readyState == "complete")) {
					newScript.onreadystatechange = null;
					callback();
				}
			}
		} else {
			newScript.onload = function () {
				newScript.onload = null;
				callback();
			}
		}
	}
}
//动态加载CSS文件
function loadStyle(src,_id){
	if( _id && document.getElementById(_id) ){ return }
	var Head = document.getElementsByTagName('head')[0];
	var css = document.createElement('link');
	if(_id) {css.id = _id;}
	css.rel = 'stylesheet';
	css.href = src;
	var styleEl = Head.getElementsByTagName('style');
	(styleEl.length > 0) ?Head.insertBefore(css,styleEl[0]):Head.appendChild(css);
}

//判断是否是大陆手机
function isMobile( str ){
	var mobileReg = /^1[3,5,7,8]\d{9}$/; //手机号码正则
	return mobileReg.test(str);
}

//判断是否邮箱
function isEmail( str ){
	var emailReg = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]{1,4}$/; //邮箱校检正则
	return emailReg.test(str);
}
//对象继承
function extend(deep,target,source){
	for( var key in source){
			var copy = source[key];
			if( deep && copy instanceof Array){
				target[key] = extend(deep,[],copy)
			}else if(deep && copy instanceof Object && typeof copy != 'function'){
				target[key] = extend(deep,{},copy)
			}else if(deep && typeof copy == 'string' && copy !=""){
				target[key] = copy;
			}else if(deep && copy !=""){
				target[key] = copy;
			}
		}
		return target;
}
//格式化ajax参数
function formateParams(data){
	var arr = [];
	for (var key in data){
		arr.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
	}
	return arr.join('&');
}
// 添加事件
function addEvents(target, type, func) {
		if( !target ){ return }
    if (target.addEventListener){    //非ie 和ie9
        target.addEventListener(type, func, false);
    }else if (target.attachEvent){   //ie6到ie8
        target.attachEvent("on" + type, func);
    }
}
function remvoeEvents(target,type,func){
	if( !target ) return;
	if (target.removeEventListener){    //非ie 和ie9
    target.removeEventListener(type, func, false);
  }else if (target.detachEvent){   //ie6到ie8
    target.detachEvent("on" + type, func);
  }
}
//检测数组中是否包含元素X
function isInAry(arr,x){
	for( var i in arr){
		if(arr[i] == x){
			return true;
		}
	}
	return false;
}
//根据ID获取元素
function $G(id){
	if( !id ){
		return false;
	}
	return document.getElementById(id);
}
//检测obj是否含有class
function hasClass(obj,clas){
	return obj.className.match(new RegExp('(\\s|^)' + clas + '(\\s|$)'));
}
//删除class中的clas
function removeClass(obj,clas){
	if( !obj ) return false;
	if(hasClass(obj,clas)){
		var reg = new RegExp('(\\s|^)' + clas + '(\\s|$)');
     obj.className = obj.className.replace(reg, '');
	}
}
//给obj添加class
function addClass(obj,clas){
	if( !obj ) return false;
	if(!hasClass(obj,clas)) obj.className +=' ' + clas;
}

function setAttr(obj,name,value){
	if( !obj ) return;
	obj.setAttribute(name,value);
}
function getAttr(obj,name){
	if( !obj ) return;
	return obj.getAttribute(name);
}
function setHtml(obj,html){
	if( !obj ) return;
	obj.innerHTML = html;
}
function getValue(obj){ //获取对象obj的value值
	if( !obj ) return;
	return obj.value;
}
function setValue( obj,val){ //设置元素的value值
	if( !obj ) return;
	obj.value = val;
}
function _jsonp(options){
	// _jsonp({
	// 	url:'',
	// 	dataType: 'jsonp',
	// 	data:{},
	// 	success:function(){},
	// 	fail:function(){}:
	// })
	var options = options || {};
	options.callback = 'jsonpCallback';
	if (!options.url || !options.callback){
		throw new Error('参数不完整');
	}
	options.time = 5*1000;

	//创建script标签
	var callbackName = 'jsonp_' + (new Date()).getTime() + (Math.floor(Math.random()*9999+1)).toString();
	var Head = document.getElementsByTagName('head')[0];
	options.data[options.callback] = callbackName;
	var params = formateParams(options.data);
	var os = document.createElement('script');
	Head.appendChild(os);

	//创建jsonp回调函数
	window[callbackName] = function(json){
		Head.removeChild(os);
    clearTimeout(os.timer);
    window[callbackName] = null;
    options.success && options.success(json);
	}

	//发送请求
  os.src = options.url + '?' + params;
  //超时处理
  if (options.time) {
      os.timer = setTimeout(function () {
          window[callbackName] = null;
          Head.removeChild(os);
          options.fail && options.fail({ message: "超时" });
      }, options.time);
  }
}
// 元素是否在屏幕范围内
function isOnScreen(el){
    var viewport = {
        top : document.body.scrollTop,
        left : document.body.scrollLeft
    };
    var bounds = {
        top :  el.offsetTop,
        left : el.offsetLeft
    };
    viewport['right'] = viewport.left + window.screen.width;
    viewport['bottom'] = viewport.top + window.screen.height;
    bounds['right']= bounds.left + el.style.width;
    bounds['bottom'] = bounds.top + el.style.height;
    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));       
}



	