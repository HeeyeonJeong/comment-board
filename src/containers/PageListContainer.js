import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageList from "../components/PageList";
import { getComments, pageComments } from "../store/modules/comments";

function PageListContainer() {
    const { loading, data, error } = useSelector(
        (state) => state.comments.totalComments
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getComments());
    }, [dispatch]);

    const onPage = (num) => dispatch(pageComments(num));

    if (loading) return <div>로딩중</div>;
    if (!data) return null;
    if (error) return <div>에러 발생</div>;

    return <PageList totalComments={data && data.length} onPage={onPage} />;
}

export default PageListContainer;
