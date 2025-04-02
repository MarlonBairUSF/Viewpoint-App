import React, { useState, useEffect } from 'react';
import { perspectives } from './PerspectiveSelector';
import { getAIResponse } from '../services/openaiService';
import './DebateBox.css';

function DebateBox({ user }) {
  const [party1, setParty1] = useState('');
  const [party2, setParty2] = useState('');
  const [topic, setTopic] = useState('');
  const [debateHistory, setDebateHistory] = useState([]);
  const [isDebating, setIsDebating] = useState(false);
  const [error, setError] = useState('');
  const [conversationHistory, setConversationHistory] = useState([]);

  const startDebate = async () => {
    if (!party1 || !party2 || !topic) {
      setError('Please select both parties and enter a topic');
      return;
    }
    console.log('Starting debate...', { party1, party2, topic, user });
    setError('');
    setDebateHistory([]);
    setConversationHistory([]);
    
    // Set isDebating to true and wait for the next render using useEffect
    setIsDebating(true);
  };

  // Add this useEffect to handle the debate start after isDebating is true
  useEffect(() => {
    if (isDebating && party1 && party2 && topic) {
      const initialPrompt = `Let's debate the topic: ${topic}. Please provide your opening statement and perspective on this issue.`;
      handleDebateRound(party1, initialPrompt, true);
    }
  }, [isDebating, party1, party2, topic]);

  const handleDebateRound = async (perspective, message, isFirst = false) => {
    console.log('handleDebateRound called with:', { perspective, message, isFirst });
    try {
      if (!isDebating) {
        console.log('Debate is not active, returning early');
        return;
      }

      // Show loading state
      setDebateHistory(prev => [...prev, { perspective, text: '...', loading: true }]);

      console.log('About to call getAIResponse with:', {
        message,
        perspective,
        userId: user?.uid,
        conversationHistoryLength: conversationHistory.length
      });

      // Use the existing getAIResponse service instead of direct API call
      const response = await getAIResponse(
        message,
        perspective,
        user.uid,
        conversationHistory
      );

      // Update conversation history
      const newMessage = { role: "assistant", content: response };
      setConversationHistory(prev => [...prev, newMessage]);

      // Update debate history and remove loading state
      setDebateHistory(prev => [
        ...prev.slice(0, -1),
        { perspective, text: response }
      ]);

      // Prepare for next round
      const otherParty = perspective === party1 ? party2 : party1;
      const responsePrompt = `Respond to this argument: ${response}`;

      // Add a small delay before the next response
      setTimeout(() => {
        if (isDebating) {
          handleDebateRound(otherParty, responsePrompt);
        }
      }, 2000);

    } catch (error) {
      console.error('Debate error:', error);
      setError('Error in debate: ' + error.message);
    
      // Remove loading message if there was an error
      setDebateHistory(prev => prev.filter(msg => !msg.loading));
    }
  };

  const stopDebate = () => {
    setIsDebating(false);
  };

  return (
    <div className="debate-box">
      <div className="debate-controls">
        <select value={party1} onChange={(e) => setParty1(e.target.value)}>
          <option value="">Select First Party</option>
          {perspectives.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>

        <select value={party2} onChange={(e) => setParty2(e.target.value)}>
          <option value="">Select Second Party</option>
          {perspectives.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>

        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter debate topic"
        />

        {!isDebating ? (
          <button onClick={startDebate}>Start Debate</button>
        ) : (
          <button onClick={stopDebate}>Stop Debate</button>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="debate-history">
        {debateHistory.map((entry, index) => (
          <div key={index} className={`debate-message ${entry.perspective}`}>
            <strong>{perspectives.find(p => p.id === entry.perspective)?.name}:</strong>
            <p>{entry.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DebateBox; 