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
		console.log(`New chat created with ${user}.`);
	}
	function deleteChat(user) {
		setChats((prevChats) => {
			const newChats = prevChats.filter((chat) => chat.user !== user);
			return newChats;
		});
		console.log(`Deleted chat with ${user}.`);
	}
	function scroll() {
		const box = document.getElementById('box');
		if (box) box.scrollTop = box.scrollHeight;
	}
	function sendMssg(recip, txt) {
		socket.emit('send mssg!', { recip, txt });
		appendMssg({ recip, txt, sender: user });
	}
	const appendMssg = useCallback(
		({ recip, txt, sender }) => {
			var newBuddy = true;
			chats.forEach((chat) => {
				//console.log('ME:', user, 'FROM:', chat.user, 'TO:', recip, 'MATCH?', chat.user === sender);
				if (chat.user === recip || sender === chat.user) newBuddy = false;
			});
			//console.log('NEW BUDDY FLAG:', newBuddy, 'SENDER!=ME?', sender !== user);
			if (newBuddy === true && sender !== user) {
				console.log(`Message received from a new user, ${sender}!`);
				createChat(sender);
			}
			setChats((prevChats) => {
				const newMssg = { sender, txt };
				const newChats = prevChats.map((chat) => {
					if (chat.user === recip || sender === chat.user) {
						return { ...chat, messages: [...chat.messages, newMssg] };
					}
					return chat;
				});
				scroll();
				return newChats;
			});
		},
		[chats, setChats]
	);

	useEffect(() => {
		scroll();
		if (socket == null) return;
		socket.on('get mssg!', appendMssg);
		return () => socket.off('get mssg!');
	}, [socket, appendMssg]);

	return <ChatCtx.Provider value={{ chats, createChat, deleteChat, sendMssg }}> {children} </ChatCtx.Provider>;
}
