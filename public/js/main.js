// imports go at the top 

import ChatMsg from "./components/ChatMessage.js";


var socket = io();


//utility for socket

function addNewMessage(message) {
    vm.messages.push(message);
}
function handelTypingEvent(user) {
    console.log('someone is typing');
}

function setUserID({ sID }) {
    vm.socketID = sID;
}


const { createApp } = Vue

const vm = createApp({
    data() {
        return {
            socketID: '',
            message: '',
            messages: [],
            nickname: ''
        }
    },

    methods: {
        dispatchMessage() {


            socket.emit('chat_message', {
                content: this.message,
                name: this.nickname || 'anonymous',
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