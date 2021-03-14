import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { getComments, pageComments } from "../store/modules/comments";

const FormStyle = styled.div`
    & > form > textarea {
        padding: 5px 1%;
        width: 98%;
        height: 50px;
    }

    & > form > input[type="text"] {
        padding: 5px 1%;
        width: 98%;
        margin-bottom: 10px;
    }

    & > form > button {
        padding: 0.375rem 0.75rem;
        border-radius: 0.25rem;
        border: 1px solid lightgray;
        cursor: pointer;
    }
`;

function Form({ onCreate, onUpdate, onCommentLoad, currentPage }) {
    const dispatch = useDispatch();

    const [inputs, setInputs] = useState(
        onCommentLoad
            ? onCommentLoad
            : {
                  profile_url: "",
                  author: "",
                  content: "",
                  createdAt: "",
              }
    );

    const { profile_url, author, content, createdAt } = inputs;

    const clearInputs = () => {
        setInputs("");
    };

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (onCommentLoad.length === 0) {
            onCreate(inputs).then(() => {
                dispatch(getComments());
                dispatch(pageComments(1));
            });
        } else {
            onUpdate(inputs).then(() => {
                dispatch(getComments());
                dispatch(pageComments(currentPage));
            });
        }
        clearInputs();
    };

    return (
        <FormStyle>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    name="profile_url"
                    placeholder="https://picsum.photos/id/1/50/50"
                    required
                    onChange={onChange}
                    value={profile_url || ""}
                />
                <br />
                <input
                    type="text"
                    name="author"
                    placeholder="작성자"
                    required
                    onChange={onChange}
                    value={author || ""}
                />
                <br />
                <textarea
                    name="content"
                    placeholder="내용"
                    required
                    onChange={onChange}
                    value={content || ""}
                ></textarea>
                <br />
                <input
                    type="text"
                    name="createdAt"
                    placeholder="2020-02-01"
                    required
                    onChange={onChange}
                    value={createdAt || ""}
                />
                <br />
                <button type="submit">등록</button>
            </form>
        </FormStyle>
    );
}

export default Form;
