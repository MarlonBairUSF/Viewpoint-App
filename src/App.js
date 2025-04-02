import React, { useState } from 'react';
import './App.css';
import ChatBox from './components/ChatBox';
import PerspectiveSelector from './components/PerspectiveSelector';
import { getAIResponse } from './services/openaiService';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Auth from './components/Auth';
import DebateBox from './components/DebateBox';

// Separate the main app content from the AuthProvider wrapper
function AppContent() {
  const [selectedPerspective, setSelectedPerspective] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const { user } = useAuth(); // Get user from AuthContext
  const [showDebate, setShowDebate] = useState(false);

  const handleSendMessage = async (message) => {
    if (Array.isArray(message)) {
      // If message is an array, it's coming from Firestore load
      setChatHistory(message);
    } else {
      // Add user message to chat
      setChatHistory(prev => [...prev, { sender: 'user', text: message }]);
      
      try {
        // Show loading state
        setChatHistory(prev => [...prev, { sender: 'ai', text: '...', loading: true }]);
        
        // Get real AI response
        const response = await getAIResponse(message, selectedPerspective, user.uid);
        
        // Update chat with AI response
        setChatHistory(prev => [
          ...prev.slice(0, -1), // Remove loading message
          { sender: 'ai', text: response }
        ]);
      } catch (error) {
        setChatHistory(prev => [
          ...prev.slice(0, -1), // Remove loading message
          { sender: 'ai', text: 'Sorry, there was an error getting the response.' }
        ]);
      }
    }
  };

  // Add this new function to handle perspective changes
  const handlePerspectiveChange = (perspective) => {
    setSelectedPerspective(perspective);
    setChatHistory([]); // Clear chat history when switching perspectives
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Political Perspectives Chat</h1>
        <p>Chat with AIs representing different political viewpoints</p>
        <Auth />
      </header>
      <main>
        {/* Only show the chat interface if user is authenticated */}
        {user ? (
          <>
            <div className="mode-toggle">
              <button onClick={() => setShowDebate(false)} className={!showDebate ? 'active' : ''}>
                Single Chat
              </button>
              <button onClick={() => setShowDebate(true)} className={showDebate ? 'active' : ''}>
                Debate Mode
              </button>
            </div>
            {showDebate ? (
              <DebateBox user={user} />
            ) : (
              <>
                <PerspectiveSelector 
                  onSelect={handlePerspectiveChange} 
                  selected={selectedPerspective} 
                />
                <ChatBox 
                  chatHistory={chatHistory} 
                  onSendMessage={handleSendMessage} 
                  selectedPerspective={selectedPerspective}
                />
              </>
            )}
          </>
        ) : (
          <p>Please sign in to start chatting</p>
        )}
      </main>
    </div>
  );
}

// Wrap only the AppContent with AuthProvider
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App; 