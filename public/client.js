const socket = io()
let naam;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')

do{
naam =prompt('Please! enter your name...')
}while(!naam)


    textarea.addEventListener('keyup',(e)=>{
        if(e.key=='Enter'){
            sendMessage(e.target.value)
        }
    })



    function sendMessage(message){
        let msg = {
            user: naam,
            message: message.trim()
        }
        //append message
        appendMessage(msg,'outgoing')
        textarea.value=''
        scroll();

        //sendtoserver
        socket.emit('message',msg)

    }

    function appendMessage(msg,type){
        let maindiv = document.createElement('div')
        let classname = type
        maindiv.classList.add(classname,'message')

        let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
        `

        maindiv.innerHTML =  markup
        messageArea.appendChild(maindiv)

    }


socket.on('message',(msg)=>{
    console.log(msg)
    appendMessage(msg,'incoming')
    scroll()


})    

function scroll() {
    messageArea.scrollTop = messageArea.scrollHeight
}