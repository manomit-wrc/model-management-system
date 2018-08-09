import axios from 'axios';

const defaultOptions = {
    baseURL: 'http://localhost:8000/api/users'
};

let instance = axios.create(defaultOptions);

// Set the AUTH token for any request
instance.interceptors.request.use(function (config) {
    
    const token = localStorage.getItem('token');
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
});

instance.interceptors.response.use(undefined, err => {
    
    if(err) {
       
       localStorage.removeItem("token");
       window.location.href = "/login";
    }
})

export default instance;