// imports go at the top 

import ChatMsg from "./components/ChatMessage.js";


var socket = io();


//utility for socket

function addNewMessage(message) {
    vm.messages.push(message);
}


function setUserID({ sID }) {
    vm.socketID = sID;
}


function handelTypingEvent(user) {
    const messageContainer = document.getElementById('message-container');
    const message = 'Someone is typing...';
  
    // Check if the current window name is "main" (or any other name you want to use)
    if (window.name === 'main') {
      console.log(message);
      messageContainer.innerText = message;
    }
  }
  

const { createApp } = Vue

const vm = createApp({
    data() {
        return {
            socketID: '',
            message: '',
            messages: [],
            //nickname: ''
        }
    },

    methods: {
        dispatchMessage() {


            socket.emit('chat_message', {
                content: this.message,
                //name: this.nickname || 'anonymous',
                id: this.socketID
            });

            this.message = '';

        },
        dispatchTypingEvent() {
            socket.emit('typing_event', { user: this.nickname || 'anonymous' })
        }

    },

    components: {
        newmsg: ChatMsg
    }

}).mount('#app')



socket.addEventListener('new_message', addNewMessage);
socket.addEventListener('connected', setUserID);
socket.addEventListener('typing', handelTypingEvent);