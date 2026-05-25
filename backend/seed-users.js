const sqlite3 = require('sqlite3');
const bcryptjs = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const db = new sqlite3.Database('./smartloan.db');

// Dummy users data
const users = [
  { firstName: 'Smartloan', lastName: 'Admin', email: 'admin@smartloan.com', password: 'Smartloan@123' },
  { firstName: 'John', lastName: 'Doe', email: 'john.doe@smartloan.com', password: 'Smartloan@123' },
  { firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@smartloan.com', password: 'Smartloan@123' },
  { firstName: 'Robert', lastName: 'Johnson', email: 'robert.j@smartloan.com', password: 'Smartloan@123' },
  { firstName: 'Emily', lastName: 'Williams', email: 'emily.w@smartloan.com', password: 'Smartloan@123' },
  { firstName: 'Michael', lastName: 'Brown', email: 'michael.b@smartloan.com', password: 'Smartloan@123' },
  { firstName: 'Sarah', lastName: 'Davis', email: 'sarah.d@smartloan.com', password: 'Smartloan@123' },
  { firstName: 'David', lastName: 'Miller', email: 'david.m@smartloan.com', password: 'Smartloan@123' },
  { firstName: 'Lisa', lastName: 'Wilson', email: 'lisa.w@smartloan.com', password: 'Smartloan@123' },
  { firstName: 'James', lastName: 'Moore', email: 'james.m@smartloan.com', password: 'Smartloan@123' }
];

async function hashPassword(password) {
  return bcryptjs.hash(password, 10);
}

async function seedUsers() {
  console.log('🌱 Starting database seeding...');
  
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const hashedPassword = await hashPassword(user.password);
    const userId = uuidv4();
    const now = new Date().toISOString();

    const sql = `INSERT INTO users (
      id, firstName, lastName, email, password, phoneNumber, isEmailVerified, 
      isPhoneVerified, dateOfBirth, address, city, state, zipCode, panNumber, 
      aadhaarNumber, isActive, role, createdAt, updatedAt, lastLoginAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.run(sql, [
      userId,
      user.firstName,
      user.lastName,
      user.email,
      hashedPassword,
      '',  // phoneNumber
      1,   // isEmailVerified
      0,   // isPhoneVerified
      null, // dateOfBirth
      '',   // address
      '',   // city
      '',   // state
      '',   // zipCode
      '',   // panNumber
      '',   // aadhaarNumber
      1,    // isActive
      'user', // role
      now,  // createdAt
      now,  // updatedAt
      null  // lastLoginAt
    ], function(err) {
      if (err) {
        console.error(`❌ Error creating user ${user.email}:`, err.message);
      } else {
        console.log(`✅ Created user: ${user.email}`);
      }
    });
  }

  setTimeout(() => {
    db.all('SELECT COUNT(*) as count FROM users', (err, rows) => {
      if (err) {
        console.log('❌ Error querying users:', err);
      } else {
        console.log(`\n✨ Database seeding complete! Total users: ${rows[0]?.count || 0}`);
        console.log('\n📝 Test Credentials (all with password: Smartloan@123):');
        users.forEach(user => {
          console.log(`   📧 ${user.email}`);
        });
      }
      db.close();
      process.exit(0);
    });
  }, 2000);
}

seedUsers().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
