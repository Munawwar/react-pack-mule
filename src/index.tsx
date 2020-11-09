import { useCallback } from 'react';
import create, {
	SetState,
	State,
	StateCreator,
	StateSelector,
	StoreApi,
	Subscribe,
} from 'zustand';
import shallow from 'zustand/shallow';

interface StoreMethods<TState extends State> {
	useGlobalStates<U>(
		selector: (keyof TState)[] | StateSelector<TState, U>,
		comparator?: (a: unknown, b: unknown) => boolean,
	): Partial<TState>;
	getStates(): TState;
	setStates(newStore: TState): void;
	updateStates(
		partial: Partial<TState>,
		updater?: (partial: Partial<TState>) => void,
	): void;
	createPropUpdater<Prop extends keyof TState>(
		propName: Prop
	): (
		partial: Partial<TState[Prop]>,
		updater?: (partial: Partial<TState>) => void,
	) => void;
	subscribe: Subscribe<TState>
}

export const createStore = function createStore<TState extends State>(
	initState: TState,
	initialStateCreator: StateCreator<TState, SetState<TState>> | StoreApi<TState> = () => initState,
): StoreMethods<TState> {
	type StoreKey = keyof TState;

	// create the store
	const useStore = create(initialStateCreator);

	const {
		getState: getStates,
		setState: setStates,
		subscribe,
	} = useStore;

	// global state merger. unlike redux, I am not enforcing reducer layer
	const plainObjectPrototype = Object.getPrototypeOf({});
	function isPlainObject(obj: unknown): boolean {
		return Boolean(
			obj
				&& typeof obj === 'object'
				&& Object.getPrototypeOf(obj) === plainObjectPrototype
		);
	}

	function shallowUpdater(partial: Partial<TState>) {
		const store = getStates();
		const mergedPartial = {};
		const propNames = Object.keys(partial);
		while (propNames.length) {
			const propName: string = propNames.shift() as string;
			const oldValue = store[propName];
			const newValue = partial[propName];
			if (isPlainObject(oldValue) && isPlainObject(newValue)) {
				const oldObj = oldValue as Record<string, unknown>;
				const newObj = newValue as Record<string, unknown>;
				mergedPartial[propName] = {
					...oldObj,
					...newObj,
				};
			} else {
				mergedPartial[propName] = newValue;
			}
		}
		setStates({
			...store,
			...mergedPartial,
		});
	}

	// updateStates merges properties upto two levels of the data store
	function updateStates(
		partial: Partial<TState>,
		updater: (partial: Partial<TState>) => void = shallowUpdater,
	): void {
		return updater(partial);
	}

	// curry function to partially update a sub property of global store.
	// e.g const updateCart = createPropUpdater('cart');
	// updateCart({ items: [], quantity: 0 });
	// this is equivalent to
	// updateStates({ cart: { items: [], quantity: 0 } })
	function createPropUpdater<Prop extends StoreKey>(propName: Prop) {
		return function propUpdater(
			partial: Partial<TState[Prop]>,
			updater: (partial: Partial<TState>) => void = shallowUpdater,
		): void {
			return updater({ [propName]: partial } as Partial<TState>);
		};
	}

	function useGlobalStates<U>(
		selector: StoreKey[] | StateSelector<TState, U>,
		comparator = shallow,
	): Partial<TState> {
		let selectorFunction = selector as StateSelector<TState, U>;
		if (Array.isArray(selector)) {
			// User is supposed to follow one style of selector per component
			// either array or function.. cannot switch dynamically.
			// so disabling eslint warning on consistent hook calls is fine.
			// eslint-disable-next-line react-hooks/rules-of-hooks
			selectorFunction = useCallback((store: TState) => {
				const propsToConnectTo = selector as StoreKey[];
				const props = propsToConnectTo.reduce((acc, propName) => {
					if (propName in store) {
						acc[propName] = store[propName];
					}
					return acc;
				}, {} as Partial<TState>);
				return props as U;
			}, selector);
		}

		const results = useStore(selectorFunction, comparator) as Partial<TState>;
		return results;
	}

	return {
		useGlobalStates,
		getStates,
		setStates,
		updateStates,
		createPropUpdater,
		subscribe,
	};
};

const defaultStore = createStore({});

export const {
	useGlobalStates,
	getStates,
	setStates,
	updateStates,
	createPropUpdater,
} = defaultStore;

// -------------- app code testing ------------------
/*
type MyStoreType = {
	greeting: string;
	cart: {
		totalQty: number;
		items: {
			qty: number;
			sku: string;
		}[];
	};
	test: {
		test2: string;
	};
}
const { updateStates: updater } = createStore<MyStoreType>({
	greeting: 'hi',
	cart: { totalQty: 0, items: [] },
	test: { test2: 'hi' },
});
updater({ greeting: 'hi' }); // no error
updater({ cart: { greeting: 'hi' } }); // error
updater({ cart: { cart: {} } }); // error
updater({ cart: { test: {} } }); // error
updater({ cart: { test2: 'h1' } }); // error
updater({ cart: { totalQty: 0, items: [] } }); // no error
*/
