// background.js
chrome.runtime.onInstalled.addListener(() => {
    console.log("User List Extension installed.");
  });
  
  // Optionally, you can listen for messages from the popup and handle them
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "fetchUsers") {
      fetch("http://127.0.0.1:8000/api/users")
        .then(response => response.json())
        .then(users => {
          sendResponse({ users });
        })
        .catch(error => {
          console.error("Error fetching users:", error);
          sendResponse({ error: "Failed to fetch users" });
        });
      return true; // Keep the message channel open for sendResponse
    }
  });
  