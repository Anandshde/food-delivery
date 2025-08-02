# 🍕 Food Delivery App - Deployment Guide

A full-stack food delivery application built with Next.js, TypeScript, Node.js, Express, and MongoDB.

## 📋 Project Overview

- **Frontend**: Next.js 15 with TypeScript, Tailwind CSS, and Radix UI
- **Backend**: Node.js with Express, TypeScript, and MongoDB
- **Database**: MongoDB Atlas
- **Image Storage**: Cloudinary
- **Authentication**: JWT tokens
- **Email**: Nodemailer

## 🚀 Live Demo

- **Frontend**: [https://food-delivery-frontend.vercel.app](https://food-delivery-frontend.vercel.app)
- **Backend API**: [https://food-delivery-backend-render.onrender.com](https://food-delivery-backend-render.onrender.com)

## 🛠 Local Development Setup

### Prerequisites

- Node.js 18+ and npm
- MongoDB Atlas account
- Cloudinary account
- Gmail account for email service

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd BE-food-delivery
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create environment file**:
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables** in `.env`:
   ```env
   PORT=8000
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/food-delivery
   JWT_SECRET=your-super-secure-jwt-secret-key
   CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-gmail-app-password
   FRONTEND_URL=http://localhost:3000
   ```

5. **Build and start the server**:
   ```bash
   npm run build
   npm start
   ```

   For development:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd fe-food-delivery
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create environment file**:
   ```bash
   cp .env.example .env.local
   ```

4. **Configure environment variables** in `.env.local`:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
   ```

5. **Build and start the application**:
   ```bash
   npm run build
   npm start
   ```

   For development:
   ```bash
   npm run dev
   ```

## 🌐 Deployment

### Backend Deployment (Render.com)

1. **Push code to GitHub**
2. **Connect to Render.com**:
   - Create new Web Service
   - Connect your GitHub repository
   - Set build command: `cd BE-food-delivery && npm run build`
   - Set start command: `cd BE-food-delivery && npm start`

3. **Set environment variables** in Render dashboard:
   ```env
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-jwt-secret
   CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-email-app-password
   FRONTEND_URL=https://your-frontend-domain.vercel.app
   NODE_ENV=production
   ```

### Frontend Deployment (Vercel)

1. **Push code to GitHub**
2. **Connect to Vercel**:
   - Import your GitHub repository
   - Set root directory to `fe-food-delivery`
   - Vercel will auto-detect Next.js

3. **Set environment variables** in Vercel dashboard:
   ```env
   NEXT_PUBLIC_API_BASE_URL=https://your-backend-url.onrender.com
   ```

4. **Deploy**: Vercel will automatically deploy on every push to main

## 🔧 Environment Variables Explained

### Backend Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `8000` |
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret key for JWT tokens | `super-secret-key` |
| `CLOUDINARY_*` | Cloudinary API credentials | From Cloudinary dashboard |
| `EMAIL_USER` | Gmail address for notifications | `your-email@gmail.com` |
| `EMAIL_PASS` | Gmail app password | From Gmail settings |
| `FRONTEND_URL` | Frontend URL for CORS | `https://yourapp.vercel.app` |

### Frontend Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | Backend API URL | `https://api.yourapp.com` |

## 📱 Features

- **User Authentication**: Register, login, email verification
- **Food Menu**: Browse categories, view food items
- **Shopping Cart**: Add/remove items, manage quantities
- **Order Management**: Place orders, track status
- **Admin Dashboard**: Manage food items, categories, orders
- **Responsive Design**: Works on desktop and mobile
- **Image Upload**: Cloudinary integration
- **Email Notifications**: Order confirmations

## 🏗 Tech Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Axios**: HTTP client
- **Formik & Yup**: Form handling and validation

### Backend
- **Node.js**: JavaScript runtime
- **Express**: Web framework
- **TypeScript**: Type-safe JavaScript
- **MongoDB & Mongoose**: Database and ODM
- **JWT**: Authentication tokens
- **Cloudinary**: Image storage
- **Nodemailer**: Email service
- **bcrypt**: Password hashing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Common Issues

1. **Database Connection Fails**:
   - Check MongoDB URI format
   - Ensure IP whitelist includes 0.0.0.0/0 for cloud deployment

2. **Images Not Loading**:
   - Verify Cloudinary credentials
   - Check image URL patterns in Next.js config

3. **CORS Errors**:
   - Ensure FRONTEND_URL is set correctly in backend
   - Check that frontend API URL matches backend deployment

4. **Build Failures**:
   - Clear node_modules and reinstall dependencies
   - Check TypeScript errors
   - Verify all environment variables are set

## 📞 Support

For issues and questions, please open a GitHub issue or contact the development team.