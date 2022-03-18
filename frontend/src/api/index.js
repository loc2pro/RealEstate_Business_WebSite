const api =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000"
    : "https://quanlysinhvien-app.herokuapp.com";


export default api;
