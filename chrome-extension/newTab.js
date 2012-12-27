chrome.extension.onRequest.addListener(
	function(req, sender, sendResponse) {
		$("input[name='_apikey']").val(req._apikey);
		$("input[name='_export']").val(req._export);
		$("input[name='_export']").val(req._export);
		$("input[name='_out_format']").val(req._out_format);
		$("input[name='_out_quality']").val(req._out_quality);

		if(req._import){
			$("form").append('<input type="hidden" name="_import" value="' +
				req._import + '">');
		}

		$("form").submit();
	}
);
