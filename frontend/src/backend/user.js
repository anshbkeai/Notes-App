import conf from "../conf/conf";


export class UserService {
    endpoint;
    constructor() {
        this.endpoint = conf.backendurl+"user"
    }

    async getUser({token}) {
        console.log(` from ser Service. ${token}`);
        
        const profile = this.endpoint+"/profile";
        const response = await fetch(profile , {
            method:"GET",
            headers:{
                "Authorization": "Bearer " + token
            }
        })

        if(!response.ok) throw new Error("User Not Found");

        return response.json();

    }

}
const userservice = new UserService();
export default userservice;