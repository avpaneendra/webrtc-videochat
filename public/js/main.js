/*///
//http://stackoverflow.com/questions/4538269/adding-removing-items-from-json-data-with-jquery
//http://iswebrtcreadyyet.com/
http://caniuse.com/#search=getusermedia
https://www.w3.org/TR/webrtc/#dom-rtcpeerconnection-createoffer
*///
var message = {
	supportRTC : "Your browser doesn't support WEBRTC",
	supportMedia : "Browser doesn't support getUserMedia",
	supportCapture : "Raised an error when capturing camera"
};
var videoRemote = document.querySelector('#remote'), videoLocal = document.querySelector('#local'),
	remoteConnection, localConnection;

var streamUserConstraints = window.devices.mobileDimension();
var streaming = false;

if (window.devices.hasUserMedia()){
	navigator.getUserMedia = navigator.webkitGetUserMedia
	|| navigator.mozGetUserMedia || navigator.msGetUserMedia;

	navigator.getUserMedia(streamUserConstraints, function(stream){
		
		streaming = true;
		//url of stream
		//videoLocal.src = URL.createObjectURL(stream);
		videoLocal.srcObject = stream; 
		window.devices.hasRTCPeerConnection() ? startPeerConnection(stream) : alert(message.supportRTC);
		}, function(err){	console.log(message.supportCapture)});

} else {
	alert(message.supportMedia);
}

function startPeerConnection(stream){

	//configuration of network for best path;
	var configuration = {iceServers:[{"url":"stun:stun.l.google.com:19302"}]};

	//entry point for WEBRTC API (initialize a connection, connect to peers, and attach media stream)
	localConnection = new webkitRTCPeerConnection(configuration);
	remoteConnection = new webkitRTCPeerConnection(configuration);
	
	//Addstream
	localConnection.addStream(stream);
	remoteConnection.onaddstream = function(event){
		remoteConnection.src = window.URL.createObjectURL(event.stream);
	};

	localConnection.onicecandidate = function(event){
		if(event.candidate){
			console.log("local event.candidate: ",event.candidate);
			remoteConnection.addIceCandidate(new RTCIceCandidate(event.candidate));
		}
	};
	remoteConnection.onicecandidate = function(event){
		if(event.candidate){
			console.log("remote event.candidate: ",event.candidate);
			localConnection.addIceCandidate(new RTCIceCandidate(event.candidate));
		}
	};
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
	});*/

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

}


document.querySelector("#capture").addEventListener("click",function(event){
	if(streaming) window.frontOptions.screenShot();
})

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
















