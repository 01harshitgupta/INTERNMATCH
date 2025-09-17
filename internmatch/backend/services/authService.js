const fs = require('fs').promises;
const path = require('path');

class AuthService {
  constructor() {
    this.otpStoragePath = path.join(__dirname, '../data/otp-sessions.json');
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

  async loadOTPSessions() {
    try {
      const data = await fs.readFile(this.otpStoragePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return {};
    }
  }

  async saveOTPSessions(sessions) {
    await fs.writeFile(this.otpStoragePath, JSON.stringify(sessions, null, 2));
  }

  generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  formatPhoneNumber(phoneNumber) {
    // Remove all non-digit characters
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    // If it starts with 91, assume it's already formatted
    if (cleaned.startsWith('91') && cleaned.length === 12) {
      return `+${cleaned}`;
    }
    
    // If it's 10 digits, assume it's an Indian number and add +91
    if (cleaned.length === 10) {
      return `+91${cleaned}`;
    }
    
    // If it's 11 digits and starts with 0, remove 0 and add +91
    if (cleaned.length === 11 && cleaned.startsWith('0')) {
      return `+91${cleaned.substring(1)}`;
    }
    
    // If it already has +, return as is
    if (phoneNumber.startsWith('+')) {
      return phoneNumber;
    }
    
    // Default: assume it's an Indian number
    return `+91${cleaned}`;
  }

  async sendOTP(email) {
    try {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return {
          success: false,
          error: 'Invalid email format'
        };
      }

      const otp = this.generateOTP();
      const sessionId = require('uuid').v4();
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

      const sessions = await this.loadOTPSessions();
      sessions[sessionId] = {
        email: email,
        otp,
        expiresAt: expiresAt.toISOString(),
        attempts: 0
      };

      await this.saveOTPSessions(sessions);

      // Send email OTP
      const emailSent = await this.sendEmailOTP(email, otp);
      
      if (emailSent) {
        console.log(`✅ Email OTP sent to ${email}`);
        return {
          success: true,
          sessionId,
          message: 'OTP sent to your email'
        };
      } else {
        // Fallback to console log
        console.log(`\n🔐 OTP for ${email}: ${otp}\n`);
        console.log('📧 Email service not available, check console for OTP');
        return {
          success: true,
          sessionId,
          message: `OTP sent to your email (check console: ${otp})`
        };
      }
    } catch (error) {
      console.error('Send OTP error:', error);
      return {
        success: false,
        error: 'Failed to send OTP'
      };
    }
  }

  async sendEmailOTP(email, otp) {
    try {
      // Using Nodemailer for email sending
      const nodemailer = require('nodemailer');
      
      // Create transporter using Gmail SMTP
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER || 'your-email@gmail.com',
          pass: process.env.EMAIL_PASS || 'your-app-password'
        }
      });

      const mailOptions = {
        from: process.env.EMAIL_USER || 'your-email@gmail.com',
        to: email,
        subject: 'InternMatch - Verification Code',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">InternMatch Verification</h2>
            <p>Your verification code is:</p>
            <div style="background-color: #f3f4f6; padding: 20px; text-align: center; margin: 20px 0;">
              <h1 style="color: #2563eb; font-size: 32px; margin: 0; letter-spacing: 5px;">${otp}</h1>
            </div>
            <p>This code will expire in 5 minutes.</p>
            <p>If you didn't request this code, please ignore this email.</p>
            <hr style="margin: 20px 0;">
            <p style="color: #6b7280; font-size: 12px;">This is an automated message from InternMatch.</p>
          </div>
        `
      };

      await transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error('Email sending error:', error.message);
      return false;
    }
  }

  async sendSMS(phoneNumber, otp) {
    // Try multiple SMS services for better reliability
    
    // Method 1: Try a simple working SMS service
    if (await this.sendViaSimpleSMS(phoneNumber, otp)) {
      return true;
    }
    
    // Method 2: Try TextBelt (free service)
    if (await this.sendViaTextBelt(phoneNumber, otp)) {
      return true;
    }
    
    // Method 3: Try Twilio if configured
    if (await this.sendViaTwilio(phoneNumber, otp)) {
      return true;
    }
    
    return false;
  }

  async sendViaTwilio(phoneNumber, otp) {
    try {
      const hasTwilioCredentials = process.env.TWILIO_ACCOUNT_SID && 
                                 process.env.TWILIO_AUTH_TOKEN && 
                                 process.env.TWILIO_PHONE_NUMBER &&
                                 !process.env.TWILIO_ACCOUNT_SID.includes('your_twilio');

      if (!hasTwilioCredentials) return false;

      const twilio = require('twilio');
      const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
      
      await client.messages.create({
        body: `Your InternMatch verification code is: ${otp}. This code expires in 5 minutes.`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phoneNumber
      });
      
      return true;
    } catch (error) {
      console.error('Twilio SMS error:', error.message);
      return false;
    }
  }

  async sendViaSimpleSMS(phoneNumber, otp) {
    try {
      // Using a working free SMS service
      const axios = require('axios');
      const response = await axios.get('https://www.fast2sms.com/dev/bulkV2', {
        params: {
          authorization: process.env.FAST2SMS_API_KEY || 'demo',
          message: `Your InternMatch verification code is: ${otp}. This code expires in 5 minutes.`,
          numbers: phoneNumber.replace('+91', ''),
          route: 'q',
          flash: 0
        }
      });
      
      return response.data.return === true;
    } catch (error) {
      console.error('SimpleSMS error:', error.message);
      return false;
    }
  }

  async sendViaTextBelt(phoneNumber, otp) {
    try {
      const axios = require('axios');
      const response = await axios.post('https://textbelt.com/text', {
        phone: phoneNumber,
        message: `Your InternMatch verification code is: ${otp}. This code expires in 5 minutes.`,
        key: 'textbelt' // Free tier
      });
      
      return response.data.success;
    } catch (error) {
      console.error('TextBelt SMS error:', error.message);
      return false;
    }
  }

  async sendViaMSG91(phoneNumber, otp) {
    try {
      // MSG91 is a popular Indian SMS service
      // You can get free credits by signing up
      const axios = require('axios');
      const response = await axios.get('https://api.msg91.com/api/sendhttp.php', {
        params: {
          authkey: process.env.MSG91_AUTH_KEY || 'your_msg91_key',
          mobiles: phoneNumber.replace('+', ''),
          message: `Your InternMatch verification code is: ${otp}. This code expires in 5 minutes.`,
          sender: 'INTERN',
          route: 4,
          country: 91
        }
      });
      
      return response.data.includes('SMS sent');
    } catch (error) {
      console.error('MSG91 SMS error:', error.message);
      return false;
    }
  }

  async verifyOTP(email, otp, sessionId) {
    try {
      const sessions = await this.loadOTPSessions();
      const session = sessions[sessionId];

      if (!session) {
        return {
          success: false,
          error: 'Invalid session'
        };
      }

      // Check if session has expired
      if (new Date() > new Date(session.expiresAt)) {
        delete sessions[sessionId];
        await this.saveOTPSessions(sessions);
        return {
          success: false,
          error: 'OTP has expired'
        };
      }

      // Check email match
      if (session.email !== email) {
        return {
          success: false,
          error: 'Email mismatch'
        };
      }

      // Check attempt limit
      if (session.attempts >= 3) {
        delete sessions[sessionId];
        await this.saveOTPSessions(sessions);
        return {
          success: false,
          error: 'Too many failed attempts'
        };
      }

      // Verify OTP
      if (session.otp !== otp) {
        session.attempts += 1;
        await this.saveOTPSessions(sessions);
        return {
          success: false,
          error: 'Invalid OTP'
        };
      }

      // OTP is valid, clean up session
      delete sessions[sessionId];
      await this.saveOTPSessions(sessions);

      return {
        success: true,
        message: 'OTP verified successfully'
      };
    } catch (error) {
      console.error('Verify OTP error:', error);
      return {
        success: false,
        error: 'Failed to verify OTP'
      };
    }
  }
}

module.exports = new AuthService();
