import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommentList from "../components/CommentList";
import {
    getComment,
    pageComments,
    removeComment,
} from "../store/modules/comments";

function CommentListContainer() {
    const { loading, data, error } = useSelector(
        (state) => state.comments.comments
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(pageComments(1));
    }, [dispatch]);

    const onRemove = (comment) => dispatch(removeComment(comment));
    const onUpdateComment = (id) => dispatch(getComment(id));

    if (loading) return <div>로딩중</div>;
    if (!data) return null;
    if (error) return <div>에러 발생</div>;

    return (
        <>
            <CommentList
                comments={data}
                onRemove={onRemove}
                onUpdateComment={onUpdateComment}
            />
        </>
    );
}

export default CommentListContainer;
