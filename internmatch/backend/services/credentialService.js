const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcryptjs');

class CredentialService {
  constructor() {
    this.credentialsPath = path.join(__dirname, '../data/credentials.json');
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

  async loadCredentials() {
    try {
      const data = await fs.readFile(this.credentialsPath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async saveCredentials(list) {
    await fs.writeFile(this.credentialsPath, JSON.stringify(list, null, 2));
  }

  async findByUsername(username) {
    const list = await this.loadCredentials();
    return list.find(c => c.username.toLowerCase() === String(username).toLowerCase());
  }

  async findByEmail(email) {
    const list = await this.loadCredentials();
    return list.find(c => (c.email || '').toLowerCase() === String(email || '').toLowerCase());
  }

  async createCredential({ userId, username, email, passwordPlain }) {
    const list = await this.loadCredentials();

    if (await this.findByUsername(username)) {
      throw new Error('Username already exists');
    }
    if (email && await this.findByEmail(email)) {
      throw new Error('Email already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(passwordPlain, salt);

    const record = {
      userId,
      username,
      email: email || null,
      passwordHash,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    list.push(record);
    await this.saveCredentials(list);
    return record;
  }

  async verifyPassword(usernameOrEmail, passwordPlain) {
    const byUsername = await this.findByUsername(usernameOrEmail);
    const cred = byUsername || await this.findByEmail(usernameOrEmail);
    if (!cred) return null;
    const ok = await bcrypt.compare(passwordPlain, cred.passwordHash);
    return ok ? cred : null;
  }
}

module.exports = new CredentialService();


