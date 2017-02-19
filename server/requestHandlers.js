/**
 * Created by artem on 10/02/2017.
 */
function start(res){

    console.log("function start");
    res.send("Hello Start");
}

function upload(res){
    console.log("handler load");
    res.send("Hello upload");

}
exports.start = start;
exports.upload = upload;
