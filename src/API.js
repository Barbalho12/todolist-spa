
// const PATH_BASE = "http://10.40.1.57:8080";
const PATH_BASE = `https://tdl-backend.herokuapp.com`;

const PATH = `${PATH_BASE}/tasks`;

const API = {
    findAll: async () => {
        const url = `${PATH}`;
        const response = await fetch(url);
        return response;
    },

    findAllCompleteds : async () => {
        const url = `${PATH}/completeds`;
        const response = await fetch(url);
        return response;
    },

    findAllLefts : async () => {
        const url = `${PATH}/lefts`;
        const response = await fetch(url);
        return response;
    },

    setCompleted : async (id, isCompleted) => {
        const url = `${PATH}/${id}/set-completed/${isCompleted}`;
        const response = await fetch(url, {method:'PUT'});
        return response;
    },

    create : async (taskDescription) => {
        const url = `${PATH}`;
        const response = await fetch(url, {
            method:'POST',  
            headers:{
                "Content-Type":"application/json"
            }, 
            body:JSON.stringify(taskDescription)
        });
        return response;
    },

    delete : async (id) => {
        const url = `${PATH}/${id}`;
        const response = await fetch(url, {method:'DELETE'});
        return response;
    },

    update : async (id, task) => {
        const url = `${PATH}/${id}`;
        const response = await fetch(url, {
            method:'PUT',  
            headers:{
                "Content-Type":"application/json"
            }, 
            body:JSON.stringify(task)
        });
        return response;
    },

    webSocketURL:`${PATH_BASE}/subscribe`
}

export default API;