
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/components/AuthProvider';
import { SendHorizonal, Search } from 'lucide-react';

// Mock data
const initialChats = [
  {
    id: 1,
    name: 'Placement Team',
    avatar: 'PT',
    lastMessage: 'Please submit your application by the deadline.',
    timestamp: '2025-04-09T10:30:00',
    unread: 2
  },
  {
    id: 2,
    name: 'Google Recruiter',
    avatar: 'GR',
    lastMessage: 'We would like to schedule an interview with you.',
    timestamp: '2025-04-08T16:45:00',
    unread: 0
  },
  {
    id: 3,
    name: 'Career Advisor',
    avatar: 'CA',
    lastMessage: 'Let me know if you need help with your resume.',
    timestamp: '2025-04-07T09:15:00',
    unread: 0
  }
];

const initialMessages = {
  1: [
    {
      id: 1,
      sender: 'Placement Team',
      content: 'Hello! Welcome to the placement portal. We are here to help you with your placement journey.',
      timestamp: '2025-04-09T09:30:00',
      isUser: false
    },
    {
      id: 2,
      sender: 'Placement Team',
      content: 'Please make sure to update your resume and apply for opportunities before the deadlines.',
      timestamp: '2025-04-09T09:31:00',
      isUser: false
    },
    {
      id: 3,
      sender: 'Me',
      content: 'Thank you! I will make sure to update my resume and apply for the opportunities.',
      timestamp: '2025-04-09T09:35:00',
      isUser: true
    },
    {
      id: 4,
      sender: 'Placement Team',
      content: 'Great! Feel free to ask if you have any questions about the placement process.',
      timestamp: '2025-04-09T09:37:00',
      isUser: false
    },
    {
      id: 5,
      sender: 'Placement Team',
      content: 'Also, don\'t forget to check out the upcoming career fair on May 15th. It\'s a great opportunity to network with potential employers.',
      timestamp: '2025-04-09T10:30:00',
      isUser: false
    }
  ],
  2: [
    {
      id: 1,
      sender: 'Google Recruiter',
      content: 'Hello! We received your application for the Software Engineer position at Google.',
      timestamp: '2025-04-08T15:30:00',
      isUser: false
    },
    {
      id: 2,
      sender: 'Google Recruiter',
      content: 'Your profile looks promising, and we would like to schedule an interview with you.',
      timestamp: '2025-04-08T15:32:00',
      isUser: false
    },
    {
      id: 3,
      sender: 'Me',
      content: 'That\'s great news! I\'m very interested in the position.',
      timestamp: '2025-04-08T15:40:00',
      isUser: true
    },
    {
      id: 4,
      sender: 'Me',
      content: 'When would be a good time for the interview?',
      timestamp: '2025-04-08T15:41:00',
      isUser: true
    },
    {
      id: 5,
      sender: 'Google Recruiter',
      content: 'We have openings next week on Monday, Wednesday, and Friday between 10 AM and 4 PM. Please let me know what works best for you.',
      timestamp: '2025-04-08T16:45:00',
      isUser: false
    }
  ],
  3: [
    {
      id: 1,
      sender: 'Career Advisor',
      content: 'Hi there! I\'m your career advisor. I\'m here to help you with your career planning and job search.',
      timestamp: '2025-04-07T09:00:00',
      isUser: false
    },
    {
      id: 2,
      sender: 'Me',
      content: 'Hello! Thank you for reaching out. I\'m looking for some advice on my resume.',
      timestamp: '2025-04-07T09:05:00',
      isUser: true
    },
    {
      id: 3,
      sender: 'Career Advisor',
      content: 'Sure thing! I\'d be happy to review your resume and provide feedback. You can upload it in the Resume section of the portal.',
      timestamp: '2025-04-07T09:10:00',
      isUser: false
    },
    {
      id: 4,
      sender: 'Me',
      content: 'Great! I\'ll update my resume and upload it. Thank you for your help.',
      timestamp: '2025-04-07T09:14:00',
      isUser: true
    },
    {
      id: 5,
      sender: 'Career Advisor',
      content: 'Let me know if you need help with your resume.',
      timestamp: '2025-04-07T09:15:00',
      isUser: false
    }
  ]
};

const ChatPage = () => {
  const { user } = useAuth();
  const [chats, setChats] = useState(initialChats);
  const [messages, setMessages] = useState(initialMessages);
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, selectedChat]);
  
  const filteredChats = chats.filter(chat => 
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;
    
    const newMessageObj = {
      id: messages[selectedChat].length + 1,
      sender: 'Me',
      content: newMessage,
      timestamp: new Date().toISOString(),
      isUser: true
    };
    
    // Update messages
    setMessages({
      ...messages,
      [selectedChat]: [...messages[selectedChat], newMessageObj]
    });
    
    // Update last message in chat list
    setChats(chats.map(chat => 
      chat.id === selectedChat 
        ? { ...chat, lastMessage: newMessage, timestamp: new Date().toISOString(), unread: 0 }
        : chat
    ));
    
    setNewMessage('');
    
    // Simulate a response after a delay
    setTimeout(() => {
      const responseMessage = {
        id: messages[selectedChat].length + 2,
        sender: chats.find(chat => chat.id === selectedChat)?.name || '',
        content: `Thank you for your message. A team member will get back to you soon.`,
        timestamp: new Date().toISOString(),
        isUser: false
      };
      
      setMessages({
        ...messages,
        [selectedChat]: [...messages[selectedChat], responseMessage]
      });
      
      // Update last message in chat list
      setChats(chats.map(chat => 
        chat.id === selectedChat 
          ? { ...chat, lastMessage: responseMessage.content, timestamp: new Date().toISOString() }
          : chat
      ));
    }, 1000);
  };
  
  const handleChatSelect = (chatId: number) => {
    setSelectedChat(chatId);
    
    // Mark as read
    setChats(chats.map(chat => 
      chat.id === chatId 
        ? { ...chat, unread: 0 }
        : chat
    ));
  };
  
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };
  
  return (
    <div className="h-[calc(100vh-10rem)]">
      <div className="flex h-full">
        {/* Chat Sidebar */}
        <Card className="w-full md:w-80 flex flex-col h-full mr-0 md:mr-4 border-r md:border">
          <CardHeader className="pb-4">
            <CardTitle>Messages</CardTitle>
            <CardDescription>
              Chat with placement team and recruiters
            </CardDescription>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search chats" 
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <Tabs defaultValue="all" className="px-4 mb-2">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
            </TabsList>
          </Tabs>
          <CardContent className="flex-1 overflow-y-auto pb-0">
            <div className="space-y-2">
              {filteredChats.map((chat) => (
                <div 
                  key={chat.id}
                  className={`flex items-center p-3 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors ${
                    selectedChat === chat.id ? 'bg-muted' : ''
                  }`}
                  onClick={() => handleChatSelect(chat.id)}
                >
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src="" alt={chat.name} />
                    <AvatarFallback>{chat.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-sm truncate">{chat.name}</h4>
                      <span className="text-xs text-muted-foreground">
                        {formatTime(chat.timestamp)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                      {chat.unread > 0 && (
                        <span className="flex-shrink-0 h-5 w-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-semibold ml-2">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Chat Main Area */}
        <Card className="flex-1 flex flex-col h-full ml-0 md:ml-0 mt-4 md:mt-0">
          {selectedChat ? (
            <>
              <CardHeader className="pb-4 border-b">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src="" alt={chats.find(c => c.id === selectedChat)?.name} />
                    <AvatarFallback>
                      {chats.find(c => c.id === selectedChat)?.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">
                      {chats.find(c => c.id === selectedChat)?.name}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Online
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {messages[selectedChat].map((message, index) => {
                    const showDate = index === 0 || 
                      formatDate(messages[selectedChat][index - 1].timestamp) !== formatDate(message.timestamp);
                    
                    return (
                      <React.Fragment key={message.id}>
                        {showDate && (
                          <div className="flex justify-center my-4">
                            <span className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground">
                              {formatDate(message.timestamp)}
                            </span>
                          </div>
                        )}
                        <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                          <div className={`flex max-w-[80%] ${message.isUser ? 'flex-row-reverse' : ''}`}>
                            {!message.isUser && (
                              <Avatar className="h-8 w-8 mr-2">
                                <AvatarImage src="" alt={message.sender} />
                                <AvatarFallback>
                                  {message.sender.substring(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                            )}
                            <div>
                              <div className={`px-4 py-2 rounded-lg ${
                                message.isUser 
                                  ? 'bg-primary text-primary-foreground ml-2' 
                                  : 'bg-muted text-muted-foreground'
                              }`}>
                                <p className="text-sm">{message.content}</p>
                              </div>
                              <div className={`text-xs text-muted-foreground mt-1 ${
                                message.isUser ? 'text-right mr-2' : 'ml-2'
                              }`}>
                                {formatTime(message.timestamp)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>
              <div className="p-4 border-t">
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button 
                    size="icon" 
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                  >
                    <SendHorizonal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <h3 className="text-lg font-medium">Select a conversation</h3>
              <p className="text-muted-foreground mt-2">
                Choose a conversation from the sidebar to start chatting
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ChatPage;
