var step = 350;

var loaded = 0;

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

            messageCardElement.id = "message-card";

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

    var allCards = document.getElementById('message-card');

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

        messageBox.style.color = '#29df418e';
        messageText.textContent = 'Message sent successfully!';

        setTimeout(function () {
            messageBox.style.visibility = 'hidden';
            messageText.style.visibility = 'hidden';

            location.reload();
        }, 1500);
        return;
    }
}

function receive() {
    step = 350;

    fetch(`https://the-bagel.herokuapp.com/?data=messages`)
    .then(response => response.json())
    .then(data => {
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
        }
    });
}