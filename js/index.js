"use strict";

const chat = {
    author: "yourName",
    init() {
        this.fetchMessages();
        //this.sendMessage();
    },
    sendMessage() {
        const messageJson = { "author": "Jay Vleugels", "message": "Hebbe kik hier een vergadering gemist?"}

        fetch('https://ehbchatapp.herokuapp.com/message', {
            method: "POST",
            //mode: "no-cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(messageJson),
        }).then(function(result) {
            console.log(result);
            document.querySelector('#messageContainer').innerHTML = '';
            chat.fetchMessages();
        });
    },
    fetchMessages() {
        fetch('https://dev2chat.onrender.com/messages')
        .then(function(data) {
            return data.json();
        }).then(function (json) {
            json.forEach(function (message) {
                chat.renderMessage(message);
            });
        });
    },
    renderMessage(message) {
        const date = new Date(message.created_at);
        const messageHtml = `<div class="messageItem">
        <div class="header">
            <span class="author">${message.author}</span>
            <span class="time">${date.getHours()}:${date.getMinutes()}</span>
        </div>
        <p>
            ${message.message}
        </p>
    </div>`;
        document.querySelector('#messageContainer').insertAdjacentHTML('beforeend', messageHtml);
    }
}

chat.init();