var step = 350;

var loaded = 0;

fetch(`https://the-bagel.herokuapp.com/?data=messages`)
    .then(response => response.json())
    .then(data => {

        var name = "sessionKey=";
        var decodedCookie = decodeURIComponent(document.cookie);

        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
              c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
              sessionKey = c.substring(name.length, c.length);
            }
        }

        fetch(`https://the-bagel.herokuapp.com/?request=sessionVerify&sessionKey=${sessionKey}`)

        arrayData = [];

        console.log(data);

        for(var i in data)
            arrayData.unshift(i);

        console.log(arrayData);

        arrayData.forEach(function (arrayItem) {
            let bodyElement = document.body;

            let messageCardElement = document.createElement('div');
            let messageCard = document.createElement('canvas');
            let messageContentContainer = document.createElement('div');
            let messageAuthorContainer = document.createElement('div');
        
            let messageContentElement = document.createElement('p');
            let messageAuthorElement = document.createElement('h3');
        
            messageCard.className = "message-card-canv";
            messageCardElement.className = "message-card";
            messageContentContainer.className = "message-content-container";
            messageAuthorContainer.className = "message-author-container";
        
            messageContentElement.className = "message-content-element";
            messageAuthorElement.className = "message-author-element";

            messageCardElement.id = `message-card-${arrayItem}`;

            messageCardElement.style.top = step + 'px';

            messageContentElement.innerText = data[arrayItem].message;
            messageAuthorElement.innerText = data[arrayItem].author;
            bodyElement.appendChild(messageCardElement);
            messageCardElement.append(messageCard, messageContentContainer, messageAuthorContainer);

            messageAuthorContainer.appendChild(messageAuthorElement);
            messageContentContainer.appendChild(messageContentElement);
            step += 200;

            loaded += 1;
        });
/*
        for (var i in arrayData) {

            let bodyElement = document.body;

            let messageCardElement = document.createElement('div');
            let messageCard = document.createElement('canvas');
            let messageContentContainer = document.createElement('div');
            let messageAuthorContainer = document.createElement('div');
        
            let messageContentElement = document.createElement('p');
            let messageAuthorElement = document.createElement('h3');
        
            messageCard.className = "message-card-canv";
            messageCardElement.className = "message-card";
            messageContentContainer.className = "message-content-container";
            messageAuthorContainer.className = "message-author-container";
        
            messageContentElement.className = "message-content-element";
            messageAuthorElement.className = "message-author-element";

            messageCardElement.id = "message-card";

            messageCardElement.style.top = step + 'px';

            messageContentElement.innerText = data[i].message;
            messageAuthorElement.innerText = data[i].author;
            bodyElement.appendChild(messageCardElement);
            messageCardElement.append(messageCard, messageContentContainer, messageAuthorContainer);

            messageAuthorContainer.appendChild(messageAuthorElement);
            messageContentContainer.appendChild(messageContentElement);
            step += 200;

            loaded += 1;
        }
        for (var i in data) {

            let bodyElement = document.body;

            let messageCardElement = document.createElement('div');
            let messageCard = document.createElement('canvas');
            let messageContentContainer = document.createElement('div');
            let messageAuthorContainer = document.createElement('div');
        
            let messageContentElement = document.createElement('p');
            let messageAuthorElement = document.createElement('h3');
        
            messageCard.className = "message-card-canv";
            messageCardElement.className = "message-card";
            messageContentContainer.className = "message-content-container";
            messageAuthorContainer.className = "message-author-container";
        
            messageContentElement.className = "message-content-element";
            messageAuthorElement.className = "message-author-element";

            messageCardElement.id = "message-card";

            messageCardElement.style.top = step + 'px';

            messageContentElement.innerText = data[i].message;
            messageAuthorElement.innerText = data[i].author;
            bodyElement.appendChild(messageCardElement);
            messageCardElement.append(messageCard, messageContentContainer, messageAuthorContainer);

            messageAuthorContainer.appendChild(messageAuthorElement);
            messageContentContainer.appendChild(messageContentElement);
            step += 200;

            loaded += 1;
        }
        */
    });


function send() {
    var author = document.getElementById('authorBox');
    var message = document.getElementById('messageBox');
    var messageBox = document.getElementById('warningBox');
    var messageText = document.getElementById('warningText');

    if (author.value === '' || message.value === '') {
        messageBox.style.visibility = 'visible';
        messageText.style.visibility = 'visible';

        messageBox.style.color = '#df29298e';
        messageText.textContent = 'Please fill out all the fields.';

        setTimeout(function () {
            messageBox.style.visibility = 'hidden';
            messageText.style.visibility = 'hidden';
        }, 5000);
        return;
    } else {
        
        fetch(`https://the-bagel.herokuapp.com/?author=${author.value}&text=${message.value}`);

        messageBox.style.visibility = 'visible';
        messageText.style.visibility = 'visible';

        message.value = null;

        messageBox.style.color = '#29df418e';
        messageText.textContent = 'Message sent successfully!';

        setTimeout(function () {
            messageBox.style.visibility = 'hidden';
            messageText.style.visibility = 'hidden';

            receive();
        }, 1500);
        return;
    }
}

function receive() {
    step = 350;

    arrayData.forEach(function (arrayItem) {
        var cardElement = document.getElementById(`message-card-${arrayItem}`)

        cardElement.remove();
    });

    fetch(`https://the-bagel.herokuapp.com/?data=messages`)
    .then(response => response.json())
    .then(data => {
        var arrayData = [];

        console.log(data);

        for(var i in data)
            arrayData.unshift(i);

        console.log(arrayData);

        arrayData.forEach(function (arrayItem) {
            let bodyElement = document.body;

            let messageCardElement = document.createElement('div');
            let messageCard = document.createElement('canvas');
            let messageContentContainer = document.createElement('div');
            let messageAuthorContainer = document.createElement('div');
        
            let messageContentElement = document.createElement('p');
            let messageAuthorElement = document.createElement('h3');
        
            messageCard.className = "message-card-canv";
            messageCardElement.className = "message-card";
            messageContentContainer.className = "message-content-container";
            messageAuthorContainer.className = "message-author-container";
        
            messageContentElement.className = "message-content-element";
            messageAuthorElement.className = "message-author-element";

            messageCardElement.id = `message-card-${arrayItem}`;

            messageCardElement.style.top = step + 'px';

            messageContentElement.innerText = data[arrayItem].message;
            messageAuthorElement.innerText = data[arrayItem].author;
            bodyElement.appendChild(messageCardElement);
            messageCardElement.append(messageCard, messageContentContainer, messageAuthorContainer);

            messageAuthorContainer.appendChild(messageAuthorElement);
            messageContentContainer.appendChild(messageContentElement);
            step += 200;

            loaded += 1;
        });

        return arrayData;
    });
}