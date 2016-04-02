//http://stackoverflow.com/questions/4538269/adding-removing-items-from-json-data-with-jquery

var streamUserConstraints = {
	video:true,
	video:{mandatory:{
		minAspectRatio: 1.777,
		maxAspectRatio: 1.778
			},
		optional:[
			{maxWidth: 640},
			{maxHeight:480}
			]
	},
	audio:true};


if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i.test(navigator.userAgent)){
	console.log("-->Mobile Detected");
	streamUserConstraints = {
		video:true,
		video:{mandatory:{
			minWidth: 480,
			minHeight: 320,
			maxWidth: 1024,
			maxHeight:768
		}},
		audio: true
	}
}
	
function hasUserMedia() {
	return !!(navigator.getUserMedia || navigator.webkitGetUserMedia
	|| navigator.mozGetUserMedia || navigator.msGetUserMedia )
};

if (hasUserMedia()){
	console.log("-->getUserMedia Detected");
	navigator.getUserMedia = navigator.webkitGetUserMedia
	|| navigator.mozGetUserMedia || navigator.msGetUserMedia;
	console.log(navigator.getUserMedia)
	navigator.getUserMedia(streamUserConstraints, function(stream){
		var video = document.querySelector('video');
		video.src = window.URL.createObjectURL(stream);
	}, function(err){console.log("raised an error when capturing")});
}
else {alert("Browser doesn't support getUserMedia")}

//navigator.mediaDevices.enumerateDevices().then(function(MediaDeviceInfo) { ... })


function hasDevices(){
	return !!(navigator.mediaDevices.enumerateDevices || navigator.mediaDevices);
}

if(hasDevices()){
	console.log("-->devices Detected");
	navigator.mediaDevices.enumerateDevices().then(function(devices) {
		devices.forEach(function(device) {
			console.log(device.kind + ": " + device.label + ", " + device.deviceId);
		});
	})
} else {console.log("mediaDevices doesn't support");}















