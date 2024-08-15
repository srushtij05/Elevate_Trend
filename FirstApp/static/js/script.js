document.addEventListener("DOMContentLoaded", function () {
  const chatToggleBtn = document.querySelector(".ChatBot-toggler");
  const chatBot = document.querySelector(".ChatBot");
  const chatCloseBtn = chatBot.querySelector(
    "header span.material-symbols-outlined"
  );

  // Toggle chat visibility
  chatToggleBtn.addEventListener("click", function () {
    chatBot.classList.toggle("show-chatbot");
  });

  // Close chat functionality
  chatCloseBtn.addEventListener("click", function () {
    chatBot.classList.remove("show-chatbot");
  });

  // Handle sending messages
  const chatInput = document.querySelector(".chat-input textarea");
  const sendChatBtn = document.querySelector(".chat-input #send-btn");
  const chatbox = document.querySelector(".chatbox");

  let userMessage;

  const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent =
      className === "outgoing"
        ? `<p>${message}</p>`
        : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
  };

  const generateResponse = (incomingChatLi) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";

    const messageElement = incomingChatLi.querySelector("p");

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer YOUR_API_KEY_HERE`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userMessage }],
      }),
    };

    fetch(API_URL, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        messageElement.textContent = data.choices[0].message.content;
      })
      .catch((error) => {
        messageElement.textContent = "Something went wrong. Please try again.";
      })
      .finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
  };

  const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;

    chatbox.appendChild(createChatLi(userMessage, "outgoing"));

    setTimeout(() => {
      const incomingChatLi = createChatLi("Generating...", "incoming");

      chatbox.appendChild(incomingChatLi);
      generateResponse(incomingChatLi);
    }, 600);
  };

  sendChatBtn.addEventListener("click", handleChat);
});
