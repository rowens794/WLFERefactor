import React, { Component } from 'react'; 


export const MyContext = React.createContext();

export class MyProvider extends Component{

	constructor(props) {
		super(props);

		this.state = {
			loggedIn: true,
			userID: undefined,
		};
	}


	render(){
		return (
		<MyContext.Provider value={this}>
			{this.props.children}
		</MyContext.Provider>
		)
	}
}