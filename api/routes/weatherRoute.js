'use strict';
module.exports = function(app) {
    var todoList = require('../controllers/weatherController');

    // todoList Routes
    app.route('/medition')
      .get(todoList.list_all_meditions)
      .post(todoList.create_a_medition);

    app.route('/medition/last')
      .get(todoList.get_last_medition);

    app.route('/medition/max/:fecha')
      .get(todoList.get_max_medition_date);

    app.route('/medition/min/:fecha')
      .get(todoList.get_min_medition_date);

    app.route('/medition/:meditionId')
      .get(todoList.read_a_medition)
      .put(todoList.update_a_medition)
      .delete(todoList.delete_a_medition);

};
