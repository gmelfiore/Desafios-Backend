const socket=io();

let data;

Swal.fire({
    title:"Identifiquese",
    input:"text",
    text:"Ingrese su nickname",
    inputValidator: (value)=>{
        return !value && "Debe ingresar su nombre para continuar"
    },
    allowOutsideClick:false
}).then(datos=>{
    let nombre=datos.value
    document.title=nombre

    let inputMensaje=document.getElementById("mensaje")
    let divMensajes=document.getElementById("mensajes")
    inputMensaje.focus()
    
    const socket=io()
    
    socket.emit("id", nombre)

    socket.on("nuevoUsuario", nombre=>{
        Swal.fire({
            text:`${nombre} se ha conectado`,
            toast:true,
            position:"top-right"
        })
    })

    inputMensaje.addEventListener("keyup", e=>{
        if(e.code==="Enter" && e.target.value.trim().length>0){
            socket.emit("mensaje", nombre, e.target.value.trim())
            e.target.value="";
            e.target.focus()
        }
    })
    socket.on("nuevoMensaje", (newMessage)=>{
        divMensajes.innerHTML+=`<p><strong>${newMessage.user}</strong> dice <i>${newMessage.message}</i></p>`
        divMensajes.scrollTop=divMensajes.scrollHeight
    })

    socket.on("saleUsuario", nombre=>{
        divMensajes.innerHTML+=`<p><strong>${nombre}</strong> ha salido del chat</p>`
        divMensajes.scrollTop=divMensajes.scrollHeight
    })

})