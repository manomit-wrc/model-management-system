let backendHost;
const hostname = window && window.location && window.location.hostname;
if(hostname === 'localhost') {
    backendHost = 'http://localhost:8000/api/users';
} 
else {
    backendHost = 'http://localhost:8000/api/users';
}

export const API_ROOT = `${backendHost}`;