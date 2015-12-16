var express           = require('express'),
    app               = express(),
    bodyParser        = require('body-parser'),
    mongoose          = require('mongoose');
  
    amchartController = require('./modules/amchart/server/controllers/amchart-controller');
    mongoose.connect('mongodb://localhost:27017/amchart');

    app.use(bodyParser());

    app.get('/', function (req,res) {
    res.sendFile(__dirname + '/modules/amchart/client/views/index.html');

    });

    app.get('/value.html',function(req,res){
    res.sendFile(__dirname + '/modules/amchart/client/views/value.html')
    });

    app.use('/js', express.static(__dirname + '/modules/amchart/client/js/'));
    app.use('/css', express.static(__dirname + '/modules/amchart/client/css/'));
    app.get('/api/graph', amchartController.list);
    app.post('/api/graph', amchartController.create);


    app.listen(3000,function() {
    	console.log("server is listening...");
    })
