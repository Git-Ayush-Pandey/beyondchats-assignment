import API from "./axios";

export const fetchArticles = async () => {
  const res = await API.get("/articles");
  return res.data;
};

export const fetchArticleById = async (id) => {
  const res = await API.get(`/articles/${id}`);
  return res.data;
};
