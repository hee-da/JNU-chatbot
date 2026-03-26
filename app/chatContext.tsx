import * as React from "react";

type ChatHistory = {
  id: number;
  title: string;
  date: string;
  content: string[];
};

type ChatContextType = {
  chatHistory: ChatHistory[];
  addChat: (title: string, date: string, firstMessage: string) => void;
  updateChatContent: (id: number, message: string) => void;
  deleteChat: (id: number) => void;
};

const ChatContext = React.createContext<ChatContextType>({
  chatHistory: [],
  addChat: () => {},
  updateChatContent: () => {},
  deleteChat: () => {},
});

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [chatHistory, setChatHistory] = React.useState<ChatHistory[]>([]);

  const addChat = (title: string, date: string, firstMessage: string) => {
    const newId = Date.now();
    setChatHistory(prev => [
      { id: newId, title, date, content: [firstMessage] },
      ...prev,
    ]);
    return newId;
  };

  const updateChatContent = (id: number, message: string) => {
    setChatHistory(prev => prev.map(chat =>
      chat.id === id
        ? { ...chat, content: [...chat.content, message] }
        : chat
    ));
  };

  const deleteChat = (id: number) => {
    setChatHistory(prev => prev.filter(chat => chat.id !== id));
  };

  return (
    <ChatContext.Provider value={{ chatHistory, addChat, updateChatContent, deleteChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => React.useContext(ChatContext);