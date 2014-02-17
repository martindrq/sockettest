'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * EventSchema
 */
var EventSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        trim: true
    },
    when: {
        type: Date,
        default: Date.now
    },
    where: {
        type: String,
        default: '',
        trim: true
    },
    likes: {
        type: String,
        default: '0'
    }
});

/**
 * Validations
 */
EventSchema.path('title').validate(function(title) {
    return title.length;
}, 'Debe tener un titulo');

EventSchema.path('when').validate(function(when) {
    return when.length;
}, 'Debe asingar cuando');

EventSchema.path('where').validate(function(where) {
    return where.length;
}, 'Debe asingar donde');

/**
 * Statics
 */
EventSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Event', EventSchema);
