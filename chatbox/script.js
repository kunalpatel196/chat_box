// Load previous messages and theme
window.onload = function () {
    const chatBox = document.getElementById('chatBox');
    const saved = JSON.parse(localStorage.getItem("chatHistory")) || [];
    saved.forEach(msg => {
      chatBox.innerHTML += createMessageHTML(msg.sender, msg.text);
    });
    chatBox.scrollTop = chatBox.scrollHeight;
  
    // Load theme
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add('dark');
    }
  };
  
  function fun() {
    const input = document.getElementById("user2");
    const user = input.value.trim();
    if (!user) return;
  
    const chatBox = document.getElementById('chatBox');
    chatBox.innerHTML += createMessageHTML("user", user);
    saveToStorage("user", user);
  
    const typingId = `typing-${Date.now()}`;
    chatBox.innerHTML += `<div class="flex justify-start" id="${typingId}">
      <div class="max-w-xs p-3 bg-gray-700 text-gray-300 rounded-xl shadow">Typing...</div>
    </div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  
    let ans = "";
    if (["hi", "hello", "hai"].includes(user.toLowerCase())) {
      ans = "Hai! How can I help you?";
    } 
    else if (["time", "date", "month", "week"].includes(user.toLowerCase())) {
        let date = new Date();
        ans = `Now this is going on:<br>${date.toLocaleString()}<br><br>Tell me more, how can I help you?`;
    }
    else if(["open yt","open youtube","youtube"].includes(user.toLowerCase())){
        ans="ok nice choice"
        window.open('https://www.youtube.com/',"_blank")
    }
    else if (user.toLowerCase().includes("music") || user.toLowerCase().includes("song")) {
        ans = "Okay, but which one?";
    
        let parts = user.toLowerCase().split(" ");
        let index = parts.indexOf("play");
        let que = parts.slice(index + 1).join(" ");
        if (que) {
            ans = `Okay! Playing "${que}" 🎶`;
            window.open(`https://music.youtube.com/search?q=${encodeURIComponent(que)}`, "_blank");
        }
    }
    

    else if(["who you",'who are you', 'tell me about your self']){
        ans=`hey I am JARVIS <br/> Created by <b>kp gurjar<b>`; 
    }
    else{
        ans="hai i didn't understand...??? 😪😪🤐😴😴"
    }
    setTimeout(() => {
      const typingDiv = document.getElementById(typingId);
      typingDiv.remove();
      chatBox.innerHTML += createMessageHTML("ai", ans);
      saveToStorage("ai", ans);
      chatBox.scrollTop = chatBox.scrollHeight;
    }, 1000);
  
    input.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
  }
  
  function createMessageHTML(sender, text) {
    const alignment = sender === "user" ? "justify-end" : "justify-start";
    const bg = sender === "user" ? "bg-blue-500" : "bg-gray-700";
    const textColor = sender === "user" ? "text-white" : "text-gray-100";

  
    return `
      <div class="flex ${alignment}">
        <div class="max-w-xs md:max-w-md p-3 ${bg} ${textColor} rounded-xl shadow relative">
          <div>${text}</div>
          <div class="text-xs text-gray-300 absolute bottom-1 right-2"></div>
        </div>
      </div>
    `;
  }
  
  function saveToStorage(sender, text) {
    const chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
    chatHistory.push({ sender, text });
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  }
  
  function clearChat() {
    localStorage.removeItem("chatHistory");
    document.getElementById("chatBox").innerHTML = "";
  }
  
  function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    document.body.style.backgroundColor = "#fff";
    document.getElementById('btn').innerHTML="Dark"
    localStorage.setItem("theme", document.documentElement.classList.contains('dark') ? "dark" : "light");
  }
  function toggleTheme2(){
    document.body.style.backgroundColor ="#111827";
    document.getElementById('btn').innerHTML="Light"
  }
 