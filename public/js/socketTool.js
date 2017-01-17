window.mainrtc.socketTool = (function(){
	function isJson(str) {
	    try {
	        JSON.parse(str);
	    } catch (e) {
	        return false;
	    }
	    return true;
	}
	function isInputCorrect(input){
		if(input === '') return false;
		return true;
	}
	return { "isJson" : isJson,
			"isInputCorrect" : isInputCorrect
			}
})();
