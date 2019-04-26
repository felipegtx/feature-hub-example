import * as React from 'react';
import { ReactNode } from 'react';

interface IAppComponentProps {
	serviceRef: any;
	fontColor: string;
	myAppId: string;
}

export default class AppComponent extends React.Component<IAppComponentProps> {

	private subscribed:boolean = false;

	constructor(props: Readonly<IAppComponentProps>) {
		super(props);

		this.triggerCall = this.triggerCall.bind(this);
		this.handleNotification = this.handleNotification.bind(this);

		this.subscribe();
	}

	subscribe() { 
		if (this.subscribed) { return; }

		const { serviceRef, myAppId } = this.props;
		serviceRef.subscribeTo('click', myAppId, this.handleNotification);
		this.subscribed = true;
	}

	handleNotification(sourceAppId: string, data: any) {
		const { myAppId } = this.props;
		console.log(`[${myAppId}] Received a notification from ${sourceAppId} with information: ${data}`);
	}

	triggerCall() {
		const { serviceRef, myAppId } = this.props;
		serviceRef.notify('click', myAppId, `User clicked ${myAppId}!`);
	}

	render(): ReactNode {
		const { serviceRef, fontColor, myAppId } = this.props;

		serviceRef.log(`My component for ${myAppId!}.`);

		return (
			<div style={{ color: fontColor }} >
				<p>Hello there!</p>
				<p>From {serviceRef.isServer() ? 'server' : 'client'}</p>
				<button onClick={this.triggerCall}>My Id: {myAppId}</button>
			</div>
		);
	}
}
