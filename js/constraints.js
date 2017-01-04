window.devices = (function(){

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
		audio:false
	};
	function hasUserMedia() {
		return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
			navigator.mozGetUserMedia || navigator.msGetUserMedia);
	};
	function mobileDimension(){
		if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i.test(navigator.userAgent)){
			console.log("-->Mobile Detected");
			return streamUserConstraints = {
				video:true,
				video:{mandatory:{
					minWidth: 480,
					minHeight: 320,
					maxWidth: 1024,
					maxHeight:768
				}},
				audio: true
			}
		} else {return streamUserConstraints}
	}
	function hasRTCPeerConnection(){
		window.RTCPeerConnection = window.RTCPeerConnection || 
			window.webkitRTCPeerConnection || 
			window.mozRTCPeerConnection;
		return !!window.RTCPeerConnection;
	}
	return{"mobileDimension": mobileDimension,
			"hasUserMedia": hasUserMedia,
			"hasRTCPeerConnection" : hasRTCPeerConnection
		}
})();