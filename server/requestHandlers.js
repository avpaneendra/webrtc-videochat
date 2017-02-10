/**
 * Created by artem on 10/02/2017.
 */
function start(){
    console.log("function start");
    return "Hello Start";
}

function upload(){
    console.log("handler load");
    return "Hello upload";
}
exports.start = start;
exports.upload = upload;
