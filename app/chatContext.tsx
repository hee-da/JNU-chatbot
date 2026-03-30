import * as React from "react";

type Message = {
  text: string;
  isUser: boolean;
  time: string;
  image?: any;
};

type ChatHistory = {
  id: number;
  title: string;
  date: string;
  content: string[];
  messages: Message[];  // 추가
};

type ChatContextType = {
  chatHistory: ChatHistory[];
  addChat: (title: string, date: string, firstMessage: string) => number;
  updateChatContent: (id: number, message: string) => void;
  addMessage: (id: number, message: Message) => void;  // 추가
  deleteChat: (id: number) => void;
};

const ChatContext = React.createContext<ChatContextType>({
  chatHistory: [],
  addChat: () => 0,
  updateChatContent: () => {},
  addMessage: () => {},
  deleteChat: () => {},
});

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [chatHistory, setChatHistory] = React.useState<ChatHistory[]>([]);

  const addChat = (title: string, date: string, firstMessage: string) => {
    const newId = Date.now();
    setChatHistory(prev => [
      { id: newId, title, date, content: [firstMessage], messages: [] },
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

  const addMessage = (id: number, message: Message) => {
    setChatHistory(prev => prev.map(chat =>
      chat.id === id
        ? { ...chat, messages: [...chat.messages, message] }
        : chat
    ));
  };

  const deleteChat = (id: number) => {
    setChatHistory(prev => prev.filter(chat => chat.id !== id));
  };

  return (
    <ChatContext.Provider value={{ chatHistory, addChat, updateChatContent, addMessage, deleteChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => React.useContext(ChatContext);