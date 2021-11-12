const express = require('express');
const {connect} = require('mongoose');

const PORT = process.env.PORT || 3000;
const UserDB = process.env.DB_USERNAME || 'root';
const PasswordDB = process.env.DB_PASSWORD || 'password123';
const NameDB = process.env.DB_NAME || 'advertisements_board';
const HostDB = process.env.DB_HOST || 'mongo://localhost:27017';

connect(HostDB, {
   user: UserDB,
   pass: PasswordDB,
   dbName: NameDB,
   useNewUrlParser: true,
   useUnifiedTopology: true
});

const app = express();

app.use(express.json());

app.listen(PORT);