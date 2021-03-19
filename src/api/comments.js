import axios from "axios";

export const getComments = async () => {
  const response = await axios.get(
    "https://comments-board.herokuapp.com/api/comments"
  );
  return response.data;
};

export const getComment = async (id) => {
  const response = await axios.get(
    `https://comments-board.herokuapp.com/api/comments/${id}`
  );
  return response.data;
};

export const pageComments = async (num) => {
  const reponse = await axios.get(
    `https://comments-board.herokuapp.com/api/comments?_page=${num}&_limit=3&_order=desc&_sort=id`
  );
  return reponse.data;
};

export const addComment = async (comment) => {
  const response = await axios.post(
    "https://comments-board.herokuapp.com/api/comments",
    comment
  );
  return response.data;
};

export const editComment = async (comment) => {
  const response = await axios.put(
    `https://comments-board.herokuapp.com/api/comments/${comment.id}`,
    comment
  );
  return response.data;
};

export const removeComment = async (comment) => {
  const response = await axios.delete(
    `https://comments-board.herokuapp.com/api/comments/${comment.id}`
  );
  return response.data;
};
