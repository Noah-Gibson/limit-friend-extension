async function fetchData() {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();
        console.log("Response from FastAPI:", data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Call the function when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
    fetchData();
});
