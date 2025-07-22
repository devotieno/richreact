// Admin Panel test utilities
import { getTutorialBookings, getContactSubmissions, getBookingStats } from './booking';

// Test admin panel data loading
export const testAdminPanelData = async () => {
  console.log('🧪 Testing Admin Panel Data Loading...');
  
  try {
    // Test 1: Load all bookings
    console.log('\n📋 Test 1: Loading tutorial bookings...');
    const allBookings = await getTutorialBookings();
    console.log(`✅ Successfully loaded ${allBookings.length} bookings`);
    
    if (allBookings.length > 0) {
      console.log('Sample booking:', allBookings[0]);
      
      // Test with status filter
      console.log('\n🔍 Test 1b: Loading pending bookings...');
      const pendingBookings = await getTutorialBookings({ status: 'pending' });
      console.log(`✅ Successfully loaded ${pendingBookings.length} pending bookings`);
    }
    
    // Test 2: Load contact submissions
    console.log('\n📧 Test 2: Loading contact submissions...');
    const allContacts = await getContactSubmissions();
    console.log(`✅ Successfully loaded ${allContacts.length} contact submissions`);
    
    // Test 3: Load booking statistics
    console.log('\n📊 Test 3: Loading booking statistics...');
    const stats = await getBookingStats();
    console.log('✅ Successfully loaded statistics:', stats);
    
    console.log('\n🎉 Admin Panel Data Tests PASSED!');
    return {
      success: true,
      data: {
        bookings: allBookings,
        contacts: allContacts,
        stats: stats
      }
    };
    
  } catch (error) {
    console.error('❌ Admin Panel test failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Test admin panel permissions
export const testAdminPermissions = () => {
  console.log('🔐 Testing Admin Panel Permissions...');
  
  const currentUser = window.firebase?.auth()?.currentUser;
  
  if (!currentUser) {
    console.log('❌ No user logged in');
    return { success: false, message: 'User must be logged in' };
  }
  
  console.log('✅ User is authenticated:', currentUser.email);
  
  // Note: In a real app, you'd check custom claims or user role from Firestore
  console.log('ℹ️ Role checking depends on your authentication setup');
  
  return { success: true, user: currentUser.email };
};

// Test specific booking operations for admin
export const testBookingOperationsForAdmin = async () => {
  console.log('🛠️ Testing Booking Operations for Admin...');
  
  try {
    // Test filtering by different statuses
    const statuses = ['pending', 'confirmed', 'completed', 'cancelled'];
    const results = {};
    
    for (const status of statuses) {
      console.log(`\n📋 Loading ${status} bookings...`);
      const bookings = await getTutorialBookings({ status });
      results[status] = bookings.length;
      console.log(`✅ Found ${bookings.length} ${status} bookings`);
    }
    
    console.log('\n📊 Booking Status Summary:', results);
    
    // Test date-based filtering (if implemented)
    console.log('\n📅 Testing recent bookings...');
    const allBookings = await getTutorialBookings();
    const recentBookings = allBookings.filter(booking => {
      const bookingDate = booking.bookedAt?.toDate?.() || new Date(booking.bookedAt);
      const daysSince = (Date.now() - bookingDate.getTime()) / (1000 * 60 * 60 * 24);
      return daysSince <= 7; // Last 7 days
    });
    
    console.log(`✅ Found ${recentBookings.length} bookings in the last 7 days`);
    
    return {
      success: true,
      summary: {
        byStatus: results,
        recentCount: recentBookings.length,
        totalCount: allBookings.length
      }
    };
    
  } catch (error) {
    console.error('❌ Booking operations test failed:', error);
    return { success: false, error: error.message };
  }
};

// Export for browser console testing
window.testAdmin = {
  testData: testAdminPanelData,
  testPermissions: testAdminPermissions,
  testOperations: testBookingOperationsForAdmin
};
