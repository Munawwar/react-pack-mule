import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { createStore } from "./index";

type MyStore = {
	user: {
		name: string;
	};
	cart: {
		quantity?: number;
		items?: string[];
	};
};

const { useGlobalState, updateStates, getStates, createPropUpdater } =
	createStore<MyStore>({
		user: {
			name: "me",
		},
		cart: {
			quantity: 1,
			items: ["Item 1"],
		},
	});

// mock timer using vitest
vi.useFakeTimers();

describe("react-pack-mule", () => {
	it("useStore gets the specified store props", () => {
		const { result } = renderHook(() => useGlobalState("cart"));
		expect(result.current?.quantity).toBe(1);
	});

	it("updateStates merges level 2 props properly", () => {
		updateStates({ cart: { quantity: 2 } });

		const states = getStates();
		expect(states.cart?.quantity).toBe(2);
		expect(states.user?.name).toBe("me");
		expect(states.cart?.items).toEqual(["Item 1"]);
	});

	it("createPropUpdater merges the given props properly", () => {
		const updateCart = createPropUpdater("cart");
		updateCart({ quantity: 3 });

		const states = getStates();
		expect(states.cart?.quantity).toBe(3);
		expect(states.user?.name).toBe("me");
		expect(states.cart?.items).toEqual(["Item 1"]);
	});
});
