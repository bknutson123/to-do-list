var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Task = mongoose.model('Task');

//to post one task
router.post('/tasks', function(req, res, next) {
    console.log(req.body)
    var task = new Task(req.body);
    console.log(task)
    task.save(function(err, task) {
        console.log(task)
        if (err) { return next(err); }
        res.json(task);
    });
});

//to get all tasks
router.get('/tasks', function(req, res, next) {
    Task.find(function(err, tasks) {
        if (err) { return next(err); }
        res.json(tasks);
    });
});

//id
router.param('task', function(req, res, next, id) {
    console.log(id)
    Task.findById(id, function(err, task) {
        if (err) { return next(err); }
        if (!task) { return next(new Error("can't find task")); }
        req.task = task;
        return next();
    })
})

//delete by ID
router.delete('/tasks/:task', function(req, res, next) {
  console.log("in delete")
  req.task.remove()
  res.sendStatus(200)
});

module.exports = router;
