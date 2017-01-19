import { fetch } from 'domain-task';

const checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        let error = new Error(response.statusText);
        error.message = response;
        throw error;
    }
};

const parseJson = response => response.json();

class ApiService {
    private baseUrl: string;
    private token: string;

    constructor(){}

    init(baseUrl){
        this.baseUrl = baseUrl;
    }

    setToken(token){
        this.token = token;
    }

    request({ url, method, payload, onPayload, parse, onResult}) {
        const fetchUrl = `${this.baseUrl}${url}`;
        let options = {
            method,
            body: null,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            }
        };
        if (payload) 
            options.body = JSON.stringify(onPayload ? onPayload(payload) : payload);

        let promise = fetch(fetchUrl, options).then(checkStatus);
        if (parse) {
            return promise.then(parseJson).then(json => onResult ? onResult(json) : json);
        }

        return promise;
    }
}

export default ApiService;