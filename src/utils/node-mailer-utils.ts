import { Resend } from "resend";
import { configDotenv } from "dotenv";
configDotenv();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (
  reciever: string,
  verifyEmail: string,
) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: reciever,
    subject: "Verify your email",
    html: `
        <div style="width:600px; margin:0 auto; background-color:rgb(164,212,228); padding:60px 20px; border-radius:20px; text-align:center;">
          <p style="font-size:18px; font-weight:600; margin-bottom:30px;">
            Welcome to our application! Please verify your email address.
          </p>
          <a href="${verifyEmail}" target="_blank" style="background-color:#007bff; color:white; padding:12px 24px; text-decoration:none; border-radius:6px; font-size:16px; display:inline-block;">
            Verify Email
          </a>
        </div>
      `,
  });
};
