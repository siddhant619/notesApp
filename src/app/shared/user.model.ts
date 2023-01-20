export class User{
    constructor(
        public email: string,
        public id: string,
        private _token: string,
        private _tokenExpiration: Date

    ){}
    get token(){
        if(this._token && this._tokenExpiration> new Date() )
            return this._token;

        return null;
    }

}