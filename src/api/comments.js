import axios from "axios";

export const getComments = async () => {
    const response = await axios.get("http://localhost:4000/comments");
    return response.data;
};

export const getComment = async (id) => {
    const response = await axios.get(`http://localhost:4000/comments/${id}`);
    return response.data;
};

export const pageComments = async (num) => {
    const reponse = await axios.get(
        `http://localhost:4000/comments?_page=${num}&_limit=4&_order=desc&_sort=id`
    );
    return reponse.data;
};

export const addComment = async (comment) => {
    const response = await axios.post(
        "http://localhost:4000/comments",
        comment
    );
    return response.data;
};

export const editComment = async (comment) => {
    const response = await axios.put(
        `http://localhost:4000/comments/${comment.id}`,
        comment
    );
    return response.data;
};

export const removeComment = async (comment) => {
    const response = await axios.delete(
        `http://localhost:4000/comments/${comment.id}`
    );
    return response.data;
};
