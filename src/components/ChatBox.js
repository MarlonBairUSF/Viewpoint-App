import React, { useState, useRef, useEffect } from 'react';
import './ChatBox.css';
import { perspectives } from './PerspectiveSelector';

function ChatBox({ chatHistory, onSendMessage, selectedPerspective }) {
  const [message, setMessage] = useState('');
  const chatContainerRef = useRef(null);

  // Get the proper name for the selected perspective
  const getPerspectiveName = (id) => {
    const perspective = perspectives.find(p => p.id === id);
    return perspective ? perspective.name : id;
  };

  // Auto-scroll to bottom of chat when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && selectedPerspective) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="chat-box">
      <div className="chat-container" ref={chatContainerRef}>
        {chatHistory.length === 0 ? (
          <div className="empty-chat">
            {selectedPerspective ? 
              `Select a message to start chatting with the ${getPerspectiveName(selectedPerspective)} perspective` : 
              'Select a political perspective to start chatting'}
          </div>
        ) : (
          chatHistory.map((chat, index) => (
            <div 
              key={index} 
              className={`chat-message ${chat.sender} ${chat.loading ? 'loading' : ''}`}
            >
              <div className="message-content">
                {chat.loading ? (
                  <span className="loading-dots">Thinking</span>
                ) : (
                  chat.text
                )}
              </div>
            </div>
          ))
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="chat-input-form">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={selectedPerspective ? "Type your message..." : "Select a perspective first"}
          disabled={!selectedPerspective}
          className="chat-input"
        />
        <button 
          type="submit" 
          disabled={!selectedPerspective || !message.trim()}
          className="send-button"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatBox; 