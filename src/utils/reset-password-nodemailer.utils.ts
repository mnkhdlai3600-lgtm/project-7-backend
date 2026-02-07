import { Resend } from "resend";
import * as dotenv from "dotenv";
dotenv.config();

const { RESEND_API_KEY, AUTH_EMAIL } = process.env;

const resend = new Resend(RESEND_API_KEY);

// 2. Нууц үг сэргээх OTP код илгээх (Resend хувилбар)
export const ResetPasswordVerificationEmail = async (
  reciever: string,
  otpCode: string,
) => {
  try {
    const { data, error } = await resend.emails.send({
      from: `Food Delivery Team <${AUTH_EMAIL || "onboarding@resend.dev"}>`,
      to: reciever,
      subject: "Нууц үг сэргээх баталгаажуулах код",
      html: `
      <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f4f7f6;">
        <div style="max-width: 500px; margin: auto; background: white; padding: 40px; border-radius: 15px;">
          <h2 style="color: #333;">Нууц үг сэргээх</h2>
          <p>Таны баталгаажуулах код:</p>
          <div style="font-size: 32px; font-weight: bold; color: #007bff; letter-spacing: 5px; padding: 20px; border: 2px dashed #007bff; display: inline-block;">
            ${otpCode}
          </div>
          <p style="color: #888; margin-top: 20px;">Энэ код 10 минутын дараа хүчингүй болно.</p>
        </div>
      </div>
      `,
    });

    if (error) return console.error("Resend OTP Error:", error);
    console.log("Reset Password Email Sent:", data);
  } catch (err) {
    console.error("Catch Error:", err);
  }
};
