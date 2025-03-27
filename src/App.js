import React, { useState } from 'react';
import './App.css';
import ChatBox from './components/ChatBox';
import PerspectiveSelector from './components/PerspectiveSelector';
import { getAIResponse } from './services/openaiService';

function App() {
  const [selectedPerspective, setSelectedPerspective] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);

  const handleSendMessage = async (message) => {
    // Add user message to chat
    setChatHistory(prev => [...prev, { sender: 'user', text: message }]);
    
    try {
      // Show loading state
      setChatHistory(prev => [...prev, { sender: 'ai', text: '...', loading: true }]);
      
      // Get real AI response
      const response = await getAIResponse(message, selectedPerspective);
      
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
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Political Perspectives Chat</h1>
        <p>Chat with AIs representing different political viewpoints</p>
      </header>
      <main>
        <PerspectiveSelector onSelect={setSelectedPerspective} selected={selectedPerspective} />
        <ChatBox 
          chatHistory={chatHistory} 
          onSendMessage={handleSendMessage} 
          selectedPerspective={selectedPerspective}
        />
      </main>
    </div>
  );
}

export default App; 