console.log('Openshift Demo - Frontend')

const express = require('express');
const bodyParser= require('body-parser')
const app = express();

var request = require('request')

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))

app.listen(8080, function() {
    console.log('listening on 8080')
  })

  app.get('/', function (req, res) {
    //res.send('Hello World')
    request('http://amq-producer-wkshp-demo.127.0.0.1.nip.io/messages', function(err, response, body){
        if (err) return console.log(err)
        console.log('Respons Is -->' + response.statusCode)
        console.log(body)
        res.render('index.ejs', {messages: JSON.parse(body)})
    });
    //res.sendFile(__dirname + '/index.html')
  })

  app.post('/sendmsg', (req, res) => {
    console.log(req.body.message)
    request('http://amq-producer-wkshp-demo.127.0.0.1.nip.io/produce?msg='+ req.body.message, function(err, body){
        if (err) return console.log(err)
        console.log('Message Published Successfully')
        //console.log(body)
        res.redirect('/')
    });
  })

  
