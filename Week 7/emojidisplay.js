import React, { useState } from 'react';
import HappyImage from './happy.png';
import LikeImage from './like.png';
import SadImage from './sad.png';

function EmojiDisplay() {
  const [inputText, setInputText] = useState('');
  const [imageSrc, setImageSrc] = useState('');

  
  const handleInputChange = (event) => {
    const text = event.target.value.toLowerCase();
    setInputText(text);

  
    if (text == 'happy') {
      setImageSrc(HappyImage);
    } else if (text == 'like') {
      setImageSrc(LikeImage);
    } else if (text =='sad') {
      setImageSrc(SadImage);
    } else {
      setImageSrc(''); // Clear the image if input doesn't match
    }
  };

  return (
    <div >
      <h1>Emoji Display</h1>
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Type 'happy', 'like', or 'sad'"
        
      />
      <div >
        {imageSrc ? (
          <img src={imageSrc} alt={inputText}  />
        ) : (
          <p>Type happy, like, or sad to see an emoji</p>
        )}
      </div>
    </div>
  );
}

export default EmojiDisplay;
