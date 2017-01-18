window.mainrtc.frontOptions = (function(){
	
	function screenShot(){
		var video = document.querySelector("#local"),
			canvas = document.querySelector("canvas");
		console.log(video.videoHeight  + " " + video.videoWidth);
		canvas.height = video.videoHeight;
		canvas.width = video.videoWidth;

		var context = canvas.getContext("2d");
		context.drawImage(video,0,0);

	}
	return { "screenShot" : screenShot}
})();