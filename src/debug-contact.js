// Test file to debug the contact form issue
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

// Test function to check if Firestore connection is working
export const testFirestoreConnection = async () => {
  try {
    console.log('🧪 Testing Firestore connection...');
    
    const testData = {
      test: true,
      timestamp: serverTimestamp(),
      message: 'Test connection from contact form debug'
    };

    const docRef = await addDoc(collection(db, 'test_collection'), testData);
    console.log('✅ Firestore connection successful! Document ID:', docRef.id);
    return { success: true, id: docRef.id };

  } catch (error) {
    console.error('❌ Firestore connection failed:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    return { success: false, error: error.message, code: error.code };
  }
};

// Test function specifically for contact form submission
export const testContactSubmission = async () => {
  try {
    console.log('🧪 Testing contact form submission...');
    
    const contactData = {
      fullName: 'Test User',
      email: 'test@example.com',
      subject: 'Test Subject',
      message: 'This is a test message to check contact form functionality',
      submittedAt: serverTimestamp(),
      status: 'new',
      source: 'contact_form'
    };

    const docRef = await addDoc(collection(db, 'contact_submissions'), contactData);
    console.log('✅ Contact submission successful! Document ID:', docRef.id);
    return { success: true, id: docRef.id };

  } catch (error) {
    console.error('❌ Contact submission failed:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    
    // Check for specific error types
    if (error.code === 'permission-denied') {
      console.error('🚫 Permission denied - Firestore security rules are blocking this operation');
      console.log('💡 Solution: Update Firestore security rules to allow contact submissions');
    } else if (error.code === 'unavailable') {
      console.error('🌐 Firestore service unavailable - Check internet connection');
    } else if (error.code === 'invalid-argument') {
      console.error('📝 Invalid data format - Check the data being submitted');
    }
    
    return { success: false, error: error.message, code: error.code };
  }
};

// Make test functions available in browser console
if (typeof window !== 'undefined') {
  window.firestoreDebug = {
    testConnection: testFirestoreConnection,
    testContact: testContactSubmission
  };
  
  console.log('🔧 Firestore Debug Functions Available:');
  console.log('   window.firestoreDebug.testConnection() - Test basic connection');
  console.log('   window.firestoreDebug.testContact() - Test contact form submission');
}
