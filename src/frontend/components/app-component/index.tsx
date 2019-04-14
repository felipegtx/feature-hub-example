/* eslint-disable react/prefer-stateless-function */
import * as React from 'react';
import { ReactNode } from 'react';

interface IAppComponentProps {
	serviceRef: any;
}

export default class AppComponent extends React.Component<IAppComponentProps> {
	render(): ReactNode {
		const { serviceRef } = this.props;
		
		serviceRef.log('My component!');
	
		return (
			<div>Hello there!</div>
		);
	}
}
