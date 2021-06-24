export interface SearchIState {
    loading: boolean,
    loaded: boolean,
    error: boolean,
    errorResp: any,
    success: boolean,
    search: any;
    showSearchResult: boolean;
}

export const SEARCH_GET_ALL_REQUEST = "SEARCH_GET_ALL_REQUEST";
export const SEARCH_GET_ALL_SUCCESS = "SEARCH_GET_ALL_SUCCESS";
export const SEARCH_GET_ALL_FAILURE = "SEARCH_GET_ALL_FAILURE";
export const SHOW_SEARCH_RESULT = "SHOW_SEARCH_RESULT";

type actionType = typeof SEARCH_GET_ALL_REQUEST
    | typeof SEARCH_GET_ALL_SUCCESS
    | typeof SEARCH_GET_ALL_FAILURE
    | typeof SHOW_SEARCH_RESULT;

interface Action {
    type: actionType,
    loading: boolean,
    loaded: boolean,
    error: boolean,
    errorResp: any,
    success: boolean,
    search: any;
    showSearchResult: boolean;
}

export type ActionTypes = Action;
