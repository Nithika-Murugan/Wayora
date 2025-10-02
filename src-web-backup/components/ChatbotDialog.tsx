import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";
import { 
  Send, 
  Mic, 
  MicOff, 
  Globe, 
  Clock, 
  Bot,
  User,
  Sparkles
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  suggestions?: string[];
}

interface ChatbotDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChatbotDialog({ open, onOpenChange }: ChatbotDialogProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "👋 Hi! I'm Tavi, your AI travel assistant! I can help you with travel tips, recommendations, budget planning, and much more. What would you like to explore today?",
      sender: 'bot',
      timestamp: new Date(),
      suggestions: [
        "Plan a trip to Paris",
        "Find budget restaurants in Tokyo",
        "Emergency services near me",
        "Convert currency"
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("English");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const languages = ["English", "Spanish", "French", "German", "Japanese", "Mandarin"];

  const quickResponses = [
    "What's the weather like?",
    "Find nearby restaurants",
    "Emergency contacts",
    "GPS navigation help",
    "Local customs & etiquette",
    "Share trip with friends",
    "Offline mode setup",
    "Backup my data"
  ];

  const botResponses: { [key: string]: any } = {
    "plan a trip": {
      text: "🗺️ I'd love to help you plan an amazing trip! To create the perfect itinerary, I'll need a few details:\n\n• Destination\n• Travel dates\n• Budget range\n• Travel style (adventure, relaxation, cultural, etc.)\n• Group size\n\nOnce I have these, I can suggest personalized recommendations for stays, activities, and hidden gems!",
      suggestions: ["Paris for 5 days", "Budget trip to Thailand", "Family vacation ideas"]
    },
    "paris": {
      text: "🇫🇷 Paris is magical! Here's what I recommend:\n\n🏛️ **Must-see**: Eiffel Tower, Louvre, Notre-Dame\n🍷 **Hidden gem**: Montmartre vineyards\n🥐 **Food**: Try a croissant at Pierre Hermé\n💰 **Budget tip**: Many museums are free on first Sundays\n🚇 **Transport**: Get a weekly Navigo pass\n\nWould you like specific recommendations for any category?",
      suggestions: ["Best cafes in Paris", "Free activities in Paris", "Paris museum pass info"]
    },
    "budget": {
      text: "💰 Smart budgeting is key to great travel! Here are my top tips:\n\n• Set a daily spending limit\n• Use OCR receipt scanning for easy tracking\n• Book accommodations in advance\n• Eat where locals eat\n• Use public transport\n• Look for free walking tours\n\nI can help you create a detailed budget breakdown for your trip!",
      suggestions: ["Calculate trip budget", "Money-saving tips", "Track expenses"]
    },
    "emergency": {
      text: "🆘 For emergencies, I can quickly help you find:\n\n🏥 Nearby hospitals\n💊 24/7 pharmacies\n🏧 ATMs\n🚔 Police stations\n🚻 Restrooms\n📞 Embassy contacts\n\nJust share your location and I'll provide immediate assistance. Stay safe!",
      suggestions: ["Find nearest hospital", "Embassy contacts", "Emergency phrases"]
    },
    "weather": {
      text: "🌤️ Current weather in your location: 22°C, partly cloudy\n\n📅 **3-day forecast:**\n• Today: 22°C, light rain in evening\n• Tomorrow: 25°C, sunny\n• Day 3: 20°C, cloudy\n\n☂️ Don't forget an umbrella for today evening!",
      suggestions: ["7-day forecast", "What to pack", "Weather alerts"]
    },
    "restaurant": {
      text: "🍽️ Great! I found some fantastic dining options near you:\n\n⭐ **Local favorites:**\n• Mama's Kitchen - Authentic local cuisine ($15-25)\n• Harbor View Café - Fresh seafood ($20-35)\n• Street Food Corner - Quick bites ($5-12)\n\n🕒 All open now! Would you like directions or reviews?",
      suggestions: ["Get directions", "See reviews", "Dietary restrictions"]
    },
    "currency": {
      text: "💱 **Current Exchange Rates:**\n\n• 1 USD = 0.85 EUR\n• 1 USD = 110.50 JPY\n• 1 USD = 1.25 GBP\n• 1 USD = 1.35 CAD\n\n📊 Based on live rates. I can also help you set up spending alerts in local currency!",
      suggestions: ["Set currency alerts", "Best exchange places", "Card vs cash tips"]
    },
    "navigation": {
      text: "🧭 **GPS Navigation & Maps:**\n\n• Real-time turn-by-turn directions\n• Offline map downloads available\n• Local transport integration\n• Traffic alerts and alternative routes\n• Points of interest along your route\n\n📍 I can help you navigate anywhere, even offline!",
      suggestions: ["Download offline maps", "Find transport", "Avoid traffic"]
    },
    "share": {
      text: "🤝 **Share Your Adventure:**\n\n• Send trip itineraries to companions\n• Real-time location sharing\n• Collaborative planning tools\n• Secure sharing with privacy controls\n• Group expense splitting\n\n👥 Perfect for group travel coordination!",
      suggestions: ["Invite travel partner", "Share itinerary", "Split expenses"]
    },
    "offline": {
      text: "📱 **Offline Mode Features:**\n\n• Download maps and guides\n• Access saved itineraries\n• Offline expense tracking\n• Emergency contacts always available\n• Auto-sync when connection returns\n\n🔄 Never lose your travel data, even without internet!",
      suggestions: ["Enable offline mode", "Download maps", "Sync settings"]
    },
    "backup": {
      text: "☁️ **Cloud Backup & Sync:**\n\n• Automatic data backup\n• Cross-device synchronization\n• Version history and recovery\n• Encrypted storage\n• Access from any device\n\n🔒 Your travel memories are safe and always accessible!",
      suggestions: ["Setup auto-backup", "View sync status", "Restore data"]
    },
    "guide": {
      text: "🏛️ **Local Guides & Experiences:**\n\n• Connect with certified local guides\n• Authentic cultural experiences\n• Hidden gems and secret spots\n• Language assistance\n• Safety and cultural tips\n\n🌍 Discover destinations like a local!",
      suggestions: ["Find local guide", "Book experience", "Cultural tips"]
    }
  };

  const generateBotResponse = (userMessage: string): any => {
    const message = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(botResponses)) {
      if (message.includes(key)) {
        return response;
      }
    }
    
    // Default response
    return {
      text: "I understand you're looking for travel assistance! I can help with:\n\n🗺️ Trip planning & itineraries\n💰 Budget management\n🏨 Accommodation recommendations\n🍽️ Restaurant suggestions\n🆘 Emergency assistance\n🌍 Local insights & tips\n\nWhat specific area would you like help with?",
      suggestions: ["Plan a trip", "Find restaurants", "Emergency help", "Budget advice"]
    };
  };

  const sendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse.text,
        sender: 'bot',
        timestamp: new Date(),
        suggestions: botResponse.suggestions
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const toggleVoice = () => {
    setIsListening(!isListening);
    // In a real app, this would start/stop speech recognition
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-2xl h-[80vh] flex flex-col rounded-3xl border-0 shadow-2xl"
        style={{ backgroundColor: '#FEFEE3' }}
      >
        <DialogHeader 
          className="pb-4 border-b"
          style={{ borderColor: 'rgba(44, 110, 73, 0.1)' }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm"
                style={{ backgroundColor: '#4C956C' }}
              >
                <Bot className="w-7 h-7" style={{ color: '#FEFEE3' }} />
              </div>
              <div>
                <DialogTitle 
                  className="flex items-center gap-2 text-lg font-semibold"
                  style={{ color: '#2C6E49' }}
                >
                  Tavi - AI Travel Assistant
                  <div 
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: '#4C956C' }}
                  ></div>
                </DialogTitle>
                <DialogDescription 
                  className="text-sm"
                  style={{ color: 'rgba(44, 110, 73, 0.6)' }}
                >
                  Online • Responds instantly
                </DialogDescription>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <Globe className="w-3 h-3" />
                {currentLanguage}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const currentIndex = languages.indexOf(currentLanguage);
                  const nextIndex = (currentIndex + 1) % languages.length;
                  setCurrentLanguage(languages[nextIndex]);
                }}
              >
                🌐
              </Button>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="space-y-2">
                <div className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div 
                    className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm"
                    style={{
                      backgroundColor: message.sender === 'user' ? '#2C6E49' : '#4C956C'
                    }}
                  >
                    {message.sender === 'user' ? (
                      <User className="w-5 h-5" style={{ color: '#FEFEE3' }} />
                    ) : (
                      <Bot className="w-5 h-5" style={{ color: '#FEFEE3' }} />
                    )}
                  </div>
                  
                  <div 
                    className="max-w-[80%] p-4 rounded-2xl shadow-sm border"
                    style={{
                      backgroundColor: message.sender === 'user' ? '#2C6E49' : '#FFC9B9',
                      color: message.sender === 'user' ? '#FEFEE3' : '#2C6E49',
                      borderColor: message.sender === 'user' ? '#4C956C' : '#D68C45'
                    }}
                  >
                    <p className="whitespace-pre-line leading-relaxed">{message.text}</p>
                    <p 
                      className="text-xs mt-2" 
                      style={{ 
                        opacity: 0.7,
                        color: message.sender === 'user' ? 'rgba(254, 254, 227, 0.7)' : 'rgba(44, 110, 73, 0.7)'
                      }}
                    >
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>

                {message.suggestions && (
                  <div className="flex flex-wrap gap-2 ml-11">
                    {message.suggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="text-xs"
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-2xl bg-orange-500 flex items-center justify-center shadow-sm">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div 
          className="border-t pt-4 space-y-3"
          style={{ borderColor: 'rgba(44, 110, 73, 0.1)' }}
        >
          <div className="flex flex-wrap gap-2">
            {quickResponses.map((response, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleSuggestionClick(response)}
                className="text-xs rounded-full border hover:scale-105 transition-all"
                style={{
                  borderColor: '#4C956C',
                  color: '#2C6E49',
                  backgroundColor: 'rgba(76, 149, 108, 0.05)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#4C956C';
                  e.currentTarget.style.color = '#FEFEE3';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(76, 149, 108, 0.05)';
                  e.currentTarget.style.color = '#2C6E49';
                }}
              >
                {response}
              </Button>
            ))}
          </div>

          <div className="flex gap-3">
            <Input
              placeholder="Ask me anything about travel..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1 rounded-full px-4 py-2 border"
              style={{
                borderColor: '#4C956C',
                backgroundColor: 'rgba(76, 149, 108, 0.05)',
                color: '#2C6E49'
              }}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={toggleVoice}
              className="rounded-full w-10 h-10 p-0 border transition-all hover:scale-110"
              style={{
                backgroundColor: isListening ? '#FFC9B9' : 'rgba(76, 149, 108, 0.05)',
                color: isListening ? '#2C6E49' : '#4C956C',
                borderColor: isListening ? '#D68C45' : '#4C956C'
              }}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </Button>
            <Button 
              onClick={sendMessage} 
              size="sm"
              className="rounded-full w-10 h-10 p-0 border-0 hover:scale-110 transition-all"
              style={{
                backgroundColor: '#2C6E49',
                color: '#FEFEE3'
              }}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>AI-powered responses</span>
            </div>
            <div className="flex items-center gap-1">
              <Globe className="w-3 h-3" />
              <span>50+ languages supported</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>24/7 availability</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}