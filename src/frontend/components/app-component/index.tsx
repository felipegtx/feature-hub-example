/* eslint-disable react/prefer-stateless-function */
import * as React from 'react';
import { ReactNode } from 'react';

interface IAppComponentProps {
	serviceRef: any;
	fontColor: string;
}

export default class AppComponent extends React.Component<IAppComponentProps> {
	render(): ReactNode {
		const { serviceRef, fontColor } = this.props;

		serviceRef.log('My component!');

		return (
			<div style={{ color: fontColor }} >
				<p>Hello there!</p>
				<p>From {serviceRef.isServer() ? 'server' : 'client'}</p>
			</div>
		);
	}
}
