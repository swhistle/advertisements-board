const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

const UserModule = require('./modules/user');

const userRouter = require('./routes/api/user');
const advertisementsApiRouter = require('./routes/api/advertisements');

const PORT = 3000;
const CookieSecret = process.env.COOKIE_SECRET;
const NameDB = process.env.DB_NAME;
const PasswordDB = process.env.DB_PASSWORD;

const HostDB = `mongodb+srv://swhistle:${PasswordDB}@cluster0.lncey.mongodb.net/${NameDB}?retryWrites=true&w=majority`;

mongoose.connect(HostDB, {
   useNewUrlParser: true,
   useUnifiedTopology: true
});

const options = {
   usernameField: 'email',
   passwordField: 'password',
   passReqToCallback: false,
}

const app = express();

app.use(express.json());

app.use(session({
   secret: CookieSecret,
   resave: false,
   saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

// Конфигурирование Passport для сохранения пользователя в сессии
passport.serializeUser(function (user, cb) {
   cb(null, user.id);
});

passport.deserializeUser(UserModule.findById);

// Добавление стратегии для использования
passport.use('local', new LocalStrategy(options, UserModule.verify));

app.get('/', (req, res) => res.redirect('/api/advertisements'));
app.use('/api/user', userRouter);
app.use('/api/advertisements', advertisementsApiRouter);

app.listen(PORT);