const api =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000"
    : "https://realestate-be-app.herokuapp.com";

// const api =
//   process.env.NODE_ENV !== "production"
//     ? "https://realestate-be-app.herokuapp.com"
//     : "http://localhost:5000";

export default api;
