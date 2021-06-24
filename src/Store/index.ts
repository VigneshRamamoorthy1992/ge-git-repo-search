import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import { SearchReducer } from "./Search/reducers";

const rootReducer = combineReducers({
    search: SearchReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore(initalState?: any) {
    const middlewares = [thunkMiddleware];
    const middleWareEnhancer = applyMiddleware(...middlewares);
    let store;
    if (!!initalState) {
        store = createStore(
            rootReducer,
            initalState,
            composeWithDevTools(middleWareEnhancer)
        );
    } else {
        store = createStore(
            rootReducer,
            composeWithDevTools(middleWareEnhancer)
        );
    }

    return store;
}