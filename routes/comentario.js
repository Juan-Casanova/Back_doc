const express=require('express');
const router=express.Router();
const User=require('../models/User');
const Comentario=require('../models/Comentario');

router.post('/Comentario',(req,res)=>{
    var params=req.body;

    if(!params)return res.status(404).send({menssage:"debes ingresar un comentario"});

    var comentario=new Comentario;
    comentario.Comentario=params.Comentario;
    comentario.Calificacion=params.Calificacion;
    comentario.NombreCliente=params.NombreCliente;

    comentario.save((err,comentariosalvado)=>{
        if(err)return res.status(500).send({message:"error intentando ghusrdando"});

        if(!comentariosalvado)return res.status(404).send({menssage:"no se guardo"});

        return res.status(200).send({comentario:comentariosalvado})
    })
});

router.get('/Comentario',(req,res)=>{
    Comentario.find({},(err,comentarios)=>{
        if(err) return res.status(500).send({message:'error al realizar la peticion:${err}'})
        if(!comentarios)return res.status(404).send({menssage:'no existe comentarios'})
        return res.json(comentarios)
    })
    //res.json({menssage:"no existe comentarios"});
});

router.delete('/Comentario/:id',(req,res)=>{
    var id=req.params.id
    // return res.send({message:`jajajajajajajjajajajaja`})
    
    Comentario.findByIdAndRemove(id,(err=>{
        if(err)res.status(500).send({message:'error al realizar la peticion:${err}'})
        res.status(200).send({menssage:"se borro"})
    }))
})

module.exports = router;