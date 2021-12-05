<?php require $_SERVER['DOCUMENT_ROOT'] . '/login/index.php'; ?><!DOCTYPE html>
<html>
<head>
	<title>Brightspot Console v5.0</title>
	<meta charset="utf-8">
	<script type="text/javascript" src="main.js"></script>
	<script type="text/javascript" src="unpkg_com_jso_dist_jso.js"></script>
	<script type="text/javascript" src="blogger_api_v3.js"></script>
	<style>
		#newp_panel {
			margin: 10px;
			padding: 10px;
			border: 1px solid #CCC;
			display: inline-block;
		}
		#post_panel {
			margin: 10px;
			padding: 10px;
			border: 1px solid #CCC;
			height: 150px;
			overflow-y: scroll;
			display: inline-block;
			width: 700px;
		}
		#edit_panel {
			margin: 10px;
			padding: 10px;
			border: 1px solid #CCC;
			display: inline-block;
		}
		.label {
			width: 700px;
			text-align: left;
			height: 30px;
		}
		.json_txt {
			float: right;
			width: 500px
		}
		.son_btn {
			float: right;
		}
		input[readonly] {
			border: 1px solid #FFF;
		}
		textarea {
		}
	</style>
</head>
<body>


<div id="newp_panel">
	<div class="label">title		<input class="json_txt" type="text" id="json.new.title"></div>
	<div class="label">content		<input class="json_txt" type="text" id="json.new.content"></div>
	<div class="label">				<input class="json_btn" type="button" id="json.make" value="Create" onclick="makePost(this)"></div>
</div>

<div id="post_panel">Updateing List...</div>

<div id="edit_panel">
	<div class="label">json.id		<input class="json_txt" type="text" id="json.id" readonly></div>
	<div class="label">blog.id		<input class="json_txt" type="text" id="json.blog.id" readonly></div>
	<div class="label">url			<input class="json_txt" type="text" id="json.url" readonly></div>
	<div class="label">published	<input class="json_txt" type="text" id="json.published" readonly></div>
	<div class="label">updated		<input class="json_txt" type="text" id="json.updated" readonly></div>
	<div class="label">title		<input class="json_txt" type="text" id="json.title"></div>
	<div class="label">content		<textarea class="json_txt" rows="10" id="json.content"></textarea></div>
	<div class="label">				<input class="json_btn" type="button" id="json.delete" value="Delete" onclick="deletePost(this)"></div>
	<div class="label">				<input class="json_btn" type="button" id="json.save" value="Save" onclick="savePost(this)"></div>
</div>

<script type="text/javascript">

var l;

function loadPostList() {
	id('post_panel').innerHTML = 'Updateing List...'
	var x = '';
	for(i = 0; i < l['items'].length; i++) {
		x += '<div class="item" onclick="loadPost('+ i +')">'+ l['items'][i]['title'] +'</div>';
	}
	id('post_panel').innerHTML = x;
}

function loadPost(k) {
	id('json.id').value			= l['items'][k]['id'];
	id('json.blog.id').value	= l['items'][k]['blog']['id'];
	id('json.url').value		= l['items'][k]['url'];
	id('json.published').value	= l['items'][k]['published'];
	id('json.updated').value	= l['items'][k]['updated'];
	id('json.title').value 		= l['items'][k]['title'];
	id('json.content').value 	= decrypt(l['items'][k]['content']);

	id('json.content').scrollTop = 0;
	id('json.save').lang = k;
	id('json.delete').lang = k;
}

function savePost(obj) {
	editBlogPost(
		id('json.blog.id').value,
		id('json.id').value,
		id('json.title').value,
		encrypt(id('json.content').value),
		obj
	);

}

function makePost(obj) {
	addBlogPost(
		id('json.blog.id').value,
		id('json.new.title').value,
		encrypt(id('json.new.content').value),
		obj
	);
}

function deletePost(obj) {
	deleteBlogPost(
		id('json.blog.id').value,
		id('json.id').value,
		obj
	);
}

















window.onload = function() {
	l = JSON.parse(getPostList('439345521273485368'));
	loadPostList();
	loadPost(0);
}

</script>








</body>
</html>