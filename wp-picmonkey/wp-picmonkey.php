<?php
/*
Plugin Name: WP PicMonkey
Plugin URI: https://github.com/temog/wp-picmonkey
Description: auto-save from PicMonkey
Author: Temo
Version: 0.1
Author URI: http://temog.info/
*/

function picmonkeyUpload(){

	if(! is_admin() || ! isset($_POST['file'])){
		return;
	}

	$img = file_get_contents($_POST['file']);

	$extArray = explode(".", $_POST['file']);
	$index = count($extArray) - 1;
	$ext = $extArray[$index];
	$fileName = date("Y-m-d H.i.s") . "." . $ext;
	$fileContentType = mime_content_type($img);

	$action = admin_url('media-new.php');
	$nonce = wp_create_nonce('media-form');
	$param = array(
		'html-upload' => 'upload',
		'post_id' => '0',
		'_wpnonce' => $nonce,
	);

	// create http contents
	$boundary = "--".substr(md5(rand(0,32000)), 0, 10);

	$data = array(
		"--" . $boundary,
		"Content-Disposition: form-data; name=\"async-upload\"; ".
		"filename=\"" . $fileName . "\"",
		"Content-Type: " . $fileContentType,
		"",
		$img,
		""
	);

	$content = '';
	foreach($param as $k => $v){
		$content .= "--" . $boundary . "\r\n".
			"Content-Disposition: form-data; ".
			"name=\"" . $k . "\"\r\n\r\n".
			$v . "\r\n";
	}
	$content .= implode("\r\n", $data) . "--" . $boundary . "--";

	$headers = array(
		'Content-Type: multipart/form-data; boundary=' . $boundary
	);
	$cookie = 'Cookie: ';
	foreach($_COOKIE as $k => $v){
		$cookie .= $k . '=' . $v . ';';
	}

	array_push($headers, $cookie);

	$context = array("http" => array(
		"method" => "POST",
		"header" => implode("\r\n", $headers),
		"content" => $content,
	));

	$resp = file_get_contents($action, FALSE, stream_context_create($context));
}

add_action('init', 'picmonkeyUpload');
