import React, { useState } from "react";
import styled from "styled-components";

const PageListStyle = styled.div`
    margin-bottom: 20px;
    text-align: center;
`;

const Page = styled.button`
    padding: 0.375rem 0.75rem;
    border-radius: 0.25rem;
    font-size: 1rem;
    line-height: 1.5;
    border: 1px solid lightgray;
    outline: none;
    background-color: white;
    cursor: pointer;

    &.active {
        background-color: gray;
        color: #fff;
    }

    margin-right: 3px;
`;

function PageList({ totalComments, onPage }) {
    const pageArray = [];

    for (let i = 1; i <= Math.ceil(totalComments / 4); i++) {
        pageArray.push(i);
    }
    const [current, setCurrent] = useState(1);

    const loadNumber = (num) => {
        onPage(num);
        setCurrent(num);
    };

    return (
        <PageListStyle>
            {pageArray.map((num) => (
                <Page
                    key={num}
                    onClick={() => loadNumber(num)}
                    className={current === num && "active"}
                >
                    {num}
                </Page>
            ))}
        </PageListStyle>
    );
}

export default PageList;
