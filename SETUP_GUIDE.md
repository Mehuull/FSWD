# 🚀 Quick Start Guide - Daily Journal MERN App

## ✅ What You Need to Do

### 1. Environment Variables Setup

#### Backend (.env file)
Create a `.env` file in `mern-journal/backend/` directory:

```env
NODE_ENV=development
PORT=5000

# MongoDB Configuration
# Option 1: Local MongoDB
MONGODB_URI=mongodb://localhost:27017/daily-journal

# Option 2: MongoDB Atlas (Recommended for production)
# MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/daily-journal?retryWrites=true&w=majority

# JWT Secret (IMPORTANT: Change this to a random string)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
JWT_EXPIRE=7d
```

**🔴 REQUIRED: You must provide:**
1. **MONGODB_URI** - Your MongoDB connection string
2. **JWT_SECRET** - A secure random string (change the example above)

#### Frontend (.env file - Optional)
Create a `.env` file in `mern-journal/frontend/` directory (optional):

```env
VITE_API_URL=http://localhost:5000/api
```

### 2. MongoDB Setup

#### Option A: Local MongoDB
1. Install MongoDB Community Edition from https://www.mongodb.com/try/download/community
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/daily-journal`

#### Option B: MongoDB Atlas (Cloud - Recommended)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster (Free M0 tier available)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database user password
7. Replace `<dbname>` with `daily-journal`

Example:
```
mongodb+srv://myuser:mypassword@cluster0.abc123.mongodb.net/daily-journal?retryWrites=true&w=majority
```

### 3. Installation Steps

#### Backend Setup
```bash
# Navigate to backend
cd mern-journal/backend

# Install dependencies
npm install

# Create .env file (copy from env.example and fill in your values)
# Windows:
copy env.example .env
# Mac/Linux:
cp env.example .env

# Edit .env file and add your MongoDB URI and JWT Secret

# Start the backend server
npm run dev
```

Backend will run on: http://localhost:5000

#### Frontend Setup
```bash
# Navigate to frontend (open a new terminal)
cd mern-journal/frontend

# Install dependencies
npm install

# (Optional) Create .env file
# Windows:
copy env.example .env
# Mac/Linux:
cp env.example .env

# Start the frontend development server
npm run dev
```

Frontend will run on: http://localhost:5173

### 4. Testing the Application

1. Open your browser and go to http://localhost:5173
2. Click "Sign Up" to create a new account
3. Fill in:
   - Username (min 3 characters)
   - Email
   - Password (min 6 characters)
   - Gender (for theme personalization)
4. After registration, you'll be logged in automatically
5. Click "New Entry" to create your first journal entry!

## 📋 Checklist

- [ ] MongoDB is running (local) or MongoDB Atlas cluster is created
- [ ] Backend `.env` file created with MONGODB_URI and JWT_SECRET
- [ ] Backend dependencies installed (`npm install` in backend folder)
- [ ] Backend server running (`npm run dev` in backend folder)
- [ ] Frontend dependencies installed (`npm install` in frontend folder)
- [ ] Frontend server running (`npm run dev` in frontend folder)
- [ ] Can access http://localhost:5173 in browser
- [ ] Can register a new user
- [ ] Can create a journal entry

## 🔧 Troubleshooting

### Backend won't start
- **Error: "MONGODB_URI is not defined"**
  - Make sure you created `.env` file in backend folder
  - Check that MONGODB_URI is set correctly

- **Error: "MongooseServerSelectionError"**
  - MongoDB is not running (if using local)
  - Check your MongoDB Atlas connection string
  - Ensure your IP is whitelisted in MongoDB Atlas
  - Check username/password in connection string

- **Error: "Port 5000 already in use"**
  - Change PORT in `.env` to another port (e.g., 5001)
  - Or stop the process using port 5000

### Frontend won't start
- **Error: "Cannot connect to backend"**
  - Make sure backend is running on port 5000
  - Check VITE_API_URL in frontend `.env` (if created)

- **Error: "Port 5173 already in use"**
  - Vite will automatically use next available port
  - Or stop the process using port 5173

### Can't register/login
- Check browser console for errors (F12)
- Check backend terminal for error messages
- Ensure MongoDB connection is successful
- Try a different email/username

## 🎨 Features to Try

1. **Create Entries** - Write journal entries with different moods
2. **Dark Mode** - Toggle dark/light theme
3. **Filter** - Filter entries by mood or date range
4. **Search** - Search through your entries
5. **Statistics** - View your writing stats and mood breakdown
6. **Edit/Delete** - Manage your entries

## 📚 API Testing (Optional)

You can test the API using tools like Postman or Thunder Client:

### Register User
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123",
  "gender": "other"
}
```

### Login
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

### Create Journal Entry (requires token)
```
POST http://localhost:5000/api/journal
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "title": "My First Entry",
  "content": "Today was a great day! I learned so much about MERN stack development.",
  "mood": "happy"
}
```

## 🚀 Next Steps

1. Customize the theme colors in `frontend/src/index.css`
2. Add more features (export entries, sharing, etc.)
3. Deploy to production (Vercel for frontend, Railway/Render for backend)
4. Add more moods or customize existing ones
5. Implement data visualization for mood trends

## 📞 Need Help?

- Check the main README.md for detailed documentation
- Review the code comments in each file
- Check MongoDB connection logs
- Verify all environment variables are set correctly

---

**Happy Journaling! 📝✨**
