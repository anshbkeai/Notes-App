import conf from "../conf/conf";
export class NotesService {
    endpoint;
    constructor() {
        this.endpoint = conf.backendurl+"notes";
    }

    async createNote({title,slug,content,token}) {
        const resp = await fetch(this.endpoint+"/" , {
            method:"POST",
             headers: {
                 "Content-Type": "application/json",
                 "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                title,
                slug,
                content
            })
        });
        if(resp.status != 201) throw new Error("Errore Not Found");
        return resp.json();
    }

    async getBySlug({slug,token}) {
         const resp = await fetch(this.endpoint+`/${slug}` , {
            method:"GET",
             headers: {
                 "Authorization": "Bearer " + token
            },
            
        });
        if(resp.status != 200) throw new Error("Errore Not Found");
        return resp.json();
    }

    async updateNote({ title, slug, content, token }) {
        const body = {};
        if (title !== undefined) body.title = title;
        if (content !== undefined) body.content = content;

        const resp = await fetch(this.endpoint + `/${slug}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(body)
        });

        if (!resp.ok) {
            throw new Error(`Error updating note: ${resp.status}`);
        }

        return resp.json();
    }

    async deleteNoteBySlug({slug,token}) {
        console.log("from the Delete "+slug);
        
        const resp = await fetch(this.endpoint+`/${slug}` , {
            method:"DELETE",
             headers: {
                 "Authorization": "Bearer " + token
            },
            
        });
        if(resp.status != 204) throw new Error("Errore Not Found");
        
    }

    async getAllNotes({token}) {
        const resp = await fetch(this.endpoint+`/` , {
            method:"GET",
             headers: {
                 "Authorization": "Bearer " + token
            },
            
        });
        if(resp.status != 200) throw new Error("Errore Not Found");
        return resp.json();
    }
    
    async genrateShareNote({slug,token}) {
        const uri = this.endpoint+`/share/${slug}`;
        const response = await fetch(uri , {
            method:"POST",
            headers:{
                 "Authorization": "Bearer " + token
            }
        });
        if(response.status != 200) throw new Error("Errore Not Found");
        return response.json();
    }

    p

}
const notesService = new NotesService();
export default notesService;