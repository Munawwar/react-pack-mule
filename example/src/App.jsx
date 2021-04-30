import React from 'react';
import { setStates, getStates } from 'react-pack-mule';
import StateTest from './StateTest';

// initial state
setStates({
	cart: {
		count: 1,
		items: [{
			name: 'shoe',
			qty: 1
		}]
	},
	user: {
		name: 'dan',
	},
});

window.showStates = () => console.log(getStates());

function App() {
	return (
		<StateTest parentProp='Parent prop text' />
	);
}

export default App;
