const db = require("../models");
const BlockChainRecord = db.blockchain_record;
const Op = db.Sequelize.Op;

const nodemailer = require("nodemailer"); // Require the Nodemailer package
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const myOAuth2Client = new OAuth2(
  process.env.OAUTH_CLIENTID,
  process.env.OAUTH_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
)

myOAuth2Client.setCredentials({
  refresh_token: process.env.OAUTH_REFRESH_TOKEN
}); 

const myAccessToken = myOAuth2Client.getAccessToken() //retrieve new access token when it expires

// Ceate and save a Verification Transaction 
exports.create = (req, res) => {
    // Validate request
    if (!req.body.transactionId) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    const record = {
        transactionId: req.body.transactionId,
        documentKey: req.body.documentKey,
    };
    // Save Request in the database
    BlockChainRecord.create(record)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while saving the BlockChain Record."
        });
      });

          // Send Email containing default password
    async function sendMail(){
      // Transporter object
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
          clientId: process.env.OAUTH_CLIENTID,
          clientSecret: process.env.OAUTH_CLIENT_SECRET,
          refreshToken: process.env.OAUTH_REFRESH_TOKEN,
          accessToken: myAccessToken
        },
      });
        // Send Email
      let info = await transporter.sendMail({
        from: '"ADAS Admin" <admin@adas.com>',
        to: req.body.student_email, // Student's email address
        subject: "ADAS Document Key!",
        text: req.body.documentKey.concat(" is your document key"),
        html: req.body.documentKey.concat(" is your document key"),
      });
    }
    
    sendMail().catch(console.error);

  };