
window.mainrtc.connectionP2P = (function(){
	var message = {
		supportRTC : "Your browser doesn't support WEBRTC",
		supportMedia : "Browser doesn't support getUserMedia",
		supportCapture : "Raised an error when capturing camera"
	};
	var videoRemote = document.querySelector('#remote'), videoLocal = document.querySelector('#local'),
		remoteConnection, localConnection, stream;
	var streamUserConstraints = mainrtc.devices.mobileDimension(), streaming = false, connectedUser;

	function startConnection(){
		if (mainrtc.devices.hasUserMedia()){
			navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

			navigator.getUserMedia(streamUserConstraints, function(myStream){
				streaming = true;
				stream = myStream;
				videoLocal.srcObject = stream;
				mainrtc.devices.hasRTCPeerConnection() ? setupPeerConnection(stream) : alert(message.supportRTC);
				}, function(err){	console.log(message.supportCapture)});
		} else {
			alert(message.supportMedia);
		}
	}
	function setupPeerConnection(stream){

		//configuration of network for best path;
		var configuration = {iceServers:[{"url":"stun:stun.l.google.com:19302"}]};

		//entry point for WEBRTC API (initialize a connection, connect to peers, and attach media stream)
		localConnection = new RTCPeerConnection(configuration);

		//Addstream
		localConnection.addStream(stream);
		localConnection.onaddstream = function(event){
			//videoRemote.srcObject = event.stream;
			videoRemote.src = window.URL.createObjectURL(event.stream);
			videoRemote.play();
		};
		//Ice Candidate Listener
		localConnection.onicecandidate = function(event){
			if(event.candidate){
				console.log("onicecandidate fired: ", event.candidate);
				send(JSON.stringify({type:'candidate', candidate: event.candidate }));
			}
		};

	}
	function startPeerConnection(callee) {
		connectedUser = callee;
		localConnection.createOffer().then(function(offer){
			console.log("offer: " + offer);
			send(JSON.stringify({type: 'offer', offer: offer, name: callee}));
			localConnection.setLocalDescription(offer);
		}).catch(function(e){
			console.log(e + " create Offer error");
		});
	}
	function onCandidate(candidate){
		localConnection.addIceCandidate(new RTCIceCandidate(candidate));
	}
	function onOffer(offer, caller) {
		console.log(offer);
		connectedUser = caller;
		localConnection.setRemoteDescription(new RTCSessionDescription(offer));

		localConnection.createAnswer().then(function(answer){
			console.log("answer: " + answer);
			localConnection.setLocalDescription(answer);
			send(JSON.stringify({type: 'answer', answer: answer, name: caller}));
		}).catch(function(e){
			console.log(e + " create Offer error");
		});
	}
	function onAnswer(answer){
		localConnection.setRemoteDescription(new RTCSessionDescription(answer));
	};
	function onLeave(){
		connectedUser = null;
		videoRemote.src = null;
		localConnection.close();
		localConnection.onicecandidate = null;
		localConnection.onaddstream = null;
		this.setupPeerConnection(stream);
		console.log("browser disconnect");
	}
	return {"startConnection" : startConnection,
		"startPeerConnection" : startPeerConnection,
		"setupPeerConnection" : setupPeerConnection,
		"onCandidate" : onCandidate,
		"onOffer" : onOffer,
		"onAnswer" : onAnswer,
		"onLeave" : onLeave
	};
})();
/*
 //remoteConnection = new webkitRTCPeerConnection(configuration);
 remoteConnection.onaddstream = function(event){
 remoteConnection.src = window.URL.createObjectURL(event.stream);
 };

 remoteConnection.onicecandidate = function(event){
 if(event.candidate){
 console.log("remote event.candidate: ",event.candidate);
 localConnection.addIceCandidate(new RTCIceCandidate(event.candidate));
 }
 };
 */
/*
 //Say to WEBRTC we want establish p2p connnection
 // connection.createOffer(offer) == SDP object. Logic of connection on physical level (codecs and etc)
 /*localConnection.createOffer(function(offer){
 console.log(offer);
 localConnecion.setLocalDescription(offer);
 remoteConnection.setRemoteDescription(offer);

 //callback for Node
 remoteConnection.createAnswer(function(offer){
 remoteConnection.setLocalDescription(offer);
 localConnection.setRemoteDescription(offer);
 });
 });

//Offer
localConnection.createOffer().then(function(offer){
	return localConnection.setLocalDescription(offer);
}).then(function(){
	return remoteConnection.setRemoteDescription(localConnection.localDescription)
}).then(function(){
	return remoteConnection.createAnswer();
}).then(function(answer){
	return remoteConnection.setLocalDescription(answer)
}).then(function(){
	return localConnection.setRemoteDescription(remoteConnection.localDescription)
});
*/

/*
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
} else {
	console.log("mediaDevices doesn't support")
}
*/










