let backendHost;
const hostname = window && window.location && window.location.hostname;
if(hostname === 'localhost') {
    backendHost = 'http://localhost:8000/api/users';
} 
else {
    backendHost = 'http://35.229.107.151/server/';
}

export const API_ROOT = `${backendHost}`;