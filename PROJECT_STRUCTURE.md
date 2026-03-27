# 📁 Project Structure - Daily Journal MERN App

## Complete File Tree

```
mern-journal/
│
├── README.md                          # Main documentation
├── SETUP_GUIDE.md                     # Quick start guide
│
├── backend/                           # Backend (Node.js + Express + MongoDB)
│   ├── config/
│   │   └── database.js               # MongoDB connection configuration
│   │
│   ├── controllers/
│   │   ├── authController.js         # Authentication logic (register, login, profile)
│   │   └── journalController.js      # Journal CRUD operations & statistics
│   │
│   ├── middleware/
│   │   ├── auth.js                   # JWT authentication middleware
│   │   └── errorHandler.js           # Centralized error handling
│   │
│   ├── models/
│   │   ├── User.js                   # User schema (username, email, password, gender)
│   │   └── Journal.js                # Journal schema (title, content, mood, date)
│   │
│   ├── routes/
│   │   ├── authRoutes.js             # Authentication endpoints
│   │   └── journalRoutes.js          # Journal endpoints
│   │
│   ├── server.js                      # Main Express server
│   ├── package.json                   # Backend dependencies
│   ├── env.example                    # Environment variables template
│   └── .gitignore                     # Git ignore rules
│
└── frontend/                          # Frontend (React + Vite)
    ├── public/                        # Static assets
    │
    ├── src/
    │   ├── components/                # Reusable React components
    │   │   ├── Header.jsx            # App header with user info & theme toggle
    │   │   ├── Header.css
    │   │   ├── JournalList.jsx       # Display list of journal entries
    │   │   ├── JournalList.css
    │   │   ├── JournalEditor.jsx     # Modal for creating/editing entries
    │   │   ├── JournalEditor.css
    │   │   ├── StatsPanel.jsx        # Statistics dashboard
    │   │   ├── StatsPanel.css
    │   │   ├── FilterPanel.jsx       # Filter & search panel
    │   │   └── FilterPanel.css
    │   │
    │   ├── pages/                     # Page components
    │   │   ├── AuthPage.jsx          # Login/Register page
    │   │   ├── AuthPage.css
    │   │   ├── DashboardPage.jsx     # Main dashboard
    │   │   └── DashboardPage.css
    │   │
    │   ├── services/                  # API services
    │   │   ├── api.js                # Axios instance with interceptors
    │   │   └── journalService.js     # Auth & Journal API calls
    │   │
    │   ├── context/                   # React Context
    │   │   └── AuthContext.jsx       # Authentication state management
    │   │
    │   ├── utils/                     # Utility functions
    │   │   ├── constants.js          # Moods, themes, helper functions
    │   │   └── dateUtils.js          # Date formatting utilities
    │   │
    │   ├── App.jsx                    # Main app component with routing
    │   ├── App.css                    # App-specific styles
    │   ├── main.jsx                   # React entry point
    │   └── index.css                  # Global styles & design system
    │
    ├── index.html                     # HTML entry point
    ├── vite.config.js                 # Vite configuration
    ├── package.json                   # Frontend dependencies
    ├── env.example                    # Environment variables template
    └── .gitignore                     # Git ignore rules
```

## File Descriptions

### Backend Files

#### Configuration
- **database.js**: MongoDB connection with error handling and event listeners

#### Controllers
- **authController.js**: 
  - `register()` - User registration with validation
  - `login()` - User authentication
  - `getMe()` - Get current user profile
  - `updateProfile()` - Update user information
  - `changePassword()` - Change user password

- **journalController.js**:
  - `getJournals()` - Get all entries with filtering & pagination
  - `getJournalById()` - Get single entry
  - `createJournal()` - Create new entry
  - `updateJournal()` - Update existing entry
  - `deleteJournal()` - Delete entry
  - `getStats()` - Get user statistics
  - `toggleFavorite()` - Toggle favorite status

#### Middleware
- **auth.js**: JWT token verification and user authentication
- **errorHandler.js**: Centralized error handling for consistent responses

#### Models
- **User.js**: 
  - Fields: username, email, password (hashed), gender, profilePicture, isActive
  - Methods: comparePassword(), toJSON()
  - Pre-save hook for password hashing

- **Journal.js**:
  - Fields: userId, title, content, mood, date, wordCount, tags, isFavorite, isPrivate
  - Indexes for efficient querying
  - Pre-save hook for word count calculation
  - Virtual for formatted date

#### Routes
- **authRoutes.js**: Authentication endpoints (register, login, profile)
- **journalRoutes.js**: Journal CRUD endpoints with authentication

#### Server
- **server.js**: Express app setup, middleware, routes, error handling

### Frontend Files

#### Components
- **Header**: Navigation bar with logo, user info, theme toggle, logout
- **JournalList**: Grid of journal entry cards with edit/delete actions
- **JournalEditor**: Modal form for creating/editing entries with mood selector
- **StatsPanel**: Statistics cards and mood breakdown visualization
- **FilterPanel**: Search and filter controls (mood, date range)

#### Pages
- **AuthPage**: Combined login/register page with form validation
- **DashboardPage**: Main app view with sidebar and journal list

#### Services
- **api.js**: Configured Axios instance with request/response interceptors
- **journalService.js**: API methods for auth and journal operations

#### Context
- **AuthContext**: Global authentication state (user, token, login, logout)

#### Utils
- **constants.js**: Mood definitions, theme colors, helper functions
- **dateUtils.js**: Date formatting functions using date-fns

#### Styles
- **index.css**: 
  - CSS custom properties (variables)
  - Dark/light mode themes
  - Gender-based color themes
  - Utility classes
  - Responsive design
  - Animations

## Key Features by File

### Authentication Flow
1. User fills form in `AuthPage.jsx`
2. Calls `authService.register()` or `authService.login()`
3. Backend `authController.js` validates and creates/verifies user
4. Returns JWT token
5. `AuthContext.jsx` stores token and user data
6. Token added to all requests via `api.js` interceptor

### Journal Entry Flow
1. User clicks "New Entry" in `DashboardPage.jsx`
2. `JournalEditor.jsx` modal opens
3. User fills form and selects mood from `constants.js`
4. Calls `journalService.create()`
5. Backend `journalController.js` creates entry
6. `Journal.js` model calculates word count
7. Entry saved to MongoDB
8. `DashboardPage.jsx` refreshes list

### Theme System
1. User gender stored in `User.js` model
2. Gender theme applied via CSS custom properties in `index.css`
3. Dark/light mode toggle in `Header.jsx`
4. Theme attributes set on `<html>` element in `App.jsx`
5. All components use CSS variables for consistent theming

## Dependencies

### Backend
- **express**: Web framework
- **mongoose**: MongoDB ODM
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT authentication
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variables
- **morgan**: HTTP request logger
- **express-validator**: Input validation

### Frontend
- **react**: UI library
- **react-dom**: React DOM rendering
- **react-router-dom**: Client-side routing
- **axios**: HTTP client
- **lucide-react**: Icon library
- **date-fns**: Date manipulation
- **vite**: Build tool and dev server

## Environment Variables Required

### Backend (.env)
```
MONGODB_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_secret_key>
PORT=5000 (optional)
NODE_ENV=development (optional)
JWT_EXPIRE=7d (optional)
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api (optional)
```

## API Endpoints Summary

### Auth Routes (/api/auth)
- POST /register
- POST /login
- GET /me (protected)
- PUT /profile (protected)
- PUT /change-password (protected)

### Journal Routes (/api/journal)
- GET / (protected, with query params)
- POST / (protected)
- GET /:id (protected)
- PUT /:id (protected)
- DELETE /:id (protected)
- GET /stats/summary (protected)
- PATCH /:id/favorite (protected)

## Database Collections

### users
- Stores user accounts with hashed passwords
- Indexed on email and username

### journals
- Stores journal entries
- Indexed on userId, date, and mood
- References users collection

---

This structure follows best practices for MERN stack applications with:
- ✅ Separation of concerns
- ✅ Modular architecture
- ✅ Reusable components
- ✅ Centralized state management
- ✅ Proper error handling
- ✅ Security best practices
- ✅ Scalable file organization
