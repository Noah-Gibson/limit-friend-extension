let friendsUsage = {};
const CHECK_INTERVAL = 1000; //checks every second
const API_URL = "http://localhost:3000";

//Fucntion to send a friend's screen time data to the backend
async function sendScreenTimeToBackend(user, screenTime){
    try {
        const response = await fetch(`${API_URL}/screenTime`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();
        console.log(data.message);
    }catch(error){
        console.log("Error sending screentime to backend", error);
    }
}

//Function to track time on active website 
function trackFriendsUsage(){
    chrome.tabs.query({activate: true, currentWindow: true}, (tabs)=>{
        if (tabs.length === 0) return;

        let url = new URL(tabs[0].url);
        let domain = url.hostname;
        
        chrome.storage.local.get(["friendUsername"], (data)=>{
        let friendUsername = data.friendUsername //get friend's username from the database
        if (!friendUsername) {
            console.log("Friend's username not found");
            return;
        }
        chrome.storage.local.get(["friendsLimits"], (data)=>{
            let limits = data.friendsLimits || {}
            let friendLimit = limits[friendUsername] || 300;
        if (!friendsUsage[friendUsername]){
            friendsUsage[friendUsername] = {};
        }
        friendUsage[friendUsername][domain] = friendsUsage[friendUsername][domain] || 0;

        friendUsage[friendUsername][domain] += 1;

        console.log('${friendUsername} has spent ${friendUsage[friendUsername][domain]} seconds on ${domain}');

        //If friend has exceeded the limit
        if (friendUsage[friendUsername][domain] >= friendLimit){
            chrome.storage.local.get([`message_${friendUsername}`], (result) => {
                let message = result[`message_${friendUsername}`] || `Hey, you've spent too much time on ${domain}!`;

            chrome.notifications.create({
                type: 'basic',
                iconUrl: 'icon.png',
                title: 'Limit Exceeded',
                message: `${friendUsername} has exceeded the limit on ${domain}`
            });
            

            sendScreenTimeToBackend(friendUsername, friendUsage[friendUsername][domain]);
        });
    }
    chrome.storage.local.set({"Your friends usage": friendsUsage});       
            
    });
});
});
}
setInterval(trackFriendsUsage, CHECK_INTERVAL);



