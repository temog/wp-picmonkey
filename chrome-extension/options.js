$(function(){

	$("#saveOptions").click(function(){
		 save_options();
	});

	$("#deleteOptions").click(function(){
		delete_options();
	});

    if(localStorage.picwp_api_key){
        $("#picnik_api_key").val(localStorage.picwp_api_key);
    }
    if(localStorage.picwp_export){
        $("#export").val(localStorage.picwp_export);
    }
    if(localStorage.picwp_passphrase){
        $("#passphrase").val(localStorage.picwp_passphrase);
    }
    if(localStorage.picwp_img_type){
        $("input[name='image_type']").val([localStorage.picwp_img_type]);
    } else {
        $("input[name='image_type']").val(['jpg']);
    }
    if(localStorage.picwp_quality){
        $("#quality").val([localStorage.picwp_quality]);
    } else {
        $("#quality").val(['8']);
    }
        
});

// Saves options to localStorage.picwp_
function save_options() {
    var api_key = $("#picnik_api_key").val();
    var _export = $("#export").val();
    var img_type = $("input[name='image_type']:checked").val();
    var quality = $("#quality").val();
    
    var err = '';
    if(!api_key){
        err += '<li>PicnMonkey API Key required.</li>';
    }
    if(!_export){
        err += '<li>callback URL required.</li>';
    } else if(! _export.match("^(http://)|(https://)")){
        err += '<li>plase input url callback URL from http:// or https://</li>';
    }
    if(!img_type){
        err += '<li>image type required.</li>';
    }
    if(img_type == 'jpg' && ! quality){
        err += '<li>image quality required.</li>';
    }

    if(err){
        $("#success").hide();
        $("#err").html("Error!! <ul>" + err + "</ul>").hide().fadeIn();
        return false;
    }

    localStorage.picwp_api_key = api_key;
    localStorage.picwp_export = _export;
    localStorage.picwp_img_type = img_type;
    localStorage.picwp_quality = quality;
    $("#err").hide();
    $("#success").html("saved").hide().fadeIn();
}

function delete_options(){
    $("#picnik_api_key").val('');
    $("#export").val('http://');
    $("#passphrase").val('');
    $("input[name='image_type']").val(['jpg']);
    $("#quality").val(['8']);

    localStorage.removeItem('picwp_api_key');
    localStorage.removeItem('picwp_export');
    localStorage.removeItem('picwp_passphrase');
    localStorage.removeItem('picwp_img_type');
    localStorage.removeItem('picwp_quality');

    $("#err").hide();
    $("#success").html("initialized").hide().fadeIn();
}

