require("dotenv").config();

const env = {
  mongoUri: process.env.MONGO_URI,
  port: process.env.PORT || 5000,
  secretKey: process.env.JWT_SECRET,
};

if (!env.mongoUri) {
  console.log("mongo_uri not found");
  process.exit(1);
}
if (!env.secretKey) {
  console.log("missing secret key");
  process.exit(1);
}

module.exports = env;
