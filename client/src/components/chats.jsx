import React from 'react';
import { useChats } from '../chatProvider';

export default function Chats({ setBuddy }) {
	const { chats } = useChats();

	return (
		<ul>
			{chats.map((chat, index) => {
				return (
					<li key={index} style={{ color: 'blue', fontWeight: 'bold', cursor: 'pointer' }}>
						<div
							style={{ color: 'blue' }}
							onClick={(e) => {
								setBuddy(chat.user);
							}}
						>
							{chat.user}
						</div>
					</li>
				);
			})}
		</ul>
	);
}
