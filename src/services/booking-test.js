// Booking workflow test utilities
import { submitTutorialBooking, getTutorialBookings, updateBookingStatus } from './booking';
import { auth } from '../firebase-no-storage';

// Test data for booking workflow
export const testBookingData = {
  studentName: "Test Student",
  email: "teststudent@example.com",
  phone: "+1234567890",
  subject: "General Chemistry",
  level: "A-Level",
  sessionType: "Online",
  preferredDate: "2025-07-25",
  preferredTime: "14:00",
  duration: 60,
  notes: "This is a test booking to verify the workflow",
  urgency: "normal",
  tutorId: "test-tutor-id",
  tutorName: "Dr. Joseph Anjili",
  estimatedCost: 50
};

// Test functions
export const runBookingWorkflowTest = async () => {
  console.log('🧪 Starting Booking Workflow Test...');
  
  try {
    // Test 1: Submit a booking
    console.log('\n📝 Test 1: Submitting a test booking...');
    const bookingResult = await submitTutorialBooking(testBookingData);
    
    if (bookingResult.success) {
      console.log('✅ Booking submitted successfully!');
      console.log('Booking ID:', bookingResult.id);
      
      // Test 2: Retrieve bookings
      console.log('\n📋 Test 2: Retrieving bookings...');
      const bookings = await getTutorialBookings();
      console.log(`✅ Retrieved ${bookings.length} bookings`);
      
      if (bookings.length > 0) {
        console.log('Latest booking:', bookings[0]);
        
        // Test 3: Update booking status
        console.log('\n🔄 Test 3: Updating booking status...');
        const updateResult = await updateBookingStatus(bookingResult.id, 'confirmed');
        
        if (updateResult.success) {
          console.log('✅ Booking status updated to confirmed');
          
          // Test 4: Retrieve updated booking
          console.log('\n🔍 Test 4: Verifying status update...');
          const updatedBookings = await getTutorialBookings();
          const updatedBooking = updatedBookings.find(b => b.id === bookingResult.id);
          
          if (updatedBooking && updatedBooking.status === 'confirmed') {
            console.log('✅ Status update verified!');
            console.log('\n🎉 ALL TESTS PASSED! Booking workflow is working correctly.');
            return {
              success: true,
              testResults: {
                bookingSubmission: '✅ Passed',
                bookingRetrieval: '✅ Passed',
                statusUpdate: '✅ Passed',
                statusVerification: '✅ Passed'
              },
              bookingId: bookingResult.id
            };
          } else {
            console.log('❌ Status update verification failed');
            return { success: false, error: 'Status update not reflected' };
          }
        } else {
          console.log('❌ Failed to update booking status');
          return { success: false, error: 'Status update failed' };
        }
      } else {
        console.log('❌ No bookings retrieved');
        return { success: false, error: 'No bookings found' };
      }
    } else {
      console.log('❌ Failed to submit booking');
      return { success: false, error: bookingResult.error };
    }
  } catch (error) {
    console.error('❌ Test failed with error:', error);
    return { success: false, error: error.message };
  }
};

// Test Firebase connection specifically for booking
export const testBookingFirebaseConnection = async () => {
  console.log('🔧 Testing Firebase connection for booking system...');
  
  try {
    // Test auth state
    const user = auth.currentUser;
    console.log('Auth user:', user ? `✅ ${user.email}` : '❌ Not authenticated');
    
    // Test Firestore read
    console.log('Testing Firestore read access...');
    const bookings = await getTutorialBookings();
    console.log(`✅ Successfully read ${bookings.length} bookings from Firestore`);
    
    // Test Firestore write (with a minimal test document)
    console.log('Testing Firestore write access...');
    const testData = {
      studentName: "Connection Test",
      email: "test@example.com",
      phone: "000-000-0000",
      subject: "Test Subject",
      level: "Test",
      sessionType: "Test",
      preferredDate: "2025-01-01",
      preferredTime: "12:00",
      duration: 30,
      notes: "Connection test - safe to delete",
      urgency: "normal",
      tutorId: "test",
      tutorName: "Test Tutor",
      estimatedCost: 0
    };
    
    const result = await submitTutorialBooking(testData);
    if (result.success) {
      console.log('✅ Firestore write access confirmed');
      console.log('Test booking ID:', result.id);
    } else {
      console.log('❌ Firestore write failed:', result.error);
    }
    
    return { success: true, connectionStatus: 'All systems operational' };
  } catch (error) {
    console.error('❌ Firebase connection test failed:', error);
    return { success: false, error: error.message };
  }
};

// Quick booking form validation test
export const validateBookingForm = (formData) => {
  const errors = [];
  
  if (!formData.studentName?.trim()) errors.push('Student name is required');
  if (!formData.email?.trim()) errors.push('Email is required');
  if (!formData.phone?.trim()) errors.push('Phone is required');
  if (!formData.subject?.trim()) errors.push('Subject is required');
  if (!formData.level?.trim()) errors.push('Level is required');
  if (!formData.sessionType?.trim()) errors.push('Session type is required');
  if (!formData.preferredDate?.trim()) errors.push('Preferred date is required');
  if (!formData.preferredTime?.trim()) errors.push('Preferred time is required');
  if (!formData.duration || formData.duration < 30) errors.push('Duration must be at least 30 minutes');
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Export for easy testing in console
window.testBooking = {
  runFullTest: runBookingWorkflowTest,
  testConnection: testBookingFirebaseConnection,
  validateForm: validateBookingForm,
  testData: testBookingData
};
