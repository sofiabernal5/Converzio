const db = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  // Create a new user
  static async create(userData) {
    const { email, password, authProvider = 'email', authProviderId, firstName, lastName, profilePicture, linkedinProfile } = userData;
    
    return new Promise(async (resolve, reject) => {
      try {
        // Hash password if provided (for email auth)
        let hashedPassword = null;
        if (password && authProvider === 'email') {
          hashedPassword = await bcrypt.hash(password, 10);
        }

        const query = `
          INSERT INTO users (email, password, auth_provider, auth_provider_id, first_name, last_name, profile_picture, linkedin_profile)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        db.run(query, [email, hashedPassword, authProvider, authProviderId, firstName, lastName, profilePicture, linkedinProfile], function(err) {
          if (err) {
            if (err.message.includes('UNIQUE constraint failed')) {
              reject(new Error('User with this email already exists'));
            } else {
              reject(err);
            }
          } else {
            resolve({ id: this.lastID, email, authProvider });
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  // Find user by email
  static findByEmail(email) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users WHERE email = ?';
      db.get(query, [email], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  // Find user by ID
  static findById(id) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users WHERE id = ?';
      db.get(query, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  // Find user by OAuth provider
  static findByOAuthProvider(provider, providerId) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users WHERE auth_provider = ? AND auth_provider_id = ?';
      db.get(query, [provider, providerId], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  // Verify password
  static async verifyPassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  // Update user
  static update(id, updates) {
    return new Promise((resolve, reject) => {
      const fields = [];
      const values = [];

      Object.keys(updates).forEach(key => {
        if (updates[key] !== undefined) {
          fields.push(`${key} = ?`);
          values.push(updates[key]);
        }
      });

      if (fields.length === 0) {
        resolve({ id });
        return;
      }

      values.push(id);
      const query = `UPDATE users SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;

      db.run(query, values, function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id, changes: this.changes });
        }
      });
    });
  }

  // Delete user
  static delete(id) {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM users WHERE id = ?';
      db.run(query, [id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ deleted: this.changes > 0 });
        }
      });
    });
  }
}

module.exports = User; 