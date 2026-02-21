'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  User,
  Sparkles,
  Trash2,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Lightbulb,
  Recycle,
  TrendingUp,
  Calendar,
  MapPin,
  AlertCircle,
} from 'lucide-react';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

const quickActions = [
  { icon: Recycle, label: 'Waste Classification', prompt: 'How do I classify plastic waste types?' },
  { icon: TrendingUp, label: 'Analytics', prompt: 'Show me this week\'s recycling trends' },
  { icon: MapPin, label: 'Collection Routes', prompt: 'Optimize collection route for Douala area' },
  { icon: Calendar, label: 'Schedule', prompt: 'What\'s the best schedule for waste collection?' },
  { icon: Lightbulb, label: 'Tips', prompt: 'Give me tips on reducing waste at home' },
  { icon: AlertCircle, label: 'Report Issue', prompt: 'How do I report illegal dumping?' },
];

const sampleResponses = {
  wasteClassification: `Here's how to classify plastic waste:\n\n**PET (Polyethylene Terephthalate)**\n- Water bottles, food containers\n- Recycling code #1\n\n**HDPE (High-Density Polyethylene)**\n- Milk jugs, detergent bottles\n- Recycling code #2\n\n**PVC (Polyvinyl Chloride)**\n- Pipes, window frames\n- Recycling code #3\n\n**LDPE (Low-Density Polyethylene)**\n- Plastic bags, squeeze bottles\n- Recycling code #4\n\n**PP (Polypropylene)**\n- Yogurt containers, bottle caps\n- Recycling code #5\n\nWould you like more details on any specific type?`,
  analytics: `📊 **Weekly Recycling Trends - Week 4, January 2024**\n\n**Total Waste Collected:** 156.4 tons\n- ♻️ Recyclable: 62.5 tons (40%)\n- 🌱 Organic: 54.8 tons (35%)\n- 🗑️ General: 28.4 tons (18%)\n- ⚠️ Hazardous: 10.7 tons (7%)\n\n**Top Performing Zones:**\n1. Akwa - 95% efficiency\n2. Douala 1 - 94% efficiency\n3. Bonamousadi - 92% efficiency\n\n**This Week's Highlights:**\n- 12% increase in plastic recycling\n- 8% decrease in illegal dumping reports\n- New collectors joined: 15\n\nWould you like detailed analysis on any specific category?`,
  routes: `🗺️ **Optimized Collection Route - Douala Area**\n\n**Route A (Morning - 6:00 AM)**\n1. Bonamousadi → 2. Akwa → 3. Deido\n- Estimated time: 2.5 hours\n- Waste collected: 12 tons\n\n**Route B (Afternoon - 1:00 PM)**\n1. Douala 1 → 2. Douala 2 → 3. Douala 3\n- Estimated time: 3 hours\n- Waste collected: 15 tons\n\n**Route C (Evening - 5:00 PM)**\n1. Douala 4 → 2. Kribi Port → 3. Industrial Zone\n- Estimated time: 2 hours\n- Waste collected: 8 tons\n\n**Tips:**\n- Avoid peak traffic hours (7-9 AM, 4-6 PM)\n- Prioritize residential areas in morning\n- Industrial zones best in late afternoon\n\nWould you like to save this route or make adjustments?`,
};

export default function AIAssistancePage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      content: `👋 Hello! I'm your 237Circulo AI Assistant.\n\nI can help you with:\n- 🗑️ Waste classification and sorting\n- 📊 Analytics and trends\n- 🗺️ Route optimization\n- 📅 Scheduling collections\n- 💡 Recycling tips\n- ⚠️ Reporting issues\n\nHow can I help you today?`,
      timestamp: new Date(),
      suggestions: ['How do I classify plastic waste?', 'Show me recycling trends', 'Optimize collection route'],
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('plastic') || lowerMessage.includes('classif')) {
      return sampleResponses.wasteClassification;
    } else if (lowerMessage.includes('trend') || lowerMessage.includes('analytics') || lowerMessage.includes('report')) {
      return sampleResponses.analytics;
    } else if (lowerMessage.includes('route') || lowerMessage.includes('map') || lowerMessage.includes('optim')) {
      return sampleResponses.routes;
    } else if (lowerMessage.includes('schedule') || lowerMessage.includes('when')) {
      return `📅 **Collection Schedule - Douala**\n\n**Residential Areas:**\n- Monday, Wednesday, Friday: Bonamousadi, Akwa\n- Tuesday, Thursday, Saturday: Douala 1, 2, 3\n\n**Commercial Areas:**\n- Daily collection available\n- Early morning (5-7 AM) recommended\n\n**Industrial Zones:**\n- Monday to Saturday\n- Afternoon slots preferred\n\nWould you like me to set up reminders for your area?`;
    } else if (lowerMessage.includes('tip') || lowerMessage.includes('reduce')) {
      return `💡 **Tips for Reducing Waste at Home**\n\n1. **Use Reusable Bags** - Keep cloth bags in your car\n2. **Compost Organic Waste** - Start a small compost bin\n3. **Buy in Bulk** - Reduces packaging waste\n4. **Proper Sorting** - Follow our classification guide\n5. **Support Local** - Buy from local recyclers\n6. **Educate Others** - Share knowledge with neighbors\n\nSmall actions make big differences! 🌱\n\nWould you like more specific tips for your situation?`;
    } else if (lowerMessage.includes('report') || lowerMessage.includes('illegal') || lowerMessage.includes('dumping')) {
      return `⚠️ **To Report Illegal Dumping:**\n\n1. 📸 Take a photo of the violation\n2. 📍 Note the exact location (use GPS)\n3. 📝 Describe the waste type\n4. 📱 Submit via 237Circulo app or website\n\n**Hotline:** +237 6XX XXX XXX\n**Email:** report@237circulo.com\n\nYour report will be processed within 24 hours. Thank you for helping keep Cameroon clean!`;
    }
    
    return `I understand you're asking about "${userMessage}". \n\nI'm specifically trained to help with:\n- 🗑️ Waste classification\n- 📊 Recycling analytics\n- 🗺️ Route optimization\n- 📅 Scheduling\n- 💡 Eco-tips\n- ⚠️ Issue reporting\n\nCould you try asking about one of these topics?`;
  };

  const handleSendMessage = (message?: string) => {
    const text = message || inputMessage.trim();
    if (!text) return;

    const userMessage: Message = {
      id: messages.length + 1,
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        role: 'assistant',
        content: getAIResponse(text),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickAction = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const handleThumbsUp = (messageId: number) => {
    console.log('Thumbs up for message:', messageId);
  };

  const handleThumbsDown = (messageId: number) => {
    console.log('Thumbs down for message:', messageId);
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col lg:flex-row gap-6">
      {/* Quick Actions Sidebar */}
      <div className="w-full lg:w-64 shrink-0 space-y-4">
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-4">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-green-600" />
            <h2 className="font-semibold text-[var(--color-foreground)]">Quick Actions</h2>
          </div>
          <div className="space-y-2">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => handleQuickAction(action.prompt)}
                className="flex w-full items-center gap-3 rounded-lg p-2 text-left text-sm text-[var(--color-text-dim)] hover:bg-[var(--color-border)] transition-colors"
              >
                <action.icon className="h-4 w-4" />
                {action.label}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-4">
          <h3 className="font-semibold text-[var(--color-foreground)] mb-2">AI Stats</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[var(--color-text-dim)]">Questions Answered</span>
              <span className="font-medium text-green-600">1,247</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--color-text-dim)]">Accuracy Rate</span>
              <span className="font-medium text-green-600">94%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--color-text-dim)]">Avg Response</span>
              <span className="font-medium text-green-600">&lt;2s</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex flex-1 flex-col rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] overflow-hidden">
        {/* Chat Header */}
        <div className="flex items-center justify-between border-b border-[var(--color-border)] p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-[var(--color-foreground)]">AI Assistant</h2>
              <p className="text-xs text-green-600">Online • Ready to help</p>
            </div>
          </div>
          <button
            onClick={() => setMessages([{
              id: 1,
              role: 'assistant',
              content: `👋 Hello! I'm your 237Circulo AI Assistant.\n\nI can help you with:\n- 🗑️ Waste classification and sorting\n- 📊 Analytics and trends\n- 🗺️ Route optimization\n- 📅 Scheduling collections\n- 💡 Recycling tips\n- ⚠️ Reporting issues\n\nHow can I help you today?`,
              timestamp: new Date(),
              suggestions: ['How do I classify plastic waste?', 'Show me recycling trends', 'Optimize collection route'],
            }])}
            className="rounded-lg p-2 text-[var(--color-text-dim)] hover:bg-[var(--color-border)] transition-colors"
            title="Clear chat"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-xl p-4 ${
                  message.role === 'user'
                    ? 'bg-green-600 text-white'
                    : 'border border-[var(--color-border)] bg-[var(--color-background)]'
                }`}
              >
                <div className="flex items-start gap-3">
                  {message.role === 'assistant' && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-600">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      {message.role === 'user' ? (
                        <User className="h-4 w-4" />
                      ) : (
                        <Bot className="h-4 w-4" />
                      )}
                      <span className="text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                    
                    {message.role === 'assistant' && (
                      <div className="flex items-center gap-2 pt-2">
                        <button
                          onClick={() => copyToClipboard(message.content)}
                          className="rounded p-1 hover:bg-[var(--color-border)]"
                          title="Copy"
                        >
                          <Copy className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => handleThumbsUp(message.id)}
                          className="rounded p-1 hover:bg-[var(--color-border)]"
                          title="Helpful"
                        >
                          <ThumbsUp className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => handleThumbsDown(message.id)}
                          className="rounded p-1 hover:bg-[var(--color-border)]"
                          title="Not helpful"
                        >
                          <ThumbsDown className="h-3 w-3" />
                        </button>
                      </div>
                    )}

                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {message.suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="rounded-full bg-green-600/10 px-3 py-1 text-xs text-green-600 hover:bg-green-600/20"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] p-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="flex gap-1">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-green-600"></span>
                  <span className="h-2 w-2 animate-bounce rounded-full bg-green-600" style={{ animationDelay: '0.1s' }}></span>
                  <span className="h-2 w-2 animate-bounce rounded-full bg-green-600" style={{ animationDelay: '0.2s' }}></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-[var(--color-border)] p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me anything about waste management..."
              className="flex-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-2 text-sm outline-none focus:border-green-600"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputMessage.trim() || isTyping}
              className="flex items-center justify-center rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
