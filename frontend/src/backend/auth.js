import conf from "../conf/conf";

export class AuthService {
    endpoint;

    constructor() {
        this.endpoint = conf.backendurl+"auth";
    }

    async createAccount({ email, password, username }) {
        const signup = this.endpoint + "/signup";

        
         // if it's a file object

 
        const response = await fetch(signup, {
            method: "POST",
            headers: {
                 "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
                username
            })
            ,
        });

        if (!response.ok) { // this is the. Problme in here about to be updates in that case that is the more 
            const error = await response.json();
            throw new Error(`Signup failed: ${error.message}`);
        }

        return response.json(); 
    }

    async login({email,password}) {
        const login_endpoint = this.endpoint+"/login";
        const response = await fetch(login_endpoint , {
            method:"POST",
            headers: {
                 "Content-Type": "application/json",
            },
            body : JSON.stringify({
                email,
                password
            }),
        })

         if (!response.ok) { // this is the. Problme in here about to be updates in that case that is the more 
            const error = await response.json();
            throw new Error(`Signup failed: ${error.message}`);
        }
        return response.json();
    }

    async getNoteByShareToken({sharetoken}) {
        const uri = this.endpoint+`/share/${sharetoken}`;
        const response = await fetch(uri , {
            method:"GET",

        })
        return response.json();
    }


}

const authSerivce = new AuthService();
export default authSerivce;