//Phân quyền người dùng
export const parseJwt = (token) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
};
// Get Current Role
export const getCurrentRoles = () => {
    let token = localStorage.getItem('access_token');
    if(token){
    let j = parseJwt(token);
    let roles = j.role;
    return roles;
    }
}
// Get ID User
export const getUserId = () => {
    let token = localStorage.getItem('access_token');
    if(token){
        let j = parseJwt(token);
        let id = j.id;
        return id;
    }
}
// get Exp
export const getExp = ()=>{
    let token = localStorage.getItem('access_token');
    if(token){
        let j = parseJwt(token);
        return j.exp;
    }
}
