# ChatIO: Real-Time Chatting App

Welcome to ChatIO, your go-to real-time chatting app for seamless communication!

## Description

ChatIO is a real-time chatting application that allows users to connect instantly and exchange messages in a fast and efficient manner.

### Technologies Used

- Frontend: HTML, CSS, Tailwind, React (with NextJS)
- Backend: TypeScript, Javasrcipt
- Database: MongoDB
- Socket: Socket.IO
- Authorization: next-auth, jsonwebtoken, bcrypt
- Other packages: @tanstack/react-query, query-string, lucide-react

## REST API Docs
[https://documenter.getpostman.com/view/31082687/2s9YeK5qyh](https://documenter.getpostman.com/view/31082687/2s9YeK5qyh)

## WebSocket Implementation with Socke.IO

ChatIO leverages WebSocket technology to provide real-time communication. The WebSocket protocol enables instant data exchange between the server and clients, ensuring a smooth.

Socket works so that when a message is sent, a post request is sent to create a message to the endpoint /api/socket/messages, where all parameter validation takes place and the message is created and emitted to the event `chat:${serverId}:messages`, to which the socket on the frontend listens and automatically updates the messages.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
