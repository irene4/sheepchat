import React from 'react';
import { useChats } from '../chatProvider';

export default function Chats({ setBuddy }) {
	const { chats } = useChats();

	return (
		<ul>
			{chats.map((chat, index) => {
				return (
					<li key={index} style={{ color: 'green', fontWeight: 'bold', cursor: 'pointer' }}>
						<div
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
