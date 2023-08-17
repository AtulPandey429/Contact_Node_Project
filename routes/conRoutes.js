const express = require('express');
const Routes = express.Router();
const {
    getContact,
    searchContact,
    CreateContacts,
    UpdateContact,
    deleteContact,
    } = require('../controller/contactController');
const validateToken = require('../middelware/validateTokenHandler');

// Routes.route('/').get(getContact)
// Routes.route('/').post(PostContact)
// Routes.route('/:id').put(UpdateContact)
// Routes.route('/:id').get(getContacts);
// Routes.route('/:id').delete(deleteContact)
// we can also write it like this 
Routes.use(validateToken)
Routes.route('/').get(getContact).post(CreateContacts)
Routes.route('/:id').put(UpdateContact).get(searchContact).delete(deleteContact)
module.exports = Routes;