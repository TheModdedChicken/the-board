function login() {
    var Lusername = document.getElementById('login-username').value;
    var Lpassword = document.getElementById('login-password').value;

    fetch(`http://localhost/?request=login&username=${Lusername}&password=${Lpassword}`)
        .then(response => response.json())
        .then(data => {
            var exdays = 7;
            var d = new Date();
            d.setTime(d.getTime() + (exdays*24*60*60*1000));
            var expires = "expires="+ d.toUTCString();
            document.cookie = "sessionKey=" + data.sessionKey + ";" + expires + ";path=/";
        });
}