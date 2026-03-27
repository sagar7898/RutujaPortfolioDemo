window.addEventListener("scroll", function () {
    const navbar = document.getElementById("navbar");

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href"))
            .scrollIntoView({ behavior: "smooth" });
    });
});


document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("apiMethod")
        .addEventListener("change", toggleBody);

    toggleBody();

});
function toggleBody() {

    const method = document.getElementById("apiMethod").value;
    const body = document.getElementById("apiBody");

    if (method === "GET")
        body.style.display = "none";
    else
        body.style.display = "block";
}

document.getElementById("apiMethod")
    .addEventListener("change", function () {

        const body = document.getElementById("apiBody");

        if (this.value === "GET")
            body.style.display = "none";
        else
            body.style.display = "block";

    });
async function callApi() {

    const url = document.getElementById("apiUrl").value;
    const method = document.getElementById("apiMethod").value;

    const loader = document.getElementById("loader");
    const responseBox = document.getElementById("apiResponse");

    loader.style.display = "block";
    responseBox.innerText = "";

    const start = performance.now();

    try {

        const body = document.getElementById("apiBody").value;

        const res = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: method === "GET" ? null : body
        });

        const data = await res.json();

        const end = performance.now();

        document.getElementById("statusCode").innerText =
            "Status: " + res.status;

        document.getElementById("responseTime").innerText =
            "Time: " + Math.round(end - start) + " ms";

        responseBox.innerHTML = syntaxHighlight(JSON.stringify(data, null, 2));

    } catch (err) {

        responseBox.innerText = "Error: " + err;

    }

    loader.style.display = "none";
}


function syntaxHighlight(json) {

    json = json.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    return json.replace(
        /("(\\u[\da-fA-F]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+)/g,
        function (match) {

            let cls = "number";

            if (/^"/.test(match)) {

                if (/:$/.test(match)) cls = "key";
                else cls = "string";

            } else if (/true|false/.test(match)) cls = "boolean";
            else if (/null/.test(match)) cls = "null";

            return '<span class="' + cls + '">' + match + "</span>";
        }
    );
}

function clearApi() {

    document.getElementById("apiResponse").innerText = "";
    document.getElementById("statusCode").innerText = "";
    document.getElementById("responseTime").innerText = "";
    document.getElementById("apiBody").value = "";


}

function copyResponse() {

    const text = document.getElementById("apiResponse").innerText;

    navigator.clipboard.writeText(text);

    alert("Response copied!");
}




const chatBtn = document.querySelector(".ai-open-btn");
const chatWindow = document.querySelector(".ai-chat-window");
const chatMessages = document.getElementById("aiMessages");
const chatInput = document.getElementById("aiInput");
const sendBtn = document.querySelector(".ai-send-btn");





let chatStarted = false;
document.addEventListener("DOMContentLoaded", function () {
    chatBtn.addEventListener("click", () => {

        if (chatWindow.style.display === "flex") {

            chatWindow.style.display = "none";
            chatBtn.innerHTML = "💬";   // back to chat icon

        } else {

            chatWindow.style.display = "flex";
            chatBtn.innerHTML = "✖";   // change to close icon

            chatInput.focus();

            if (!chatStarted) {

                addMessage("Hi 👋 I'm Rutuja , Sagar's AI Assistant.", "bot", true);
                addMessage("Ask me anything about his projects, skills, or experience.", "bot", false);

                chatStarted = true;
            }
        }
    });

    sendBtn.addEventListener("click", sendMessage);
})

function sendMessage() {

    const question = chatInput.value.trim();

    if (question === "") return;

    askAI(question);

    chatInput.value = "";
}


function showAIThinking() {

    const wrapper = document.createElement("div");
    wrapper.className = "ai-message bot";
    wrapper.id = "aiThinking";

    const avatar = document.createElement("div");
    avatar.className = "ai-avatar";
    avatar.innerHTML = '<img src="/images/bot.png">';

    const bubble = document.createElement("div");
    bubble.className = "ai-bubble ai-thinking";

    bubble.innerHTML = "Typing<span>.</span><span>.</span><span>.</span>";

    wrapper.appendChild(avatar);
    wrapper.appendChild(bubble);

    chatMessages.appendChild(wrapper);
    chatMessages.scrollTop = chatMessages.scrollHeight;

}


function removeAIThinking() {

    const thinking = document.getElementById("aiThinking");

    if (thinking) thinking.remove();
}
async function askAI(question) {

    addMessage(question, "user");

    showAIThinking();

    const res = await fetch("https://portfolio-ai-chatbot-ypfk.onrender.com/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: question })
    });

    const data = await res.json();

    removeAIThinking();

    typeMessage(data.reply);

}

const closeBtn = document.querySelector(".ai-close");

if (closeBtn) {
    closeBtn.onclick = () => {
        chatWindow.style.display = "none";
    };
}
function addMessage(text, type) {

    const wrapper = document.createElement("div");
    wrapper.className = type === "user" ? "ai-message user" : "ai-message bot";

    const avatar = document.createElement("div");
    avatar.className = "ai-avatar";

    avatar.innerHTML = type === "user"
        ? '<img src="/images/user.png">'
        : '<img src="/images/bot.png">';

    const bubble = document.createElement("div");
    bubble.className = "ai-bubble";

    bubble.innerHTML = text.replace(/\n/g, "<br>");

    wrapper.appendChild(avatar);
    wrapper.appendChild(bubble);

    chatMessages.appendChild(wrapper);

    chatMessages.scrollTop = chatMessages.scrollHeight;
}
function typeMessage(text) {

    const wrapper = document.createElement("div");
    wrapper.className = "ai-message bot";

    const avatar = document.createElement("div");
    avatar.className = "ai-avatar";
    avatar.innerHTML = '<img src="/images/bot.png">';

    const bubble = document.createElement("div");
    bubble.className = "ai-bubble";

    wrapper.appendChild(avatar);
    wrapper.appendChild(bubble);
    chatMessages.appendChild(wrapper);

    let i = 0;

    const interval = setInterval(() => {

        bubble.textContent += text[i];

        i++;

        chatMessages.scrollTop = chatMessages.scrollHeight;

        if (i >= text.length) {
            clearInterval(interval);
        }

    }, 15);
}

chatInput.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {
        e.preventDefault();
        sendMessage();
    }

});