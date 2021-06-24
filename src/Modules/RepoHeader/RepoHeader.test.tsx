import {render, fireEvent, RenderResult} from "@testing-library/react";
import {MockStoreValue} from "MockStoreValue";
import React from "react";
import {Provider} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";
import configureStore from "Store";
import RepoHeader from "./RepoHeader";



const renderComponent: (store: any) => RenderResult = (store) => {
    return render(
        <Router>
            <Provider store={store}>
                <RepoHeader/>
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

    test("should show the app logo", () => {
        renderResult = renderComponent(store);
        const logo = renderResult.getByTestId("app-logo");
        expect(logo).toBeDefined();
        expect(logo).toHaveClass("fab", "fa-github", "gitHubIcon");
    });

    test("should show the app header", () => {
        renderResult = renderComponent(store);
        const appHeader = renderResult.getByTestId("app-header-text");
        expect(appHeader).toBeDefined();
        expect(appHeader).toHaveTextContent("GitHub Repo Search");
    });

    describe("Typeahead", () => {
        test("should show the typeahead", () => {
            renderResult = renderComponent(store);
            const input = renderResult.getByTestId("repo-search-input");
            expect(input).toBeDefined();
        });

        test("should not show any suggestions initially", () => {
            renderResult = renderComponent(store);
            const suggestions = renderResult.container.querySelector(".suggestions");
            expect(suggestions).toBeNull();
        });

        test("should show search icon", () => {
            renderResult = renderComponent(store);
            const input = renderResult.getByTestId("search-icon");
            expect(input).toBeDefined();
        });

        test("should show SortBy option", () => {
            renderResult = renderComponent(store);
            const input = renderResult.getByTestId("sort-by-select");
            expect(input).toBeDefined();
        });

    });
});
