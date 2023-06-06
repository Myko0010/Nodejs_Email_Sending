const path = require('path');
const express = require("express");
const cors = require('cors');
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser');
require('dotenv').config()

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static(path.resolve(__dirname, '../build')));
app.use(cors())
app.use(bodyParser.json());

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});
EMAIL_ADDRESS="mikiyastekalegn@gmail.com";
EMAIL_PASS="dnfdbrtlqjbwjjyg";
const contactEmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_ADDRESS,
    pass: EMAIL_PASS
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

app.post("/api/contact",  bodyParser.urlencoded({ extended: false }), (req, res) => {
  const name = req.body.firstName + req.body.lastName;
  const email = req.body.email;
  const message = req.body.message;
  const phone = req.body.phone;
  const mail = {
    from: name,
    to: email,
    subject: "Contact Form Submission - Portfolio",
    html: `<p>Name: ${name}</p>
           <p>Email: ${email}</p>
           <p>Phone: ${phone}</p>
           <a href="http://localhost:3001/api"><Button style="margin-left:45%;">Click Here To activate</Button></a>`,
  };
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json(error);
    } else {
      res.json({ code: 200, status: "Message Sent" });
    }
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

// Showing that the server is up and running
app.listen(PORT, () => {
    console.log(`Server is online on port: ${PORT}`)
  })

  app.post("/api/SendCode_Email",  bodyParser.urlencoded({ extended: false }), (req, res) => {
    const from = "Harer City House Rental Mgmt System";
    const email = req.body.email;
    const message = req.body.message;
    const Payment_Code = req.body.Payment_Code;
    const mail = {
      from: from,
      to: email,
      subject: "Result Announcment from HCHRMS",
      html: `
             <p>Email: ${email}</p>
             <h3>${message}</h3>
             <h4>Payment Code: ${Payment_Code}</h4>
             <h3>Account : 0919949378</h3>`,
    };
    contactEmail.sendMail(mail, (error) => {
      if (error) {
        res.json(error);
      } else {
        res.json({ code: 200, status: "Message Sent" });
      }
    });
  });




app.post("/api/AccoutActivation",  bodyParser.urlencoded({ extended: false }), (req, res) => {
  
  
  const message = req.body.message;
  const link = req.body.link;
  const email = req.body.email;
  console.log(email);
  const mail = {
    from: "Harar House Renatl Mgmt",
    to: email,
    subject: "Account Verifivation From Harar Home",
    html: `
           <p>Phone: ${message}</p>
           <a href=${link}><button 
           style="background-color: #4CAF50; 
                border: none;
                color: white;
                padding: 10px 20px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 16px;
                margin: 4px 2px;
                cursor: pointer;
                border-radius: 4px;" 
           >
  Click Me
</button></a>`,
  };
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json(error);
    } else {
      res.json({ code: 200, status: "Message Sent" });
    }
  });
});

