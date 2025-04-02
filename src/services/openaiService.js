import { db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

if (!API_KEY) {
  throw new Error('OpenAI API key is not defined in environment variables');
}

export const getAIResponse = async (message, perspective, userId, conversationHistory = []) => {
  try {
    console.log('OpenAI API Request:', {
      perspective,
      message,
      conversationHistoryLength: conversationHistory.length
    });

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are an AI representing the ${perspective} political perspective in a debate. 
            Your role is to strongly advocate for your position while directly addressing and 
            countering the arguments made by your opponent. Keep responses concise (2-3 sentences) 
            and focused on the topic at hand. Use rhetoric and reasoning typical of ${perspective} 
            political thinking.`
          },
          ...conversationHistory,
          {
            role: "user",
            content: message
          }
        ],
        temperature: 0.8,
        max_tokens: 150 // Keep responses concise
      })
    });

    const data = await response.json();
    console.log('OpenAI API Response:', {
      perspective,
      response: data.choices[0].message.content
    });

    const aiResponse = data.choices[0].message.content;

    // Save AI response to Firestore
    if (userId) {
      await addDoc(collection(db, 'chats'), {
        userId: userId,
        sender: 'ai',
        text: aiResponse,
        perspective: perspective,
        timestamp: new Date()
      });
    }

    return aiResponse;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw error;
  }
}; 