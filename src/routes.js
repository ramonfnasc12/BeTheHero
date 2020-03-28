const express = require('express');
const ongController = require('./controllers/OngController');
const incidentController = require('./controllers/IncidentController');

const routes = express.Router();

routes.get('/ongs',ongController.get);
routes.post('/ongs',ongController.insert);

routes.post('/incidents',incidentController.insert);
routes.get('/incidents',incidentController.get);
routes.delete('/incidents/:id',incidentController.delete);

routes.get('/profile',incidentController.getSpecificIncidents);

routes.post('/login',ongController.login);

module.exports = routes;