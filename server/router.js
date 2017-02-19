/**
 * Created by artem on 10/02/2017.
 */
function route(handle, pathname, res){
    if(typeof handle[pathname] === 'function') return handle[pathname](res);
    else {
        console.log("No request handler found for " + pathname);
        res.send("404 Not found");
    }
}

exports.route = route;
