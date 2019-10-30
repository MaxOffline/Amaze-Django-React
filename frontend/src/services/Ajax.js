import Cookies from 'js-cookie'
const csrftoken = Cookies.get('csrftoken');


const Ajax =  (url, method, body) => {
    let response = undefined
    if(!body){
        response =  fetch(url, {
            headers: { "Content-Type": "application/json",'X-CSRFToken':csrftoken, "Accept": "application/json"},
            credentials: "include",
            mode: "same-origin",
            method,
        })
    }else{
        response =  fetch(url, {
            headers: { "Content-Type": "application/json",'X-CSRFToken':csrftoken, "Accept": "application/json"},
            credentials: "include",
            mode: "same-origin",
            method,
            body,
        })
    }
    
    return  response
}


export default Ajax;