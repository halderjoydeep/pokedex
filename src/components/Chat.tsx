"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "./ui/button";

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<string[]>([]);

  const sendMessage = () => {
    if (message.trim() !== "") {
      setChatHistory((prev) => [...prev, message]);
      setMessage("");
    }
  };

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="text-gray-700">
      <div
        className={cn(
          "fixed bottom-[92px] right-10 flex h-[300px] w-[300px] flex-col overflow-hidden rounded-md border bg-white shadow-sm",
          {
            hidden: !isOpen,
            flex: isOpen,
          },
        )}
      >
        <div className="flex items-center justify-between border-b p-2">
          <div>Chat</div>
          <div
            className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-[#282828] p-1 text-xs text-white"
            onClick={toggleChat}
          >
            X
          </div>
        </div>
        <div className="h-40 flex-1 overflow-y-auto p-2">
          {chatHistory.map((message, index) => (
            <div
              key={index}
              className="my-1 ml-auto flex w-fit max-w-[75%] justify-end break-all rounded-md bg-gray-200 px-3 py-1 text-sm"
            >
              {message}
            </div>
          ))}
        </div>
        <div className="flex flex-row items-center justify-between gap-2 border-t p-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 rounded-md border p-2 text-sm"
            placeholder="Type your message..."
            onKeyUp={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button
            className="rounded bg-[#282828] px-4 py-2 font-bold text-white"
            onClick={sendMessage}
          >
            Send
          </Button>
        </div>
      </div>

      <button
        className="fixed bottom-10 right-5 z-50 flex items-center justify-center rounded-full border border-white bg-blue-600 p-4 shadow-lg hover:bg-blue-700"
        onClick={toggleChat}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width={24}
          height={24}
          fill="white"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M21 2H3c-1.1 0-1.99.9-1.99 2L1 20l4-4h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H5v-2h14v2zm0-3H5V9h14v2z" />
        </svg>
      </button>
    </div>
  );
};

export default Chat;
