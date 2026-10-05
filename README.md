# CodeRoom

A full-stack real-time collaborative code editor that allows multiple users to join a shared coding room and edit code together in real time using WebSockets.

## Features

- Create unique coding rooms
- Join rooms using a Room ID
- Real-time code synchronization between multiple users
- Display connected users with avatars and usernames
- Copy Room ID with a single click
- Leave and rejoin coding rooms
- JavaScript syntax highlighting
- Auto-closing brackets and HTML tags
- Real-time communication using Socket.IO

---

## Tech Stack

### Frontend

- React.js
- React Router
- CodeMirror
- Socket.IO Client
- React Hot Toast
- React Avatar
- UUID

### Backend

- Node.js
- Express.js
- Socket.IO

### Development Tools

- Git
- GitHub
- VS Code
- npm

### Deployment

- Netlify — Frontend
- Render — Backend

---

## Project Structure

```text
CODEROOM
│
├── public
│   ├── _redirects
│   └── index.html
│
├── src
│   ├── components
│   │   ├── Client.js
│   │   └── Editor.js
│   │
│   ├── pages
│   │   ├── Home.js
│   │   └── EditorPage.js
│   │
│   ├── Actions.js
│   ├── App.js
│   ├── App.css
│   ├── index.css
│   ├── index.js
│   └── socket.js
│
├── .gitignore
├── package.json
├── server.js
└── README.md
```

---

## System Architecture

CodeRoom follows a client-server architecture using Socket.IO for real-time communication.

```text
               ┌─────────────────────┐
               │     React Client    │
               │      (Netlify)      │
               └──────────┬──────────┘
                          │
                   WebSocket / Socket.IO
                          │
                          ▼
               ┌─────────────────────┐
               │   Node.js + Express │
               │     Socket.IO       │
               │      (Render)       │
               └──────────┬──────────┘
                          │
                    Room Management
                          │
            ┌─────────────┴─────────────┐
            │                           │
            ▼                           ▼
      Connected Users             Code Changes
```

---

## Real-Time Collaboration

Socket.IO enables persistent communication between users connected to the same coding room.

### Code Synchronization

1. A user joins a coding room using a Room ID.
2. The client establishes a Socket.IO connection with the server.
3. The server adds the user to the corresponding Socket.IO room.
4. Code changes are sent to the server through Socket.IO.
5. The server broadcasts changes to other users in the same room.
6. Other clients update their CodeMirror editor.

```text
User A
   │
   │ CODE_CHANGE
   ▼
Socket.IO Server
   │
   │ Broadcast to Room
   ▼
User B / User C
```

The sender is excluded from the broadcast to prevent unnecessary feedback loops and cursor-position issues.

---

## Room Management

Each coding session uses a unique Room ID generated using UUID.

### Create Room

- Generates a unique Room ID.
- Allows the user to share the room with collaborators.

### Join Room

- Users enter the Room ID and username.
- The server adds the user to the corresponding Socket.IO room.
- Connected users are updated in real time.

### Leave Room

- The server notifies remaining users when someone disconnects.
- The disconnected user is removed from the room's user list.

---

## Code Editor

The application uses **CodeMirror 5** as the code editor.

### Editor Features

- JavaScript syntax highlighting
- Line numbers
- Auto-closing brackets
- Auto-closing HTML tags
- Dark editor theme
- Real-time code synchronization

---

## Socket Events

| Event | Purpose |
|------|---------|
| `join` | Adds a user to a coding room |
| `joined` | Updates clients about room membership |
| `code-change` | Synchronizes code changes |
| `sync-code` | Synchronizes existing code |
| `disconnected` | Notifies users when someone leaves |

---

## Deployment

### Frontend

Deployed using **Netlify**.

**Live Demo:**  
https://coderoompro.netlify.app

### Backend

Node.js + Express + Socket.IO backend deployed using **Render**.

---

## GitHub Repository

https://github.com/KhushiAgg3404/CodeRoom