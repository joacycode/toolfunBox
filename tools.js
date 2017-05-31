/* tools.js */
/* create 2016 | update 2017-03-01 | Author xzhang*/
	//随机序列、数
	function serialString(n){
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
	// cookie相关
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
	//限制字数 规则：2Ch+En <=num
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
	//toast计时框
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
	// 浏览器回退添加事件
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










	