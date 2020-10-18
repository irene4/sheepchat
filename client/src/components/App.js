import * as React from 'react';
import 'xp.css/dist/XP.css';
import Wind0w from './wind0w';
//import Login from '../login';
import Store from '../local.js';
import './style/App.css';
import { ChatProvider } from '../chatProvider';
import { SocketProvider } from '../socketProvider';

export default function App() {
	const [highestZ, incZ] = React.useState(0);
	const [user, setUser] = Store('user', '');

	return (
		<div className="App">
			<SocketProvider user={user}>
				<ChatProvider user={user}>
					<Wind0w user={user} setUser={setUser} incZ={incZ} highestZ={highestZ} initTop={30} initLeft={150} />
				</ChatProvider>
			</SocketProvider>
		</div>
	);
}
