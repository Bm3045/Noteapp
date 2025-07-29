# Full-Stack Note Taking Application

A modern, responsive note-taking application built with React.js (TypeScript) frontend and Node.js backend, featuring Google OAuth authentication, email/OTP signup, and JWT-based authorization.

## 🚀 Features

- **Authentication System**
  - Email and OTP-based signup/login
  - Google OAuth integration
  - JWT-based authorization
  - Input validation and error handling

- **Note Management**
  - Create new notes
  - Delete existing notes
  - Real-time note synchronization
  - User-specific note storage

- **User Experience**
  - Welcome page with user information
  - Mobile-friendly responsive design
  - Error handling for API failures
  - Clean, modern UI following provided design

## 🛠️ Technology Stack

### Frontend
- **React.js** (Latest version with TypeScript)
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API calls
- **React Hook Form** for form validation

### Backend
- **Node.js** with **Express.js** (TypeScript)
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Nodemailer** for OTP emails
- **Google OAuth 2.0** for social authentication

### Database
- **PostgreSQL** (or MongoDB/MySQL as alternatives)
- **Prisma ORM** for database operations

### Additional Tools
- **Git** for version control
- **Docker** for containerization
- **Vercel/Netlify** for frontend deployment
- **Railway/Heroku** for backend deployment

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL** (or your chosen database)
- **Git**

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd note-taking-app
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/noteapp"

# JWT
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"

# Email Configuration (for OTP)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Server
PORT=5000
NODE_ENV="development"
FRONTEND_URL="http://localhost:3000"
```

### 3. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# (Optional) Seed the database
npx prisma db seed
```

### 4. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the frontend directory:

```env
REACT_APP_API_URL="http://localhost:5000/api"
REACT_APP_GOOGLE_CLIENT_ID="your-google-client-id"
```

## 🚀 Running the Application

### Development Mode

1. **Start the Backend Server:**
```bash
cd backend
npm run dev
```

2. **Start the Frontend Development Server:**
```bash
cd frontend
npm start
```

The application will be available at:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`

### Production Build

1. **Build the Frontend:**
```bash
cd frontend
npm run build
```

2. **Build the Backend:**
```bash
cd backend
npm run build
```

3. **Start Production Server:**
```bash
cd backend
npm start
```

## 📁 Project Structure

```
note-taking-app/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   ├── Notes/
│   │   │   ├── Layout/
│   │   │   └── UI/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── types/
│   │   └── App.tsx
│   ├── package.json
│   └── tailwind.config.js
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── server.ts
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   └── package.json
├── assets/
│   └── (downloaded from provided link)
└── README.md
```

## 🔐 Authentication Flow

### Email/OTP Signup
1. User enters email and password
2. System sends OTP to email
3. User verifies OTP
4. Account is created and JWT token is issued

### Google OAuth
1. User clicks "Sign in with Google"
2. Google OAuth flow is initiated
3. User grants permissions
4. JWT token is issued upon successful authentication

### JWT Authorization
- All protected routes require valid JWT token
- Token is stored in localStorage/httpOnly cookies
- Automatic token refresh mechanism

## 🗃️ Database Schema

### Users Table
```sql
- id (Primary Key)
- email (Unique)
- password (Hashed)
- name
- googleId (Optional)
- isVerified
- createdAt
- updatedAt
```

### Notes Table
```sql
- id (Primary Key)
- title
- content
- userId (Foreign Key)
- createdAt
- updatedAt
```

### OTP Table
```sql
- id (Primary Key)
- email
- otp
- expiresAt
- createdAt
```

## 🧪 Testing

### Run Frontend Tests
```bash
cd frontend
npm test
```

### Run Backend Tests
```bash
cd backend
npm test
```

### Run E2E Tests
```bash
npm run test:e2e
```

## 🚀 Deployment

### Frontend Deployment (Vercel)

1. **Connect to Vercel:**
```bash
npm i -g vercel
vercel login
```

2. **Deploy:**
```bash
cd frontend
vercel --prod
```

### Backend Deployment (Railway)

1. **Install Railway CLI:**
```bash
npm install -g @railway/cli
```

2. **Login and Deploy:**
```bash
cd backend
railway login
railway init
railway up
```

### Environment Variables for Production

Make sure to set all environment variables in your deployment platform:

**Frontend (Vercel):**
- `REACT_APP_API_URL`
- `REACT_APP_GOOGLE_CLIENT_ID`

**Backend (Railway):**
- `DATABASE_URL`
- `JWT_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`

## 📱 Mobile Responsiveness

The application is fully responsive and optimized for:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - Email/password signup
- `POST /api/auth/verify-otp` - Verify OTP
- `POST /api/auth/login` - Email/password login
- `POST /api/auth/google` - Google OAuth
- `POST /api/auth/refresh` - Refresh JWT token

### Notes
- `GET /api/notes` - Get user notes
- `POST /api/notes` - Create new note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

### User
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error:**
   - Check DATABASE_URL in .env file
   - Ensure PostgreSQL is running
   - Run `npx prisma migrate dev`

2. **Google OAuth Not Working:**
   - Verify GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET
   - Check OAuth redirect URLs in Google Console
   - Ensure frontend URL is whitelisted

3. **OTP Email Not Sending:**
   - Check SMTP configuration
   - Verify email credentials
   - Check spam folder

4. **JWT Token Issues:**
   - Verify JWT_SECRET is set
   - Check token expiration
   - Clear localStorage and login again

## 📞 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Review the GitHub issues
3. Contact: [your-email@example.com]

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Changelog

### Version 1.0.0 (Initial Release)
- Email/OTP authentication system
- Google OAuth integration
- JWT-based authorization
- Note creation and deletion
- Responsive design
- Error handling and validation

---

**Built with ❤️ by [Your Name]**


```

This README.md file provides comprehensive documentation for your full-stack note-taking application project. It includes all the essential information that Anupriya requested:

1. **Clear build instructions** with step-by-step setup
2. **Technology stack** details
3. **Project structure** overview
4. **Authentication flow** explanation
5. **Database schema** design
6. **Deployment instructions** for cloud platforms
7. **API documentation**
8. **Troubleshooting guide**
9. **Mobile responsiveness** details

The README follows best practices with proper markdown formatting, emojis for visual appeal, and organized sections that make it easy to navigate and understand the project requirements.

