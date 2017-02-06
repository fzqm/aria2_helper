


chrome.browserAction.onClicked.addListener(function (tab) {
	// No tabs or host permissions needed!
	console.log('Turning ' + tab.url + ' red!');

	var cookie = "cookie: ";
	chrome.cookies.getAll({
		path: "/",
		domain: ".apiv.ga"
	}, function (cookies) {
		for (var i in cookies) {
			cookie = cookie + (cookies[i].name + "=" + cookies[i].value + ";");
			console.log(cookies[i]);
		}

		console.log('aria2 download start : \n \t cookie :%s \n\t file :%s', cookie, test.videoURL);
		downloadByAria2(test.videoURL, cookie, test.videoName);

		chrome.notifications.create({
			iconUrl: chrome.runtime.getURL('images/logoBig.png'),
			title: '',
			type: 'basic',
			message: '下载任务开始！',
			eventTime: Date.now() + 5 * 1000
		});
	});
	//console.log('test:'+JSON.stringify(test));


	/*   chrome.tabs.executeScript({
	code: 'document.body.style.backgroundColor="red"'
	}); */
	chrome.tabs.query({ // 查找当前tab
		active: true,
		currentWindow: true
	}, function (tabs) { // 发送消息到当前tab,添加书签相关dom节点
		console.log('tab id :' + tabs[0].id);
		chrome.tabs.sendMessage(tabs[0].id, {
			type: 'add-bookmark-cb'

		});
		console.log('send msg ..');
	});
});

var test = {
	videoURL: "",
	cookie: "",
	videoName: ""

};

chrome.runtime.onMessage.addListener(function (request, sender, sendRequest) { // background返回的回调消息
	var videoURL = request.videoURL;
	var videoName = request.videoName;
	console.log('收到内容脚本消息:\n' + videoName + ':' + videoURL);

	test.videoURL = videoURL;
	//test.cookie = cookie ;
	test.videoName = videoName;

});
