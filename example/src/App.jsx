import React from 'react';
import { getStates } from './store';
import StateTest from './StateTest';

window.showStates = () => console.log(getStates());

function App() {
	return (
		<StateTest parentProp='My name is firoz' />
	);
}

export default App;
