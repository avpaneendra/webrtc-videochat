window.rtcData = (function(){
	function hasRTCPeerConnection(){
		window.RTCPeerConnection = window.RTCPeerConnection || 
			window.webkitRTCPeerConnection || 
			window.mozRTCPeerConnection;
		return !!window.RTCPeerConnection;
	}
	return {"hasRTCPeerConnection" : hasRTCPeerConnection}

})();