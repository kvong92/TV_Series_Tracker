import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        "Content-Type": "application/json"
    },
});

instance.interceptors.request.use(
    (config) => {
        // TODO: Utilize environment variables. Using throwaway account for now.
        config.headers["Authorization"] = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YjE3ZDUyNmQ1MjUxNjk2NjgzOWZlM2Q0ZDBhZmIxOSIsInN1YiI6IjY1MzBmODg1NTFhNjRlMDBlOWQwZGI1YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YTG6xeXyOAhbF5AzslWxRa6ymihQRvK9xRwo7C5RBsU`;
        return config;
    },
    (error) => {
        console.log("REQUEST ERROR")
        return Promise.reject(error);
    }
)

export default instance;