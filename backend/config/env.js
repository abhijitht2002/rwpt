require("dotenv").config();

const env = {
  mongoUri: process.env.MONGO_URI,
  port: process.env.PORT || 5000,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
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
