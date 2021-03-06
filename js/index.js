// Messages and shit
var step = 145;
var loaded = 0;

// Login Cookie Junk
var theSessionKey = getCookie("sessionKey");
var name = "sessionKey=";
var decodedCookie = decodeURIComponent(document.cookie);
var ca = decodedCookie.split(';');

// Light mode stuff
var visualMode = 'none';
var body = document.getElementsByTagName('body')[0];

// Starts checking SessionKey cookie
for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      var sessionKey = c.substring(name.length, c.length);

      if (theSessionKey === "") sessionKey = 'none';

      // Fetches messages from server
      fetch(`https://the-bagel.herokuapp.com/?data=messages&sessionKey=${sessionKey}`)
        .then(response => response.json())
        .then(data => {
            arrayData = [];
  
            console.log(data);
                
            // Puts messages from server in reverse order into an array
            for(var i in data)
                arrayData.unshift(i);
    
            // Logs the array because why not
            console.log(arrayData);
    
            // Cycles through and displays each message in the arrayData array
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

            // Changes what is shown to the user depending on whether the user was logged in or not
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

// Displays placeholder message while trying to fetch the messages from the server

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

messageCardElement.id = `message-card-sorry`;

messageCardElement.style.top = '145px';

messageCardElement.style.zIndex = -100;

messageContentElement.innerText = 'Sorry bout that chief! Trying to find messages...';
messageAuthorElement.innerText = 'System';

bodyElement.appendChild(messageCardElement);
messageCardElement.append(messageCard, messageContentContainer, messageAuthorContainer);

messageAuthorContainer.appendChild(messageAuthorElement);
messageContentContainer.appendChild(messageContentElement);


// Sends a message to the board
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

              fetch(`https://the-bagel.herokuapp.com/?request=messageSend&text=${message.value}&sessionKey=${sessionKey}`)
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

// Receives message data from server
function receive() {
    arrayData.forEach(function (arrayItem) {
        var cardElement = document.getElementById(`message-card-${arrayItem}`)

        cardElement.remove();
    });

    step = 145;
    
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

// Checks for a cookie
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

// Light mode function... ewwww
function lightModeToggle() {
  if (visualMode == 'on') {
      body.style.background = 'gray';

      visualMode = 'off';
  }
  else if (visualMode == 'off') {
      body.style.background = '#111111';

      visualMode = 'on';
  }
  else if (visualMode == 'none') {
      visualMode = 'on';
      lightModeToggle();
  }
}