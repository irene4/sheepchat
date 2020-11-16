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
	const [windows, setWindows] = Store('windows', []);

	return (
		<div className="App">
			<SocketProvider user={user}>
				<ChatProvider user={user}>
					<Wind0w
						type={'main'}
						windowName={'Sheep Chat'}
						user={user}
						setWindows={setWindows}
						setUser={setUser}
						incZ={incZ}
						highestZ={highestZ}
						initTop={30}
						initLeft={150}
					/>
					{windows.map((window) => {
						return (
							<Wind0w
								type={'chat'}
								windowName={`${window.buddy} - Sheep Chat`}
								user={user}
								buddy={window.buddy}
								incZ={incZ}
								highestZ={highestZ}
								top={window.top}
								left={window.left}
								initTop={30}
								initLeft={150}
							/>
						);
					})}
				</ChatProvider>
			</SocketProvider>
		</div>
	);
}
