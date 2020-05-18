/// load modules 
const  express = require("express");

// instanitate the app
var app = express();

app.set('port', (process.env.PORT || 3000));

// app.use(function(req, res, next) {
//     res.setHeader("Content-Security-Policy", "default-src 'self'");
//     return next();
// });

// static
app.use(express.static(__dirname + '/public'));

//start the server
app.listen(app.get('port'), function() {
    console.log("listening to port")
});
