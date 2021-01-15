function send() {
    var author = document.getElementById('authorBox');
    var message = document.getElementById('messageBox');

    fetch(`http://localhost:4600/?author=${author.value}&text=${message.value}`);
}

function receive() {
    fetch(`http://localhost:4600/?data=messages`)
    .then(response => response.json())
    .then(data => {
        var result = [];

        for (var i in data)
            result.push([i, data [i]]);

        console.log(result)
    });
}