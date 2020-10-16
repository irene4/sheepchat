import React from 'react';
import { useChats } from '../chatProvider';

export default function Chats() {
	const { chats } = useChats();

	return (
		<ul>
			{chats.map((chat, index) => {
				return (
					<li key={index} style={{ color: 'blue', fontWeight: 'bold' }}>
						<a href="/" style={{ color: 'blue' }}>
							{chat.user}
						</a>
					</li>
				);
			})}
		</ul>
	);
}
