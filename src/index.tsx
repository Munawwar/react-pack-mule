import { useCallback, useRef } from "react";
import type { StateCreator, StoreApi } from "zustand";
import { create } from "zustand";
import type { UseBoundStore } from "zustand/react";
import { shallow } from "zustand/vanilla/shallow";

interface StoreMethods<TState extends object> {
	useGlobalState<Key extends keyof TState>(
		selector: Key,
		comparator?: (a: TState[Key], b: TState[Key]) => boolean,
	): TState[Key];
	useStore: UseBoundStore<StoreApi<TState>>;
	getStates(): TState;
	setStates(newStore: TState): void;
	updateStates(
		partial: Partial<TState>,
		updater?: (partial: Partial<TState>) => void,
	): void;
	createPropUpdater<Prop extends keyof TState>(
		propName: Prop,
	): (
		partial: Partial<TState[Prop]>,
		updater?: (partial: Partial<TState>) => void,
	) => void;
	subscribe: StoreApi<TState>["subscribe"];
}

export const createStore = function createStore<TState extends object>(
	initState: TState,
	initialStateCreator: StateCreator<TState, [], []> = () => initState,
): StoreMethods<TState> {
	type StoreKey = keyof TState;

	// create the store
	const useStore = create<TState>(initialStateCreator);

	const { getState: getStates, setState: setStates, subscribe } = useStore;

	// global state merger. unlike redux, I am not enforcing reducer layer
	const plainObjectPrototype = Object.getPrototypeOf({});
	function isPlainObject(obj: unknown): boolean {
		return Boolean(
			obj &&
				typeof obj === "object" &&
				Object.getPrototypeOf(obj) === plainObjectPrototype,
		);
	}

	function shallowUpdater(partial: Partial<TState>) {
		const store = getStates();
		const mergedPartial: Partial<TState> = {};
		const propNames = Object.keys(partial) as Array<keyof TState>;
		while (propNames.length) {
			const propName = propNames.shift() as keyof TState;
			const oldValue = store[propName];
			const newValue = partial[propName];
			if (isPlainObject(oldValue) && isPlainObject(newValue)) {
				const oldObj = oldValue as Record<string, unknown>;
				const newObj = newValue as Record<string, unknown>;
				mergedPartial[propName] = {
					...oldObj,
					...newObj,
				} as TState[keyof TState];
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
	) {
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
		) {
			return updater({ [propName]: partial } as Partial<TState>);
		};
	}

	function useGlobalState<Key extends StoreKey>(
		propName: Key,
		comparator?: (a: TState[Key], b: TState[Key]) => boolean,
	): TState[Key] {
		const equalityFn = comparator ?? shallow;
		const prevRef = useRef<TState[Key] | undefined>(undefined);
		const selectorFunction = useCallback(
			(store: TState) => {
				const next = store[propName];
				// prevRef.current === undefined is there to make typescript happy
				if (
					prevRef.current === undefined ||
					!equalityFn(prevRef.current, next)
				) {
					prevRef.current = next;
				}
				return prevRef.current;
			},
			[propName, equalityFn],
		);
		return useStore(selectorFunction);
	}

	return {
		useGlobalState,
		getStates,
		setStates,
		updateStates,
		createPropUpdater,
		// zustand aliases
		useStore,
		subscribe,
	};
};

const defaultStore = createStore({});

export const {
	useGlobalState,
	getStates,
	setStates,
	updateStates,
	createPropUpdater,
	useStore,
	subscribe,
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
