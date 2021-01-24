//reducerUtils
export const reducerUtils = {
    initial: (data = []) => ({
        loading: false,
        data,
        error: null,
    }),
    loading: (prevState) => ({
        loading: true,
        data: prevState,
        error: null,
    }),
    success: (payload) => ({
        loading: false,
        data: payload,
        error: null,
    }),
    error: (error) => ({
        loading: false,
        data: null,
        error: error,
    }),
};

//createThunk
export const createPromiseThunk = (type, promiseCreator) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

    const thunkCreator = (param) => async (dispatch) => {
        dispatch({ type });
        try {
            const payload = await promiseCreator(param);
            dispatch({
                type: SUCCESS,
                payload,
            });
        } catch (e) {
            dispatch({
                type: ERROR,
                payload: e,
                error: true,
            });
        }
    };
    return thunkCreator;
};

//handleAsyncActions
export const handleAsyncActions = (type, key) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

    const reducer = (state, action) => {
        switch (action.type) {
            case type:
                return {
                    ...state,
                    [key]: reducerUtils.loading(),
                };
            case SUCCESS:
                return {
                    ...state,
                    [key]: reducerUtils.success(action.payload),
                };
            case ERROR:
                return {
                    ...state,
                    [key]: reducerUtils.error(action.payload),
                };
            default:
                return state;
        }
    };
    return reducer;
};
