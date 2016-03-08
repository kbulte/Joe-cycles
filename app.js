var express = require('express');
var app = express();

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', function(req, res){
        res.render('index');
});

var port = process.env.PORT || 3000;
var server = app.listen(port, function(){
    console.log('Server running on port 3000');
});