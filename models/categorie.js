const { Schema, model } = require('mongoose');



const CategorieSchema = Schema({
    name: {
        type: String,
        required: [true, 'The name is required'],
        unique: true,
    },
    state: {
        type: Boolean,
        default: true,
        required: [true, 'The state is required']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', // our other schema
        required: [true, 'The User is required']
    }
});

CategorieSchema.methods.toJSON = function () {
    const { __v, state, ...data } = this.toObject(); // gets 2 speficic and the rest as user
    return data;
}



module.exports = model('Categorie', CategorieSchema);