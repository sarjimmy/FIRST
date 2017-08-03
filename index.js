const path = require('path');
const express = require('express');
const app = express();
const PORT_NUMBER = 8080;
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname + '/mymap.html'));})

app.use(express.static('public'));
//app.use('/js',express.static('js'));
//app.use('/css',express.static('css'));
//app.use('/images',express.static('images'));
app.listen(PORT_NUMBER,function(){
  console.log('Example app listening on port ' + PORT_NUMBER);})
