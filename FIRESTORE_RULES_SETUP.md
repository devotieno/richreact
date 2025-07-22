# Firebase Firestore Security Rules Setup

## ⚠️ IMPORTANT: Configure These Rules in Firebase Console

The booking submission error is likely due to Firestore security rules. You need to configure these rules in your Firebase Console.

### 🔧 How to Configure Firestore Rules:

1. **Go to Firebase Console**: https://console.firebase.google.com/
2. **Select your project**: `auth-59a8f`
3. **Navigate to**: Firestore Database > Rules
4. **Replace the existing rules** with the rules below

### 📝 Firestore Security Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Allow authenticated users to read/write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Contact submissions - anyone can create, teachers can read/update
    match /contact_submissions/{submissionId} {
      allow create: if request.auth != null;
      allow read, update: if request.auth != null && 
        (resource.data.email == request.auth.token.email ||
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'teacher');
    }
    
    // Tutorial bookings - authenticated users can create, owners and teachers can read/update
    match /tutorial_bookings/{bookingId} {
      allow create: if request.auth != null;
      allow read: if request.auth != null && 
        (resource.data.studentId == request.auth.uid || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'teacher');
      allow update: if request.auth != null && 
        (resource.data.studentId == request.auth.uid ||
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'teacher');
    }
    
    // Booking notifications - teachers can read/write
    match /booking_notifications/{notificationId} {
      allow read, write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'teacher';
    }
    
    // Resources - authenticated users can read, teachers can write
    match /resources/{resourceId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'teacher';
    }
    
    // Lessons - authenticated users can read, teachers can write
    match /lessons/{lessonId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'teacher';
    }
    
    // Test collection for debugging (REMOVE IN PRODUCTION)
    match /test_collection/{docId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 🚨 TEMPORARY PERMISSIVE RULES (For Testing Only):

If you want to test quickly, you can temporarily use these permissive rules (NOT SECURE - only for testing):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### ⚡ Quick Fix Steps:

1. **Go to Firebase Console** > Your Project > Firestore Database > Rules
2. **Copy and paste** the temporary permissive rules above
3. **Click "Publish"**
4. **Test the booking form** - it should work now
5. **Replace with proper security rules** once testing is complete

### 🔍 Common Issues:

1. **"Permission denied" error**: Firestore rules are too restrictive
2. **"Network error"**: Check internet connection and Firebase config
3. **"Auth error"**: User not logged in or token expired

### 📞 Need Help?

If you're still getting errors after updating the rules, check the browser console (F12) for detailed error messages and share them for further debugging.
