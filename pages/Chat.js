import React, { useEffect, useState } from 'react';
import socket from '../socket/socket';
import EmojiPicker from 'emoji-picker-react';
import { useAuth } from '../context/AuthContext';

const Chat = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    if (!user) return;
    socket.connect();
    socket.on(`chat:${user.id}`, msg => setMessages(prev => [...prev, msg]));
    return () => socket.off(`chat:${user.id}`);
  }, [user]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const receiverId = prompt('Enter Receiver ID:'); // For now manual entry
    socket.emit('sendMessage', {
      senderId: user.id,
      receiverId,
      content: input,
    });
    setInput('');
  };

  const addEmoji = emojiData => setInput(prev => prev + emojiData.emoji);

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>Chat</h2>
      <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
        {messages.map((m, i) => (
          <div key={i}>{m.content}</div>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>
          <button onClick={() => setShowPicker(p => !p)}>
            {showPicker ? 'Hide Emoji Picker' : 'Add Emoji 😊'}
          </button>
        </div>
        {showPicker && (
          <EmojiPicker onEmojiClick={addEmoji} />
        )}
        <div style={{ display: 'flex', marginTop: '10px' }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            style={{ flex: 1, padding: '10px' }}
            placeholder="Type your message..."
          />
          <button onClick={sendMessage} style={{ marginLeft: '10px' }}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
