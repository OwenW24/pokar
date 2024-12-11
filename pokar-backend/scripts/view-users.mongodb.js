
// Switch to your database
use('pokar');

// View all users
console.log('All users:');
db.users.find().pretty();

// Count total users
console.log('\nTotal users:', db.users.count());

// Find specific user by email
console.log('\nFind user by email:');
db.users.findOne({ email: 'test@example.com' });

// Find recently created users (last 24 hours)
console.log('\nRecent users:');
db.users.find({
  createdAt: {
    $gte: new Date(Date.now() - 24*60*60*1000)
  }
}).pretty();

// Optional: Delete test users
// db.users.deleteMany({ email: /test.*@example.com/ });