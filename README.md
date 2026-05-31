# Rajvansh Singh Atal - Portfolio Website & Contact API

A modern, highly-performant, and visually stunning developer portfolio website built using the MERN Stack. This project includes a production-ready Express.js backend for contact form validation, security auditing, and styled email notification delivery via Nodemailer SMTP.

---

## 🚀 Features

- **Cinematic Preloader**: Smooth HMR-friendly preloading sequence with active asset cache initialization.
- **Dynamic 3D Hover Cards**: Projects and credentials showcase using advanced React tilt controls and GPU-accelerated styling.
- **Secure Contact System**: Dedicated backend integration with inputs sanitation, custom formatting validators, and rate limiters.
- **Nodemailer SMTP integration**: Sends beautiful, styled HTML notifications directly to your email, complete with visitor replies (`replyTo`).
- **Global Error Handler**: Standarized Express.js error pipeline utilizing operational wrappers.
- **Spam Prevention**: Custom rate-limit middleware restricting submissions to 5 per hour per unique IP address.

---

## 🛠️ Tech Stack

### Frontend
- **Core**: React.js, Tailwind CSS, HTML5
- **Animations**: Framer Motion, GSAP, Lenis Smooth Scroll
- **Icons**: Lucide React

### Backend
- **Core**: Node.js, Express.js (ES Modules)
- **Database**: MongoDB (Mongoose ODM)
- **Email**: Nodemailer (Gmail SMTP Service)
- **Security**: Helmet, CORS, Express-Rate-Limit

---

## 📦 Installation Instructions

### 1. Clone the repository
```bash
git clone <your-github-repository-url>
cd Portfolio
```

### 2. Install all dependencies
This project uses a root configuration to install both frontend and backend dependencies in one command:
```bash
npm run install-all
```

---

## 🔑 Environment Variables Setup

Create a `.env` file inside the `server/` directory and configure the following variables:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/portfolio
FRONTEND_URL=http://localhost:5173

# SMTP Settings
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=xxxx-xxxx-xxxx-xxxx
RECEIVER_EMAIL=your_gmail@gmail.com
```

> [!WARNING]
> Never commit `.env` files to git. They are ignored by the root-level `.gitignore` file.

---

## 💻 Local Development

To run the entire development ecosystem (React frontend + Express backend) concurrently, execute the following command in the project root directory:

```bash
npm run dev
```

- **Frontend client**: [http://localhost:5173/](http://localhost:5173/)
- **Backend API**: [http://localhost:5000/](http://localhost:5000/)

---

## 🌐 Render Deployment Guide

### 1. MongoDB Setup
Deploy a free database instance on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and retrieve your cluster connection string.

### 2. Create Render Web Service
1. Log in to your [Render Dashboard](https://dashboard.render.com).
2. Click **New +** and select **Web Service**.
3. Link your GitHub repository.
4. Select the environment and input these configurations:
   - **Build Command**: `npm install && npm install --prefix server`
   - **Start Command**: `node server/server.js`

### 3. Add Production Environment Variables
Navigate to **Settings -> Environment** and add the following keys:
- `PORT` = `5000`
- `NODE_ENV` = `production`
- `MONGODB_URI` = `mongodb+srv://<username>:<password>@cluster.mongodb.net/portfolio`
- `FRONTEND_URL` = `https://your-portfolio-domain.netlify.app`
- `EMAIL_USER` = `your_gmail@gmail.com`
- `EMAIL_PASS` = `16_character_gmail_app_password`
- `RECEIVER_EMAIL` = `your_gmail@gmail.com`

---

## 📁 GitHub Repository Setup

To push your repository to GitHub, execute the following commands in the root directory:

```bash
# Initialize git repository
git init

# Add all files to staging (verified by .gitignore)
git add .

# Create initial commit
git commit -m "Initial portfolio backend setup"

# Rename current branch to main
git branch -M main

# Add remote GitHub origin
git remote add origin <github-repository-url>

# Push codebase to GitHub
git push -u origin main
```

---

## 📡 API Documentation

### POST `/api/contact`
Submits a message through the contact portal.

#### Headers
`Content-Type: application/json`

#### Request Body
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "New Project Inquiry",
  "message": "Hello! I would love to hire you for a full stack React development project."
}
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "message": "Message sent successfully"
}
```

#### Error Response (`400 Bad Request` or `429 Too Many Requests`)
```json
{
  "success": false,
  "message": "Please use a valid email address"
}
```
