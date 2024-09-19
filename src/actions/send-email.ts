"use server";
import nodemailer from "nodemailer";

export async function generateEmail(email: string) {
    
    const transporter = nodemailer.createTransport({
        host: "smtp.resend.com",
        port: 465, // or any other email service you prefer
        auth: {
            user: "resend", // your email address
            pass: process.env.RESEND_TOKEN, // your email password
        },
    });

    const mailOptions = {
        from: "onboarding@resend.dev",
        to: email,
        subject: "GitVigil Streak Created",
        html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h1>GitVigil Streak Created</h1>
          <p>Hello,</p>
          <p>Your GitHub streak has been successfully created and maintained by <strong>GitVigil</strong>.</p>
          <p>Keep coding and maintain your streak effortlessly with GitVigil!</p>
          <br />
          <img src="https://utfs.io/f/67924083-d515-4314-9aaf-e0d86107dac0-g1rjny.png" alt="GitVigil Logo" style="width:150px;height:auto;" />
          <p>Best Regards, <br/>The GitVigil Team</p>
        </div>
      `,
    };

    try {
        const res = await transporter.sendMail(mailOptions);
        return res;
    } catch (error) {
        throw new Error("Failed to send streak notification email");
    }
}
