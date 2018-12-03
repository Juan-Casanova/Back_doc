require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');

const passport     = require('./Helpers/Passport');
const session      = require('express-session');
const MongoStore   = require('connect-mongo')(session);  

mongoose.Promise = Promise;
mongoose
  .connect('mongodb://Jocelyn:dentista2018@ds117431.mlab.com:17431/consultoriodental')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// app.use(require('cors')({
//   origin: true,
//   credentials: true
// }))

// // Sessions
// app.use(session({
//   secret: "bliss",
//   resave: true,
//   saveUninitialized: true,
//   cookie: { httpOnly: true, maxAge: 241920000 },
//   store: new MongoStore({
//     mongooseConnection:mongoose.connection,
//     ttl: 30 * 24 * 60 * 60 //30 días
//   }),
// }));

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));

app.use(passport.initialize())
app.use(passport.session())

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// app.use(express.static(path.join(__dirname,'dist')));
//app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));


// default value for title local
app.locals.title = 'Dentistaenqueretaro';



const index = require('./routes/index');
const auth = require('./routes/auth');
const comentario=require('./routes/comentario')
app.use('/form', index);
app.use('/',auth);
app.use('/api',comentario)


module.exports = app;
