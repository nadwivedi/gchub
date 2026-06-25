require('dotenv').config();
const mongoose = require('mongoose');
const readline = require('readline');
const User = require('../models/User');
const connectToDb = require('../config/mongodb');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const createAdmin = async () => {
  try {
    // Connect to database
    await connectToDb();
    
    console.log('\n--- Create Admin User ---');
    
    rl.question('Enter admin email: ', (email) => {
      rl.question('Enter admin password: ', async (password) => {
        try {
          if (!email || !password) {
            console.log('\nError: Email and password are required!');
            process.exit(1);
          }

          // Check if user already exists
          const existingUser = await User.findOne({ email: email.toLowerCase() });
          if (existingUser) {
            console.log('\nError: User with this email already exists!');
            process.exit(1);
          }

          // Create admin user with dummy values for required fields
          const admin = new User({
            fullName: 'System Admin',
            email: email,
            password: password,
            phone: '0000000000',
            role: 'admin',
            isEmailVerified: true,
            isPhoneVerified: true
          });

          await admin.save();
          
          console.log('\n✅ Admin created successfully!');
          console.log(`Email: ${email}`);
          console.log(`Role: admin`);
          
        } catch (error) {
          console.error('\n❌ Error creating admin:', error.message);
        } finally {
          await mongoose.connection.close();
          rl.close();
          process.exit(0);
        }
      });
    });
  } catch (error) {
    console.error('\nDatabase connection failed:', error.message);
    process.exit(1);
  }
};

createAdmin();
