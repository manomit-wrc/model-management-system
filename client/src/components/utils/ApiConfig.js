let backendHost;
const hostname = window && window.location && window.location.hostname;
if(hostname === 'localhost') {
    backendHost = 'http://localhost:9000/api/users';
} 
else {
    backendHost = 'http://mms-web.wrctpl.com/api/users';
}

export const API_ROOT = `${backendHost}`;