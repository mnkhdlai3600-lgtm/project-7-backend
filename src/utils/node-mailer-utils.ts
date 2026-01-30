import nodemailer from "nodemailer";
import { configDotenv } from "dotenv";

configDotenv();

const { AUTH_EMAIL, AUTH_PASS } = process.env;

const tranport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: AUTH_EMAIL,
    pass: AUTH_PASS,
  },
});

export const sendVerificationEmail = async (
  reciever: string,
  verifyEmail: string,
) => {
  await tranport.sendMail({
    from: `Food Delivery App ${AUTH_EMAIL}`,
    to: reciever,
    subject: "Verify your email",
    html: `<div>
  <a
    target="_blank"
    href="${verifyEmail}"
    style="
      font-size: 18px;
      color: white;
      background-color: #007bff;
      border: 2px black solid;
      display: flex;
      justify-items: center;
      align-items: center;
      width: 200px;
      height: 120px;
      text-align: center;
      line-height: 120px;
      text-decoration: none;
      border-radius: 8px;
    "
    >Verify Email</a
  >

`,
  });
};
