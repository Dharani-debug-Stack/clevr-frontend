import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi 👋 I'm Clevr AI! Ask me about our books or categories." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/chat", { messages });
      const reply = res.data.choices?.[0]?.message?.content || "Sorry, I didn’t get that.";
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch (error) {
      console.error(error);
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Oops, something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white p-3 sm:p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
        >
          💬
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div className="bg-white w-[90vw] sm:w-80 h-[70vh] sm:h-96 shadow-2xl rounded-2xl flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center bg-blue-600 text-white px-4 py-2 rounded-t-2xl">
            <h2 className="font-semibold text-sm sm:text-base">Clevr Assistant</h2>
            <button onClick={() => setOpen(false)} className="text-white text-lg">
              ✖
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg max-w-[80%] sm:max-w-[70%] ${
                  msg.role === "user"
                    ? "bg-blue-100 text-right ml-auto"
                    : "bg-gray-100 text-left mr-auto"
                }`}
              >
                {msg.content}
              </div>
            ))}
            {loading && <p className="text-gray-400">Typing...</p>}
          </div>

          {/* Input */}
          <div className="flex border-t border-gray-200">
            <input
              type="text"
              placeholder="Ask something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 p-2 text-sm outline-none"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-3 sm:px-4 rounded-r-xl hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
