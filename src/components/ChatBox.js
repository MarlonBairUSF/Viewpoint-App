import React, { useState, useRef, useEffect } from 'react';
import './ChatBox.css';
import { perspectives } from './PerspectiveSelector';
import { db } from '../config/firebase';
import { collection, addDoc, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';

function ChatBox({ chatHistory, onSendMessage, selectedPerspective }) {
  const { user } = useAuth();
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

  // Load chat history from Firestore
  useEffect(() => {
    if (!user || !selectedPerspective) return;

    const q = query(
      collection(db, 'chats'),
      where('userId', '==', user.uid),
      where('perspective', '==', selectedPerspective),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chats = [];
      snapshot.forEach((doc) => {
        chats.push(doc.data());
      });
      // Instead of using setChatHistory directly, use the onSendMessage prop
      // to update the parent component's state
      onSendMessage(chats);
    });

    return () => unsubscribe();
  }, [user, onSendMessage, selectedPerspective]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim() && selectedPerspective && user) {
      try {
        await addDoc(collection(db, 'chats'), {
          userId: user.uid,
          sender: 'user',
          text: message,
          perspective: selectedPerspective,
          timestamp: new Date()
        });
        
        onSendMessage(message);
        setMessage('');
      } catch (error) {
        console.error('Error saving chat:', error);
      }
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