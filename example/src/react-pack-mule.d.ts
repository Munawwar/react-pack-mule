import { SetState, State, StateCreator, StateSelector, StoreApi, Subscribe } from 'zustand';
interface StoreMethods<TState extends State> {
    useStore<U>(selector: (keyof TState) | StateSelector<TState, U>, comparator?: (a: unknown, b: unknown) => boolean): Partial<TState>;
    useGlobalState<K extends keyof TState>(selector: K, comparator?: (a: unknown, b: unknown) => boolean): TState[K];
    getStates(): TState;
    setStates(newStore: TState): void;
    updateStates(partial: Partial<TState>, updater?: (partial: Partial<TState>) => void): void;
    createPropUpdater<Prop extends keyof TState>(propName: Prop): (partial: Partial<TState[Prop]>, updater?: (partial: Partial<TState>) => void) => void;
    subscribe: Subscribe<TState>;
}
export declare const createStore: <TState extends Record<string | number | symbol, unknown>>(initState: TState, initialStateCreator?: StateCreator<TState, SetState<TState>> | StoreApi<TState>) => StoreMethods<TState>;
export declare const useStore: <U>(selector: StateSelector<{}, U>, comparator?: ((a: unknown, b: unknown) => boolean) | undefined) => Partial<{}>, useGlobalState: <K extends never>(selector: K, comparator?: ((a: unknown, b: unknown) => boolean) | undefined) => {}[K], getStates: () => {}, setStates: (newStore: {}) => void, updateStates: (partial: Partial<{}>, updater?: ((partial: Partial<{}>) => void) | undefined) => void, createPropUpdater: <Prop extends never>(propName: Prop) => (partial: Partial<{}[Prop]>, updater?: ((partial: Partial<{}>) => void) | undefined) => void;
export {};
