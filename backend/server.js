require('dotenv').config()
const express = require("express");
const cors = require("cors");
const path = __dirname + '/app/views/';
const app = express();
const multer = require("multer");
const SHA = require("crypto-js/sha256");
const bcrypt = require("bcryptjs");


app.use(express.static(path));

var corsOptions = {
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;
const SignedDocument = db.signed_document;
const User = db.user;
const Op = db.Sequelize.Op;

db.sequelize.sync().then(() => {
  initial();
  initialUser();
});
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to ADAS" });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/student.routes')(app);
require('./app/routes/company.routes')(app);
require('./app/routes/signedDocument.routes')(app);
require('./app/routes/studentRequest.routes')(app)

/**
 *  Document upload and hashing logic lies here in 
 *  functions @storage and @upload
 *  The uploaded file's reference is stored in the database
 *  while the static files are stored in the public/documents
 *  folder on the client side
 *  
 */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './../client/public/documents')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage }).single('file')

app.post('/upload',async(req, res) => {
  upload(req, res, function (err) {
        const fileName = req.file.filename
        const referenceId = req.body.referenceId
        /**
         *  @hashValue uses cryptojs library referenced by @MD5
         *  to generate a document's hashvalue using the filename
         */
        const hashValue =  SHA(fileName).toString();
         const signed_document = {
          document_file: fileName,
          document_hash: hashValue,
          referenceId: referenceId
         };
         SignedDocument.create(signed_document)
         .then(data => {
           res.send(data);
         })
    
  })

});


// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, function() {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "student"
  });
 
  Role.create({
    id: 2,
    name: "issuer"
  });
 
  Role.create({
    id: 3,
    name: "company"
  });
}

const defaultAdminPassword = "adas-admin";
const encryptedDefaultAdminPassword = bcrypt.hashSync(defaultAdminPassword, 8);
function initialUser() {
  User.create({
    username: "admin",
    email: "admin@adas.com",
    password: encryptedDefaultAdminPassword
  })
  .then(user => {
    user.setRoles([2]);
  });
}