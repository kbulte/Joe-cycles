var express = require('express');
var app = express();

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', function(req, res){
    
        
        var openingHours = { 
                1: { open: 16 , closed: 20},
                2: { open: 16 , closed: 20},
                3: { open: 16 , closed: 20},
                4: { open: 16 , closed: 20},
                5: { open: 0 , closed: 0},
                6: { open: 16 , closed: 18},
                0: { open: 0 , closed: 0},
            };
            
        var now = new Date();
        var day = now.getDay();
        var time = now.getHours();
        var isOpen = false;
        var hours = openingHours[day]
        
        if(hours.open < time && hours.closed > time)    isOpen = true;
    
        res.render('index', {
        isOpen: isOpen
    });
});

var port = process.env.PORT || 3000;
var server = app.listen(port, function(){
    console.log('Server running on port 3000');
});