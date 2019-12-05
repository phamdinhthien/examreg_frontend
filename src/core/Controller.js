var alert;
export const setAlert = (element) => {
    alert = element;
    // console.log(alert);
}
export const alertText = (text) => {
    alert.current.display();
    alert.current.setText(text);
    setTimeout(function () { alert.current.hidden(); }, 3000);
}

export const alertTextCustom = (text, color, time = 3000) => {
    alert.current.display();
    alert.current.setText(text);
    alert.current.setBgColor(color);
    setTimeout(function () { alert.current.hidden(); }, time);
}