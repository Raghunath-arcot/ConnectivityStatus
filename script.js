const popup = document.querySelector(".popup"),
wifiIcon = document.querySelector(".icon i"),
popupTitle = document.querySelector(".popup .title"),
popupDesc = document.querySelector(".desc");
reconnectBtn = document.querySelector(".reconnect");

let isOnline = true, intervalId, timer = 10;

const checkConnection = async () => {
    try{
        const response = await fetch("https://jsonplaceholder.typicode.com/posts")
        isOnline = response.status >= 200 && response.status < 300;
        
    } catch(error){
        isOnline = false;
    }
    timer = 10;
    clearInterval(intervalId);
    handlePopup(isOnline);
}

const handlePopup = (status) => {
    if(status){
        wifiIcon.className = "fa-solid fa-wifi";
        popupTitle.innerText = "Restored Connection";
        popupDesc.innerHTML = "Your device is now successfully connected to the Internet";
        popup.classList.add("online");
        return setTimeout(() => popup.classList.remove("show"), 2000);
    }

    wifiIcon.className = "fa-solid fa-wifi-slash";
        popupTitle.innerText = "Lost Connection";
        popupDesc.innerHTML = "Your network is unavailable. We will attempt to reconnect you in <b>10</b> seconds";
    popup.className = "popup show"

    intervalId = setInterval(() => {
        timer--;
        if(timer === 0) checkConnection();
        popup.querySelector(".desc b").innerText = timer;
    }, 1000);
}

//check the connection status every 3 seconds
setInterval(() => isOnline && checkConnection(), 3000);
reconnectBtn.addEventListener("click", checkConnection);