var express = require('express');
var app = express();

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.static('fonts'));

app.get('/', function(req, res){
        res.render('index');
});


var server = app.listen(3000, function(){
    console.log('Server running on port 3000');
});