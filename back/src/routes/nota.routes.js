const { Router } = require ('express')
const Notarouter = Router()

const notaCrt = require('../controllers/nota.controller.js')

Notarouter.post('/AddNota',notaCrt.AddNota);
Notarouter.get('/Notas',notaCrt.getUsers);

module.exports = Notarouter