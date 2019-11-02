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
