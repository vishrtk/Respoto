# Instagram DM Automation - User Guide

This comprehensive guide will help you use your Instagram DM automation application effectively.

## Table of Contents

1. [Overview](#overview)
2. [Getting Started](#getting-started)
3. [Managing Trigger Words](#managing-trigger-words)
4. [Creating Message Templates](#creating-message-templates)
5. [Monitoring Activity](#monitoring-activity)
6. [Troubleshooting](#troubleshooting)
7. [Best Practices](#best-practices)

## Overview

This application automatically sends direct messages to Instagram users who comment specific trigger words on your posts. The system monitors comments on your Instagram posts, detects configured trigger words, and automatically sends personalized direct messages to the commenters.

## Getting Started

### Logging In

1. Navigate to your application URL
2. Click "Sign In" and enter your credentials
3. If this is your first time, you'll need to connect your Instagram Business account (see [Instagram Business Account Guide](./instagram-business-account-guide.md))

### Dashboard Overview

The dashboard provides an overview of:
- Active trigger words
- Recent activity
- Message templates
- Account status

## Managing Trigger Words

### Viewing Trigger Words

1. Navigate to the "Triggers" section from the dashboard
2. Here you'll see a list of all your configured trigger words
3. Each trigger shows:
   - The trigger word
   - Associated Instagram post (Media ID)
   - Response template
   - Active status

### Adding New Trigger Words

1. Click the "Add New Trigger" button
2. Fill in the required fields:
   - **Media ID**: The Instagram post ID to monitor (found in the post URL)
   - **Trigger Word**: The word or phrase that will trigger the automatic DM
   - **Response Template**: Select from your created message templates
   - **Active**: Toggle whether this trigger is currently active
3. Click "Save" to create the trigger
4. You'll see a success message when the trigger is created successfully

### Editing and Deleting Triggers

1. In the triggers list, use the action buttons:
   - **Activate/Deactivate**: Toggle the active status
   - **Delete**: Remove the trigger completely
2. Confirm any deletion actions when prompted

## Creating Message Templates

### Viewing Templates

1. Navigate to the "Templates" section from the dashboard
2. Here you'll see a list of all your message templates

### Adding New Templates

1. Click "Add New Template"
2. Fill in:
   - **Template Name**: A descriptive name for your reference
   - **Message Content**: The actual message that will be sent
   - You can use variables like `{{username}}` to personalize messages
3. Click "Save" to create the template

### Using Variables in Templates

Available variables:
- `{{username}}`: The Instagram username of the commenter
- `{{comment}}`: The content of their comment
- `{{post_url}}`: The URL of the Instagram post

Example: "Hi {{username}}, thanks for your comment: '{{comment}}'. Check out more content at {{post_url}}!"

## Monitoring Activity

### Response Logs

1. Navigate to the "Logs" section
2. View a history of all automated responses
3. Filter by:
   - Date range
   - Trigger word
   - Success/failure status

### Analytics

The analytics dashboard shows:
- Total responses sent
- Response rate
- Most effective trigger words
- Best performing posts

## Troubleshooting

### Common Issues

1. **Trigger not working**:
   - Verify the Media ID is correct
   - Check that the trigger word is active
   - Ensure your Instagram connection is valid

2. **Authentication errors**:
   - Reconnect your Instagram account
   - Check that your app permissions are approved

3. **Rate limiting**:
   - Instagram limits API calls; spread out your automated activities
   - Consider reducing the number of active triggers

### Error Messages

- **"Failed to create trigger word"**: Check that all fields are filled correctly
- **"Instagram API error"**: Your Instagram token may need refreshing
- **"Unauthorized"**: You need to log in again

## Best Practices

1. **Trigger Words**:
   - Use specific, unique words that genuine customers would use
   - Avoid common words that might trigger too many responses

2. **Message Templates**:
   - Keep messages conversational and personal
   - Include a clear call-to-action
   - Test templates with different variables

3. **Compliance**:
   - Follow Instagram's terms of service
   - Don't use the system for spam or harassment
   - Be transparent about automated responses

4. **Optimization**:
   - Regularly review your response logs
   - Adjust trigger words based on effectiveness
   - Update templates to improve engagement

---

For technical deployment information, see the [Production Deployment Guide](./production-deployment-guide.md).
For Instagram account setup, refer to the [Instagram Business Account Guide](./instagram-business-account-guide.md).
