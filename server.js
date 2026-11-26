import config from './config/config.js';
import app from './server/express.js';
import mongoose from 'mongoose';
import User from './server/models/user.model.js';
try {
  await mongoose.connect(config.mongoUri);
  await User.init();
  const email = 'admin@portfolio.example';
  const admin = await User.findOne({email});
  if (!admin) await User.create({name:'Portfolio Administrator', email, password: process.env.ADMIN_PASSWORD || 'PortfolioDemo!2026', role:'admin'});
  else if (admin.role !== 'admin') throw new Error('Reserved admin email already exists as a regular account');
  console.log('Connected to MongoDB; administrator ready.');
  app.get('/', (req,res) => res.json({message:'Welcome to My Portfolio application.'}));
  app.listen(config.port, () => console.log(`Server started on port ${config.port}.`));
} catch (err) { console.error(err.message); await mongoose.disconnect(); process.exitCode=1; }
