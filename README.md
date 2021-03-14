# comment-board

React와 Redux로 구현한 API서버와 통신하여 작동하는 댓글 게시판

## ⚙ Stack

-   json-server를 사용하여 Mock API 사용

**React**

-   styled-components

**Redux**

-   redux-thunk

<br/>

## 🖼 UI

![image](https://user-images.githubusercontent.com/70693728/111060441-47f96700-84e0-11eb-8581-3e0707702d46.png)

-   [Problem & Solution 정리](https://heeyeonjeong.tistory.com/88?category=945817)

<br/>

## 📚 Features

-   **Container components**와 **Presentational components** 분리하여 작성
-   Pagination
-   댓글 작성 후, 1 페이지로 이동 + form 초기화
-   댓글 수정 후, 현재 보고 있는 페이지 유지 + form 초기화
-   댓글 삭제 후, 1 페이지로 돌아오기

### 구조

-   **api**

    -   GET, POST, PUT, DELETE

-   **CommentListContainer**

    -   CommentList component : 페이지에 따른 comments를 받아오는 컴포넌트

-   **FormContainer**

    -   Form component : form 양식을 전달, 받아오는 컴포넌트

-   **PageListContainer**

    -   pageList component : 총 comment를 받아와서 page number을 전달하는 컴포넌트

<br/>

### `redux-thunk`를 간단하게 작성할 수 있는 유틸함수

```javascript
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
```
