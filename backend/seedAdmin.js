// Script to seed an initial admin user
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    const email = 'admin@example.com';
    const password = 'admin123';
    const hashed = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashed });
    console.log('Admin user created');
    process.exit();
  })
  .catch(err => console.error(err));
