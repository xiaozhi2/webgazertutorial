/// load modules 
var  express = require("express");
// instanitate the app
var app = express();
const Dropbox = require("dropbox").Dropbox;
const fetch = require("node-fetch"); 
const body_parser = require("body-parser");


const dbx = new Dropbox( {
    accessToken: '1NerZyRuMNAAAAAAAAADcM_4pe_BhnJ7WYqApduLh_MxBEfEs_fmLKgNE-QY9RZ7',
    fetch
});



saveDropbox = function(content, filename, foldername) {
    return dbx.filesGetMetadata({
        path:"/" +  foldername,
    }).catch(err => {
  //      console.log(err['error']['path'])
        if (err.error.error.path['.tag'] == 'not_found') {
            return dbx.filesCreateFolder({
                path:"/" +  foldername,
                autorename: false,
            });
        } else {
            throw err;
        }
    }).then(()=> {
        return dbx.filesUpload({
            path: "/" + foldername + "/" + filename,
            contents: content
        });
    });
};


app.set('port', (process.env.PORT || 2000));

// static
app.use(express.static(__dirname + '/public'));
app.use(body_parser.json({limit:"50mb"}));



app.get("/", function(request,response) {
    response.render("index.html");
})
app.post("/",function(request,response)  {
    request.setTimeout(0);
   data = request.body; 
   id=data[0].subject;
    id = id.replace(/'/g, "");
    var currentdate = new Date();
    filename = Number(currentdate) + ".json";
    foldername = id;
    data = JSON.stringify(data);
    saveDropbox(data, filename, foldername).catch(err => console.log(err))
    //save the data
}
);


//start the server
app.listen(app.get('port'), function() {
    console.log("listening to port")
});


