const {Schema , model} = require('mongoose');

const RoleSchema = new Schema({
    
    rol :{
        type : String,
        required : [true ,'El rol debe de ser proporcionado']
    }

})


module.exports = model('Role' , RoleSchema)