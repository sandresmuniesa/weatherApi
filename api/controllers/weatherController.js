'use strict';

var mongoose = require('mongoose'),
  Medition = mongoose.model('Medition');

exports.list_all_meditions = function(req, res) {
  console.info('GET requesto to /medition');
  Medition.find({}, function(err, medition) {
    if (err)
      res.send(err);
    res.json(medition);
  });
};

exports.create_a_medition = function(req, res) {
  console.log('POST requesto to /medition');
  var new__medition = new Medition(req.body);
  console.log(req.body);
  new__medition.save(function(err, medition) {
    if (err)
      res.send(err);
    console.log(medition.meditionTime);
    res.json(medition);
  });
};

exports.read_a_medition = function(req, res) {
  Medition.findById(req.params.taskId, function(err, medition) {
    if (err)
      res.send(err);
    res.json(medition);
  });
};

exports.update_a_medition = function(req, res) {
  Medition.findOneAndUpdate({_id: req.params.meditionId}, req.body, {new: true}, function(err, medition) {
    if (err)
      res.send(err);
    res.json(medition);
  });
};

exports.delete_a_medition = function(req, res) {
  Medition.remove({
    _id: req.params.meditionId
  }, function(err, medition) {
    if (err)
      res.send(err);
    res.json({ message: 'Medition '+ req.params.meditionId +' successfully deleted' });
  });
};

exports.get_last_medition = function(req, res){
  console.log('GET requesto to /medition/last');
  Medition.findOne().sort('-meditionTime').exec(function(err, medition) {
    if (err)
      res.send(err);
    console.log( medition );
    res.json(medition);
  });
}

exports.get_max_medition_date = function(req, res){
  var date = new Date(Number(req.params.fecha));
  console.log(date);
  var dateInit = new Date(date.setHours(0,0,0));
  var dateEnd = new Date(date.setHours(23,59,59));
  console.log(dateInit);
  console.log(dateEnd);
  Medition.findOne({ 'meditionTime' : {"$gte": dateInit, "$lt": dateEnd}})
    .sort('-temperature').exec(function(err, medition) {
      if (err)
        res.send(err);
      console.log( medition );
      res.json(medition);
    });
}

exports.get_min_medition_date = function(req, res){
  var date = new Date(Number(req.params.fecha));
  console.log(date);
  var dateInit = new Date(date.setHours(0,0,0));
  var dateEnd = new Date(date.setHours(23,59,59));
  console.log(dateInit);
  console.log(dateEnd);
  Medition.findOne({ 'meditionTime' : {"$gte": dateInit, "$lt": dateEnd}})
    .sort('temperature').exec(function(err, medition) {
      if (err)
        res.send(err);
      console.log( medition );
      res.json(medition);
    });
}
