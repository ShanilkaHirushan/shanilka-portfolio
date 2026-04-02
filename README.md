# 🚀 Portfolio — React + Node.js/Express

A full-stack developer portfolio with a dark & techy aesthetic, admin dashboard, blog, contact form with email notifications, and resume download tracking.

---

## 📁 Project Structure

```
portfolio/
├── frontend/          # React app (Create React App)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Portfolio.jsx       # Main portfolio page (Hero, About, Skills, Projects, Contact)
│   │   │   ├── Blog.jsx            # Blog listing page
│   │   │   ├── BlogPost.jsx        # Single blog post
│   │   │   ├── AdminLogin.jsx      # Admin login
│   │   │   └── AdminDashboard.jsx  # Full admin panel (Overview, Messages, Blog, Resume, Content)
│   │   ├── context/
│   │   │   └── AuthContext.jsx     # JWT auth context
│   │   ├── api.js                  # Axios API layer
│   │   └── App.jsx                 # Router setup
│   └── package.json
│
└── backend/           # Node.js + Express API
    ├── routes/
    │   ├── contact.js    # Contact form + email notifications
    │   ├── blog.js       # Blog CRUD
    │   ├── resume.js     # Download tracking + file upload
    │   ├── admin.js      # Auth + dashboard stats
    │   └── content.js    # Editable portfolio content
    ├── models/index.js   # Mongoose schemas
    ├── middleware/auth.js # JWT middleware
    ├── server.js         # Express entry point
    └── .env.example      # Environment variables template
```

---

## ⚙️ Setup

### 1. Clone & install dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Configure environment variables

```bash
cd backend
cp .env.example .env
# Edit .env with your values
```

Key variables to set in `.env`:
| Variable | Description |
|---|---|
| `MONGO_URI` | Your MongoDB connection string |
| `JWT_SECRET` | Random secret for signing tokens |
| `ADMIN_EMAIL` | Your admin login email |
| `ADMIN_PASSWORD` | Your admin login password |
| `SMTP_USER` | Gmail address for sending emails |
| `SMTP_PASS` | Gmail App Password (not your real password) |
| `EMAIL_TO` | Where contact form notifications go |

> **Gmail App Password**: Go to Google Account → Security → 2-Step Verification → App Passwords

### 3. Run in development

```bash
# Terminal 1 — Backend (port 5000)
cd backend
npm run dev

# Terminal 2 — Frontend (port 3000)
cd frontend
npm start
```

The React app proxies `/api/*` to `http://localhost:5000` automatically.

---

## 🌐 Routes

### Public
| Route | Description |
|---|---|
| `/` | Portfolio homepage |
| `/blog` | Blog post listing |
| `/blog/:slug` | Individual blog post |
| `/api/resume/download` | Download resume (tracked) |

### Admin (requires login)
| Route | Description |
|---|---|
| `/admin/login` | Admin sign in |
| `/admin` | Dashboard overview |
| `/admin/messages` | View & reply to contact messages |
| `/admin/blog` | Create, edit, publish/draft, delete posts |
| `/admin/resume` | Upload resume PDF + download analytics |
| `/admin/content` | Edit hero, skills, projects, contact info |

---

## 🛡️ Security Features

- JWT authentication for all admin routes
- Rate limiting on contact form (5/hour) and all API routes (100/15min)
- Helmet.js security headers
- Input validation with express-validator
- bcrypt password hashing
- CORS restricted to frontend origin

---

## 🚀 Production Deployment

### Backend (Render / Railway / VPS)
```bash
cd backend
npm start
```
Set all `.env` variables in your hosting dashboard.

### Frontend (Vercel / Netlify)
```bash
cd frontend
npm run build
```
Set `REACT_APP_API_URL` if your backend is on a different domain, and update the `proxy` in `package.json`.

### MongoDB
Use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for a free hosted database.

---

## ✏️ Personalizing Your Portfolio

1. Log into `/admin/login` with your credentials
2. Go to **Content** → edit your name, bio, skills, and projects
3. Go to **Resume** → upload your PDF resume
4. Write blog posts from the **Blog** section
5. Monitor messages and downloads from the dashboard

---

## 📦 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, React Router v6, Axios |
| Backend | Node.js, Express 4, Mongoose |
| Database | MongoDB |
| Auth | JWT + bcryptjs |
| Email | Nodemailer (SMTP/Gmail) |
| Security | Helmet, express-rate-limit, express-validator |
