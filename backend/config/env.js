require("dotenv").config();

const env = {
  mongoUri: process.env.MONGO_URI,
  port: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  CLIENT_URL: process.env.CLIENT_URL,
  BREVO_API_KEY: process.env.BREVO_API_KEY,
  EMAIL_SENDER: process.env.EMAIL_SENDER,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
};

if (!env.mongoUri) {
  console.log("mongo_uri not found");
  process.exit(1);
}
// if (!env.secretKey) {
//   console.log("missing secret key");
//   process.exit(1);
// }

module.exports = env;
