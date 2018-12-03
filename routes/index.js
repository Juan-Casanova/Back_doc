const express = require('express');
const router  = express.Router();
const path=require('path');
const configMensaje=require('../Helpers/Mailer')

/* GET home page */
router.get('/', (req, res, next) => {
  // res.render('index');
  res.sendFile(path.join(__dirname, 'index.html'))
});


router.get('/*', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/formulario',(req,res)=>{
  configMensaje(req.body);
  res.status(200).send();
})

module.exports = router;
