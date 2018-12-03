const Schema=require('mongoose').Schema;

const comentarioSchema=new Schema({
    NombreCliente:{
        // type:Schema.Types.ObjectId,
        // ref:'User'
        type:String,
        required:true
    },
    Comentario:{
        type:String,
        required:true
    },
    Calificacion:{
        type:Number,
        enum:['1','2','3','4','5'],
        default:'5'
    }
},{
    timestamps:{
        createdAt:'created_at',
        updatedAt:'updated_at'
    }    
});

module.exports=require('mongoose').model('Comentario',comentarioSchema);