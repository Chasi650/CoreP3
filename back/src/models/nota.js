const {Schema , model} = require ('mongoose')

const notasSchema = new Schema ({

    id: {type: Number, required: true},
    nota: {type: Number, required: true},
    fecha: {type: Date , required: true},

}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('Notas', notasSchema);