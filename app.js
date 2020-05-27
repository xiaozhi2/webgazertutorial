json2csv = function(objArray){
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var line = '';
    var result = '';
    var columns = [];

    var i = 0;
    for (var j = 0; j < array.length; j++) {
        for (var key in array[j]) {
            var keyString = key + "";
            keyString = '"' + keyString.replace(/"/g, '""') + '",';
            if (!columns.includes(key)) {
                columns[i] = key;
                line += keyString;
                i++;
            }
        }
    }

    line = line.slice(0, -1);
    result += line + '\r\n';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var j = 0; j < columns.length; j++) {
            var value = (typeof array[i][columns[j]] === 'undefined') ? '' : array[i][columns[j]];
            var valueString = value + "";
            line += '"' + valueString.replace(/"/g, '""') + '",';
        }

        line = line.slice(0, -1);
        result += line + '\r\n';
    }

    return result;

};




/// load modules 
const  express = require("express");
// instanitate the app
var app = express();


//const BoxSDK = require("box-node-sdk");
//const fs = require('fs');
const Dropbox = require("dropbox").Dropbox;
const fetch = require("node-fetch"); // 
const body_parser = require("body-parser");
//require("dotenv").config();

//var config = require('./config.json');


//var sdk = BoxSDK.getPreconfiguredInstance(config);
//var client = sdk.getAppAuthClient('enterprise');


// var sdk = new BoxSDK( {
//     clientID: '6y1owyz4gjq33hvjhknvl3ny6x6y685j',
//     clientSecret: 'FBbc8CMZKoj2wwcnw321txdZw3mSBc3V'
// });

// Create a basic API client, which does not automatically refresh the access token
//var client = sdk.getBasicClient('JKfo9lWcymRSQVTVZcjm97eAybxHzvNr');

 //var folderID = '0';
// Get your own user object from the Box API
// All client methods return a promise that resolves to the results of the API call,
// or rejects when an error occurs
//client.users.get(client.CURRENT_USER_ID)
   // .then(user => console.log('Hello', user.name, '!'))
  //  .catch(err => console.log('Got an error!', err));


	

// var saveBox = function(content, filename) {
//     client.files.uploadFile( folderID, filename,content)

// };

const dbx = new Dropbox( {
    accessToken: '1NerZyRuMNAAAAAAAAADDvCPTxkYeCXbUBxMv9GQotf7ON0PpKW2YxJBFYyd3FZL',
    fetch
});

saveDropbox = function(content,filename) {
    dbx.filesUpload({
        path: "/" + filename,
        contents: content
    })
};


app.set('port', (process.env.PORT || 3000));
// app.use(function(req, res, next) {
//     res.setHeader("Content-Security-Policy", "default-src 'self'");
//     return next();
// });

// static
app.use(express.static(__dirname + '/public'));
app.use(body_parser.json());



app.get("/", function(request,response) {
    response.render("index.html");
})
app.post("/experiment-data",function(request,response)  {
    //convert json to csv
    DATA_CSV = json2csv(request.body);
    //get filename from data;

    var row = DATA_CSV.split("\n");
    var currentdate = new Date();
    
    //row[0].split(",").indexOf("subject");//which
    filename = Number(currentdate) + ".csv";
    saveDropbox(DATA_CSV,filename);

    //save the data


}
);


//start the server
app.listen(app.get('port'), function() {
    console.log("listening to port")
});


var currentdate = new Date(); 
console.log(Number(currentdate));

