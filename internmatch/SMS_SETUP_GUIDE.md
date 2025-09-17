# 📱 SMS Setup Guide for InternMatch

To receive OTP codes via SMS on your phone, you need to set up Twilio (a popular SMS service).

## 🚀 Quick Setup Steps

### 1. Create a Twilio Account
1. Go to [https://www.twilio.com](https://www.twilio.com)
2. Sign up for a free account
3. Verify your phone number

### 2. Get Your Twilio Credentials
1. Go to your [Twilio Console Dashboard](https://console.twilio.com/)
2. Find your **Account SID** and **Auth Token** on the main dashboard
3. Buy a phone number:
   - Go to Phone Numbers → Manage → Buy a number
   - Choose a number that supports SMS
   - Complete the purchase (free trial includes $15 credit)

### 3. Configure Your Backend
1. Create a file called `.env` in the `backend` folder
2. Add your Twilio credentials:

```env
PORT=5000
JWT_SECRET=internmatch_jwt_secret_key_2024_secure
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+1234567890
NODE_ENV=development
```

**Replace:**
- `ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` with your Account SID
- `your_auth_token_here` with your Auth Token
- `+1234567890` with your Twilio phone number

### 4. Restart the Backend
```bash
cd backend
npm start
```

## 🧪 Testing
1. Go to http://localhost:3000
2. Enter your phone number (with country code, e.g., +1234567890)
3. Check your phone for the SMS with the OTP code!

## 💰 Cost
- Twilio free trial: $15 credit
- SMS cost: ~$0.0075 per message
- You can send ~2000 SMS messages with the free trial

## 🔧 Alternative: Use Console for Testing
If you don't want to set up Twilio right now, the system will show OTP codes in the backend console for testing purposes.

## 🆘 Troubleshooting
- Make sure your phone number includes country code (+1 for US)
- Check that your Twilio account is verified
- Ensure you have sufficient balance in your Twilio account
- Verify the phone number format (e.g., +1234567890)
