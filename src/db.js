const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./users.db');

// Define the owner ID
const OWNER_ID = 6059491264; // Replace with the actual owner ID

// Create a table for user IDs and roles
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            user_id INTEGER UNIQUE,
            role TEXT
        )
    `);

    // Insert the owner if not exists
    db.get('SELECT * FROM users WHERE user_id = ?', [OWNER_ID], (err, row) => {
        if (err) {
            console.error('Error querying the database:', err.message);
            return;
        }

        if (!row) {
            // Insert owner with role 'owner'
            db.run('INSERT INTO users (user_id, role) VALUES (?, ?)', [OWNER_ID, 'owner'], (err) => {
                if (err) {
                    console.error('Error inserting owner:', err.message);
                } else {
                    console.log('Owner inserted successfully');
                }
            });
        } else {
            console.log('');
        }
    });
});

module.exports = db;
