import { cn } from '@/lib/utils';
import React, { useState } from 'react';

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<string[]>([]);

  const sendMessage = () => {
    if (message.trim() !== '') {
      setChatHistory((prev) => [...prev, message]);
      setMessage('');
    }
  };

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      <div
        className={cn(
          'fixed right-10 bottom-[92px] flex flex-col w-[300px] h-[300px] border rounded-md overflow-hidden bg-white shadow-sm',
          {
            hidden: !isOpen,
            flex: isOpen,
          }
        )}
      >
        <div className="p-2 border-b flex items-center justify-between">
          <div>Chat</div>
          <div
            className="w-5 h-5 flex items-center justify-center cursor-pointer bg-[#282828] text-white text-xs rounded-full p-1"
            onClick={toggleChat}
          >
            X
          </div>
        </div>
        <div className="h-40 overflow-y-auto p-2 flex-1">
          {chatHistory.map((message, index) => (
            <div
              key={index}
              className="text-sm flex justify-end bg-gray-200 my-1 py-1 px-3 w-fit rounded-md max-w-[75%] break-all ml-auto"
            >
              {message}
            </div>
          ))}
        </div>
        <div className="p-2 border-t flex flex-row items-center justify-between gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 p-2 rounded-md border"
            placeholder="Type your message..."
            onKeyUp={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button
            className="bg-[#282828] text-white font-bold py-2 px-4 rounded"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>

      <button
        className="fixed bottom-10 right-5 z-50 bg-blue-600 hover:bg-blue-700 p-4 rounded-full flex items-center justify-center shadow-lg border border-white"
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
