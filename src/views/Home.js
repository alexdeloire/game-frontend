import React, { useEffect, useState } from 'react';
import mqtt from 'mqtt';

const WebSocketComponent = () => {
  const [client, setClient] = useState(null);
  const [incomingTopic, setIncomingTopic] = useState('yoloYUI');
  const [outgoingTopic, setOutgoingTopic] = useState('yoloYUIi');
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);

  useEffect(() => {
    const newClient = mqtt.connect('ws://mqtt.eclipseprojects.io:80/mqtt');

    newClient.on('connect', () => {
      console.log('MQTT connection opened');

      // Subscribe to the incoming topic when the connection is opened
      newClient.subscribe(incomingTopic);
    });

    newClient.on('message', (topic, payload) => {
      console.log('MQTT message received:', payload.toString());

      // Check if the message is for the subscribed topic
      if (topic === incomingTopic) {
        // Update the state with the received message
        setReceivedMessages((prevMessages) => [...prevMessages, payload.toString()]);
      }
    });

    newClient.on('close', () => {
      console.log('MQTT connection closed');
    });

    setClient(newClient);

    return () => {
      newClient.end();
    };
  }, [incomingTopic]);

  const sendMessage = () => {
    if (client) {
      // Publish the message to the specified outgoing topic
      client.publish(outgoingTopic, message);
    }
  };

  return (
    <div>
      <h1>MQTT Component</h1>
      <label>
        Incoming Topic:
        <input
          type="text"
          value={incomingTopic}
          onChange={(e) => setIncomingTopic(e.target.value)}
        />
      </label>
      <label>
        Outgoing Topic:
        <input
          type="text"
          value={outgoingTopic}
          onChange={(e) => setOutgoingTopic(e.target.value)}
        />
      </label>
      <br />
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
      />
      <button onClick={sendMessage}>Send Message</button>

      <h2>Received Messages:</h2>
      <ul>
        {receivedMessages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default WebSocketComponent;
