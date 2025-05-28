import axios, { isAxiosError } from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const api = axios.create({ baseURL });

api.interceptors.request.use((config) => {
  const stored = localStorage.getItem("auth-storage");
  const parsed = stored ? JSON.parse(stored).state : null;

  if (parsed?.accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${parsed.accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const config = err.config;
    if (!config?.withAuth || config._retry) {
      return Promise.reject(err);
    }
    config._retry = true;

    try {
      const stored = localStorage.getItem("auth-storage");
      const parsed = stored ? JSON.parse(stored).state : null;

      const refreshToken = parsed?.refreshToken;

      if (!refreshToken) {
        localStorage.removeItem("auth-storage");
        return Promise.reject(err);
      }

      const { data } = await axios.get(
        `${baseURL}/api/v1/users/token/refresh`,
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );

      const newTokens = {
        ...parsed,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      };

      localStorage.setItem(
        "auth-storage",
        JSON.stringify({ state: newTokens })
      );

      return api.request(config);
    } catch (refreshErr) {
      localStorage.removeItem("auth-storage");
      return Promise.reject(refreshErr);
    }
  }
);

export default api;
export { isAxiosError };
