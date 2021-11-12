const express = require('express');
const {Schema, model, connect} = require('mongoose');

const PORT = process.env.PORT || 3000;
const UserDB = process.env.DB_USERNAME || 'root';
const PasswordDB = process.env.DB_PASSWORD || 'password123';
const NameDB = process.env.DB_NAME || 'advertisements_board';
const HostDB = process.env.DB_HOST || 'mongo://localhost:27017';

const advertisementScheme = Schema({
   shortText: {
      type: String,
      required: true,
   },
   description: {
      type: String,
      required: true,
   }
});

const Advertisement = model('Advertisement', advertisementScheme);

connect(HostDB, {
   user: UserDB,
   pass: PasswordDB,
   dbName: NameDB,
   useNewUrlParser: true,
   useUnifiedTopology: true
});

const app = express();

app.use(express.json());

app.get('/api/advertisements', async (req, res) => {
   const advertisementList = await Advertisement.find().select('-__v');

   try {
      res.send(advertisementList);
   } catch (e) {
      console.log(e);
      res.status(500);
   }
});

app.listen(PORT);