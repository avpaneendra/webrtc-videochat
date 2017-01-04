function client_request(smth){
	console.log("want to append on site text "+smth);
}

sendServer(client_request);

function sendServer(client_request){
	console.log("giveng something to client");
	client_request("fuck_you");

}