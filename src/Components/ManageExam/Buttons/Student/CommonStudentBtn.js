export const formatDob = (dob) => {
    let newDOB = new Date(dob);
    let date = newDOB.getDate();
    date = date < 10 ? '0' + date : date;
    let month = newDOB.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    let year = newDOB.getFullYear();
    return `${date}/${month}/${year}`;
}

export const removeSpace = (str) => {
    let spaceBetween = /[ ]+/g;
    let spaceBegin = /^[ ]/g;
    let spaceEnd = /[ ]$/g;
    str = str.replace(spaceBetween, " ");
    str = str.replace(spaceBegin, "");
    str = str.replace(spaceEnd, "");
    return str;
}
