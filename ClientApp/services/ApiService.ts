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

export interface RequestParams {
    url : string;
    method: 'GET'|'PUT'|'POST'|'DELETE'; 
    payload?:any; 
    onPayload?:(json:string)=>void;
    parse?:boolean; //Defaults to true
    onResult:(payload:any)=>void;
}

export default class ApiService {
    private baseUrl: string;
    private token: string;

    constructor(){}

    init(baseUrl){
        this.baseUrl = baseUrl;
    }

    setToken(token){
        this.token = token;
    }

    request(params:RequestParams) {
        const {url, method, payload, onPayload, parse, onResult} = params;
        const fetchUrl = `${this.baseUrl}${url}`;
        let options = {
            method,
            body: null,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            }
        };
        if (payload && onPayload) 
            options.body = JSON.stringify(onPayload ? onPayload(payload) : payload);

        let promise = fetch(fetchUrl, options).then(checkStatus);
        
        if (parse != false)
            return promise.then(parseJson).then(json => onResult ? onResult(json) : json);

        return promise;
    }
}