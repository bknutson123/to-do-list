var mongoose = require('mongoose');
var listSchema = new mongoose.Schema({ //Defines the Schema for this database
    name: String,
    task: String
});

mongoose.model('Task', listSchema); //Makes an object from that schema as a model
