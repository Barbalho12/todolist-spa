
// const PATH = "http://10.40.1.57:8080/tasks";
const PATH = "https://tdl-backend.herokuapp.com/tasks/";

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
    }
}

export default API;