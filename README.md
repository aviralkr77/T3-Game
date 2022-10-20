# Tic-Tac-Toe Game

## Description

Its a real-time WebSocket Based Dual Player Gaming Application.

## Prerequisites

- Docker (tested on `v20.10.19`)

## Start

- Build the docker image

```shell
docker build . -t t3-game
```

- Start the container

```shell
# This would run the game on port 80
docker run -p 3000:3000 -p 4000:4000 -d t3-game
```

- Access the game via browser at <http://localhost:3000>

## Built With

- ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
- ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
- ![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
- ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

## Socket.io Request-Payloads

//will be regularly Updated till Development
