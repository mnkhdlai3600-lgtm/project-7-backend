import { Resend } from "resend";
import { configDotenv } from "dotenv";
configDotenv();

const { RESEND_API_KEY, AUTH_EMAIL } = process.env;

const resend = new Resend(RESEND_API_KEY);

export const sendVerificationEmail = async (
  reciever: string,
  verifyEmail: string,
) => {
  try {
    const { data, error } = await resend.emails.send({
      from: `Food Delivery <${AUTH_EMAIL || "onboarding@resend.dev"}>`,
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

    if (error) return console.error("Resend Error:", error);
    console.log("Verification Email Sent:", data);
  } catch (err) {
    console.error("Catch Error:", err);
  }
};
