var express = require('express');
var app = express();

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res){
        
});

var server = app.listen(3000, function(){
    console.log('Server running');
});