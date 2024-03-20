import React, { useEffect, useState, useRef } from 'react';
import { Application, Assets, AnimatedSprite, Texture, Container, Ticker, TilingSprite } from 'pixi.js';
import mqtt from 'mqtt';
import axios from 'axios';



const Game = () => {

    const containerRef = useRef(null);

    let mqttClient = null;
    const incomingData = "yoloYUIidev";
    const outgoingData = "yoloYUIdev";
    
    const [width, height] = [800, 500];
    const center = { x: width / 2, y: height / 2 };
    const mapSize = { x: 1200, y: 750 };
    let idPlayer = null;
    let playersContainer = {};
    let characterPosition = { x: 0, y: 0 };
    let screenView = { x: 0, y: 0 };
    let animationFrame = {};
    let dir = 'down';
    let app = null;
    let timeSinceLastPing = 0;
    const container = new Container();
    const background = new Container();
    let loading = false;
    let keyPressed = null;

    
    useEffect(() => {
        if (!loading) {
            loading = true;
            getIdPlayer();
            loadTextures();
            connectionMqtt();
            if (mqttClient === null) {
                console.log('mqttClient is null');
            } else {
                keyListener();
            }
            
            window.addEventListener('beforeunload', handleBeforeUnload);
            
            startTicker();

            return () => {
                window.removeEventListener('beforeunload', handleBeforeUnload);
            };
        }
    }, []);

    // Fonction pour gérer l'événement beforeunload
    const handleBeforeUnload = () => {
        if (mqttClient) {
            // Envoyer un message de déconnexion par MQTT
            mqttClient.publish(outgoingData + `/${idPlayer}`, `${idPlayer}|close`);
            // Fermer la connexion MQTT
            mqttClient.end();
        }
    };

    function getIdPlayer() {
        if (idPlayer !== null) {
            return;
        }   
        axios.get('http://162.38.37.120:8080/connection')
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
        await Assets.load('./assets/1.png');
        await Assets.load('./assets/2.png');
        await Assets.load('./assets/3.png');

    
        animationFrame["down"] = [0, 1, 0, 2].map((i) => Texture.from(`Perso1_down_${i}.png`));
        animationFrame["up"] = [0, 1, 0, 2].map((i) => Texture.from(`Perso1_up_${i}.png`));
        animationFrame["left"] = [0, 1, 0, 2].map((i) => Texture.from(`Perso1_left_${i}.png`));
        animationFrame["right"] = [0, 1, 0, 2].map((i) => Texture.from(`Perso1_right_${i}.png`));


        const anim = new AnimatedSprite(animationFrame[dir]);

        anim.anchor.set(0.5);
        anim.animationSpeed = 0.2;
        //anim.play();
        
        container.addChild(anim);
        app.stage.addChild(container);


        const floorTexture = Texture.from('./assets/1.png');
        const wayTexture = Texture.from('./assets/3.png');
        const borderTexture = Texture.from('./assets/2.png');
        for (let i = 0; i < 37; i++) {
            for (let j = 0; j < 24; j++) {
                let tile;
                if (i <= 4) {
                    tile = new TilingSprite(wayTexture);
                } else if (i === 5) {
                    tile = new TilingSprite(borderTexture);
                } else {
                    tile = new TilingSprite(floorTexture);
                }
                tile.position.set(i * 32, j * 32);
                background.addChild(tile);
            }
        }

        app.stage.addChildAt(background, 0);
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
                updateView();
                container.x = characterPosition.x - screenView.x;
                container.y = characterPosition.y - screenView.y;
                // update the direction of the character
                const newdir = {0: 'up', 1: 'right', 2: 'down', 3: 'left'}[dataPlayer.dir];
                if (dir !== newdir) {
                    dir = newdir;
                    container.getChildAt(0).textures = animationFrame[dir];
                }
                updatePlayers(data.data.filter((element) => element.id !== idPlayer));
                

            } catch (error) {
                console.log(error);
            }
        });

        mqttClient.on('close', () => {
            mqttClient.publish(outgoingData + `/${idPlayer}`, `${idPlayer}|close`)
            console.log('closed');
        });
    }

    function updateView() {
        if (characterPosition.x < center.x) {
            screenView.x = 0;
        } else if (characterPosition.x > mapSize.x - center.x) {
            screenView.x = mapSize.x - width;
        }
        else {
            screenView.x = characterPosition.x - center.x;
        }
        if (characterPosition.y < center.y) {
            screenView.y = 0;
        } else if (characterPosition.y > mapSize.y - center.y) {
            screenView.y = mapSize.y - height;
        }
        else {
            screenView.y = characterPosition.y - center.y;
        }
        background.x = -screenView.x;
        background.y = -screenView.y;
    }


    function updatePlayers(players) {
        // remove players that are not in the list
        Object.keys(playersContainer).forEach((key) => {
            if (!players.find((player) => player.id === key)) {
                app.stage.removeChild(playersContainer[key]);
                delete playersContainer[key];
            }
        });

        players.forEach((player) => {
            if (player.id === idPlayer) {
                return;
            }
            const dir = {0: 'up', 1: 'right', 2: 'down', 3: 'left'}[player.dir];
            if (player.id in playersContainer) {
                const cont = playersContainer[player.id];
                cont.x = player.x - screenView.x;
                cont.y = player.y - screenView.y;
                const anim = cont.getChildAt(0);
                anim.textures = animationFrame[dir];
            } else {
                const cont = new Container();
                const anim = new AnimatedSprite(animationFrame[dir]);
                anim.anchor.set(0.5);
                anim.animationSpeed = 0.1;
                anim.loop = true;
                anim.autoUpdate = false;
                //anim.play();
                cont.addChild(anim);
                cont.x = player.x - screenView.x;
                cont.y = player.y - screenView.y;
                playersContainer[player.id] = cont;
                app.stage.addChild(cont);
            }

        });
    }


    function keyListener() {    
        window.addEventListener('keydown', (e) => {
            if (keyPressed === null) {
                if (e.key === 'ArrowUp') {
                    keyPressed = 'up';
                }
                else if (e.key === 'ArrowDown') {
                    keyPressed = 'down';
                }
                else if (e.key === 'ArrowLeft') {
                    keyPressed = 'left';
                }
                else if (e.key === 'ArrowRight') {
                    keyPressed = 'right';
                }
                if (keyPressed !== null) {
                    //container.getChildAt(0).play();
                }
            }
        });

        window.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowUp' && keyPressed === 'up') {
                keyPressed = null;
            }
            else if (e.key === 'ArrowDown' && keyPressed === 'down') {
                keyPressed = null;
            }
            else if (e.key === 'ArrowLeft' && keyPressed === 'left') {
                keyPressed = null;
            }
            else if (e.key === 'ArrowRight' && keyPressed === 'right') {
                keyPressed = null;
            }
            if (keyPressed === null) {
                //container.getChildAt(0).gotoAndStop(0);
            }
        });
    }

    const startTicker = () => {
        Ticker.shared.minFPS = 1;
        Ticker.shared.maxFPS = 10;
        Ticker.shared.add(tick);
    };

    const tick = (delta) => {
        //console.log('Ticker ticked! Delta:', delta);
        timeSinceLastPing += delta.deltaMS;   
        if (keyPressed !== null) {
            const topic = outgoingData + `/${idPlayer}` 
            mqttClient.publish(topic, `${idPlayer}|${keyPressed}`);
            timeSinceLastPing = 0;
            //container.getChildAt(0).update(delta); 
        } else {
            if (timeSinceLastPing > 1000) {
                console.log('ping');
                const topic = outgoingData + `/${idPlayer}` 
                mqttClient.publish(topic, `${idPlayer}|ping`);
                timeSinceLastPing = 0;
            }
        }
    };


    return <div ref={containerRef}></div>;

};

export default Game;