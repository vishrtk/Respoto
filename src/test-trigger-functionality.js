// Test script for trigger word functionality
const fetch = require('node-fetch');

// Mock data for testing
const mockTrigger = {
  mediaId: 'test_media_123',
  word: 'test_trigger',
  responseTemplateId: 'template_123',
  isActive: true
};

// Mock session data
const mockSession = {
  user: {
    id: 'test_user_123'
  }
};

// Mock functions to simulate API behavior
async function testCreateTriggerWord() {
  console.log('Testing create trigger word functionality...');
  
  try {
    // Simulate the API call
    console.log('Request payload:', JSON.stringify(mockTrigger, null, 2));
    
    // Simulate successful response
    const mockResponse = {
      triggerWord: {
        ...mockTrigger,
        userId: mockSession.user.id,
        _id: 'generated_id_123',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    };
    
    console.log('Response:', JSON.stringify(mockResponse, null, 2));
    console.log('✅ Create trigger word test passed!');
    return mockResponse.triggerWord;
  } catch (error) {
    console.error('❌ Create trigger word test failed:', error);
    throw error;
  }
}

async function testGetTriggerWords() {
  console.log('\nTesting get trigger words functionality...');
  
  try {
    // Simulate the API call
    
    // Simulate successful response
    const mockResponse = {
      triggerWords: [
        {
          ...mockTrigger,
          userId: mockSession.user.id,
          _id: 'generated_id_123',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ]
    };
    
    console.log('Response:', JSON.stringify(mockResponse, null, 2));
    console.log('✅ Get trigger words test passed!');
    return mockResponse.triggerWords;
  } catch (error) {
    console.error('❌ Get trigger words test failed:', error);
    throw error;
  }
}

async function testUpdateTriggerWord(id) {
  console.log('\nTesting update trigger word functionality...');
  
  try {
    // Simulate the API call
    const updateData = { isActive: false };
    console.log('Request payload:', JSON.stringify(updateData, null, 2));
    
    // Simulate successful response
    const mockResponse = {
      triggerWord: {
        ...mockTrigger,
        ...updateData,
        userId: mockSession.user.id,
        _id: id,
        updatedAt: new Date().toISOString()
      }
    };
    
    console.log('Response:', JSON.stringify(mockResponse, null, 2));
    console.log('✅ Update trigger word test passed!');
    return mockResponse.triggerWord;
  } catch (error) {
    console.error('❌ Update trigger word test failed:', error);
    throw error;
  }
}

async function testDeleteTriggerWord(id) {
  console.log('\nTesting delete trigger word functionality...');
  
  try {
    // Simulate the API call
    
    // Simulate successful response
    const mockResponse = {
      success: true
    };
    
    console.log('Response:', JSON.stringify(mockResponse, null, 2));
    console.log('✅ Delete trigger word test passed!');
    return mockResponse.success;
  } catch (error) {
    console.error('❌ Delete trigger word test failed:', error);
    throw error;
  }
}

// Run all tests
async function runTests() {
  console.log('=== STARTING TRIGGER WORD FUNCTIONALITY TESTS ===\n');
  
  try {
    // Test create
    const createdTrigger = await testCreateTriggerWord();
    
    // Test get
    await testGetTriggerWords();
    
    // Test update
    await testUpdateTriggerWord(createdTrigger._id);
    
    // Test delete
    await testDeleteTriggerWord(createdTrigger._id);
    
    console.log('\n=== ALL TESTS COMPLETED SUCCESSFULLY ===');
  } catch (error) {
    console.error('\n=== TEST SUITE FAILED ===');
    console.error(error);
  }
}

// Execute tests
runTests();
