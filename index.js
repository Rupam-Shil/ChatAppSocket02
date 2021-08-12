const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const generateName = require('sillyname');
const PORT = process.env.PORT || 9000;

app.set('view engine', 'ejs');
app.use(express.static('css'));

const io = new Server(server);
let users = [];
io.on('connection', (socket) => {
	const sillyName = generateName();
	const id = socket.id;
	users.push({ name: sillyName, id: id });
	// io.emit('new user', { name: sillyName, id: id });
	io.emit('new user', users);
	socket.on('disconnect', () => {
		console.log('A user disconnected');
		users = users.filter((user) => {
			return user.id !== socket.id;
		});
		io.emit('disconnected', socket.id);
	});
	socket.on('send Message', (msg) => {
		socket.broadcast.emit('message', msg);
	});
});

app.get('/', (req, res) => {
	res.render('chat');
});

server.listen(9000, () => {
	console.log('Running on Port 9000');
});
