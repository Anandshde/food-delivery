# 🚀 Step-by-Step Deployment Instructions

## Prerequisites

Before deploying, ensure you have:
- GitHub repository with your code
- MongoDB Atlas account with a database
- Cloudinary account for image storage
- Gmail account with app password for emails
- Render.com account
- Vercel account

## 📋 Step 1: Prepare Environment Variables

### Required Environment Variables

**Backend (.env)**:
```env
PORT=8000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/food-delivery
JWT_SECRET=your-super-secure-jwt-secret-key-minimum-32-characters
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
FRONTEND_URL=https://your-frontend-domain.vercel.app
NODE_ENV=production
```

**Frontend (.env.production)**:
```env
NEXT_PUBLIC_API_BASE_URL=https://your-backend-url.onrender.com
```

## 🖥 Step 2: Deploy Backend to Render.com

### Option A: Using Render Dashboard

1. **Go to Render.com** and sign in
2. **Click "New +"** → **"Web Service"**
3. **Connect GitHub** repository
4. **Configure Service**:
   - **Name**: `food-delivery-backend`
   - **Environment**: `Node`
   - **Region**: `Oregon (US West)`
   - **Branch**: `main`
   - **Root Directory**: `BE-food-delivery`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

5. **Add Environment Variables** in the Render dashboard:
   - Click on your service → **Environment** tab
   - Add all the environment variables listed above
   - Make sure `FRONTEND_URL` points to your future Vercel URL

6. **Deploy**: Click "Create Web Service"

### Option B: Using render.yaml (Recommended)

1. **Create render.yaml** in your root directory:
```yaml
services:
  - type: web
    name: food-delivery-backend
    env: node
    region: oregon
    plan: free
    buildCommand: cd BE-food-delivery && npm install && npm run build
    startCommand: cd BE-food-delivery && npm start
    healthCheckPath: /api/health
```

2. **Set environment variables** in Render dashboard after deployment

## 🌐 Step 3: Deploy Frontend to Vercel

### Option A: Using Vercel CLI

1. **Install Vercel CLI**:
```bash
npm install -g vercel
```

2. **Login to Vercel**:
```bash
vercel login
```

3. **Deploy**:
```bash
cd fe-food-delivery
vercel --prod
```

4. **Set environment variables**:
```bash
vercel env add NEXT_PUBLIC_API_BASE_URL production
# Enter your Render backend URL
```

### Option B: Using Vercel Dashboard (Recommended)

1. **Go to Vercel.com** and sign in
2. **Click "Add New..."** → **"Project"**
3. **Import Git Repository** and select your repo
4. **Configure Project**:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `fe-food-delivery`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)

5. **Environment Variables**:
   - Add `NEXT_PUBLIC_API_BASE_URL` with your Render backend URL
   - Example: `https://food-delivery-backend-abc123.onrender.com`

6. **Deploy**: Click "Deploy"

## 🔄 Step 4: Update CORS Settings

After both deployments are live:

1. **Update backend environment variables** on Render:
   - Set `FRONTEND_URL` to your actual Vercel domain
   - Example: `https://food-delivery-frontend-xyz789.vercel.app`

2. **Redeploy backend** to apply CORS changes

## ✅ Step 5: Test Deployment

1. **Backend Health Check**:
   - Visit: `https://your-backend.onrender.com/api/health`
   - Should return: `{"status":"healthy","timestamp":"..."}`

2. **Frontend Test**:
   - Visit your Vercel URL
   - Try registering a new account
   - Test menu browsing and cart functionality

## 🔧 Step 6: Common Deployment Issues & Solutions

### Backend Issues

**Issue**: `Application failed to start`
- **Solution**: Check build logs for TypeScript errors
- **Fix**: Ensure all dependencies are in `dependencies`, not `devDependencies`

**Issue**: `Database connection failed`
- **Solution**: Check MongoDB URI format and network access
- **Fix**: Whitelist `0.0.0.0/0` in MongoDB Atlas Network Access

**Issue**: `CORS errors`
- **Solution**: Ensure `FRONTEND_URL` environment variable is set correctly
- **Fix**: Update CORS origin to match your Vercel domain

### Frontend Issues

**Issue**: `API calls failing`
- **Solution**: Check if `NEXT_PUBLIC_API_BASE_URL` is set correctly
- **Fix**: Ensure the environment variable includes `https://` and no trailing slash

**Issue**: `Build failing`
- **Solution**: Check for TypeScript errors in build logs
- **Fix**: Run `npm run build` locally first to catch errors

**Issue**: `Images not loading`
- **Solution**: Check Cloudinary configuration
- **Fix**: Verify `next.config.ts` has correct image domains

## 📱 Step 7: Post-Deployment Setup

1. **Test all features**:
   - User registration and login
   - Menu browsing
   - Cart functionality
   - Order placement (with test data)
   - Admin dashboard access

2. **Monitor performance**:
   - Check Render logs for backend errors
   - Monitor Vercel function logs
   - Test loading speeds

3. **Set up monitoring** (optional):
   - Add error tracking (Sentry)
   - Set up uptime monitoring
   - Configure alerts for service downtime

## 🎯 Final URLs

After successful deployment, you'll have:
- **Frontend**: `https://your-project-name.vercel.app`
- **Backend**: `https://your-service-name.onrender.com`
- **Health Check**: `https://your-service-name.onrender.com/api/health`

## 📞 Support

If you encounter issues:
1. Check the deployment logs in both Render and Vercel dashboards
2. Verify all environment variables are set correctly
3. Test locally first to isolate deployment-specific issues
4. Check the troubleshooting section in `DEPLOYMENT_README.md`

---

**Note**: Render free tier services may spin down after 15 minutes of inactivity. The first request after spin-down may take 30-60 seconds to respond.