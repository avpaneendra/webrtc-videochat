
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












