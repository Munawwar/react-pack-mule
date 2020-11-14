import React from 'react';
import {
	updateStates,
	useStore,
	createPropUpdater,
} from './react-pack-mule';

const updateCart = createPropUpdater('cart');

const Component = ({
	parentProp = '',
}) => {
	console.log('StateTest render...');
	const { user: { name } = {} } = useStore(['user']);
	return (
		<div>
			Hi {name}
			<br />
			{parentProp}
			<br />
			<br />
			<button onClick={() => updateStates({ user: { name: 'everyone' } })}>Greet everyone instead</button>

			<br />
			<br />
			<button onClick={() => updateCart({ count: 0 })}>Change non-connected prop</button>
		</div>
	);
};

export default Component;
