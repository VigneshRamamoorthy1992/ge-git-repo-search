import { ActionTypes, SEARCH_GET_ALL_REQUEST, SEARCH_GET_ALL_SUCCESS, SEARCH_GET_ALL_FAILURE, SearchIState, SHOW_SEARCH_RESULT } from "./types";

const initialState: SearchIState = {
    loading: false,
    loaded: false,
    error: false,
    success: false,
    errorResp: [],
    search: { data: { items: [], total_count: 0 } },
    showSearchResult: false
};
export function SearchReducer(
    state = initialState,
    action: ActionTypes
): SearchIState {
    switch (action.type) {
        case SEARCH_GET_ALL_REQUEST:
            return {
                ...state,
                loading: action.loading,
                loaded: action.loaded,
                error: action.error,
                errorResp: action.errorResp,
                success: action.success,
            }
        case SEARCH_GET_ALL_SUCCESS:
            let searchResult = {
                ...state.search,
            };
            if (action.search.clearExistingResult) {
                searchResult = action.search.data
            } else {
                searchResult.data.items = [...searchResult.data.items, ...action.search.data.data.items]
            }
            return {
                ...state,
                loading: action.loading,
                loaded: action.loaded,
                error: action.error,
                errorResp: action.errorResp,
                success: action.success,
                search: searchResult
            }
        case SEARCH_GET_ALL_FAILURE:
            return {
                ...state,
                loading: action.loading,
                loaded: action.loaded,
                error: action.error,
                errorResp: action.errorResp,
                success: action.success,
            }
        case SHOW_SEARCH_RESULT:
            return {
                ...state,
                showSearchResult: action.showSearchResult
            }
        default:
            return state;
    }
}
