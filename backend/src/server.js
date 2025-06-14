require('dotenv').config();
const http = require('http');
const app = require('./app');
const { setupCollabSocket } = require('./socket/collab');

const server = http.createServer(app);
setupCollabSocket(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
