const Notas = require('../models/nota');
const notaCtrl = {};

notaCtrl.AddNota = async (req, res) => {
    try {
      const newUser = new Notas(req.body);
      console.log(req.body);
      await newUser.save();
      res.send({ message: 'New Nota Created' });
    } catch (error) {
      return res.status(500).json({ error: `Error al agregar usuario: ${error.message}` });
    }
  };

  notaCtrl.getUsers = async (req, res) => {
    const users = await Notas.find()
    res.json(users)
  }

  module.exports = notaCtrl;