// components/ChatRoom.js

import { useState, useEffect } from 'react';
import firebase from '@/utils/firebaseConfig';
import InputText from './InputText';
import Button from './Button';

const ChatRoom = ({ currentUser, recipient }) => {
  // console.log('currentUser', currentUser);
  // console.log('recipient', recipient);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const messagesRef = firebase.database().ref('messages');
    
    messagesRef.on('value', (snapshot) => {
      const messagesData = snapshot.val();
      console.log('messagesData', messagesData);
      const messagesList = [];
      for (let id in messagesData) {
        messagesList.push(messagesData[id]);
      }

      console.log('messagesList', messagesList);
      const onlyMessageOwn = messagesList?.filter(item =>
        (item.sender == currentUser.address || item.recipient == currentUser.address) &&
        (item.sender == recipient.address || item.recipient == recipient.address)
      )
      console.log('onlyMessageOwn', onlyMessageOwn.map(({sender}) => ({sender})));
      setMessages(onlyMessageOwn);
    });
  }, [currentUser, recipient]);

  const sendMessage = () => {
    if (newMessage.trim() !== '' && recipient) { // Memastikan recipient sudah terdefinisi
      const conversationId = `${currentUser.address}/${recipient.address}`;
      console.log(newMessage.trim());
      console.log(recipient);
      console.log(conversationId);
      console.log(currentUser);
      // return
      firebase.database().ref('messages').push({
        text: newMessage,
        sender: currentUser.address,
        recipient: recipient.address,
        timestamp: firebase.database.ServerValue.TIMESTAMP
      });
      setNewMessage('');
    }
  };

  useEffect(() => {
    
    console.log('newMessage', newMessage);
  }, [newMessage]);

  return (
    <div>
      <h2>Chat with {recipient.name.substr(0, 4)}...{recipient.name.substr(recipient.name.length - 4, recipient.name.length)}</h2>
      <div style={{ maxHeight: '300px', overflowY: 'auto' }} className="flex flex-col gap-[20px]">
        {messages.map((message, index) => (
          <div key={index} className="border border-[#ffffff20] rounded-md p-[20px]">
            <p>{message.text}</p>
            <span>{message.sender}</span>
          </div>
        ))}
      </div>
      <InputText
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        withIcon="icon-search"
      />
      <Button onClick={sendMessage}>Send</Button>
    </div>
  );
};

export default ChatRoom;
