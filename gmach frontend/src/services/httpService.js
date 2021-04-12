import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");

axios.interceptors.response.use(null, (err) => {
  if (err.response && err.response.status !== 200) {
    if (err.response.data.data && err.response.data.data.message) {
      toast.error(err.response.data.data.message);
    }
    toast.error(err.response.data);
  }

  return Promise.reject(err);
});

const myservice = {
  get: axios.get,
  put: axios.put,
  patch: axios.patch,
  post: axios.post,
  delete: axios.delete,
};

export default myservice;
