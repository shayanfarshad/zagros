import axios, {AxiosResponse} from 'axios';

// Define the base URL for your API
const baseURL = 'https://api.themoviedb.org/3/movie';

// Define types for your API responses (you can adjust these based on your API responses)
type ApiResponse<T> = Promise<AxiosResponse<T>>;

// Define types for your API request payloads (if needed)
interface PostData {
  // Define your POST request payload properties here
}

// Define your API functions
const api = {
  // GET request example with headers
  get: <T>(url: string, headers?: Record<string, string>): ApiResponse<T> => {
    return axios.get<T>(`${baseURL}/${url}`, {headers});
  },

  // POST request example with headers
  post: <T>(
    url: string,
    data: PostData,
    headers?: Record<string, string>,
  ): ApiResponse<T> => {
    return axios.post<T>(`${baseURL}/${url}`, data, {headers});
  },
};

// interface LoginData {
//   username: string;
//   password: string;
//   expiresInMins?: number;
// }

// export const login = (data: LoginData): Promise<ApiResponse<any>> => {
//   return new Promise<ApiResponse<any>>((resolve, reject) => {
//     axios
//       .post(`${baseURL}/auth/login`, JSON.stringify(data), {
//         headers: {
//           'content-type': 'application/json',
//         },
//       })
//       .then(response => {
//         resolve(JSON.parse(response as any));
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });
// };

export default api;
