import { createStore } from './react-pack-mule';

// initial state
const storeMethods = createStore({
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

export const {
  useStore,
  useGlobalState,
  getStates,
  setStates,
  updateStates,
  createPropUpdater,
} = storeMethods;