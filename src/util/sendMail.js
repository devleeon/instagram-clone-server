import nodemailer from "nodemailer";

const sendMail = async (email) => {
  const client = await nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    auth: {
      user: process.env.SENDINBLUE_ID,
      pass: process.env.SENDINBLUE_PW,
    },
  });
  return client.sendMail(email);
};
export const sendSecretMail = async (address, secret, username) => {
  const email = {
    from: "security@instaclone.com", // sender address
    to: address, // list of receivers
    subject: `Dear ${username}, now you can login more easily!`, // Subject line
    html: `Hello! Your login secret it <a href="http://localhost:3000/forgotpassword"><a>${secret}</strong>.<br/>Copy paste on the app/website to log in`, // html body
  };
  return await sendMail(email);
};
