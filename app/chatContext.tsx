import * as React from "react";

type ChatHistory = {
  id: number;
  title: string;
  date: string;
};

type ChatContextType = {
  chatHistory: ChatHistory[];
  addChat: (title: string, date: string) => void;
  deleteChat: (id: number) => void;
};

const ChatContext = React.createContext<ChatContextType>({
  chatHistory: [],
  addChat: () => {},
  deleteChat: () => {},
});

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [chatHistory, setChatHistory] = React.useState<ChatHistory[]>([]);

  const addChat = (title: string, date: string) => {
    setChatHistory(prev => [
      { id: Date.now(), title, date },
      ...prev,
    ]);
  };

  const deleteChat = (id: number) => {
    setChatHistory(prev => prev.filter(chat => chat.id !== id));
  };

  return (
    <ChatContext.Provider value={{ chatHistory, addChat, deleteChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => React.useContext(ChatContext);