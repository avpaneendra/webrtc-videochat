window.frontOptions = (function(){
	
	function screenShot(){
		var video = document.querySelector("#local"),
			canvas = document.querySelector("canvas");
		canvas.height = video.clientHeight;
		canvas.width = video.clientWidth;
		var context = canvas.getContext("2d");
		context.drawImage(video,0,0);

	}
	return {"screenShot": screenShot}
})();