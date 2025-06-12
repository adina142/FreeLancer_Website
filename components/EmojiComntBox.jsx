import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';

const EmojiCommentBox = () => {
  const [comment, setComment] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  const handleEmojiClick = (emojiData) => {
    setComment((prev) => prev + emojiData.emoji);
  };

  const handleInputChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
      <h3>Leave a Comment 💬</h3>
      <textarea
        rows="4"
        cols="50"
        value={comment}
        onChange={handleInputChange}
        placeholder="Write your comment here..."
        style={{ width: '100%', padding: '10px' }}
      />
      <div style={{ marginTop: '10px' }}>
        <button onClick={() => setShowPicker(!showPicker)}>
          {showPicker ? 'Hide' : 'Add Emoji 😊'}
        </button>
        {showPicker && (
          <div style={{ marginTop: '10px' }}>
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </div>
      <p><strong>Your Comment:</strong> {comment}</p>
    </div>
  );
};

export default EmojiCommentBox;
