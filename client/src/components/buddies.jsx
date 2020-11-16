import React, { useRef } from 'react';
import { useChats } from '../chatProvider';
import Chats from './chats';
import Store from '../local';

export default function Buddies({ user , newWindow, toggleWindow }) {
	const userRef = useRef();
	const { createChat } = useChats();
	const [buddy, setBuddy] = Store('buddy', []);

	function submit(e) {
		e.preventDefault();
		newWindow(userRef.current.value);
		createChat(userRef.current.value);
		setBuddy(userRef.current.value);
		userRef.current.value = '';
	}

	React.useEffect(() => {}, []);
	return (
		<div style={{ width: '10rem', height: '20rem',display: 'in-line block' }}>
			<aside>
				<ul className="tree-view" style={{ float: 'left', width: '9.25rem' }}>
					<li>
						Welcome,
						<span style={{ color: 'blue' }}> {user}</span>
					</li>
					<li style={{ paddingTop: '1rem' }}>
						Chats
						<Chats setBuddy={setBuddy} toggleWindow={toggleWindow}/>
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
		</div>
	);
}

//justifyContent: 'end'
