import type { StateCreator, StoreApi } from "zustand";
import type { UseBoundStore } from "zustand/react";
interface StoreMethods<TState extends object> {
    useGlobalState<Key extends keyof TState>(selector: Key, comparator?: (a: TState[Key], b: TState[Key]) => boolean): TState[Key];
    useStore: UseBoundStore<StoreApi<TState>>;
    getStates(): TState;
    setStates(newStore: TState): void;
    updateStates(partial: Partial<TState>, updater?: (partial: Partial<TState>) => void): void;
    createPropUpdater<Prop extends keyof TState>(propName: Prop): (partial: Partial<TState[Prop]>, updater?: (partial: Partial<TState>) => void) => void;
    subscribe: StoreApi<TState>["subscribe"];
}
export declare const createStore: <TState extends object>(initState: TState, initialStateCreator?: StateCreator<TState, [], []>) => StoreMethods<TState>;
export declare const useGlobalState: <Key extends never>(selector: Key, comparator?: ((a: {}[Key], b: {}[Key]) => boolean) | undefined) => {}[Key], getStates: () => {}, setStates: (newStore: {}) => void, updateStates: (partial: Partial<{}>, updater?: ((partial: Partial<{}>) => void) | undefined) => void, createPropUpdater: <Prop extends never>(propName: Prop) => (partial: Partial<{}[Prop]>, updater?: ((partial: Partial<{}>) => void) | undefined) => void, useStore: UseBoundStore<StoreApi<{}>>, subscribe: (listener: (state: {}, prevState: {}) => void) => () => void;
export {};
