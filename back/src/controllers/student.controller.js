const User = require('../models/Stundents');
const Notas = require('../models/nota');

const userCtrl = {};

userCtrl.AddUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    console.log(req.body);
    await newUser.save();
    res.send({ message: 'New User Created' });
  } catch (error) {
    return res.status(500).json({ error: `Error al agregar usuario: ${error.message}` });
  }
};

userCtrl.getUsers = async (req, res) => {
  const users = await User.find()
  res.json(users)
}


userCtrl.calcularProgresoYPromedio = async (req, res) => {
    try {
      const users = await User.find();
  
      if (!users || users.length === 0) {
        return res.status(404).json({ error: 'No se encontraron usuarios' });
      }
  
      const progreso1StartDate = new Date('2023-10-03');
      const progreso1EndDate = new Date('2023-11-25');
      const progreso2StartDate = new Date('2023-11-30');
      const progreso2EndDate = new Date('2024-01-06');
      const progreso3StartDate = new Date('2024-01-07');
      const progreso3EndDate = new Date('2024-02-04');
  
      const resultadosPorUsuario = [];
  
      for (const user of users) {
        const userId = user.id;
  
        const progreso1Notas = await userCtrl.calcularNotasEnRango(userId, progreso1StartDate, progreso1EndDate);
        const progreso2Notas = await userCtrl.calcularNotasEnRango(userId, progreso2StartDate, progreso2EndDate);
        const progreso3Notas = await userCtrl.calcularNotasEnRango(userId, progreso3StartDate, progreso3EndDate);
  
        const totalNotasProgreso1 = progreso1Notas.length;
        const totalNotasProgreso2 = progreso2Notas.length;
        const totalNotasProgreso3 = progreso3Notas.length;
  
        const totalNotas = totalNotasProgreso1 + totalNotasProgreso2 + totalNotasProgreso3;
        
        const porcentajeProgreso1 = 0.25;
        const porcentajeProgreso2 = 0.35;
        const porcentajeProgreso3 = 0.40;
  

        const promedioProgreso1 = totalNotasProgreso1 > 0 ?
        ((progreso1Notas.reduce((sum, nota) => sum + nota.nota, 0)/ totalNotasProgreso1 )):0;


        const promedioProgreso2 = totalNotasProgreso2 > 0 ?
        ((progreso2Notas.reduce((sum, nota) => sum + nota.nota, 0)/ totalNotasProgreso2 )):0;

        const promedioProgreso3 = totalNotasProgreso3 > 0 ?
        ((progreso3Notas.reduce((sum, nota) => sum + nota.nota, 0)/ totalNotasProgreso3 )):0;

        const promedioFinal = totalNotas > 0 ?
    ( promedioProgreso1 * porcentajeProgreso1 +
    promedioProgreso2 * porcentajeProgreso2 +
    promedioProgreso3 * porcentajeProgreso3): 0;

        resultadosPorUsuario.push({
          userId,
          totalNotas,
          promedioFinal,
          progreso1: { totalNotas: totalNotasProgreso1,Promedio: promedioProgreso1, startDate: progreso1StartDate, endDate: progreso1EndDate },
          progreso2: { totalNotas: totalNotasProgreso2,Promedio: promedioProgreso2, startDate: progreso2StartDate, endDate: progreso2EndDate },
          progreso3: { totalNotas: totalNotasProgreso3,Promedio: promedioProgreso3, startDate: progreso3StartDate, endDate: progreso3EndDate },
        });
      }
  
      return res.status(200).json(resultadosPorUsuario);
    } catch (error) {
      return res.status(500).json({ error: `Error al calcular progreso y promedio: ${error.message}` });
    }
  };
  
  userCtrl.calcularNotasEnRango = async (userId, startDate, endDate) => {
    try {
      const notasEnRango = await Notas.find({
        id: userId,
        fecha: { $gte: startDate, $lte: endDate },
      });
      return notasEnRango;
    } catch (error) {
      throw new Error(`Error al calcular notas en rango: ${error.message}`);
    }
  };
  

module.exports = userCtrl;
