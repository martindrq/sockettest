'use strict';

// User routes use events controller
var events = require('../controllers/events');
var authorization = require('./middlewares/authorization');

// Events authorization helpers
var hasAuthorization = function(req, res, next) {
	if (req.user.isadmin != 1) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

var hasFacebookAuthorization = function(req, res, next) {
	if(!req.isAuthenticated()){
        return res.send(401, 'User is not authorized');
	}
	if (req.user.provider != 'facebook' ) {
        return res.send(401, 'User is not authorized');
    }
    next();
};


module.exports = function(app, passport) {

    app.get('/admin/events', hasAuthorization, events.formevents);
    
    app.get('/events', events.all);

    app.put('/events/:eventId', hasFacebookAuthorization, events.update);

    app.get('/events/:eventId', hasFacebookAuthorization, events.show);

    app.post('/admin/events/create', hasAuthorization, events.create);

    app.param('eventId', events.event);

    

}