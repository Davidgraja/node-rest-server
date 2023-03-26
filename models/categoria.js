const { Schema , model } = require('mongoose');

const CategoriaSchema = new Schema({
    nombre : {
        type : String,
        required :[ true , 'El nombre es obligatorio' ],
        unique : true 
    } ,

    estado : {
        type : Boolean,
        default : true,
        required : true 
    } , 


    //? Hacer referencia a otro documento en mongo 
    usuario :{
        type : Schema.Types.ObjectId,
        ref : 'Usuario',
        required : true
    }

})

CategoriaSchema.methods.toJSON = function(){
    const { __v , ...categoria } = this.toObject();

    return categoria

}

module.exports = model('Categoria' , CategoriaSchema )