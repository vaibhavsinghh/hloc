var Amchart = require('../models/Amchart');

module.exports.create = function (req, res){
   var graphvalue = new Amchart(req.body);
   graphvalue.save(function (err, result) {
   	res.json(result);
   });
 }
module.exports.list = function (req, res) {
 	Amchart.find({}, function (err, results) {
 		res.json(results);
 	});
 }