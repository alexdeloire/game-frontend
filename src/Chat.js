import React, { useState, useEffect, useRef } from 'react';
import mqtt from 'mqtt';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [mqttClient, setMqttClient] = useState(null);
  const messageContainerRef = useRef(null);

  let loading = false;

  useEffect(() => {
    if (!loading) {
      loading = true;
      mqttConnection();
    }
  }, []);

  const mqttConnection = () => {
        const client = mqtt.connect('ws://mqtt.eclipseprojects.io:80/mqtt');

        client.on('connect', () => {
        console.log('MQTT connected');
        setMqttClient(client);
        client.subscribe('yolomessage');
        });

        client.on('message', (topic, payload) => {
        const message = payload.toString();
        setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
        if (mqttClient) {
            mqttClient.end();
        }
        };
    };


  useEffect(() => {
    // Scroll to bottom when new message is added
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleMessageChange = (event) => {
    setMessageInput(event.target.value);
  };

  const handleMessageKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (messageInput.trim() !== '' && mqttClient) {
      mqttClient.publish('yolomessage', messageInput);
      setMessageInput('');
    }
  };

  return (
    <div>
      <div ref={messageContainerRef} style={{ height: '200px', overflowY: 'scroll', border: '1px solid #ccc', marginBottom: '10px' }}>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <input
        type="text"
        value={messageInput}
        onChange={handleMessageChange}
        onKeyPress={handleMessageKeyPress}
        placeholder="Type your message here..."
        style={{ padding: '10px', marginBottom: '10px' }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
