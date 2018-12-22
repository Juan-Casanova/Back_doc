const express = require('express');
const router  = express.Router();
const User = require('../models/User');

const passport = require('passport');


const errDict = {
    UserExistsError: "Este usuario ya existe"
}
function isAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        console.log("se intenta")
        //return next()
    }else{
        res.json({message: "No tienes permiso"});
    }
}

router.post('/saveUser',(req,res)=>{
    var user=new User();
    var params=req.body;

    if(params.username && params.email && params.contraseña && params.telefono){
        user.username=params.username;
        user.email=params.email;
        user.contraseña=params.contraseña;
        user.telefono=params.telefono;
        user.role="CLIENTE"

        user.save((err,userSaved)=>{
            if(err)return res.status(500).send({message:"error guardando el usuariio"});
            if(userSaved){
                res.status(200).send({user:userSaved});
            }
            else{
                res.status(404).send({message:"NOSE HA GUSRDADO"})
            }
        });
    }
    else{
        res.status(200).send({
            message:"envia todos los datos"
        })
    }
});

router.post('/login',(req,res)=>{
    var params=req.body;

    var email=params.email;
    var contraseña=params.contraseña

    User.findOne({email:email,contraseña:contraseña},(err,user)=>{
        if(err) return res.status(500).send({message:"error en la peticion"});

        if(user){
            //return res.status(200).send({user})
            if(contraseña==user.contraseña && email==user.email)
            {
                return res.status(200).send({user})
            }
            else{
                return res.status(404).send({message:"el email o contraseña esta mal"});
            }
        }
        else{
            return res.status(404).send({message:"el email o contraseña esta mal"});
        }
    });

});

// router.post('/login', passport.authenticate('local'), (req,res,next)=>{
//     req.app.locals.user = req.user;
//     return res.status(200).json(req.user);
// });


module.exports = router;
