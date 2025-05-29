// OAuth Configuration Template
// Copy this file to oauth.ts and replace with your actual OAuth credentials
// DO NOT commit oauth.ts to version control!

export const OAUTH_CONFIG = {
  google: {
    // Get your Google OAuth credentials from https://console.cloud.google.com/
    clientId: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
    // iOS client ID (if different from web)
    iosClientId: 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com',
    // Android client ID (if different from web)
    androidClientId: 'YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com',
  },
  linkedin: {
    // Get your LinkedIn OAuth credentials from https://www.linkedin.com/developers/
    clientId: 'YOUR_LINKEDIN_CLIENT_ID',
    clientSecret: 'YOUR_LINKEDIN_CLIENT_SECRET',
    // Note: LinkedIn requires the client secret, which should ideally be handled by your backend
  },
  // URL scheme for deep linking (should match your app's bundle identifier)
  urlScheme: 'org.reactjs.native.example.ConverzioApp',
};

// Setup Instructions:
// 
// 1. Copy this file to oauth.ts in the same directory
// 2. Replace the placeholder values with your actual OAuth credentials
// 
// Google OAuth Setup:
// - Go to https://console.cloud.google.com/
// - Create a new project or select existing
// - Enable Google Sign-In API
// - Create OAuth 2.0 credentials
// - Add authorized redirect URIs: 
//   - com.converzio.app://redirect (for mobile)
//   - http://localhost:19006 (for Expo development)
// - Copy the client ID
//
// LinkedIn OAuth Setup:
// - Go to https://www.linkedin.com/developers/
// - Create a new app
// - Add OAuth 2.0 settings
// - Set redirect URLs:
//   - com.converzio.app://redirect (for mobile)
//   - http://localhost:19006 (for Expo development)
// - Copy client ID and secret
//
// For production:
// - Store credentials in environment variables or secure key management
// - Never commit actual credentials to version control
// - Consider implementing the OAuth flow through your backend for better security 