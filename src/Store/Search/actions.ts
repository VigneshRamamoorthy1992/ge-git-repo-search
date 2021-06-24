import { SEARCH_GET_ALL_REQUEST, SEARCH_GET_ALL_FAILURE, SEARCH_GET_ALL_SUCCESS, SHOW_SEARCH_RESULT } from "./types";
import Middleware from "Store/Middleware";
import axios from "axios";

const middleware = new Middleware();

export function searchRequest() {
    return {
        type: SEARCH_GET_ALL_REQUEST,
        loading: true,
        loaded: false,
        error: false,
        success: false
    };
}

export function searchSuccess(data: any, clearExistingResult: boolean) {
    return {
        type: SEARCH_GET_ALL_SUCCESS,
        loading: false,
        loaded: true,
        error: false,
        success: true,
        search: { data: data, clearExistingResult: clearExistingResult }
    };
}

export function searchFailure(error: any) {
    return {
        type: SEARCH_GET_ALL_FAILURE,
        loading: false,
        loaded: true,
        error: true,
        errorResp: error,
        success: false
    };
}

export function showSearchResultRS(show: boolean) {
    return {
        type: SHOW_SEARCH_RESULT,
        showSearchResult: show,
    };
}

export function serviceSearchRS(url: string, method: string, clearExistingResult: boolean) {

    return (dispatch: any) => {
        dispatch(searchRequest());
        return middleware.service(url, method)
            .then((response: any) => {
                dispatch(searchSuccess(response, clearExistingResult));
            }).catch((error: any) => {
                if (!axios.isCancel(error)) {
                    dispatch(searchFailure(error));
                }
            })
    }
}
