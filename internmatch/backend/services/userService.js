const fs = require('fs').promises;
const path = require('path');

class UserService {
  constructor() {
    this.usersPath = path.join(__dirname, '../data/users.json');
    this.ensureDataDirectory();
  }

  async ensureDataDirectory() {
    const dataDir = path.join(__dirname, '../data');
    try {
      await fs.access(dataDir);
    } catch {
      await fs.mkdir(dataDir, { recursive: true });
    }
  }

  async loadUsers() {
    try {
      const data = await fs.readFile(this.usersPath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async saveUsers(users) {
    await fs.writeFile(this.usersPath, JSON.stringify(users, null, 2));
  }

  async createUser(userData) {
    try {
      const users = await this.loadUsers();
      
      // Check if user already exists
      const existingUser = users.find(user => user.phoneNumber === userData.phoneNumber);
      if (existingUser) {
        return existingUser;
      }

      const newUser = {
        id: userData.id,
        phoneNumber: userData.phoneNumber,
        name: userData.name,
        createdAt: userData.createdAt,
        updatedAt: new Date().toISOString()
      };

      users.push(newUser);
      await this.saveUsers(users);

      return newUser;
    } catch (error) {
      console.error('Create user error:', error);
      throw error;
    }
  }

  async findUserById(userId) {
    try {
      const users = await this.loadUsers();
      return users.find(user => user.id === userId);
    } catch (error) {
      console.error('Find user by ID error:', error);
      return null;
    }
  }

  async findUserByEmail(email) {
    try {
      const users = await this.loadUsers();
      return users.find(user => user.email === email);
    } catch (error) {
      console.error('Find user by email error:', error);
      return null;
    }
  }

  async findUserByPhone(phoneNumber) {
    try {
      const users = await this.loadUsers();
      return users.find(user => user.phoneNumber === phoneNumber);
    } catch (error) {
      console.error('Find user by phone error:', error);
      return null;
    }
  }

  async updateUser(userId, updateData) {
    try {
      const users = await this.loadUsers();
      const userIndex = users.findIndex(user => user.id === userId);

      if (userIndex === -1) {
        return null;
      }

      users[userIndex] = {
        ...users[userIndex],
        ...updateData,
        updatedAt: new Date().toISOString()
      };

      await this.saveUsers(users);
      return users[userIndex];
    } catch (error) {
      console.error('Update user error:', error);
      throw error;
    }
  }

  async deleteUser(userId) {
    try {
      const users = await this.loadUsers();
      const filteredUsers = users.filter(user => user.id !== userId);
      
      if (users.length === filteredUsers.length) {
        return false; // User not found
      }

      await this.saveUsers(filteredUsers);
      return true;
    } catch (error) {
      console.error('Delete user error:', error);
      throw error;
    }
  }

  async getAllUsers() {
    try {
      return await this.loadUsers();
    } catch (error) {
      console.error('Get all users error:', error);
      return [];
    }
  }
}

module.exports = new UserService();
