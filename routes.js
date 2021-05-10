const express = require('express');
const routes = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contactController = require('./src/controllers/contactController');
const {loginRequired} = require('./src/middlewares/middleware');

// Routes home
routes.get('/', homeController.index);

// Routes login
routes.get('/login/', loginController.index);
routes.post('/login/register', loginController.register);
routes.post('/login/auth', loginController.auth);
routes.get('/login/logout', loginController.logout);

// Routes contact
routes.get('/contact',loginRequired,contactController.index);
routes.get('/contact/:id',loginRequired,contactController.editIndex);
routes.get('/contact/delete/:id',loginRequired,contactController.delete);
routes.post('/contact/register',loginRequired,contactController.register);

routes.post('/contact/edit/:id',loginRequired,contactController.edit);

module.exports = routes;
