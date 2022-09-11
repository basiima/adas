require('dotenv').config()
const express = require("express");
const cors = require("cors");
const path = __dirname + '/app/views/';
const app = express();
const multer = require("multer");
const SHA = require("crypto-js/sha256");
const bcrypt = require("bcryptjs");

const fs = require("fs");
const csv = require("fast-csv");

//global.__basedir = __dirname + "./..";
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
const Student = db.student;
const Company = db.company;
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
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './../client/public/documents')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname)
//   }
// })

// const upload = multer({ storage: storage }).single('file')

// app.post('/upload',async(req, res) => {
//   upload(req, res, function (err) {
//         const fileName = req.file.filename
//         const referenceId = req.body.referenceId
//         /**
//          *  @hashValue uses cryptojs library referenced by @MD5
//          *  to generate a document's hashvalue using the filename
//          */
//         const hashValue =  SHA(fileName).toString();
//          const signed_document = {
//           document_file: fileName,
//           document_hash: hashValue,
//           referenceId: referenceId
//          };
//          SignedDocument.create(signed_document)
//          .then(data => {
//            res.send(data);
//          })

//   })

// });

/** Uploading CSV file for students and saving it to the database */
const csvFilter = (req, file, cb) => {
  if (file.mimetype.includes("csv")) {
    cb(null, true);
  } else {
    cb("Please upload only csv file.", false);
  }
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './app/uploads/students/');
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, `${Date.now()}-adas-${file.originalname}`);
  },
});

var uploadStudentFile = multer({ storage: storage, fileFilter: csvFilter }).single('file');

app.post('/uploadStudents',async(req, res) => {
  uploadStudentFile(req, res, function (err) {
    try {
      if (req.file == undefined) {
        return res.status(400).send("Please upload a CSV file!");
      }

      let students = [];
      let path = './app/uploads/students/' + req.file.filename;

      fs.createReadStream(path)
        .pipe(csv.parse({ headers: true }))
        .on("error", (error) => {
          throw error.message;
        })
        .on("data", (row) => {
          students.push(row);
        })
        .on("end", () => {
          Student.bulkCreate(students)
            .then(() => {
              res.status(200).send({
                message:
                  "Uploaded the file successfully: " + req.file.originalname,
              });
            })
            .catch((error) => {
              res.status(500).send({
                message: "Fail to import data into database!",
                error: error.message,
              });
            });
        });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Could not upload the file: " + req.file.originalname,
      });
    }
  })
});

/** Uploading company csv file and saving it to the database */
const csvFileFilter = (req, file, cb) => {
  if (file.mimetype.includes("csv")) {
    cb(null, true);
  } else {
    cb("Please upload only csv file.", false);
  }
};

var fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './app/uploads/companies/');
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, `${Date.now()}-adas-${file.originalname}`);
  },
});

var uploadCompanyFile = multer({ storage: fileStorage, fileFilter: csvFileFilter }).single('file');

app.post('/uploadCompanies',async(req, res) => {
  uploadCompanyFile(req, res, function (err) {
    try {
      if (req.file == undefined) {
        return res.status(400).send("Please upload a CSV file!");
      }

      let companies = [];
      let path = './app/uploads/companies/' + req.file.filename;

      fs.createReadStream(path)
        .pipe(csv.parse({ headers: true }))
        .on("error", (error) => {
          throw error.message;
        })
        .on("data", (row) => {
          companies.push(row);
        })
        .on("end", () => {
          Company.bulkCreate(companies)
            .then(() => {
              res.status(200).send({
                message:
                  "Uploaded the file successfully: " + req.file.originalname,
              });
            })
            .catch((error) => {
              res.status(500).send({
                message: "Fail to import data into database!",
                error: error.message,
              });
            });
        });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Could not upload the file: " + req.file.originalname,
      });
    }
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
