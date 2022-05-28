// const api =
//   process.env.NODE_ENV !== "production"
//     ? "http://localhost:5000"
//     : "https://realestate-app-be.herokuapp.com";

const api =
  process.env.NODE_ENV !== "production"
    ? "https://realestate-app-be.herokuapp.com"
    : "http://localhost:5000";

export default api;
