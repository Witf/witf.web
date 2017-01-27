declare module "react-autosuggest" {
    var _temp: any;
    export default _temp;
}

declare module "react-hot-loader";

interface Auth0Lock {
    new (clientID: string, domain: string): Auth0Lock;
    parseHash(hash: any): any;
    show(options: any): void;
}