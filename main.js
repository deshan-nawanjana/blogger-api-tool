function id(x) {return document.getElementById(x);}

function decrypt(data) {
	var data = data.split('>')[1].split('<')[0].split(',');
	var x = '';
	for(i = 0; i < data.length; i++) {
		x += String.fromCharCode((parseInt(data[i]) - 97) /7) ;
	}
	return x;
}

function encrypt(data) {
	var x = '';
	for(i = 0; i < data.length; i++) {
		x += ((data.charCodeAt(i) * 7) + 97) + ',';
	}
	return '<div id="posxXen">'+ x.substr(0, x.length - 1) +'</div>';
}