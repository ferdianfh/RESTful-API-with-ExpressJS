const nodemailer = require("nodemailer");

const sendEmail = async (toEmail, token) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: `${process.env.EMAIL_USER}`, // generated ethereal user
      pass: `${process.env.EMAIL_PASS}` // generated ethereal password
    }
  });

  const info = await transporter.sendMail({
    // eslint-disable-next-line quotes
    from: `"Wanda from Zwallet" <${process.env.EMAIL_USER}>`, // sender address
    to: toEmail, // list of receivers
    subject: "Hello! Welcome to Zwallet.", // Subject line
    // text: "Hello world?", // plain text body
    html: `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Nodemailer</title>
        <style>
          .email-container {
            height: 450px;
            width: 600px;
            background-color: rgb(231, 242, 247);
            border-radius: 10px;
          }
          .email-title,
          .email-desc,
          .email-link {
            text-align: center;
            display: block;
          }
          .email-title {
            color: slateblue;
            padding-top: 3em;
            margin-bottom: 3em;
          }
          .email-desc {
            color: rgb(140, 129, 211);
            margin-top: 2em;
            margin-bottom: 2em;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <h2 class="email-title">Welcome to Zwallet!</h2>
          <p class="email-desc">
            Hello! Thank You for Joining us! <br />
            Now Please verify your account here:
          </p>
    
          <a class="email-link" href=http://localhost:3300/users/verification/${token}
            >Verify Account</a
          >
        </div>
      </body>
    </html>     
    ` // html body
  });

  console.log(info);
};

module.exports = { sendEmail };
