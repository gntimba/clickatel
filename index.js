const bodyParser = require('body-parser')
const API='API key here';
const express = require('express')
const app = express()
const Request = require('request');

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

/*app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  res.end(JSON.stringify(req.body, null, 2))
})*/
app.post('/sms', function (req, res) {
    const body = req.body
    console.log(body.message);

    //clickatell.sendMessageRest('',["27813526538"],API)
    
    sendMessage(body.message,["27764687870"],API,function(response){
        // Here you have access to your variable
        response=JSON.parse(response);
        console.log(response);
        res.send(response.messages[0].accepted)
    })
})

function sendMessage (content, to, apiKey,callback) {
    // set options array
    
    content = JSON.stringify(content);
    to = JSON.stringify(to);
    var options = { 
      method: 'POST',
      url:'https://platform.clickatell.com/messages', 
      headers:
      {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': apiKey
      },
      body: '{"content": ' + content + ', "to": ' + to +'}'
    }

    // send the request
     Request(options, function (error, response, body) {
     // console.log('error:', error); // Print the error if one occurred
     // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      //console.log('body:', body); // Print the HTML for the Google homepage.
        return callback(body)
    }); 
    return 
};




app.listen(3000)
