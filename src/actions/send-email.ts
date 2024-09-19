"use server";
import nodemailer from "nodemailer";

export async function generateEmail(email: string) {
    console.log(email)
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
        subject: "OTP for registration",
        text: `Email:`,
    };

    try {
        const res = await transporter.sendMail(mailOptions);
        return res;
    } catch (error) {
        throw new Error("Failed to Send OTP");
    }
}
