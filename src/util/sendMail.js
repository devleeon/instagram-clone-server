import nodemailer from "nodemailer";

const sendMail = async (email) => {
  const client = await nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    auth: {
      user: process.env.SENDINBLUE_ID, // generated ethereal user
      pass: process.env.SENDINBLUE_PW, // generated ethereal password
    },
  });
  return client.sendMail(email);
};
export const sendSecretMail = async (address, secret) => {
  const email = {
    from: "leeonechang92@gmail.com", // sender address
    to: address, // list of receivers
    subject: "🔒Login Secret for Prismagram🔒", // Subject line
    html: `Hello! Your login secret it <strong>${secret}</strong>.<br/>Copy paste on the app/website to log in`, // html body
  };
  return await sendMail(email);
};
