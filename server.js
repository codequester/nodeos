console.log('Openshift Demo - Frontend')

const express = require('express');
const bodyParser= require('body-parser')
const app = express();

var request = require('request')

app.use(bodyParser.urlencoded({extended: true}))

app.listen(8080, function() {
    console.log('listening on 8080')
  })

  app.get('/', function (req, res) {
    //res.send('Hello World')
    res.sendFile(__dirname + '/index.html')
  })

  app.post('/sendmsg', (req, res) => {
    console.log(req.body)
    request('http://amq-producer-wkshp-demo.127.0.0.1.nip.io/produce?msg=abcd', function(err, body){
        res.json(body); //res is the response object, and it passes info back to client side
    });
  })

  
