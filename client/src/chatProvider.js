import React, { createContext, useContext, useEffect, useCallback } from 'react';
import Store from './local.js';
import { useSocket } from './socketProvider.js';

const ChatCtx = createContext();

export function useChats() {
	return useContext(ChatCtx);
}

export function ChatProvider({ user, children }) {
	const [chats, setChats] = Store('chats', []);
	const socket = useSocket();

	function createChat(user) {
		setChats((prevChats) => {
			return [...prevChats, { user, messages: [] }];
		});
	}
	function sendMssg(recip, txt) {
		socket.emit('send mssg', { recip, txt });
		appendMssg({ recip, txt, sender: user });
	}
	const appendMssg = useCallback(
		({ recip, txt, sender }) => {
			setChats((prevChats) => {
				const newMssg = { sender, txt };
				console.log(recip, txt, sender, prevChats);
				const newChats = prevChats.map((chat) => {
					if (chat.user === recip || sender === chat.user) {
						return { ...chat, messages: [...chat.messages, newMssg] };
					}
					return chat;
				});
				return newChats;
			});
		},
		[setChats]
	);

	useEffect(() => {
		if (socket == null) return;
		socket.on('get mssg', appendMssg);
		return () => socket.off('get mssg');
	}, [socket, appendMssg]);

	return <ChatCtx.Provider value={{ chats, createChat, sendMssg }}> {children} </ChatCtx.Provider>;
}
