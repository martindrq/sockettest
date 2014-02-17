'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Event = mongoose.model('Event'),
    _ = require('lodash');

/**
 * Show events
 */
exports.formevents = function(req, res) {
    res.render('admin/events', {
        title: 'Eventos',
        message: req.flash('error')
    });
};

exports.create = function(req, res) {
    var event = new Event(req.body);
    event.save(function(err) {
        if (err) {
            return res.send('admin/events', {
                errors: err.errors,
                event: event
            });
        } else {
            res.jsonp(event);
        }
    });
};

exports.all = function(req, res) {
    Event.find().sort('-created').populate('user', 'name username').exec(function(err, articles) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(articles);
        }
    });
};

exports.event = function(req, res, next, id) {
 Event.load(id, function(err, event) {
        if (err) return next(err);
        if (!event) return next(new Error('Failed to load article ' + id));
        req.event = event;
        next();
    });
};

exports.show = function(req, res) {
    res.jsonp(req.event);
};

exports.update = function(req, res) {
    var event = req.body;  
    Event.findById(event._id, function(err, ev){
        if(!ev){
            return next(new Error('Could not load Document'));
        } else {
           // do your updates here
           ev.likes = parseInt(ev.likes) + 1;
          
           ev.save(function(err) {
             if (err) {
               res.render('error', {
                   status: 500
               });
             } else {
                var socketIO = global.socketIO;
                var data = {};
                data.event = ev;
                data.user  = req.user; 
                socketIO.sockets.emit('event:updated', data);
                res.jsonp(ev);
             }
            });
         }
    });
};
