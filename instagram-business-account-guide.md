# Instagram Business Account Connection Guide

This guide will help you connect your Instagram Business account to your DM automation application.

## Prerequisites

- An Instagram Business account (not a personal account)
- A Facebook Page connected to your Instagram Business account
- A Facebook Developer account
- Your application deployed to a production environment

## Step 1: Create a Facebook App

1. Go to [Facebook Developer Portal](https://developers.facebook.com/)
2. Click "My Apps" and then "Create App"
3. Select "Business" as the app type
4. Enter your app name and contact email
5. Complete the security check and create the app

## Step 2: Configure App Settings

1. In your app dashboard, click "Add Products" in the left menu
2. Add "Instagram Graph API" to your app
3. Go to "App Settings" > "Basic" and note your App ID and App Secret
4. These values will be used for `INSTAGRAM_APP_ID` and `INSTAGRAM_APP_SECRET` in your environment variables

## Step 3: Set Up Authentication

1. Go to "Facebook Login" > "Settings"
2. Add your OAuth redirect URI (e.g., `https://your-domain.com/api/auth/callback/instagram`)
3. This must match the `INSTAGRAM_REDIRECT_URI` in your environment variables
4. Save changes

## Step 4: Configure Permissions

1. Go to "App Review" > "Permissions and Features"
2. Request the following permissions:
   - `instagram_basic`: To access basic profile information
   - `instagram_manage_comments`: To read and respond to comments
   - `instagram_manage_messages`: To send direct messages
   - `pages_manage_metadata`: To access page information
   - `pages_read_engagement`: To read page content
3. Submit for review with appropriate use case descriptions and demo videos

## Step 5: Connect Your Instagram Account in the Application

1. Log in to your application
2. Navigate to the settings or profile section
3. Click "Connect Instagram Account"
4. Follow the authentication flow to authorize your application
5. Confirm the connection was successful

## Step 6: Test the Connection

1. Create a test trigger word in your application
2. Post a test comment containing the trigger word on one of your Instagram posts
3. Verify that the application detects the comment and sends the appropriate DM

## Troubleshooting

- **Authentication Errors**: Verify your App ID, App Secret, and Redirect URI
- **Permission Errors**: Ensure all required permissions are approved
- **Connection Issues**: Check that your Instagram account is a Business account and is connected to a Facebook Page
- **API Rate Limits**: Be aware of Instagram API rate limits (typically 200 calls per user per hour)

## Best Practices

- Use a dedicated Instagram Business account for your automation
- Start with a small number of trigger words and gradually increase
- Monitor your application logs for any API errors
- Regularly check your Instagram notifications for any issues
- Comply with Instagram's platform policies and terms of service

## Important Notes

- Instagram API access is subject to Facebook's review and approval process
- The review process can take several days to weeks
- Your application must comply with Facebook's platform policies
- Automated messaging must follow Instagram's community guidelines

For more information, refer to the [Instagram Graph API Documentation](https://developers.facebook.com/docs/instagram-api/).
