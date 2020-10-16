import React, { useRef } from 'react';

export default function Login({ setUser }) {
	const userRef = useRef();

	function submit(e) {
		e.preventDefault();
		setUser(userRef.current.value);
	}
	return (
		<div>
			<label>screen name:</label>
			<form onSubmit={submit}>
				<input type="text" ref={userRef} required />
				<button type="submit">Log in</button>
			</form>
		</div>
	);
}
