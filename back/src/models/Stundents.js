const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    id: { type: Number, required: true, unique: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Middleware para generar el valor del campo 'id' antes de guardar
userSchema.pre('save', async function (next) {
  if (!this.isNew) {
    // Solo generamos un nuevo id si el documento es nuevo (no existe previamente)
    return next();
  }

  try {
    // Encuentra el máximo id en la colección y agrégale 1
    const maxId = await this.constructor.findOne({}, { id: 1 }).sort({ id: -1 });
    this.id = maxId ? maxId.id + 1 : 1;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = model('User', userSchema);