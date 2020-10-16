import React, { createContext, useContext } from 'react';
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
	function appendMssg({ recip, txt, sender }) {
		setChats((prevChats) => {
			const newMssg = { sender, txt };
			const newChats = prevChats.map((chat) => {
				if (chat.user === recip) {
					return { ...chat, messages: [...chat.messages, newMssg] };
				}
				return chat;
			});
			return newChats;
		});
	}
	function sendMssg(recip, txt) {
		appendMssg({ recip, txt, sender: user });
	}

	return <ChatCtx.Provider value={{ chats, createChat, sendMssg }}> {children} </ChatCtx.Provider>;
}
