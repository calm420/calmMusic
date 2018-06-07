function Bridge() {
}
Bridge.cb = {};
Bridge.callHandler=function(data,callback,errorcallback){
	 try{
		var cbId = 'cb_'+new Date().getTime();
		var ebId = 'eb_'+new Date().getTime();
		if(callback != null && typeof(callback)!="undefined"){
			data.callbackId = cbId;
			Bridge.cb[cbId] = callback;
		}
		data.errorbackId = ebId;
		Bridge.cb[ebId] = function(err){
			if(errorcallback != null && typeof(errorcallback) != "undefined"){
				errorcallback(err);
			}
		};
		if(!Bridge.isPhone()){
			if(!Bridge.isInitedWindowMessage){
				Bridge.initWindowMessage();
			}
			if(typeof(data) == "object"){
				data.windowName = window.name;
				//window.parent.postMessage(JSON.stringify(data),'*');
				window.top.postMessage(JSON.stringify(data),'*');
			}else{
				var dt = JSON.parse(data);
				dt.windowName = window.name;
				//window.parent.postMessage(JSON.stringify(dt),'*');
				window.top.postMessage(JSON.stringify(dt),'*');
			}
		}else{
			if(typeof(data) == "object"){
				phone.callHandler(JSON.stringify(data));
			}else{
				phone.callHandler(data);
			}
		}
	 }catch(err) {
		 if(errorcallback != null && typeof(errorcallback) != "undefined"){
		    //在此处理错误
			errorcallback(err);
		 }
	 }
};

Bridge.isPhone = function(){
	var sUserAgent = navigator.userAgent.toLowerCase();
	var isIphone = sUserAgent.indexOf("iphone") > 0 || sUserAgent.indexOf("ipad") > 0 || sUserAgent.indexOf("ipod") > 0;
	var isAndroid = sUserAgent.indexOf("android") > 0 ;
	return isIphone||isAndroid;
};

Bridge.isInitedWindowMessage = false;

Bridge.initWindowMessage = function(){
	if(!Bridge.isInitedWindowMessage){
		window.addEventListener('message',function(e){
			if(e.data != null){
				var data = JSON.parse(e.data);
				var callbackId = data.callbackId;
				if(callbackId != null && typeof(callbackId) != "undefined"){
					var params = data.params;
					var excute = Bridge.cb[callbackId];
					if(excute != null && typeof(excute) != "undefined"){
						excute(params);
					}
				}
			}
	    },false);
		Bridge.isInitedWindowMessage = true;
	}
};
Bridge.setShareAble = function(shareAble){
	setTimeout(function(){
		var data = {'method':'setShareAble','shareAble':shareAble+''};
		Bridge.callHandler(data,null,function(err){
			console.log(err);
		});
	}, 500);
};
Bridge.setRefreshAble = function(refreshAble){
	setTimeout(function(){
		var data = {'method':'setRefreshAble','refreshAble':refreshAble+''};
		Bridge.callHandler(data,null,function(err){
			console.log(err);
		});
	}, 350);
};

Bridge.setBackAsk = function(ask,askInfo){
	var data = {'method':'setBackAsk','ask':ask,'askInfo':askInfo+''};
	Bridge.callHandler(data,null,function(err){
		console.log(err);
	});
};

if(!Bridge.isPhone()){
	document.onreadystatechange = function(){
		 if(document.readyState == "complete"){ //当页面加载状态为完全结束时进入 
			 var data = {};
			 data.method = 'setPanelTitle';
			 data.windowName = window.name;
			 data.title = document.title;
			 //window.parent.postMessage(JSON.stringify(data),'*');
			 window.top.postMessage(JSON.stringify(data),'*');
	     }
	};
};


