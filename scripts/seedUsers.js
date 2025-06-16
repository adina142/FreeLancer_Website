const mongoose = require('mongoose');
const User = require('../models/User');

async function seedUsers() {
  await mongoose.connect('mongodb://localhost:27017/freelancer');
  for (let i = 1; i <= 50; i++) {
    await User.create({ username: 'User'+i, email: 'user'+i+'@mail.com' });
  }
  console.log('50 users seeded!');
  mongoose.disconnect();
}
seedUsers();
