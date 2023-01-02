const app = require('express').Router();
const {loginAdmin, addAdmin, getAdmin, updateAdmin, deleteAdmin, getAdminById,getAllAdmins } = require('../controller/admin/admin.controller');
const { addAdminValidation, loginAdminValidation, updateAdminValidation } = require('../validation/admin.validation');
const validator = require('../helper/validator/common.validate');
const isAuthorized = require("../helper/isAuthorized/isAuthorized");
const {
    ADD_ADMIN,
    GET_ADMIN,
    GET_ADMIN_BY_ID,
    UPDATE_ADMIN,
    DELETE_ADMIN,
    GET__ALL_ADMIN,} = require('../endPoints/endPoints');


app.post('/loginAdmin',validator(loginAdminValidation), loginAdmin);
app.post('/addAdmin',[isAuthorized(ADD_ADMIN),validator(addAdminValidation)], addAdmin);
app.get('/getAdmin',[isAuthorized(GET_ADMIN)], getAdmin);
app.get('/getAdminById/:id',[isAuthorized(GET_ADMIN_BY_ID)], getAdminById);
app.put('/updateAdmin/:id',[isAuthorized(UPDATE_ADMIN),validator(updateAdminValidation)], updateAdmin);
app.delete('/deleteAdmin/:id',[isAuthorized(DELETE_ADMIN)], deleteAdmin);
app.get('/getAllAdmins',[isAuthorized(GET__ALL_ADMIN)], getAllAdmins);

module.exports = app;