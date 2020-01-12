var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');

let app = http.createServer(function (req, res) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Max-Age': 2592000, // 30 days
    /** add other headers as per requirement */
  };
  
  if (req.method === 'OPTIONS') {
    res.writeHead(204, headers);
    res.end();
    return;
  }

  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req);    
    form.uploadDir = path.join(__dirname, "uploads");

    // create uploads folder if not exists
    if(!fs.existsSync(form.uploadDir)){
      fs.mkdirSync(form.uploadDir);
    }
    
    form.on('field', function(name, value) {
      console.log("key ---- value")
      console.log(name, value)
      console.log("---------")
    });

    form.on('fileBegin', function (name, file){
      file.path = path.join(form.uploadDir , file.name);
    });

    form.on('file', function (name, file){
      console.log('Uploaded ' + file.name);
      res.writeHead(200, headers);
      res.end("uploaded.....")
    });
  } 
})


app.listen(8000);
console.log('Node server running on port 8000');