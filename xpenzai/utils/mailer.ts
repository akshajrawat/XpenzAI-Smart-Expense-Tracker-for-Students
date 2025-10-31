import nodemailer from "nodemailer";

interface mailProps {
  email: string;
  emailType: string;
}

// create a transporter
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "maddison53@ethereal.email",
    pass: "jn7jnAPss4f63QBp6D",
  },
});

const sendEmail = async ({ email, emailType }: mailProps) => {
  try {
    const mailOptions = {
      from: "akshajr11@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: "<b>Hello world?</b>",
    };
    const mainResponse = await transporter.sendMail(mailOptions);
    return mainResponse;
  } catch (error) {
    console.log("Something went wrong while sending email to the user");
  }
};

export default sendEmail;

// TODO: This component is still incomplete