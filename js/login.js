function login() {
    var Lusername = document.getElementById('login-username').value;
    var Lpassword = document.getElementById('login-password').value;

    fetch(`https://the-bagel.herokuapp.com/?request=login&username=${Lusername}&password=${Lpassword}`)
        .then(response => response.json())
        .then(data => {
            var now = new Date();
            var time = now.getTime();
            var expireTime = time + 1000*1036800;
            now.setTime(expireTime);
            document.cookie = `sessionKey=${data.sessionKey};expires=`+now.toUTCString()+`;path=/`;

            setTimeout(function () {
                location.href = 'https://themoddedchicken.thedev.id/the-board/';
            }, 1000);
        });
}