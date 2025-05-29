const db = require('./database');

// Initialize database tables
const initDatabase = () => {
  // Disable foreign keys temporarily for table creation
  db.run('PRAGMA foreign_keys = OFF');

  // Users table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT,
      auth_provider TEXT DEFAULT 'email',
      auth_provider_id TEXT,
      first_name TEXT,
      last_name TEXT,
      profile_picture TEXT,
      linkedin_profile TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('Error creating users table:', err);
    } else {
      console.log('Users table created successfully');
      
      // User sessions table
      db.run(`
        CREATE TABLE IF NOT EXISTS user_sessions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER NOT NULL,
          token TEXT UNIQUE NOT NULL,
          expires_at DATETIME NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
        )
      `, (err) => {
        if (err) {
          console.error('Error creating user_sessions table:', err);
        } else {
          console.log('User sessions table created successfully');
          
          // OAuth tokens table (for storing OAuth provider tokens)
          db.run(`
            CREATE TABLE IF NOT EXISTS oauth_tokens (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              user_id INTEGER NOT NULL,
              provider TEXT NOT NULL,
              access_token TEXT NOT NULL,
              refresh_token TEXT,
              expires_at DATETIME,
              created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
              updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
              FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
            )
          `, (err) => {
            if (err) {
              console.error('Error creating oauth_tokens table:', err);
            } else {
              console.log('OAuth tokens table created successfully');
              
              // Create indexes for better performance
              db.run('CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)');
              db.run('CREATE INDEX IF NOT EXISTS idx_users_auth_provider ON users(auth_provider, auth_provider_id)');
              db.run('CREATE INDEX IF NOT EXISTS idx_sessions_token ON user_sessions(token)');
              db.run('CREATE INDEX IF NOT EXISTS idx_sessions_user ON user_sessions(user_id)');
              
              // Re-enable foreign keys
              db.run('PRAGMA foreign_keys = ON');
              
              console.log('Database initialization complete');
            }
          });
        }
      });
    }
  });
};

// Run initialization
initDatabase();

// Close database connection after initialization
setTimeout(() => {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err);
    } else {
      console.log('Database connection closed');
    }
  });
}, 1000); 