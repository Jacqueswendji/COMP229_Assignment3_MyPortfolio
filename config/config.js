
const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || (await import("node:crypto")).randomBytes(32).toString("hex"),
  mongoUri: process.env.MONGODB_URI ||
    'mongodb://127.0.0.1:27017/PortfolioAssignment3'
};

export default config;

