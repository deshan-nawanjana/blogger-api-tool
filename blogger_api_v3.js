var ClientID = '679367498064-m7lphpm29a4rjq1h1b6jen05l1rcr6ja.apps.googleusercontent.com';
var APIKey = 'AIzaSyBCEKnZF06MkTto85NJfrrzPnKY-9t15mY';

function getClient() {
    let client = new jso.JSO({
        providerID: "google",
        client_id: '679367498064-m7lphpm29a4rjq1h1b6jen05l1rcr6ja.apps.googleusercontent.com',
        redirect_uri: 'http://127.0.0.1/v5/engine/post_editor/',
        authorization: "https://accounts.google.com/o/oauth2/auth",
        scopes: { request: ["https://www.googleapis.com/auth/blogger"] }
    });
    return client;
}

function getBlogInfo(BlogID) {
	var rqURL = 'https://www.googleapis.com/blogger/v3/blogs/' + BlogID + '?key=' + APIKey + '&t=' + Date.now();
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", rqURL, false);
	xhttp.send();
	return xhttp.responseText;
}

function getPostList(BlogID) {
	var rqURL = 'https://www.googleapis.com/blogger/v3/blogs/'+ BlogID +'/posts?key=' + APIKey + '&t=' + Date.now();
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", rqURL, false);
	xhttp.send();
	return xhttp.responseText;
}

function editBlogPost(BlogID, PostID, PostTitle, PostData, obj) {
    obj.setAttribute('value','Saving...');
    obj.setAttribute('disabled','true');

    let client = getClient();
    client.callback();
    client.getToken()
        .then((token) => {
            var xhttp = new XMLHttpRequest();
            xhttp.open("PUT", 'https://www.googleapis.com/blogger/v3/blogs/'+ BlogID +'/posts/'+ PostID +'?key=' + APIKey, false);
            xhttp.setRequestHeader("Authorization", 'Bearer ' + token['access_token']);
            xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhttp.send(JSON.stringify({ "title": PostTitle, "content": PostData}));

            var newObj = JSON.parse(xhttp.responseText);
            l['items'][parseInt(obj.lang)] = newObj;

            obj.setAttribute('value','Save');
            obj.removeAttribute('disabled');

            loadPostList();
        })
}

function addBlogPost(BlogID, PostTitle, PostData, obj) {
    obj.setAttribute('value','Creating...');
    obj.setAttribute('disabled','true');

    let client = getClient();
    client.callback();
    client.getToken()
        .then((token) => {
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", 'https://www.googleapis.com/blogger/v3/blogs/'+ BlogID +'/posts/?key=' + APIKey, false);
            xhttp.setRequestHeader("Authorization", 'Bearer ' + token['access_token']);
            xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhttp.send(JSON.stringify({ "title": PostTitle, "content": PostData}));

            var newObj = JSON.parse(xhttp.responseText);
            l['items'].push(newObj);

            for(i = l['items'].length - 1; i > 0; i--) {
                l['items'][i] = l['items'][i - 1]
            }

            l['items'][0] = newObj;

            obj.setAttribute('value','Create');
            obj.removeAttribute('disabled');

            id('json.new.title').value = '';
            id('json.new.content').value = '';

            loadPostList();
        })
}

function deleteBlogPost(BlogID, PostID, obj) {
    obj.setAttribute('value','Deleting...');
    obj.setAttribute('disabled','true');

    let client = getClient();
    client.callback();
    client.getToken()
        .then((token) => {
            var xhttp = new XMLHttpRequest();
            xhttp.open("DELETE", 'https://www.googleapis.com/blogger/v3/blogs/'+ BlogID +'/posts/'+ PostID +'?key=' + APIKey, false);
            xhttp.setRequestHeader("Authorization", 'Bearer ' + token['access_token']);
            xhttp.send();

            var resp = xhttp.responseText;
            if(resp == '') {
                l['items'].splice(parseInt(obj.lang), 1);
            }

            id('json.id').value         = '';
            id('json.blog.id').value    = '';
            id('json.url').value        = '';
            id('json.published').value  = '';
            id('json.updated').value    = '';
            id('json.title').value      = '';
            id('json.content').value    = '';

            id('json.save').lang = '';
            id('json.delete').lang = '';

            obj.setAttribute('value','Delete');
            obj.removeAttribute('disabled');

            loadPostList();
        })
}

