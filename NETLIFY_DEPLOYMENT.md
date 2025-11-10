# Netlify Deployment Guide for Eastern Empire Website

## Prerequisites
- A Netlify account (free tier works fine)
- This repository pushed to GitHub, GitLab, or Bitbucket

## Auto-Deploy Setup

### 1. Connect Repository to Netlify

1. Log in to [Netlify](https://app.netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Choose your Git provider (GitHub/GitLab/Bitbucket)
4. Authorize Netlify to access your repositories
5. Select the Eastern Empire repository

### 2. Configure Build Settings

Netlify will automatically detect the `netlify.toml` configuration file, but verify these settings:

**Build settings:**
- **Base directory:** (leave empty)
- **Build command:** `cd frontend && yarn install && yarn build`
- **Publish directory:** `frontend/build`
- **Node version:** 20 (set automatically via netlify.toml)

### 3. Environment Variables (Optional)

If you want to use the backend API alongside Netlify Forms:

1. Go to Site Settings → Environment Variables
2. Add the following variable:
   - Key: `REACT_APP_BACKEND_URL`
   - Value: Your backend API URL (e.g., `https://your-api-domain.com`)

**Note:** The form will work with Netlify Forms even without a backend API.

### 4. Deploy

Click "Deploy site" and Netlify will:
1. Install dependencies
2. Build your React app
3. Detect and configure Netlify Forms automatically
4. Deploy your site

## Netlify Forms

### How It Works

The booking form is configured to work with Netlify Forms:

1. **Build-time Detection:** The hidden form in `public/index.html` allows Netlify to detect the form structure during build
2. **Runtime Submission:** The React form in `Bookings.jsx` submits data to Netlify Forms
3. **Data Storage:** All submissions are stored in Netlify's Forms dashboard

### Accessing Form Submissions

1. Go to your Netlify site dashboard
2. Navigate to **Forms** tab
3. Click on **booking-form**
4. View all submissions with timestamps

### Form Features

- ✅ Spam protection via honeypot field
- ✅ Email notifications (configure in Netlify Forms settings)
- ✅ Export submissions to CSV
- ✅ Webhook integrations available
- ✅ Free tier: 100 submissions/month

## Custom Domain Setup

1. Go to Site Settings → Domain Management
2. Click "Add custom domain"
3. Enter your domain (e.g., `easternempire.com.au`)
4. Follow DNS configuration instructions
5. Enable HTTPS (automatic with Netlify)

## Continuous Deployment

Once connected, every push to your main branch will:
1. Automatically trigger a new build
2. Run the build command
3. Deploy the updated site
4. Netlify Forms will continue to work automatically

## Testing Netlify Forms Locally

To test form submissions locally:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Navigate to project root
cd /app

# Run Netlify dev server
netlify dev
```

This will:
- Run your React app
- Simulate Netlify Forms locally
- Allow you to test form submissions

## Troubleshooting

### Form Not Showing in Netlify Dashboard

1. Ensure the hidden form exists in `public/index.html`
2. Check that all form fields have `name` attributes
3. Verify `netlify.toml` is in the repository root
4. Redeploy the site

### Form Submissions Not Working

1. Check browser console for errors
2. Verify the form `name` attribute matches in both:
   - Hidden form: `<form name="booking-form">`
   - React form: `<form name="booking-form">`
3. Ensure all input fields have `name` attributes

### Build Failures

1. Check Netlify build logs
2. Verify Node version is 20
3. Ensure all dependencies are in `package.json`
4. Check that build command is correct

## Configuration Files

### netlify.toml
Located at repository root, contains:
- Build settings
- Node version (20)
- SPA redirect rules
- Security headers
- Form processing settings

### Hidden Form
Located in `public/index.html`, allows Netlify to detect form structure during build.

## Support

For Netlify-specific issues:
- [Netlify Documentation](https://docs.netlify.com)
- [Netlify Forms Guide](https://docs.netlify.com/forms/setup/)
- [Netlify Community Forum](https://answers.netlify.com)

## Summary

Your Eastern Empire website is now configured for:
- ✅ Auto-deploy from Git repository
- ✅ Node 20 runtime
- ✅ Netlify Forms integration
- ✅ SPA routing support
- ✅ Security headers
- ✅ HTTPS by default
- ✅ CDN distribution
- ✅ Continuous deployment
