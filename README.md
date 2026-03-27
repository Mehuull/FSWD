# Daily Journal - MERN Stack Application

A beautiful, feature-rich daily journal and mood tracking application built with the MERN stack (MongoDB, Express.js, React, Node.js) using Vite for the frontend.

## 🚀 Features

### Core Features
- ✅ **Complete CRUD Operations** - Create, read, update, and delete journal entries
- 😊 **Mood Tracking** - Track 10 different moods with emojis and colors
- 🎨 **Gender-Based Themes** - Personalized color themes (Male, Female, Other)
- 🌙 **Dark/Light Mode** - Toggle between themes with persistent storage
- 🔍 **Search & Filter** - Search entries and filter by mood, date range
- 📊 **Statistics Dashboard** - View insights, word count, mood breakdown
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🔐 **Secure Authentication** - JWT-based auth with bcrypt password hashing

### Technical Features
- **Backend**: Modular architecture with separate controllers, routes, models, middleware
- **Frontend**: Vite + React with context API for state management
- **Database**: MongoDB with Mongoose ODM
- **API**: RESTful API with proper error handling
- **Security**: JWT tokens, password hashing, input validation

## 📁 Project Structure

```
mern-journal/
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   └── journalController.js # Journal CRUD logic
│   ├── middleware/
│   │   ├── auth.js              # JWT authentication
│   │   └── errorHandler.js      # Error handling
│   ├── models/
│   │   ├── User.js              # User schema
│   │   └── Journal.js           # Journal schema
│   ├── routes/
│   │   ├── authRoutes.js        # Auth endpoints
│   │   └── journalRoutes.js     # Journal endpoints
│   ├── server.js                # Express server
│   ├── package.json
│   └── env.example              # Environment variables template
│
└── frontend/
    ├── src/
    │   ├── components/          # Reusable components
    │   ├── pages/               # Page components
    │   ├── services/            # API services
    │   ├── context/             # React context
    │   ├── utils/               # Utility functions
    │   ├── App.jsx              # Main app component
    │   ├── main.jsx             # Entry point
    │   └── index.css            # Global styles
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd mern-journal/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp env.example .env
   ```

4. **Configure environment variables in `.env`**
   ```env
   NODE_ENV=development
   PORT=5000
   
   # For local MongoDB:
   MONGODB_URI=mongodb://localhost:27017/daily-journal
   
   # For MongoDB Atlas (replace with your connection string):
   # MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/daily-journal?retryWrites=true&w=majority
   
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   JWT_EXPIRE=7d
   ```

5. **Start the backend server**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd mern-journal/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file (optional)**
   ```bash
   # Create .env file if you want to customize API URL
   echo "VITE_API_URL=http://localhost:5000/api" > .env
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   App will open on `http://localhost:5173`

## 📝 Environment Variables

### Backend (.env)
| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NODE_ENV` | Environment mode | development | No |
| `PORT` | Server port | 5000 | No |
| `MONGODB_URI` | MongoDB connection string | - | **Yes** |
| `JWT_SECRET` | Secret key for JWT | - | **Yes** |
| `JWT_EXPIRE` | JWT expiration time | 7d | No |

### Frontend (.env)
| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `VITE_API_URL` | Backend API URL | http://localhost:5000/api | No |

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)
- `PUT /api/auth/profile` - Update profile (Protected)
- `PUT /api/auth/change-password` - Change password (Protected)

### Journal Entries
- `GET /api/journal` - Get all entries with filters (Protected)
- `GET /api/journal/:id` - Get single entry (Protected)
- `POST /api/journal` - Create new entry (Protected)
- `PUT /api/journal/:id` - Update entry (Protected)
- `DELETE /api/journal/:id` - Delete entry (Protected)
- `GET /api/journal/stats/summary` - Get statistics (Protected)
- `PATCH /api/journal/:id/favorite` - Toggle favorite (Protected)

### Query Parameters for GET /api/journal
- `mood` - Filter by mood
- `search` - Search in title/content
- `startDate` - Filter from date
- `endDate` - Filter to date
- `isFavorite` - Filter favorites
- `page` - Page number (pagination)
- `limit` - Items per page

## 🎨 Theming

### Gender-Based Colors
- **Male**: Blue tones (#1e3a5f, #2980b9)
- **Female**: Pink/Magenta tones (#d63384, #e91e63)
- **Other**: Purple tones (#6c5ce7, #a29bfe)

### Mood Colors
Each mood has a unique color and emoji:
- Happy 😊 - Gold
- Sad 😢 - Blue
- Angry 😠 - Red
- Stressed 😰 - Tomato
- Calm 😌 - Sky Blue
- Motivated 💪 - Green
- Tired 😴 - Purple
- Grateful 🙏 - Pink
- Anxious 😟 - Orange
- Peaceful ☮️ - Light Green

## 🚀 Deployment

### Backend Deployment (Heroku/Railway/Render)
1. Set environment variables on your platform
2. Ensure MongoDB Atlas is configured
3. Deploy using Git or platform CLI

### Frontend Deployment (Vercel/Netlify)
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder
3. Set `VITE_API_URL` to your backend URL

## 📦 Database Models

### User Model
```javascript
{
  username: String (unique, required, 3-30 chars)
  email: String (unique, required, valid email)
  password: String (required, hashed, min 6 chars)
  gender: String (enum: male/female/other)
  profilePicture: String
  isActive: Boolean
  createdAt: Date
  updatedAt: Date
}
```

### Journal Model
```javascript
{
  userId: ObjectId (ref: User, required)
  title: String (required, max 200 chars)
  content: String (required, min 10 chars)
  mood: String (enum: 10 moods, required)
  date: Date
  wordCount: Number (auto-calculated)
  tags: [String] (max 10)
  isFavorite: Boolean
  isPrivate: Boolean
  createdAt: Date
  updatedAt: Date
}
```

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with bcryptjs
- Protected routes with middleware
- Input validation
- Error handling
- CORS configuration
- Secure HTTP headers

## 🧪 Testing

```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

## 📄 License

MIT License - Feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues or questions, please create an issue in the repository.

---

**Built with ❤️ for better self-reflection and mental health awareness**
