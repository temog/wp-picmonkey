function takeScreenshot(ext, quality) {

    chrome.tabs.captureVisibleTab(null, function(strImg) {

		if(! strImg){
			return false;
		}

		chrome.tabs.create({url: "newTab.html"}, function(tab){
			var param = {
				_apikey: localStorage.picwp_api_key,
				_export: localStorage.picwp_export,
				_out_format: ext,
				_out_quality: quality,
				_import: strImg
			}

			chrome.tabs.sendRequest(tab.id, param, function(){});
		});
    });
}

function movePicMonkey(ext, quality){
	chrome.tabs.create({url: "newTab.html"}, function(tab){
		var param = {
			_apikey: localStorage.picwp_api_key,
			_export: localStorage.picwp_export,
			_out_format: ext,
			_out_quality: quality
		}

		chrome.tabs.sendRequest(tab.id, param, function(){});
	});

}
