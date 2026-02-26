const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config()

const mailOTP = () => { }

const mailPassword = async (name, email, password) => {
    try {
        const response = await axios.post("https://api.brevo.com/v3/smtp/email",
            {
                sender: {
                    name: "RWPT account action",
                    email: process.env.EMAIL_SENDER
                },
                to: [
                    {
                        email: email
                    }
                ],
                subject: "Your account has been created",
                htmlContent: `
          <h3>Hi ${name},</h3>
          <p>Your account has been created successfully.</p>
          <p><strong>Temporary Password:</strong> ${password}</p>
          <p>Please login and reset your password immediately.</p>
          <br/>
          <small>If you did not expect this email, please contact admin.</small>
        `,
            },
            {
                headers: {
                    "api-key": process.env.BREVO_API_KEY,
                    "Content-Type": "application/json",
                },
            }
        )

        console.log("Brevo response:", response);
    } catch (error) {
        console.error("Brevo Mail Error:", error);
        throw new Error("failed to send password email");
    }
}

module.exports = { mailPassword }
