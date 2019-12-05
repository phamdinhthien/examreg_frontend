export const parseJwt = (token) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
};

export const getCurrentRoles = () => {
    let token = localStorage.getItem('access_token');
    if(token){
    let j = parseJwt(token);
    let roles = JSON.parse(j.sub).roles[0];
    return roles;
    }
}

export const getUserId = () => {
    let token = localStorage.getItem('access_token');
    if(token){
    let j = parseJwt(token);
    let id = JSON.parse(j.sub).id;
    return id;
    }
}

export const getExp = ()=>{
    let token = localStorage.getItem('access_token');
    if(token){
        let j = parseJwt(token);
        return j.exp;
    }
}