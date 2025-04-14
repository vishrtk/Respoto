# Production Deployment Guide for Instagram DM Automation

This guide will help you deploy your Instagram DM automation application to a production environment.

## Prerequisites

- A MongoDB Atlas account (or other MongoDB hosting service)
- A domain name (optional but recommended)
- A hosting platform (Vercel, Netlify, AWS, etc.)
- Instagram Business account and Facebook Developer account

## Step 1: Configure Environment Variables

1. Copy the values from `.env.production` to your hosting platform's environment variables section
2. Replace the placeholder values with your actual production values:
   - `MONGODB_URI`: Your MongoDB connection string
   - `NEXTAUTH_URL`: Your production domain (e.g., https://your-app.com)
   - `NEXTAUTH_SECRET`: A secure random string (generate with `openssl rand -base64 32`)
   - `INSTAGRAM_APP_ID`: Your Instagram App ID from Facebook Developer Portal
   - `INSTAGRAM_APP_SECRET`: Your Instagram App Secret from Facebook Developer Portal
   - `INSTAGRAM_REDIRECT_URI`: Your callback URL (must match what's configured in Facebook Developer Portal)

## Step 2: Build the Application

Run the following commands to build the application for production:

```bash
npm install
npm run build
```

This will create an optimized production build in the `.next` directory.

## Step 3: Deploy to Hosting Platform

### Option 1: Deploy to Vercel (Recommended)

1. Install Vercel CLI: `npm install -g vercel`
2. Run `vercel` in the project directory and follow the prompts
3. For subsequent deployments, use `vercel --prod`

### Option 2: Deploy to Netlify

1. Install Netlify CLI: `npm install -g netlify-cli`
2. Run `netlify deploy` and follow the prompts
3. For production deployment: `netlify deploy --prod`

### Option 3: Deploy to Custom Server

1. Transfer the built application to your server
2. Install dependencies: `npm install --production`
3. Start the application: `npm start`
4. Configure a reverse proxy (Nginx, Apache) to serve your application

## Step 4: Configure MongoDB

1. Create a MongoDB Atlas cluster (or use another MongoDB hosting service)
2. Set up network access to allow connections from your hosting platform
3. Create a database user with appropriate permissions
4. Update your `MONGODB_URI` environment variable with the connection string

## Step 5: Set Up Instagram API Integration

1. Ensure your Instagram Business account is properly configured
2. In the Facebook Developer Portal, add your production domain to the allowed redirect URIs
3. Update your app settings to include the necessary permissions for comment monitoring and DM sending

## Step 6: Monitoring and Maintenance

1. Set up monitoring for your application (Sentry, LogRocket, etc.)
2. Configure regular database backups
3. Implement a CI/CD pipeline for seamless updates (optional)

## Troubleshooting

- If authentication fails, verify your NextAuth configuration and Instagram API credentials
- If database connections fail, check your MongoDB connection string and network settings
- For Instagram API issues, verify your app permissions and token validity

## Security Considerations

- Always use HTTPS for your production domain
- Regularly rotate your API secrets and access tokens
- Implement rate limiting to prevent abuse
- Consider adding additional authentication methods for admin access

For further assistance, refer to the documentation for [Next.js](https://nextjs.org/docs/deployment), [MongoDB Atlas](https://docs.atlas.mongodb.com/), and [Instagram Graph API](https://developers.facebook.com/docs/instagram-api/).
