const API_URL = 'https://8qvo5z6nok.execute-api.us-east-2.amazonaws.com/twheel-api/';
const API_KEY = 'RVY0VnVLUDhQSHZST2hFM04xcnFnZDkzU2J2bGtZVVM1S2NNaXY2NHh4cmhhdEM5cjMyMTJaMXA';

class UserManager {
  static async fetchUserId(phoneNumber) {
    try {
      console.log('Fetching user ID for phone:', phoneNumber);
      
      const payload = {
        phone_number: phoneNumber,
        method: "getUserInfo",
        module: "user",
        apikey: API_KEY
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      console.log('User info API response:', result);
      
      const body = typeof result.body === "string" ? JSON.parse(result.body) : result.body;
      console.log('User info API body:', body);

      // Try different possible locations for user_id
      let userId = null;
      
      if (body.status === "success") {
        // Check various possible locations for user_id
        if (body.data && body.data.user_id) {
          userId = body.data.user_id;
        } else if (body.data && body.data._id) {
          userId = body.data._id;
        } else if (body.user_id) {
          userId = body.user_id;
        } else if (body._id) {
          userId = body._id;
        } else if (body.data) {
          // If data is a string or direct object
          const dataObj = typeof body.data === 'string' ? JSON.parse(body.data) : body.data;
          userId = dataObj.user_id || dataObj._id;
        }
      }

      if (userId) {
        console.log('Found user ID:', userId);
        localStorage.setItem('user_id', userId);
        return userId;
      } else {
        console.error('No user ID found in response');
        throw new Error('User ID not found in API response');
      }
    } catch (error) {
      console.error('Error fetching user ID:', error);
      throw error;
    }
  }

  static getUserId() {
    const userId = localStorage.getItem('user_id');
    console.log('Retrieved user ID from localStorage:', userId);
    return userId;
  }

  static setUserId(userId) {
    console.log('Setting user ID:', userId);
    localStorage.setItem('user_id', userId);
  }

  static clearUserId() {
    console.log('Clearing user ID');
    localStorage.removeItem('user_id');
  }

  static isLoggedIn() {
    const loggedIn = !!this.getUserId();
    console.log('User logged in:', loggedIn);
    return loggedIn;
  }
}

export default UserManager; 