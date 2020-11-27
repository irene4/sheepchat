import * as React from 'react';
import 'xp.css/dist/XP.css';
import Wind0w from './wind0w';
//import Login from '../login';
import Store from '../local.js';
import './style/App.css';
import { ChatProvider, useChats } from '../chatProvider';
import { SocketProvider } from '../socketProvider';

export default function App() {
	const [highestZ, incZ] = React.useState(0);
	const [user, setUser] = Store('user', '');
	//const { chats } = useChats();
	//const [windows, setWindows] = Store('windows', []);

	return (
		<div className="App">
			<SocketProvider user={user}>
				<ChatProvider user={user}>
					<Wind0w
						type={'main'}
						windowName={'Sheep Chat'}
						user={user}
						setUser={setUser}
						incZ={incZ}
						highestZ={highestZ}
						top={30}
						left={150}
						//initTop={30}
						//initLeft={150}
					/>

					{chats &&
						chats.map((chat, index) => {
							return (
								chat.open && (
									<Wind0w
										type={'chat'}
										windowName={`${chat.user} - Sheep Chat`}
										user={user}
										//setWindows={setWindows}
										buddy={chat.user}
										incZ={incZ}
										highestZ={highestZ}
										zIndex={index}
										top={chat.top}
										left={chat.left}
										initTop={30}
										initLeft={150}
									/>
								)
							);
						})}
				</ChatProvider>
			</SocketProvider>
		</div>
	);
}
