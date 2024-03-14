import React, { useEffect, useState, useRef } from 'react';
import { Application, Assets, AnimatedSprite, Texture, Container} from 'pixi.js';
import mqtt from 'mqtt';

const [width, height] = [800, 500];
const idPlayer = 0;
const characterPosition = { x: 0, y: 0 };
const container = new Container();

const JetFighter = () => {
  const containerRef = useRef(null);

  const handleKeyDown = (e) => {
    const speed = 5; // Adjust the speed as needed
    console.log(e.key);
    switch (e.key) {
      case 'ArrowUp':
        //characterPosition.y -= speed;
        break;
      case 'ArrowDown':
        //characterPosition.y += speed;
        break;
      case 'ArrowLeft':
        //characterPosition.x -= speed;
        break;
      case 'ArrowRight':
        //characterPosition.x += speed;
        break;
      default:
        break;
    }

    // Update the character position
    container.x = characterPosition.x;
    container.y = characterPosition.y;
    console.log(container);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  async function loadTexture() {

    const app = new Application();

    await app.init({ background: '#000', width, height });

    if (containerRef.current.firstChild) {
      return;
    }
    containerRef.current.appendChild(app.canvas);

    
    await Assets.load('./assets/spritesheet.json');

    const frames = [];

    frames.push(Texture.from(`Perso1_down_0.png`));
    frames.push(Texture.from(`Perso1_down_1.png`));
    frames.push(Texture.from(`Perso1_down_0.png`));
    frames.push(Texture.from(`Perso1_down_2.png`));

    const anim = new AnimatedSprite(frames);

    anim.x = app.screen.width / 2;
    anim.y = app.screen.height / 2;
    anim.anchor.set(0.5);
    anim.animationSpeed = 0.2;
    anim.play();

    container.addChild(anim);
    app.stage.addChild(container);
  }

  // load
  useEffect(() => {
    loadTexture();
  }, []);

  return <div ref={containerRef}></div>;
};



const App = () =>
{


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
      
      // parse the payload as a json object exemple : {"data": [{"id": 0, "x": 0, "y": 0},{"id": 1, "x": 0, "y": 0}]}
      try {
        const data = JSON.parse(payload.toString());  
        console.log(data);
        // search for the id of the character
        const dataPlayer = data.data.find((element) => element.id === idPlayer);
        console.log(dataPlayer);
        if (dataPlayer === undefined || dataPlayer === null) {
          return;
        }
        // update the position of the character
        characterPosition.x = dataPlayer.x;
        characterPosition.y = dataPlayer.y;
        container.x = characterPosition.x;
        container.y = characterPosition.y;
      } catch (error) {
        console.log(error);
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
      <button onClick={() => setReceivedMessages([])}>Clean</button>

      <h2>Received Messages:</h2>
      <ul>
        {receivedMessages.map((msg, index) => (
          <li key={index}>{msg}</li>
          ))}
      </ul>
      <JetFighter />
    </div>
  );
};

export default App;
