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
      const response = await fetch(`http://3.145.178.209:8000/api/users/${userId}`, {
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
            alert("User not found, please try again");
            userInfoElement.innerHTML = '<p>User not found.</p>';
            document.getElementById("submitted").innerText = "User not found";
        }
      } else {
          alert("User not found, please try again");
        console.error("Failed to fetch user:", response.statusText);
          document.getElementById('user-info').innerHTML = '<p>Error fetching user data.</p>';
      }
    } catch (error) {
        alert("User not found, please try again");
      console.error("Error fetching user:", error);
        document.getElementById('user-info').innerHTML = '<p>Error fetching user data.</p>';
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const tabButtons = document.querySelectorAll(".tab-button");
    const tabContents = document.querySelectorAll(".tab-content");

    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove("active"));
            tabContents.forEach(content => content.classList.remove("active"));

            // Activate the clicked tab
            button.classList.add("active");
            document.getElementById(button.dataset.tab).classList.add("active");
        });
    });
});
  