// json2csv = function(objArray){
//     var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
//     var line = '';
//     var result = '';
//     var columns = [];

//     var i = 0;
//     for (var j = 0; j < array.length; j++) {
//         for (var key in array[j]) {
//             var keyString = key + "";
//             keyString = '"' + keyString.replace(/"/g, '""') + '",';
//             if (!columns.includes(key)) {
//                 columns[i] = key;
//                 line += keyString;
//                 i++;
//             }
//         }
//     }

//     line = line.slice(0, -1);
//     result += line + '\r\n';

//     for (var i = 0; i < array.length; i++) {
//         var line = '';
//         for (var j = 0; j < columns.length; j++) {
//             var value = (typeof array[i][columns[j]] === 'undefined') ? '' : array[i][columns[j]];
//             var valueString = value + "";
//             line += '"' + valueString.replace(/"/g, '""') + '",';////change, to ;
//         }

//         line = line.slice(0, -1);
//         result += line + '\r\n';
//     }

//     return result;

// };



json2csv = function(objects) {
  //  var splitter = ',';
    var keys = ['subject', 'rt','success', 'trial_type','trial_index','time_elapsed','interaction','stimulus','key_press','choices','eyeData'];
    // var result = keys.join(splitter) + '\n';
    // for (var obj in objects) {
    //       result += keys.map(k => obj[k]).join(splitter) + '\n';
    // }
     var result = keys.join(";") + "\n";
     objects.forEach(function(obj){
        result += keys.map(k => obj[k]).join(";") + "\n";
     });
    return result;
}



/// load modules 
var  express = require("express");
// instanitate the app
var app = express();


//generate unique id
//var uuid = require('uuid');
 //folder id : uuid 
//var folderName=uuid.v1;
//subject id: uuid-trialnumber.csv

//const BoxSDK = require("box-node-sdk");
//const fs = require('fs');
const Dropbox = require("dropbox").Dropbox;
const fetch = require("node-fetch"); 
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
    dbx.filesCreateFolder({
        path:"/" +  foldername,
        autorename: false
    });
    dbx.filesUpload({
        path: "/" + foldername + "/" + filename,
        contents: content
    })
};


app.set('port', (process.env.PORT || 3000));

// static
app.use(express.static(__dirname + '/public'));
app.use(body_parser.json({limit:"50mb"}));



app.get("/", function(request,response) {
    response.render("index.html");
})
app.post("/",function(request,response)  {
    //convert json to csv
    request.setTimeout(0);
   // DATA_CSV = json2csv(request.body);
   data = request.body; 
   //console.log(typeof(data));
    //get filename from data;jsPsych.data.get().values()
   // var row = DATA_CSV.split("\n");
   // Id_index = row[0].split(";").indexOf('subject');
   id=data[0].subject;
   // id = row[1].split(",")[Id_index];
    id = id.replace(/'/g, "");
    var currentdate = new Date();
   // foldername=Number(currentdate);
    //row[0].split(",").indexOf("subject");//which
    filename = Number(currentdate) + ".json";
    foldername = id;
    data = JSON.stringify(data);
    saveDropbox(data,filename);
    //save the data
}
);


//start the server
app.listen(app.get('port'), function() {
    console.log("listening to port")
});


// var currentdate = new Date(); 
// console.log(Number(currentdate));

