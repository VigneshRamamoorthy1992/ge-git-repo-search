import {render, fireEvent, RenderResult} from "@testing-library/react";
import {MockStoreValue} from "MockStoreValue";
import React from "react";
import {Provider} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";
import configureStore from "Store";
import RepoItems from "./RepoItems";

const renderComponent: (store: any) => RenderResult = (store) => {
    return render(
        <Router>
            <Provider store={store}>
                <RepoItems/>
            </Provider>
        </Router>
    );
}

describe("Repo Header Component", () => {
    let renderResult: RenderResult;
    let state: any;
    let store: any;

    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    })
    beforeEach(() => {
        const mockValue = new MockStoreValue();
        state = mockValue.storeData();
        store = configureStore(state);
    });

    test("should render", () => {
        renderResult = renderComponent(store);
        expect(renderResult).toBeDefined();
    });

    test("should render", () => {
        renderResult = renderComponent(store);
        const items = renderResult.getByTestId("container-items");
        expect(items).toBeDefined();
    });

    test("should not show the search result", () => {
        renderResult = renderComponent(store);
        const items = renderResult.queryByTestId("repo-element");
        expect(items).toBeNull();
    });


    describe("Search Result", () => {
        beforeEach(() => {
            const mockValue = new MockStoreValue();
            state = mockValue.storeData();
            state.search.showSearchResult = true;
            store = configureStore(state);
            renderResult = renderComponent(store);
        });

        test("should show the search result when `showSearchResult` is set to true", () => {
            const items = renderResult.queryByTestId("repo-element");
            expect(items).not.toBeNull();
        });

        test("should show user avatar", () => {
            renderResult = renderComponent(store);
            const items = renderResult.queryAllByTestId("user-avatar");
            expect(items[0]).toHaveAttribute("src","https://avatars.githubusercontent.com/u/324574?v=4")
        });

        test("should show description", () => {
            renderResult = renderComponent(store);
            const items = renderResult.queryAllByTestId("description");
            expect(items[0]).toHaveTextContent("System for quickly installing an OpenStack cloud from upstream git for testing and development. Mirror of code maintained at opendev.org.")
        });

        test("should show description", () => {
            renderResult = renderComponent(store);
            const items = renderResult.queryAllByTestId("repo-license");
            expect(items[0]).toHaveTextContent("Apache License 2.0")
        });

        test("should show size", () => {
            renderResult = renderComponent(store);
            const items = renderResult.queryAllByTestId("repo-size");
            expect(items[0]).toHaveTextContent("15504KB")
        });

        test("should show forks", () => {
            renderResult = renderComponent(store);
            const items = renderResult.queryAllByTestId("repo-forks");
            expect(items[0]).toHaveTextContent("1306")
        });

        test("should show watchers", () => {
            renderResult = renderComponent(store);
            const items = renderResult.queryAllByTestId("repo-watchers");
            expect(items[0]).toHaveTextContent("1839")
        });

        test("should show created on date", () => {
            renderResult = renderComponent(store);
            const items = renderResult.queryAllByTestId("repo-created-on");
            expect(items[0]).toHaveTextContent("2011-11-16")
        });

        test("should show updated on date", () => {
            renderResult = renderComponent(store);
            const items = renderResult.queryAllByTestId("repo-updated-on");
            expect(items[0]).toHaveTextContent("2021-06-22")
        });
    });
});
