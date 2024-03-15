import React, { useEffect, useState, useRef } from 'react';
import { Application, Assets, AnimatedSprite, Texture, Container} from 'pixi.js';
import mqtt from 'mqtt';
import axios from 'axios';



const Game = () => {

    const containerRef = useRef(null);

    let mqttClient = null;
    const incomingData = "yoloYUIi";
    const outgoingData = "yoloYUI";
    
    const [width, height] = [800, 500];
    let idPlayer = null;
    const characterPosition = { x: 0, y: 0 };
    let app = null;
    const container = new Container();


    
    useEffect(() => {
        getIdPlayer();
        loadTextures();
        connectionMqtt();
        if (mqttClient === null) {
            console.log('mqttClient is null');
        } else {
            keyListener();
        }
    }, []);

    function getIdPlayer() {
        if (idPlayer !== null) {
            return;
        }   
        axios.get('http://localhost:8080/connection')
            .then((response) => {
                idPlayer = response.data.playerID;
                console.log('idPlayer', idPlayer);
            })
            .catch((error) => {
                console.error('There was an error!', error);
            });
    }


    async function loadTextures() {

        if (app) {
            console.log('app already exists');
            return;
        }

        app = new Application();
        
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

        anim.anchor.set(0.5);
        anim.animationSpeed = 0.2;
        anim.play();
        
        container.addChild(anim);
        app.stage.addChild(container);
    }

    function connectionMqtt() {
        mqttClient = mqtt.connect('ws://mqtt.eclipseprojects.io:80/mqtt');

        mqttClient.on('connect', () => {
            console.log('connected');
            mqttClient.subscribe(incomingData);
        });

        mqttClient.on('message', (topic, payload) => {

            try{
                const data = JSON.parse(payload.toString());
                const dataPlayer = data.data.find((element) => element.id === idPlayer);
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

        mqttClient.on('close', () => {
            console.log('closed');
        });
    }


    function keyListener() {
        window.addEventListener('keydown', (e) => {
            const topic = outgoingData + `/${idPlayer}` 
            if (e.key === 'ArrowUp') {
                mqttClient.publish(topic, `${idPlayer}|up`);
            }
            else if (e.key === 'ArrowDown') {
                mqttClient.publish(topic, `${idPlayer}|down`);
            }
            else if (e.key === 'ArrowLeft') {
                mqttClient.publish(topic, `${idPlayer}|left`);
            }
            else if (e.key === 'ArrowRight') {
                mqttClient.publish(topic, `${idPlayer}|right`);
            }
        });
    }



    return <div ref={containerRef}></div>;

};

export default Game;