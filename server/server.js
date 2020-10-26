const express = require('express');
var app = require('express')();
var http = require('http').createServer(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 8080;

app.use(express.static('build'));

io.on('connection', (socket) => {
	const user = socket.handshake.query.user;
	console.log(user + ' CONNECTED');
	socket.join(user);

	socket.on('send mssg!', ({ recip, txt }) => {
		console.log('SENDING "' + txt + '" TO ' + recip);
		socket.to(recip).emit('get mssg!', { recip, sender: user, txt });
	});
});

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/build/index.html');
});

http.listen(port, () => {});
