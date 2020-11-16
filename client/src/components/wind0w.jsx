import React, { Component } from 'react';
import Chatroom from './chatroom';
import Buddies from './buddies';
import Login from './login';
import Convo from './convo';
import icon from '../photos/sheepchat-icon.png'
import './style/wind0w.css';

export default class Wind0w extends Component {
	constructor(props) {
		super(props);

		this.state = {
			X: 0,
			Y: 0,
			dragging: false,
			styles: { top: this.props.initTop, left: this.props.initLeft, zIndex: 0 },
		};
		this.newWindow = this.newWindow.bind(this);
		this.toggleWindow = this.toggleWindow.bind(this);
		this.startDrag = this.startDrag.bind(this);
		this.toFront = this.toFront.bind(this);
		this.dragging = this.dragging.bind(this);
		this.stopDrag = this.stopDrag.bind(this);
		window.addEventListener('mousemove', this.dragging);
	}

	newWindow(user) {
		this.props.setWindows((prevWindows) => {
			return [...prevWindows, { buddy: user, top: 50, left: 170, open: true }];
		});
		console.log(`New chat window with ${user}.`);
	}
	toggleWindow(buddy) {
		this.props.setWindows((prevWindows) => {
			const newWindows = prevWindows.map((window) => {
				if (window.buddy === buddy) return {...window, open: !window.open};
				return window;
			})
			return newWindows;
		});
	}

	startDrag(e) {
		e.preventDefault();
		var Z = this.props.highestZ + 1;
		this.props.incZ(Z);

		this.setState({
			X: e.screenX - e.currentTarget.getBoundingClientRect().left,
			Y: e.screenY - e.currentTarget.getBoundingClientRect().top,
			highestZ: Z,
			dragging: true,
			styles: {
				...this.state.styles,
				zIndex: Z,
			},
		});
	}

	toFront(e) {
		var Z = this.props.highestZ + 1;
		this.props.incZ(Z);

		this.setState({
			highestZ: Z,
			styles: {
				...this.state.styles,
				zIndex: Z,
			},
		});
	}

	dragging(e) {
		e.preventDefault();
		if (this.state.dragging) {
			var left = e.screenX - this.state.X;
			var top = e.screenY - this.state.Y;
			this.setState({
				styles: {
					...this.state.styles,
					left: left,
					top: top,
				},
			});
		}
	}

	isTopWindow() {
		return this.state.styles.zIndex === this.props.highestZ;
	}

	stopDrag(e) {
		e.preventDefault();
		this.setState({
			dragging: false,
		});
	}

	render() {
		return (
			<div className="wind0w" style={this.state.styles}>
				<div className="window">
					<img src={icon} style={{position:"absolute", padding:"6px"}} width="18px"></img>
					<div className="title-bar" style={{ cursor: 'grab' }} onMouseDown={this.startDrag} onMouseUp={this.stopDrag}>
						<div className="title-bar-text" style={{position:"relative", left:"20px"}}>{this.props.windowName}</div>
						<div className="title-bar-controls">
							<button aria-label="Minimize" onDoubleClick={() => console.log('Double clicked!')} />
							<button aria-label="Maximize" />
							<button aria-label="Close" onClick={() => {this.toggleWindow(this.props.buddy)}} />
						</div>
					</div>

					<div className="window-body" onMouseDown={this.toFront}>
						<p style={{ textAlign: 'center', userSelect: 'none' }}></p>
						<div className="field-row" style={{ justifyContent: 'center' }}></div>
						{/* <iframe
                            src={this.props.source}
                            style={{pointerEvents: (this.state.dragging || !this.isTopWindow()) ? 'none' : 'auto'}}
                            height={this.props.frameH}
                            width={this.props.frameW} >
                        </iframe> */}
						{!this.props.user && <Login setUser={this.props.setUser} />}
						{this.props.type === 'main' && this.props.user && <Buddies user={this.props.user} newWindow={this.newWindow} toggleWindow={this.toggleWindow}/>}
						{this.props.type === 'chat' && this.props.user && <Convo user={this.props.user} recip={this.props.buddy} />}
						{/*{this.props.type === 'chat' && this.props.user &&  <Login setUser={this.props.setUser} />}*/}
					</div>
				</div>
			</div>
		);
	}
}
//{this.props.user != null ? <Chatroom user={this.props.user} /> : <Login setUser={this.props.setUser} />}
//cmd shift p
