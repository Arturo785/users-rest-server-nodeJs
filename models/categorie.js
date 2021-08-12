const { Schema, model } = require('mongoose');



const CategorieSchema = Schema({
    name : {
        type : String,
        required : [true, 'The name is required'],
        unique : true,
    },
    state : {
        type : Boolean,
        default : true,
        required : [true, 'The state is required']
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User', // our other schema
        required : [true, 'The User is required']
    }
});



module.exports = model('Categorie', CategorieSchema);