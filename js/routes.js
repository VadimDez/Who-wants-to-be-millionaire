/**
 * Created by Vadym on 16/12/14.
 */
module.exports = function (app) {

    // route to handle all angular requests
    app.get('*', function (req, res) {
        res.sendfile('./public/index.html'); // load public/index.html file
    });
};