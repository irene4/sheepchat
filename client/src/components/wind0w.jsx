import React, { Component } from 'react';
import Chatroom from './chatroom';
import Login from './login';
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
		this.startDrag = this.startDrag.bind(this);
		this.toFront = this.toFront.bind(this);
		this.dragging = this.dragging.bind(this);
		this.stopDrag = this.stopDrag.bind(this);
		window.addEventListener('mousemove', this.dragging);
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
					<div className="title-bar" style={{ cursor: 'grab' }} onMouseDown={this.startDrag} onMouseUp={this.stopDrag}>
						<div className="title-bar-text">Instant Messenger</div>
						<div className="title-bar-controls">
							<button aria-label="Minimize" onDoubleClick={() => console.log('Double clicked!')} />
							<button aria-label="Maximize" />
							<button aria-label="Close" />
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
						{this.props.user ? <Chatroom user={this.props.user} /> : <Login setUser={this.props.setUser} />}
					</div>
				</div>
			</div>
		);
	}
}
//{this.props.user != null ? <Chatroom user={this.props.user} /> : <Login setUser={this.props.setUser} />}
//cmd shift p
