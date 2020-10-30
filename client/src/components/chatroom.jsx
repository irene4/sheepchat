import React, { useRef } from 'react';
import { useChats } from '../chatProvider';
import Chats from './chats';
import Convo from './convo';
import Store from '../local';

export default function Chatroom({ user }) {
	const userRef = useRef();
	const { createChat } = useChats();
	const [buddy, setBuddy] = Store('buddy', []);

	function submit(e) {
		e.preventDefault();
		createChat(userRef.current.value);
		setBuddy(userRef.current.value);
		userRef.current.value = '';
	}

	React.useEffect(() => {}, []);
	return (
		<div style={{ width: '30rem', display: 'in-line block' }}>
			<aside>
				<ul className="tree-view" style={{ float: 'left', width: '8rem' }}>
					<li>
						Welcome,
						<span style={{ color: 'blue' }}> {user}</span>
					</li>
					<li style={{ paddingTop: '1rem' }}>
						Chats
						<Chats setBuddy={setBuddy} />
					</li>

					<form onSubmit={submit} style={{ paddingTop: '1rem' }}>
						<div className="field-row-stacked">
							<label>New chat with:</label>
							<input id="newChat" type="text" placeholder="Username..." autoComplete="off" ref={userRef} required />
							<button type="submit">Go</button>
						</div>
					</form>
				</ul>
			</aside>
			<div
				style={{
					height: '20rem',
					width: '20rem',
					position: 'relative',
					display: 'inline-block',
					marginLeft: '5px',
					backgroundColor: 'white',
				}}
			>
				<Convo user={user} recip={buddy} />
			</div>
		</div>
	);
}

//justifyContent: 'end'
