var sending = false;

$(function(){

	$("#ext").change(function(){
	   checkJpg();
	});

	$("#sendbutton").click(function(){
		takeScreenshot();
	});

	$(".movepicnik").click(function(){
		movePicMonkey();
	});

    if(! localStorage.picwp_api_key || ! localStorage.picwp_export ||
            ! localStorage.picwp_img_type || ! localStorage.picwp_quality){
        $("body").html(
            '<a id="moveOption">Please enter the setting</a>');

		$("#moveOption").click(function(){
			chrome.tabs.create({url: 'options.html'});
		});

        return false;
    }

    // set image ext
    $("#ext").val([localStorage.picwp_img_type]);

    //set jpg quality
    $("#quality").val([localStorage.picwp_quality]);

	// init jpg quality
	checkJpg();
});

function takeScreenshot() { 
    var ext= $("#ext");
    var quality = $("#quality");
    var sendbutton = $("#sendbutton");

    if(! validation()){
        return false;
    }

    //loading view
    $("#err").fadeOut();
    sendbutton.html('<div class="loading">' +
		'<img style="vertical-align:middle" src="loading.gif">' +
		' please wait...</div>');

	chrome.tabs.getSelected(null, function(tab) {
		if(! tab.url.match("^(http://)|(https://)")){
		   $("#err").html('This page can not be captured.').hide().fadeIn();
			return false;
		}
	});

    sending = true;
    chrome.extension.getBackgroundPage().takeScreenshot(
		ext.val(), quality.val());
}

function movePicMonkey() {
   var ext= $("#ext");
   var quality = $("#quality");

   if(! validation()){
       return false;
   }

   sending = true;
   chrome.extension.getBackgroundPage().movePicMonkey(
	   ext.val(), quality.val());
}

function validation(){
   if(sending){
       $("#err").html('please wait..').hide().fadeIn();
       return false;
   }

   return true;
}

function checkJpg() {
    var ext= $("#ext");
    var qlabel = $("#qlabel");
    var quality = $("#quality");

    if( ext.val() == 'jpg'){
        qlabel.css("display","block");
        quality.css("display","block");
    } else {
        qlabel.css("display","none");
        quality.css("display","none");
    }
}

