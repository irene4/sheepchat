import React, { useState } from 'react';
import { useChats } from '../chatProvider';

export default function Convo(props) {
	const { chats, sendMssg } = useChats();
	const [txt, setTxt] = useState('');
	const thisChat = chats.find((chat) => {
		return chat.user === props.recip;
	});
	function submit(e) {
		e.preventDefault();
		if (txt) sendMssg(props.recip, txt);
		setTxt('');
	}
	return (
		<div>
			<div id="box" style={{ height: '14rem', width: '20rem', overflow: 'auto' }}>
				<ul style={{ listStyle: 'none' }}>
					{thisChat.messages.length==0 && <label><strong style={{color: 'green'}}>New chat with {props.recip}.</strong></label>}
					{thisChat &&
						thisChat.messages.map((mssg, index) => {
							return (
								<li key={index} >
									<label>
										<strong style={mssg.sender === props.user ? { color: 'blue' } : { color: 'green' }}>{mssg.sender}: </strong>
										{'   '}
										{mssg.txt}
									</label>
								</li>
							);
						})}
				</ul>
			</div>
			<form onSubmit={submit}>
				<div className="field-row-stacked" style={{ width: '100%', position: 'absolute', bottom: '0' }}>
					<label style={{ paddingLeft: '.5rem' }}> Chatbox:</label>
					<textarea
						id="chatbox"
						rows="3"
						value={txt}
						onChange={(e) => setTxt(e.target.value)}
						onKeyDown={(e) => {
							if (e.keyCode === 13) {
								submit(e);
							}
						}}
						style={{ resize: 'none' }}
						required
					></textarea>
					<button type="submit" style={{ width: '30px' }}>
						Send
					</button>
				</div>
			</form>
		</div>
	);
}

//scrollIntoView might be better for scrolling
//li as <label> changes font
