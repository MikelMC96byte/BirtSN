export class Auth {
    public access_token : string;
    public token_type : string;
    
    constructor(access_token: string, token_type: string) {
        this.access_token = access_token;
        this.token_type = token_type;
    }
  }