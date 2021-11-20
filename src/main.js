const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

const UserModule = require('./modules/user');

const userRouter = require('./routes/api/user');
const advertisementsApiRouter = require('./routes/api/advertisements');

const PORT = process.env.PORT || 3000;
const UserDB = process.env.DB_USERNAME || 'root';
const PasswordDB = process.env.DB_PASSWORD || 'password123';
const NameDB = process.env.DB_NAME || 'advertisements_board';
const CookieSecret = process.env.COOKIE_SECRET;

const HostDB = process.env.DB_HOST || 'mongo://localhost:27017';

mongoose.connect(HostDB, {
   user: UserDB,
   pass: PasswordDB,
   dbName: NameDB,
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

//  Добавление стратегии для использования
passport.use('local', new LocalStrategy(options, UserModule.verify));

app.get('/', (req, res) => res.redirect('/api/advertisements'));
app.use('/api/user', userRouter);
app.use('/api/advertisements', advertisementsApiRouter);

app.listen(PORT);