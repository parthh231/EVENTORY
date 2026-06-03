require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const email = 'admin@example.com';
    const password = 'AdminPass123';
    const hash = await bcrypt.hash(password, 10);
    const user = await User.findOneAndUpdate(
      { email },
      { $set: { name: 'Admin', email, password: hash, role: 'admin', isVerified: true } },
      { upsert: true, new: true }
    );
    console.log('ADMIN_CREATED_OR_UPDATED:', user.email);
    console.log('Use these credentials to log in:');
    console.log('  email:', email);
    console.log('  password:', password);
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('ERR', err);
    process.exit(1);
  }
})();
