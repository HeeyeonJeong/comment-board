import * as commentsApi from "../../api/comments";
import {
    createPromiseThunk,
    handleAsyncActions,
    reducerUtils,
} from "../../lib/asyncUtils";

const GET_COMMENTS = "comments/GET_COMMENTS";
const GET_COMMENTS_SUCCESS = "comments/GET_COMMENTS_SUCCESS";
const GET_COMMENTS_ERROR = "comments/GET_COMMENTS_ERROR";

const GET_COMMENT = "comments/GET_COMMENT";
const GET_COMMENT_SUCCESS = "comments/GET_COMMENT_SUCCESS";
const GET_COMMENT_ERROR = "comments/GET_COMMENT_ERROR";

const PAGE_COMMNETS = "comments/PAGE_COMMNETS";
const PAGE_COMMNETS_SUCCESS = "comments/PAGE_COMMNETS_SUCCESS";
const PAGE_COMMNETS_ERROR = "comments/PAGE_COMMNETS_ERROR";

const ADD_COMMENT = "comments/ADD_COMMENT";
const ADD_COMMENT_SUCCESS = "comments/ADD_COMMENT_SUCCESS";
const ADD_COMMENT_ERROR = "comments/ADD_COMMENT_ERROR";

const EDIT_COMMENT = "comments/EDIT_COMMENT";
const EDIT_COMMENT_SUCCESS = "comments/EDIT_COMMENT_SUCCESS";
const EDIT_COMMENT_ERROR = "comments/EDIT_COMMENT_ERROR";

const REMOVE_COMMENT = "comments/REMOVE_COMMENT";
const REMOVE_COMMENT_SUCCESS = "comments/REMOVE_COMMENT_SUCCESS";
const REMOVE_COMMENT_ERROR = "comments/REMOVE_COMMENT_ERROR";

//thunk
export const getComments = createPromiseThunk(
    GET_COMMENTS,
    commentsApi.getComments
);

export const getComment = createPromiseThunk(
    GET_COMMENT,
    commentsApi.getComment
);

export const pageComments = (num) => async (dispatch) => {
    dispatch({ type: PAGE_COMMNETS });
    try {
        const payload = await commentsApi.pageComments(num);
        dispatch({
            type: PAGE_COMMNETS_SUCCESS,
            payload,
            currentPage: num,
        });
    } catch (e) {
        dispatch({
            type: PAGE_COMMNETS_ERROR,
            error: e,
        });
    }
};

export const addComment = createPromiseThunk(
    ADD_COMMENT,
    commentsApi.addComment
);

export const editComment = createPromiseThunk(
    EDIT_COMMENT,
    commentsApi.editComment
);

export const removeComment = createPromiseThunk(
    REMOVE_COMMENT,
    commentsApi.removeComment
);

//initial
export const initialState = {
    totalComments: reducerUtils.initial(),
    comments: reducerUtils.initial(),
    comment: reducerUtils.initial(),
    currentPage: 1,
};

const getTotalCommentsReducer = handleAsyncActions(
    GET_COMMENTS,
    "totalComments"
);
const getCommentReducer = handleAsyncActions(GET_COMMENT, "comment");
const addCommentReducer = handleAsyncActions(ADD_COMMENT, "totalComments");
const removeCommentReducer = handleAsyncActions(
    REMOVE_COMMENT,
    "totalComments"
);

export default function comments(state = initialState, action) {
    switch (action.type) {
        case GET_COMMENTS:
        case GET_COMMENTS_SUCCESS:
        case GET_COMMENTS_ERROR:
            return getTotalCommentsReducer(state, action);

        case GET_COMMENT:
        case GET_COMMENT_SUCCESS:
        case GET_COMMENT_ERROR:
            return getCommentReducer(state, action);

        case PAGE_COMMNETS:
            return {
                ...state,
                comments: {
                    loading: true,
                    data: null,
                    error: null,
                },
                currentPage: action.currentPage,
            };
        case PAGE_COMMNETS_SUCCESS:
            return {
                ...state,
                comments: {
                    loading: false,
                    data: action.payload,
                    error: null,
                },
                currentPage: action.currentPage,
            };
        case PAGE_COMMNETS_ERROR:
            return {
                ...state,
                comments: {
                    loading: false,
                    data: null,
                    error: action.error,
                },
                currentPage: action.currentPage,
            };

        case ADD_COMMENT:
        case ADD_COMMENT_SUCCESS:
        case ADD_COMMENT_ERROR:
            return addCommentReducer(state, action);

        case EDIT_COMMENT:
            return {
                ...state,
                totalComments: {
                    loading: true,
                    data: state.totalComments.data,
                    error: null,
                },
            };
        case EDIT_COMMENT_SUCCESS:
            return {
                ...state,
                totalComments: {
                    loading: false,
                    data: state.totalComments.data.map((comment) =>
                        comment.id === action.payload ? action.payload : comment
                    ),
                    error: null,
                },
                comment: {
                    loading: false,
                    data: [],
                    error: null,
                },
            };
        case EDIT_COMMENT_ERROR:
            return {
                ...state,
                totalComments: {
                    loading: false,
                    data: state.totalComments.data,
                    error: action.error,
                },
            };

        case REMOVE_COMMENT:
        case REMOVE_COMMENT_SUCCESS:
        case REMOVE_COMMENT_ERROR:
            return removeCommentReducer(state, action);

        default:
            return state;
    }
}
