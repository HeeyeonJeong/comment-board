import React from "react";
import styled from "styled-components";
import CommentListContainer from "./containers/CommentListContainer";
import PageListContainer from "./containers/PageListContainer";
import FormContainer from "./containers/FormContainer";

const Layout = styled.div`
    width: 40%;
    border: 1px solid black;
    border-radius: 5px;
    padding: 10px;
    margin: 20px auto;
`;

function App() {
    return (
        <Layout>
            <CommentListContainer />
            <PageListContainer />
            <FormContainer />
        </Layout>
    );
}

export default App;
