import React, { createContext, useContext, useState, useEffect } from 'react';
import io from 'socket.io-client';

const SocketCtx = createContext();

export function useSocket() {
	return useContext(SocketCtx);
}

export function SocketProvider({ user, children }) {
	const [socket, setSocket] = useState();

	useEffect(() => {
		const newSocket = io('http://localhost:1212', { query: { user } });
		setSocket(newSocket);
		return () => newSocket.close();
	}, [user]);

	return <SocketCtx.Provider value={socket}>{children}</SocketCtx.Provider>;
}
