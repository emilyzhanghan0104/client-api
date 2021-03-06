const nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "lillian.blick@ethereal.email",
    pass: "rYyVfYtXKzAK4PStq4",
  },
});

const send = (info) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await transporter.sendMail(info);
      console.log("Message sent: %s", result.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(result));
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

const emailProcessor = ({ email, pin, type }) => {
  let info;
  switch (type) {
    case "request-new-pass":
      info = {
        from: '"CRM Company👻" lillian.blick@ethereal.email', // sender address
        to: email, // list of receivers
        subject: "Password reset pin", // Subject line
        text:
          "Here is your password reset pin" +
          pin +
          "This pin will expire in one day", // plain text body
        html: `<b>Hello world?</b>
          Here is your pin 
          <b>${pin}</b>
          this pin will expire in one day
        `, // html body
      };
      send(info);
      break;
    case "password-update-success":
      info = {
        from: '"CRM Company👻" lillian.blick@ethereal.email', // sender address
        to: email, // list of receivers
        subject: "Password updated successfully", // Subject line
        text: "Password updated successfully", // plain text body
        html: `<b>Hello </b>
          
          <b>Password updated successfully</b>
          
        `, // html body
      };
      send(info);
      break;

    default:
      break;
  }
};

module.exports = {
  emailProcessor,
};
