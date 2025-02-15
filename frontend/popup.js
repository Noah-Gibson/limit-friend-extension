// popup.js
document.getElementById('fetch-user').addEventListener('click', async function() {
    // Get the user ID from the input field
    const userId = document.getElementById('user-id').value;
  
    if (!userId) {
      alert('Please enter a user ID');
      return;
    }
  
    try {
      // Send a GET request to fetch user by ID from the FastAPI server
      const response = await fetch(`http://127.0.0.1:8000/api/users/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
  
      // Check if the response is successful
      if (response.ok) {
        const user = await response.json();
        const userInfoElement = document.getElementById('user-info');
        userInfoElement.innerHTML = ''; // Clear any previous content
  
        // Display the user info
        if (user) {
          userInfoElement.innerHTML = `<p><strong>ID:</strong> ${user.id}</p>
                                       <p><strong>Name:</strong> ${user.name}</p>`;
        } else {
          userInfoElement.innerHTML = '<p>User not found.</p>';
        }
      } else {
        console.error("Failed to fetch user:", response.statusText);
        document.getElementById('user-info').innerHTML = '<p>Error fetching user data.</p>';
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      document.getElementById('user-info').innerHTML = '<p>Error fetching user data.</p>';
    }
  });
  