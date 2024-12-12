import React, { useState } from 'react';
import Icon from './Icon';
import EmojiPicker from 'emoji-picker-react';

const FormChat = (props) => {

  const [text, setText] = useState('')
  const [isShowEmoji, setIsShowEmoji] = useState(false)

  const handleSelectEmoji = (value) => {
    // if(!props.handleSelectEmoji) return;

    const textarea = document.getElementById('myText');
    if (textarea) {
      const cursorPos = textarea.selectionStart;
      const textBeforeCursor = text.substring(0, cursorPos);
      const textAfterCursor = text.substring(cursorPos);
      const newText = textBeforeCursor + value.emoji + textAfterCursor;
     
      // props.handleSelectEmoji(newText)
      setText(newText)
      setIsShowEmoji(false)
    }
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if(!props.handleSendMessage) return;
    props.handleSendMessage(text)
    setText('')
  }
  
  return (
    <>
      <div className="relative flex items-center gap-[10px] w-full">
        <button
          className="
            h-[40px]
            w-[40px]
            rounded-full
            bg-slate-700
            text-[24px]
          "
          onClick={() => setIsShowEmoji(prev => !prev)}
        >
          😊
        </button>
        <form onSubmit={handleSendMessage} className="flex items-center gap-[10px] w-full">
          <input 
            className="
              grow
              rounded-full
              px-[16px]
              h-[40px]
              border
              border-[#ffffff20]
              !bg-transparent
              focus:outline-none
              placeholder:text-[#ffffff70]
              font-inter
            "
            id="myText"
            placeholder="Type message here..."
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <button
            type="submit"
            className="
              flex 
              items-center
              justify-center
              h-[40px]
              w-[40px]
              rounded-full
              bg-[#0D7373]
              text-white
            "
          >
            <Icon name="icon-plane" size={16}/>
          </button>
        </form>
      </div>
      {isShowEmoji &&
        <div className="absolute bottom-[60px] righ-0 z-10">
          <EmojiPicker 
            onEmojiClick={handleSelectEmoji}
            autoFocusSearch
            open
          />
        </div>
      }
    </>
  );
}

export default FormChat;
