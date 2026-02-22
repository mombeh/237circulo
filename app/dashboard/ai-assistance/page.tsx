'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Bot,
  Send,
  User,
  Sparkles,
  Trash2,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Recycle,
  Camera,
  DollarSign,
  X,
  Loader2,
  Image as ImageIcon,
} from 'lucide-react';
import {
  classifyWaste,
  forecastPrice,
  streamChat,
  ChatLanguage,
  getDefaultZones,
  getWasteTypes,
} from '@/app/lib/ai-service';
import { ClassificationResult, PriceForecastResult, ChatMessage } from '@/app/lib/types';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

type ActiveTab = 'chat' | 'classify' | 'price';

const quickActions = [
  { icon: Recycle, label: 'Waste Classification', tab: 'classify' as const },
  { icon: DollarSign, label: 'Price Forecast', tab: 'price' as const },
  { icon: Bot, label: 'AI Chat', tab: 'chat' as const },
];

const chatSuggestions = [
  'How do I classify plastic waste types?',
  'Show me this week\'s recycling trends',
  'What\'s the best schedule for waste collection?',
  'Give me tips on reducing waste at home',
];

export default function AIAssistancePage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('chat');
  
  // Chat state
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      content: ` Hello! I'm your 237Circulo AI Assistant.

I can help you with:
- Waste classification (upload photo)
- Price forecasting for waste
- Recycling analytics
- Route optimization
- Scheduling
- Eco-tips

How can I help you today?`,
      timestamp: new Date(),
      suggestions: chatSuggestions,
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatLanguage, setChatLanguage] = useState<ChatLanguage>('fr');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Classification state
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [classificationDescription, setClassificationDescription] = useState('');
  const [classificationResult, setClassificationResult] = useState<ClassificationResult | null>(null);
  const [isClassifying, setIsClassifying] = useState(false);
  const [classificationError, setClassificationError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Price forecast state
  const [selectedWasteType, setSelectedWasteType] = useState('');
  const [selectedZone, setSelectedZone] = useState('');
  const [priceResult, setPriceResult] = useState<PriceForecastResult | null>(null);
  const [isForecasting, setIsForecasting] = useState(false);
  const [priceError, setPriceError] = useState<string | null>(null);

  const zones = getDefaultZones();
  const wasteTypes = getWasteTypes();

  // Scroll to bottom for chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // ── Image Handling ─────────────────────────────────────────────────────────

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        setClassificationError('Only JPEG, PNG, and WebP images are accepted.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setClassificationError('Image must be less than 5MB.');
        return;
      }
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
      setClassificationError(null);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setClassificationResult(null);
  };

  // ── Classification Handler ─────────────────────────────────────────────────

  const handleClassify = async () => {
    if (!selectedImage && !classificationDescription.trim()) {
      setClassificationError('Provide at least an image or a description.');
      return;
    }

    setIsClassifying(true);
    setClassificationError(null);
    setClassificationResult(null);

    try {
      const result = await classifyWaste(selectedImage || undefined, classificationDescription || undefined);
      setClassificationResult(result);
    } catch (err) {
      setClassificationError((err as Error).message || 'Classification failed. Please try again.');
    } finally {
      setIsClassifying(false);
    }
  };

  // ── Price Forecast Handler ────────────────────────────────────────────────

  const handlePriceForecast = async () => {
    if (!selectedWasteType) {
      setPriceError('Please select a waste type.');
      return;
    }
    if (!selectedZone) {
      setPriceError('Please select a zone.');
      return;
    }

    setIsForecasting(true);
    setPriceError(null);
    setPriceResult(null);

    try {
      const result = await forecastPrice(selectedWasteType, selectedZone);
      setPriceResult(result);
    } catch (err) {
      setPriceError((err as Error).message || 'Price forecast failed. Please try again.');
    } finally {
      setIsForecasting(false);
    }
  };

  // ── Chat Handler ───────────────────────────────────────────────────────────

  const handleSendMessage = useCallback((message?: string) => {
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

    // Build message history for API
    const messageHistory: ChatMessage[] = messages
      .map(m => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      }));
    messageHistory.push({ role: 'user', content: text });

    // Stream from API
    streamChat(
      messageHistory,
      chatLanguage,
      (token) => {
        // Append token to last message or create new one
        setMessages((prev) => {
          const lastMessage = prev[prev.length - 1];
          if (lastMessage?.role === 'assistant') {
            return [
              ...prev.slice(0, -1),
              { ...lastMessage, content: lastMessage.content + token },
            ];
          }
          return [
            ...prev,
            {
              id: prev.length + 1,
              role: 'assistant',
              content: token,
              timestamp: new Date(),
            },
          ];
        });
      },
      () => {
        setIsTyping(false);
      },
      (error) => {
        setIsTyping(false);
        // Add error message
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            role: 'assistant',
            content: `⚠️ ${error}`,
            timestamp: new Date(),
          },
        ]);
      }
    );
  }, [inputMessage, messages, chatLanguage]);

  const handleQuickAction = (tab: ActiveTab) => {
    setActiveTab(tab);
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

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        role: 'assistant',
        content: `👋 Hello! I'm your 237Circulo AI Assistant.

I can help you with:
- 🗑️ Waste classification (upload photo)
- 💰 Price forecasting for waste
- 📊 Recycling analytics
- 🗺️ Route optimization
- 📅 Scheduling
- 💡 Eco-tips

How can I help you today?`,
        timestamp: new Date(),
        suggestions: chatSuggestions,
      },
    ]);
  };

  // ── Render Functions ──────────────────────────────────────────────────────

  const renderConfidenceBadge = (confidence: 'high' | 'medium' | 'low') => {
    const colors = {
      high: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-red-100 text-red-800',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[confidence]}`}>
        {confidence.charAt(0).toUpperCase() + confidence.slice(1)} confidence
      </span>
    );
  };

  const renderDemandTrend = (trend: 'rising' | 'stable' | 'falling') => {
    const icons = {
      rising: '📈',
      stable: '➡️',
      falling: '📉',
    };
    const labels = {
      rising: 'Rising',
      stable: 'Stable',
      falling: 'Falling',
    };
    return (
      <span className="flex items-center gap-1">
        {icons[trend]} {labels[trend]}
      </span>
    );
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col lg:flex-row gap-6">
      {/* Quick Actions Sidebar */}
      <div className="w-full lg:w-64 shrink-0 space-y-4">
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-4">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-green-600" />
            <h2 className="font-semibold text-[var(--color-foreground)]">AI Features</h2>
          </div>
          <div className="space-y-2">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => handleQuickAction(action.tab)}
                className={`flex w-full items-center gap-3 rounded-lg p-2 text-left text-sm transition-colors ${
                  activeTab === action.tab
                    ? 'bg-green-600 text-white'
                    : 'text-[var(--color-text-dim)] hover:bg-[var(--color-border)]'
                }`}
              >
                <action.icon className="h-4 w-4" />
                {action.label}
              </button>
            ))}
          </div>
        </div>

        {/* Language Selector (for Chat) */}
        {activeTab === 'chat' && (
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-4">
            <h3 className="font-semibold text-[var(--color-foreground)] mb-2">Chat Language</h3>
            <select
              value={chatLanguage}
              onChange={(e) => setChatLanguage(e.target.value as ChatLanguage)}
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-sm outline-none focus:border-green-600"
            >
              <option value="fr">Français</option>
              <option value="en">English</option>
              <option value="pidgin">Pidgin English</option>
            </select>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--color-border)] p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600">
              {activeTab === 'chat' && <Bot className="h-5 w-5 text-white" />}
              {activeTab === 'classify' && <Camera className="h-5 w-5 text-white" />}
              {activeTab === 'price' && <DollarSign className="h-5 w-5 text-white" />}
            </div>
            <div>
              <h2 className="font-semibold text-[var(--color-foreground)]">
                {activeTab === 'chat' && 'AI Assistant'}
                {activeTab === 'classify' && 'Waste Classification'}
                {activeTab === 'price' && 'Price Forecast'}
              </h2>
              <p className="text-xs text-green-600">Online • Powered by GPT-4o</p>
            </div>
          </div>
          {activeTab === 'chat' && (
            <button
              onClick={clearChat}
              className="rounded-lg p-2 text-[var(--color-text-dim)] hover:bg-[var(--color-border)] transition-colors"
              title="Clear chat"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Content based on active tab */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* ── CHAT TAB ── */}
          {activeTab === 'chat' && (
            <div className="space-y-4">
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
          )}

          {/* ── CLASSIFY TAB ── */}
          {activeTab === 'classify' && (
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Image Upload */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-[var(--color-foreground)]">Upload Image</h3>
                  <div className="relative flex h-64 flex-col items-center justify-center rounded-xl border-2 border-dashed border-[var(--color-border)] bg-[var(--color-background)]">
                    {isClient && imagePreview ? (
                      <>
                        <img
                          src={imagePreview}
                          alt="Selected waste"
                          className="h-full w-full rounded-xl object-cover"
                        />
                        <button
                          onClick={clearImage}
                          className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </>
                    ) : (
                      <>
                        <ImageIcon className="h-12 w-12 text-[var(--color-text-dim)]" />
                        <p className="mt-2 text-sm text-[var(--color-text-dim)]">
                          Drop image here or click to upload
                        </p>
                        <p className="text-xs text-[var(--color-text-dim)]">
                          JPEG, PNG, WebP (max 5MB)
                        </p>
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          onChange={handleImageSelect}
                          className="absolute inset-0 cursor-pointer opacity-0"
                        />
                      </>
                    )}
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[var(--color-foreground)]">
                      Or describe the waste:
                    </label>
                    <textarea
                      value={classificationDescription}
                      onChange={(e) => setClassificationDescription(e.target.value)}
                      placeholder="e.g., Empty palm oil sachets, plastic water bottles..."
                      className="h-24 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] p-3 text-sm outline-none focus:border-green-600 resize-none"
                    />
                  </div>

                  <button
                    onClick={handleClassify}
                    disabled={isClassifying || (!selectedImage && !classificationDescription.trim())}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isClassifying ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Classifying...
                      </>
                    ) : (
                      <>
                        <Camera className="h-4 w-4" />
                        Classify Waste
                      </>
                    )}
                  </button>

                  {classificationError && (
                    <p className="text-sm text-red-500">{classificationError}</p>
                  )}
                </div>

                {/* Results */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-[var(--color-foreground)]">Classification Result</h3>
                  {classificationResult ? (
                    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-lg font-semibold text-[var(--color-foreground)] capitalize">
                            {classificationResult.category}
                          </p>
                          <p className="text-sm text-[var(--color-text-dim)]">
                            {classificationResult.sub_category}
                          </p>
                        </div>
                        {renderConfidenceBadge(classificationResult.confidence)}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-lg bg-green-50 p-3">
                          <p className="text-xs text-green-600">Recyclability Score</p>
                          <p className="text-2xl font-bold text-green-700">
                            {classificationResult.recyclability_score}%
                          </p>
                        </div>
                        <div className="rounded-lg bg-blue-50 p-3">
                          <p className="text-xs text-blue-600">Price Range</p>
                          <p className="text-xl font-bold text-blue-700">
                            {classificationResult.price_range_fcfa.min} - {classificationResult.price_range_fcfa.max} F CFA/kg
                          </p>
                        </div>
                      </div>

                      <div className="rounded-lg bg-[var(--color-card)] p-3">
                        <p className="text-sm font-medium text-[var(--color-foreground)]">Guidance</p>
                        <p className="text-sm text-[var(--color-text-dim)]">{classificationResult.guidance}</p>
                      </div>

                      <button
                        onClick={() => {
                          setInputMessage(`How do I prepare ${classificationResult.category} (${classificationResult.sub_category}) for recycling?`);
                          setActiveTab('chat');
                        }}
                        className="flex w-full items-center justify-center gap-2 rounded-lg border border-green-600 px-4 py-2 text-green-600 hover:bg-green-50"
                      >
                        <MessageCircle className="h-4 w-4" />
                        Ask AI for more tips
                      </button>
                    </div>
                  ) : (
                    <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-text-dim)]">
                      <Recycle className="h-12 w-12 opacity-50" />
                      <p className="mt-2 text-sm">Upload an image or describe the waste to get classification</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ── PRICE FORECAST TAB ── */}
          {activeTab === 'price' && (
            <div className="mx-auto max-w-2xl space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-[var(--color-foreground)]">Get Price Forecast</h3>
                <p className="text-sm text-[var(--color-text-dim)]">
                  Enter the waste type and zone to get an estimated price range.
                </p>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[var(--color-foreground)]">
                      Waste Type
                    </label>
                    <select
                      value={selectedWasteType}
                      onChange={(e) => setSelectedWasteType(e.target.value)}
                      className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-2 text-sm outline-none focus:border-green-600"
                    >
                      <option value="">Select waste type...</option>
                      {wasteTypes.map((type) => (
                        <option key={type} value={type} className="capitalize">
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[var(--color-foreground)]">
                      Zone
                    </label>
                    <select
                      value={selectedZone}
                      onChange={(e) => setSelectedZone(e.target.value)}
                      className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-2 text-sm outline-none focus:border-green-600"
                    >
                      <option value="">Select zone...</option>
                      {zones.map((zone) => (
                        <option key={zone.id} value={zone.id}>
                          {zone.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  onClick={handlePriceForecast}
                  disabled={isForecasting || !selectedWasteType || !selectedZone}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isForecasting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Forecasting...
                    </>
                  ) : (
                    <>
                      <DollarSign className="h-4 w-4" />
                      Get Price Forecast
                    </>
                  )}
                </button>

                {priceError && (
                  <p className="text-sm text-red-500">{priceError}</p>
                )}
              </div>

              {/* Results */}
              {priceResult && (
                <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-[var(--color-foreground)]">Price Forecast Result</h4>
                    {renderConfidenceBadge(priceResult.confidence)}
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="rounded-lg bg-green-50 p-4 text-center">
                      <p className="text-xs text-green-600">Min Price</p>
                      <p className="text-xl font-bold text-green-700">
                        {priceResult.price_range_fcfa.min} F CFA
                      </p>
                      <p className="text-xs text-green-600">per kg</p>
                    </div>
                    <div className="rounded-lg bg-blue-50 p-4 text-center">
                      <p className="text-xs text-blue-600">Max Price</p>
                      <p className="text-xl font-bold text-blue-700">
                        {priceResult.price_range_fcfa.max} F CFA
                      </p>
                      <p className="text-xs text-blue-600">per kg</p>
                    </div>
                    <div className="rounded-lg bg-purple-50 p-4 text-center">
                      <p className="text-xs text-purple-600">Demand Trend</p>
                      <p className="text-lg font-bold text-purple-700">
                        {renderDemandTrend(priceResult.demand_trend)}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg bg-[var(--color-card)] p-4">
                    <p className="text-sm font-medium text-[var(--color-foreground)]">Rationale</p>
                    <p className="mt-1 text-sm text-[var(--color-text-dim)]">{priceResult.rationale}</p>
                  </div>

                  <button
                    onClick={() => {
                      setActiveTab('chat');
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-green-600 px-4 py-2 text-green-600 hover:bg-green-50"
                  >
                    <Bot className="h-4 w-4" />
                    Discuss pricing strategy with AI
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Chat Input (only for chat tab) */}
        {activeTab === 'chat' && (
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
        )}
      </div>
    </div>
  );
}

// Helper component for message circle icon
function MessageCircle({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}
