var express = require('express');
var bodyParser = require('body-parser');
var validator = require('express-validator');
var app = express();
var mailer = require('express-mailer');

mailer.extend(app, {
  from: 'joecycles@joecycles.be',
  host: '', // hostname 
  secureConnection: true, // use SSL 
  port: 587, // port for secure SMTP 
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts 
  auth: {
    user: '',
    pass: ''
  }
});

app.set('views', './src/views');
app.set('view engine', 'ejs');

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(express.static('public'));

//routes
app.get('/stuur-een-mail', function(req, res){
    
    res.render('stuur-een-mail');
});

app.post('/stuur-een-mail', function(req, res) {
    
    req.checkBody('email', 'Enter a valid email address.').isEmail();
    req.checkBody('question', 'Enter a question.').notEmpty();
    
    var errors = req.validationErrors();
    if (errors) {
        res.render('stuur-een-mail', { errors: errors });
        return;
    } else {
        app.mailer.send('email', {
            to: '', // REQUIRED. This can be a comma delimited string just like a normal email to field.  
            subject: 'Joe Cycles website vraag',
            otherProperty: 'Other Property' // All additional properties are also passed to the template as local variables. 
            }, function (err) {
                if (err) {
                    console.log(err);
                    res.send('There was an error sending the email');
                    return;
                }
                res.send('Email Sent');
            });
            res.redirect('/');
    }
});

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
        var hours = openingHours[day];
        
        if(hours.open < time && hours.closed > time)    {
            isOpen = true;
        }
    
        res.render('index', {
        isOpen: isOpen
    });
});

var port = process.env.PORT || 3000;
var server = app.listen(port, function(){
    console.log('Server running on port 3000');
});