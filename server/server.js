const io = require('socket.io')(1212);

io.on('connection', (socket) => {
	const user = socket.handshake.query.user;
	console.log(user + ' CONNECTED');
	socket.join(user);

	socket.on('send mssg', ({ recip, txt }) => {
		console.log('SENDING "' + txt + '" TO ' + recip);
		socket.to(recip).emit('get mssg', { recip, sender: user, txt });
	});
});
