import {render, fireEvent, RenderResult} from "@testing-library/react";
import { MockStoreValue } from "MockStoreValue";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "Store";
import RepoHome from "./RepoHome";
import RepoHeader from '../RepoHeader/RepoHeader';


const renderComponent: (store: any) => RenderResult = (store) => {
  return render(
      <Router>
        <Provider store={store}>
          <RepoHome/>
        </Provider>
      </Router>
  );
}


describe("Repo Home Component", () => {
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

  test("should render Repo Header", () => {
    renderResult = renderComponent(store);
    const query = renderResult.container.querySelector('RepoHeader');
    expect(query).toBeDefined();
  });

  test("should render Repo Items", () => {
    renderResult = renderComponent(store);
    const query = renderResult.container.querySelector('RepoItems');
    expect(query).toBeDefined();
  });

});
