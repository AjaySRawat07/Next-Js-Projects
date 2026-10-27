import Users from "@/app/model/userModel";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

type EmailType = "VERIFY" | "RESET";

interface sendEmailTypes {
  email: string;
  emailType: EmailType;
  userId: string;
}

export default async function sendEmail({ email, emailType, userId }: sendEmailTypes) {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);
    const actionPath = emailType === "VERIFY" ? "verifyemail" : "resetpassword";
    const actionText = emailType === "VERIFY" ? "Verify your email" : "Reset your password";

    const emailHtml = `<p>Click <a href="${process.env.DOMAIN}/${actionPath}?token=${hashedToken}">here</a> to ${actionText} or copy and paste the link in your browser. <br/>${process.env.DOMAIN}/${actionPath}?token=${hashedToken} </p>`;

    if (emailType === "VERIFY") {
      const user = await Users.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        }
      });
      if (!user) throw new Error("User not found");
    } else if (emailType === "RESET") {
      const user = await Users.findByIdAndUpdate(userId, {
        $set: {
          forgetPasswordToken: hashedToken,
          forgetPasswordTokenExpiry: Date.now() + 3600000,
        }
      });
      if (!user) throw new Error("User not found");
    }

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: "ajay@vercel.ai",
      to: email,
      subject: actionText,
      html: emailHtml,
    };

    // Call sendMail only ONCE
    const mailResponse = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", mailResponse.messageId);
    return mailResponse;

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to send email";
    console.error(`Error while sending email: ${message}`);
    throw new Error(message);
  }
}