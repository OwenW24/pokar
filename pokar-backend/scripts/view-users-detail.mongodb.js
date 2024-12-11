
// Switch to your database
use('pokar');

// View all users with full details including hashed passwords
console.log('All users (with hashed passwords):');
db.users.find().pretty();

// View users in a more readable format (excluding sensitive data)
console.log('\nUser-friendly view:');
db.users.find().forEach(user => {
  print(`Username: ${user.username}`);
  print(`Email: ${user.email}`);
  print(`Account created: ${user.createdAt}`);
  print(`Password hash: ${user.password.substr(0, 10)}...`);
  print('------------------------');
});

// Some useful queries:

// Count users by creation date
console.log('\nUsers by creation date:');
db.users.aggregate([
  {
    $group: {
      _id: { 
        year: { $year: "$createdAt" },
        month: { $month: "$createdAt" },
        day: { $dayOfMonth: "$createdAt" }
      },
      count: { $sum: 1 }
    }
  },
  { $sort: { "_id": 1 } }
]);

// Find duplicate emails (should be none if validation works)
console.log('\nChecking for duplicate emails:');
db.users.aggregate([
  {
    $group: {
      _id: "$email",
      count: { $sum: 1 }
    }
  },
  {
    $match: {
      count: { $gt: 1 }
    }
  }
]);