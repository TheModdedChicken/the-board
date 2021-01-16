var step = 350;

var loaded = 0;

var theSessionKey = getCookie("sessionKey");

var name = "sessionKey=";
var decodedCookie = decodeURIComponent(document.cookie);

var ca = decodedCookie.split(';');
for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      var sessionKey = c.substring(name.length, c.length);

      if (theSessionKey === "") sessionKey = 'none';

      fetch(`https://the-bagel.herokuapp.com/?data=messages&sessionKey=${sessionKey}`)
        .then(response => response.json())
        .then(data => {
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

            if (loaded >= 2) {
                var sendButton = document.getElementById('sendButton');
                var loginButton = document.getElementById('loginButton');
                var textBox = document.getElementById('messageBox');
                var textBoxId = document.getElementById('messageBox');
                var textBox = document.getElementsByName('messageBox')[0];

                textBox.placeholder = 'Message Pog?';
                textBoxId.style.cursor = 'pointer';
    
                sendButton.style.visibility = 'visible';
                loginButton.style.visibility = 'hidden';
            } else {
                var sendButton = document.getElementById('sendButton');
                var loginButton = document.getElementById('loginButton');
                var textBoxId = document.getElementById('messageBox');
                var textBox = document.getElementsByName('messageBox')[0];

                textBox.placeholder = 'Please login to send and view messages...'
                textBoxId.style.cursor = 'not-allowed'
    
                sendButton.style.visibility = 'hidden';
                loginButton.style.visibility = 'visible';
            }
        });
    }
}


function send() {
    var message = document.getElementById('messageBox');
    var messageBox = document.getElementById('warningBox');
    var messageText = document.getElementById('warningText');

    if (message.value === '') {
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

        var name = "sessionKey=";
        var decodedCookie = decodeURIComponent(document.cookie);
        
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
              c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
              var sessionKey = c.substring(name.length, c.length);

              fetch(`https://the-bagel.herokuapp.com/?sessionKey=${sessionKey}&text=${message.value}`)
              .then(response => response.json())
              .then(data => {
                  if (data.response === '200') {
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
                  } else {
                    messageBox.style.visibility = 'visible';
                    messageText.style.visibility = 'visible';
            
                    message.value = null;
            
                    messageBox.style.color = '#29df418e';
                    messageText.textContent = 'Message failed to send.';
            
                    setTimeout(function () {
                      messageBox.style.visibility = 'hidden';
                      messageText.style.visibility = 'hidden';
            
                      receive();
                    }, 1500);
                    return;
                  }
              });
            }
        }
    }
}

function receive() {
    arrayData.forEach(function (arrayItem) {
        var cardElement = document.getElementById(`message-card-${arrayItem}`)

        cardElement.remove();
    });

    step = 350;
    
    name = "sessionKey=";
    decodedCookie = decodeURIComponent(document.cookie);
    
    ca = decodedCookie.split(';');

    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          var sessionKey = c.substring(name.length, c.length);
    
          if (sessionKey === '') sessionKey = 'none';
    
          fetch(`https://the-bagel.herokuapp.com/?data=messages&sessionKey=${sessionKey}`)
            .then(response => response.json())
            .then(data => {
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
    
                    if (data[arrayItem].message === 'Please login to view messages...' && data[arrayItem].author === 'System') {
                        var sendButton = document.getElementById('sendButton');
                        var loginButton = document.getElementById('loginButton');
    
                        sendButton.style.visibility = 'hidden';
                        loginButton.style.visibility = 'visible';
                    }
    
                    bodyElement.appendChild(messageCardElement);
                    messageCardElement.append(messageCard, messageContentContainer, messageAuthorContainer);
        
                    messageAuthorContainer.appendChild(messageAuthorElement);
                    messageContentContainer.appendChild(messageContentElement);
                    step += 200;
        
                    loaded += 1;
                });
            });
        }
    }
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}