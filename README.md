# MERN Machine Test Application

## Setup Instructions

### Backend
1. Go to the `backend` folder.
2. Run `npm install` to install dependencies.
3. Create a `.env` file (sample provided).
4. Run `npm start` to start the backend server.

### Frontend
1. Go to the `frontend` folder.
2. Run `npm install` to install dependencies.
3. Run `npm start` to start the frontend app.

### Demo Video
[Google Drive Demo Link](https://drive.google.com/your-demo-link)

## Features
- Admin login (JWT)
- Agent management
- CSV upload and distribution
- List display per agent

## Tech Stack
- MongoDB, Express.js, Node.js, React.js

---
For any issues, check error messages or contact the author.
## API Endpoints

### List Upload & Distribution
- `POST /api/list/upload` — Upload CSV/XLSX, distributes items among agents, returns notes distribution summary.

### Get Notes Distribution
- `GET /api/list/distribution` — Returns overall distribution of 'Notes' field for all uploaded items.

### Get Agent List
- `GET /api/list/agent/:agentId` — Returns list items assigned to a specific agent.

## Frontend Usage

- The notes distribution is displayed using the `NotesDistribution` React component (`frontend/src/components/NotesDistribution.js`).
- To show the distribution, import and use `<NotesDistribution />` in your desired page (e.g., Dashboard).
