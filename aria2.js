


function downloadByAria2(downloadURL, cookie, videoName) {

	var url = "http://192.168.123.1:6800/jsonrpc";
	var funcName = "aria2.addUri";

	videoName = videoName ? videoName + '.' + downloadURL.substr(-3) : "";

	//var cookie = "cookie: __cfduid=d065b94b22d05bd98b99b2a1c9f59095e1484273675; FTN5K=05b1c15e";
	var params = [[downloadURL], {
			"referer": "http://apiv.ga/magnet/56A4C089CB9B9786A17270F16713C7CCE89AEADF",
			"header": cookie,
			"User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36",
			"out": videoName
		}
	];

	/*  */
	var params = params && params.length ? btoa(JSON.stringify(params)) : undefined;
	url = url + '?method=' + funcName + '&id=webui&params=' + params;
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			// WARNING! Might be evaluating an evil script!
			console.log('aria2 response : %s', xhr.responseText);
			//...
		}
	}
	xhr.send();

}
