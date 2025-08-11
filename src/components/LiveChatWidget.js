import React, { useState, useRef, useEffect } from 'react';
import '../styles/LiveChatWidget.css';

const LiveChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'agent',
      text: 'Bonjour ! Je suis votre assistant virtuel. Comment puis-je vous aider aujourd\'hui ?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [agentInfo, setAgentInfo] = useState({
    name: 'Marie',
    status: 'En ligne',
    avatar: '👩‍💼'
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate agent response
    setTimeout(() => {
      const responses = [
        'Je comprends votre question. Laissez-moi vous aider avec cela.',
        'Merci pour votre message. Je vais rechercher cette information pour vous.',
        'C\'est une excellente question ! Voici ce que je peux vous dire...',
        'Je vais transférer votre demande à un conseiller spécialisé.',
        'Avez-vous d\'autres questions concernant votre assurance ?'
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const agentMessage = {
        id: Date.now() + 1,
        type: 'agent',
        text: randomResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, agentMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickReplies = [
    'Comment souscrire ?',
    'Déclarer un sinistre',
    'Modifier mes informations',
    'Télécharger un document'
  ];

  const handleQuickReply = (reply) => {
    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: reply,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const agentMessage = {
        id: Date.now() + 1,
        type: 'agent',
        text: `Je vais vous aider avec "${reply}". Laissez-moi vous guider étape par étape.`,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, agentMessage]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button 
        className={`chat-widget-button ${isOpen ? 'hidden' : ''}`}
        onClick={() => setIsOpen(true)}
      >
        <span className="chat-icon">💬</span>
        <span className="chat-label">Chat en direct</span>
        <span className="online-indicator"></span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-widget-container">
          {/* Chat Header */}
          <div className="chat-header">
            <div className="agent-info">
              <span className="agent-avatar">{agentInfo.avatar}</span>
              <div className="agent-details">
                <h3>{agentInfo.name}</h3>
                <span className={`agent-status ${agentInfo.status === 'En ligne' ? 'online' : 'offline'}`}>
                  {agentInfo.status}
                </span>
              </div>
            </div>
            <button 
              className="close-chat"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
          </div>

          {/* Chat Messages */}
          <div className="chat-messages">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`message ${message.type === 'user' ? 'user-message' : 'agent-message'}`}
              >
                <div className="message-content">
                  <p>{message.text}</p>
                  <span className="message-time">
                    {message.timestamp.toLocaleTimeString('fr-FR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message agent-message">
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length === 1 && (
            <div className="quick-replies">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  className="quick-reply-btn"
                  onClick={() => handleQuickReply(reply)}
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          {/* Chat Input */}
          <div className="chat-input-container">
            <div className="chat-input-wrapper">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Tapez votre message..."
                rows="1"
                className="chat-input"
              />
              <button 
                className="send-button"
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LiveChatWidget;
