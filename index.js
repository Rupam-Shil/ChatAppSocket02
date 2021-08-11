const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 9000;

app.set('view engine', 'ejs');
app.use(express.static('css'));
app.get('/', (req, res) => {
	res.render('chat');
});

server.listen(9000, () => {
	console.log('Running on Port 9000');
});
