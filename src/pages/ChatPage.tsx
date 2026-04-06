import { useState, useRef, useEffect } from "react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  time: string;
}

const botResponses: Record<string, string> = {
  sad: "I'm sorry you're feeling sad. Remember, it's okay to feel this way. Try taking a few deep breaths or writing in your journal. 💙",
  stress: "Stress can be overwhelming. Try the breathing exercise in our app, or take a short walk. You've got this! 🌿",
  happy: "That's wonderful to hear! Keep embracing the positivity. What made you happy today? 😊",
  angry: "It's okay to feel angry. Try to pause and take 5 deep breaths. Let's work through this together. 🧘",
  anxious: "Anxiety can feel heavy. Ground yourself: name 5 things you can see, 4 you can touch, 3 you can hear. 🌸",
  lonely: "You're not alone. Reaching out is brave. I'm here for you anytime you want to talk. 💛",
  tired: "Rest is important. Be kind to yourself and take a break when you need it. 😴",
  help: "I'm here to help! You can talk about your feelings, track your mood, write in your journal, or try a breathing exercise. 🌈",
  hello: "Hello! How are you feeling today? I'm here to listen. 😊",
  hi: "Hi there! What's on your mind today? 💙",
  thanks: "You're welcome! Remember, taking care of your mental health is important. 🌟",
};

function getBotReply(input: string): string {
  const lower = input.toLowerCase();
  for (const [keyword, response] of Object.entries(botResponses)) {
    if (lower.includes(keyword)) return response;
  }
  return "I hear you. Tell me more about how you're feeling. I'm here to listen. 💙";
}

function getTimeString(): string {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, text: "Hello! I'm your mental health companion. How are you feeling today? 😊", sender: "bot", time: getTimeString() },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now(), text: input, sender: "user", time: getTimeString() };
    const botMsg: Message = { id: Date.now() + 1, text: getBotReply(input), sender: "bot", time: getTimeString() };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] max-w-2xl mx-auto">
      <div className="text-center py-4">
        <h1 className="text-2xl font-bold text-foreground">Chat Companion</h1>
        <p className="text-sm text-muted-foreground">Talk to me about how you're feeling</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 space-y-3 pb-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed animate-fade-in ${
                msg.sender === "user"
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-secondary text-secondary-foreground rounded-bl-md"
              }`}
            >
              {msg.text}
              <div className={`text-[10px] mt-1 opacity-60 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                {msg.time}
              </div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border bg-card p-3 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type how you're feeling..."
          className="flex-1 bg-secondary text-foreground rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring transition-all"
        />
        <button
          onClick={sendMessage}
          className="bg-primary text-primary-foreground rounded-full px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
