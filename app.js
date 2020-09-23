const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const app = express();
const path = require('path');
const usuarios = require('./routes/user');
const flash = require('connect-flash');

const passport = require('passport');
require('./config/auth')(passport);

app.use(session({
  secret: 'webferraogroup',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

const URI = 'mongodb+srv://webferraogroup:NEPRxNhYHBB7RbhZ@cluster0.t7iuf.mongodb.net/webferraogroup?retryWrites=true&w=majority';
const NOERRO = {
  useUnifiedTopology: true,
  useNewUrlParser: true
};
mongoose.Promise = global.Promise;
mongoose.connect(URI, NOERRO).then(() => {
  console.log("Connect mongo");
}).catch((err) => {
  console.log("Error in connect" + err);
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req, res) => {
  res.render('index');
});

app.use('/usuarios', usuarios);

const PORT = 3000;
app.listen(PORT, () => {
  console.log('Server initialized on port : ' + PORT);
});

