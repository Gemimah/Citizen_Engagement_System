import nodemailer from "nodemailer";
import twilio from "twilio";
import { Complaint } from "./types";

// Email configuration
const emailConfig = {
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
};

// Initialize email transporter only if credentials are available
const transporter =
  emailConfig.auth.user && emailConfig.auth.pass
    ? nodemailer.createTransport(emailConfig)
    : null;

// Initialize Twilio client only if credentials are available
const twilioClient =
  process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN
    ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
    : null;

export async function sendStatusUpdateNotification(complaint: Complaint) {
  if (!complaint.userEmail && !complaint.userPhone) return;

  const latestUpdate = complaint.updates[complaint.updates.length - 1];
  const updateMessage = latestUpdate
    ? `Latest update: ${latestUpdate.message}`
    : "";

  // Email notification
  if (complaint.userEmail && transporter) {
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: complaint.userEmail,
      subject: `Complaint Status Update: ${complaint.title}`,
      text: `Your complaint "${complaint.title}" has been updated to "${complaint.status}". ${updateMessage}`,
      html: `
        <h2>Complaint Status Update</h2>
        <p><strong>Title:</strong> ${complaint.title}</p>
        <p><strong>Status:</strong> ${complaint.status}</p>
        ${
          updateMessage
            ? `<p><strong>Update:</strong> ${updateMessage}</p>`
            : ""
        }
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`Email sent to ${complaint.userEmail}`);
    } catch (error) {
      console.error("Email sending failed:", error);
    }
  } else if (complaint.userEmail) {
    console.log("Email service not configured. Skipping email notification.");
  }

  // SMS notification
  if (complaint.userPhone && twilioClient && process.env.TWILIO_PHONE_NUMBER) {
    try {
      await twilioClient.messages.create({
        body: `Complaint "${complaint.title}" updated to ${complaint.status}. ${updateMessage}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: complaint.userPhone,
      });
      console.log(`SMS sent to ${complaint.userPhone}`);
    } catch (error) {
      console.error("SMS sending failed:", error);
    }
  } else if (complaint.userPhone) {
    console.log("SMS service not configured. Skipping SMS notification.");
  }
}
