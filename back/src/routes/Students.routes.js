const { Router } = require ('express')
const Userrouter = Router()

const userCrt = require('../controllers/student.controller.js')

Userrouter.get('/Users',userCrt.getUsers);
Userrouter.post('/AddUser',userCrt.AddUser);
Userrouter.get('/UsersProm',userCrt.calcularProgresoYPromedio);

module.exports = Userrouter