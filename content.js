chrome.runtime.onMessage.addListener(function (request, sender, sendRequest) { // background返回的回调消息
	console.log('new message...' + request.type);

});

window.document.addEventListener("DOMContentLoaded", function (event) {
	console.log('DOM Content loaded , fuck !');
	//视频不存在
	if (!document.getElementById("logo")) {
		console.log('我擦，视频不存在~~~');
		return;
	}

	//无法在线播放
	if ($('.vjs-error-display').is(":visible")) {
		console.log('我擦，不能在线播放~~~');
		return;
	}

	var videoURL = $('#logo').attr('href');
	var videoName = getUrlParam('name');

	console.log('video url :' + videoURL);
	console.log('video name :' + videoName);
	if (videoURL && videoName) {
		chrome.runtime.sendMessage({
			videoURL: videoURL,
			videoName: videoName
		});
		console.log('content send message')
	}
});

//获取url中的参数
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if (r != null)
		return unescape(r[2]);
	return null; //返回参数值
}
