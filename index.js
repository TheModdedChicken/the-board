function send() {
    var author = document.getElementById('authorBox');
    var message = document.getElementById('messageBox');

    fetch(`https://the-bagel.herokuapp.com/?author=${author.value}&text=${message.value}`);
}

function receive() {
    fetch(`https://the-bagel.herokuapp.com/?data=messages`)
    .then(response => response.json())
    .then(data => {
        var result = [];

        for (var i in data)
            result.push([i, data [i]]);

        console.log(result)
    });
}