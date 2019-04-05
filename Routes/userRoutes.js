const express =require('express');
const userController=require('../Controllers/userController');
const api=express.Router();

api.get('/all/:page?',userController.viewAll);
api.get('/view/:id',userController.findUser);
api.post('/register',userController.createUser);
api.put('/update/:id',userController.updateUser);
api.delete('/delete/:id',userController.deleteUser);

module.exports=api;