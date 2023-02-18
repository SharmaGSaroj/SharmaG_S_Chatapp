export default {
    name: 'TheChatMessageComponent',

    props: ['message'],
    data() {
        return {
            matchedID: this.$parent.socketID == this.message.id
        }
    },

    template: `
    <article class="chat-messages" :class="{'other-messages' : matchedID }">
   <!--<h2>{{ message.message.name }} says:</h2>-->
    <p>{{ message.message.content }}</p>
    </article>
    
    
    
    `

}