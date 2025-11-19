import type { SetState, State, StateCreator, StoreApi, Subscribe, UseStore } from "zustand";
interface StoreMethods<TState extends State> {
    useGlobalState<Key extends keyof TState>(selector: Key, comparator?: (a: unknown, b: unknown) => boolean): TState[Key];
    useStore: UseStore<TState>;
    getStates(): TState;
    setStates(newStore: TState): void;
    updateStates(partial: Partial<TState>, updater?: (partial: Partial<TState>) => void): void;
    createPropUpdater<Prop extends keyof TState>(propName: Prop): (partial: Partial<TState[Prop]>, updater?: (partial: Partial<TState>) => void) => void;
    subscribe: Subscribe<TState>;
}
export declare const createStore: <TState extends Record<string | number | symbol, unknown>>(initState: TState, initialStateCreator?: StateCreator<TState, SetState<TState>> | StoreApi<TState>) => StoreMethods<TState>;
export declare const useGlobalState: <Key extends never>(selector: Key, comparator?: ((a: unknown, b: unknown) => boolean) | undefined) => {}[Key], getStates: () => {}, setStates: (newStore: {}) => void, updateStates: (partial: Partial<{}>, updater?: ((partial: Partial<{}>) => void) | undefined) => void, createPropUpdater: <Prop extends never>(propName: Prop) => (partial: Partial<{}[Prop]>, updater?: ((partial: Partial<{}>) => void) | undefined) => void, useStore: UseStore<{}>, subscribe: Subscribe<{}>;
export {};
