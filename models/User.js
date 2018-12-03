const passportLocalMongoose=require('passport-local-mongoose');
const Schema=require('mongoose').Schema;

const userSchema=new require('mongoose').Schema({
    username:String,
    email:{
        type:String,
        require:true
    },
    contraseña:{
        type:String,
        require:true
    },
    telefono:Number,
    ultimacita:Date,
    proximacita:Date,
    role:{
        type:String,
        enum:['CLIENTE','ADMINISTRADOR'],
        default:'CLIENTE'
    },
    comentarios:[{
        type:Schema.Types.ObjectId,
        ref:'Comentario'
    }]
},
{
    timestamps:{
        createdAt:'created_at',
        updatedAt:'updated_at'
    }    
});

userSchema.plugin(passportLocalMongoose,{usernameField:'email'})

module.exports=require('mongoose').model('User',userSchema);